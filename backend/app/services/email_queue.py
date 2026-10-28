import logging
import time
from datetime import UTC, datetime, timedelta
from uuid import UUID

from sqlalchemy import and_, or_, select
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.email_task import EmailTask
from app.models.email_verification import EmailVerificationCode
from app.services.email_service import EmailService
from app.services.email_verification_service import hash_verification_code
from app.services.task_crypto import decrypt_task_value

logger = logging.getLogger(__name__)


class EmailQueueWorker:
    def __init__(self, poll_seconds: float = 1, max_attempts: int = 5):
        self.poll_seconds = poll_seconds
        self.max_attempts = max_attempts

    def run_forever(self) -> None:
        while True:
            try:
                if not self.process_one():
                    time.sleep(self.poll_seconds)
            except Exception:
                logger.exception("email_queue.iteration_failed")
                time.sleep(self.poll_seconds)

    def process_one(self) -> bool:
        with SessionLocal() as db:
            task = self._claim(db)
            if task is None:
                return False
            task_id, recipient, encrypted_code, code_hash = task

        code = decrypt_task_value(encrypted_code)
        with SessionLocal() as db:
            verification = db.execute(
                select(EmailVerificationCode.code_hash, EmailVerificationCode.expires_at).where(
                    EmailVerificationCode.email == recipient
                )
            ).one_or_none()
        if (
            verification is None
            or verification.code_hash != code_hash
            or verification.expires_at <= datetime.now(UTC)
            or hash_verification_code(recipient, code) != code_hash
        ):
            self._delete(task_id)
            return True

        try:
            EmailService.send_verification_code(recipient, code)
        except Exception as exc:
            self._retry(task_id, exc)
        else:
            self._delete(task_id)
        return True

    @staticmethod
    def _claim(db: Session) -> tuple[UUID, str, str, str] | None:
        now = datetime.now(UTC)
        task = db.scalar(
            select(EmailTask)
            .where(
                EmailTask.available_at <= now,
                or_(
                    EmailTask.status == "queued",
                    and_(EmailTask.status == "processing", EmailTask.locked_until < now),
                ),
            )
            .order_by(EmailTask.created_at.asc())
            .with_for_update(skip_locked=True)
            .limit(1)
        )
        if task is None:
            db.rollback()
            return None

        task.status = "processing"
        task.locked_until = now + timedelta(seconds=60)
        db.commit()
        return task.id, task.recipient, task.encrypted_code, task.code_hash

    @staticmethod
    def _delete(task_id: UUID) -> None:
        with SessionLocal() as db:
            task = db.get(EmailTask, task_id)
            if task:
                db.delete(task)
                db.commit()

    def _retry(self, task_id: UUID, exc: Exception) -> None:
        with SessionLocal() as db:
            task = db.get(EmailTask, task_id)
            if task is None:
                return
            task.attempts += 1
            task.last_error = type(exc).__name__
            task.locked_until = None
            if task.attempts >= self.max_attempts:
                task.status = "failed"
                logger.error("email_queue.task_failed id=%s attempts=%s", task_id, task.attempts)
            else:
                task.status = "queued"
                task.available_at = datetime.now(UTC) + timedelta(seconds=min(30 * 2 ** (task.attempts - 1), 900))
            db.commit()