import base64
import hashlib

from cryptography.fernet import Fernet

from app.core.config import settings


def _cipher() -> Fernet:
    key = base64.urlsafe_b64encode(hashlib.sha256(settings.jwt_secret.encode("utf-8")).digest())
    return Fernet(key)


def encrypt_task_value(value: str) -> str:
    return _cipher().encrypt(value.encode("utf-8")).decode("ascii")


def decrypt_task_value(value: str) -> str:
    return _cipher().decrypt(value.encode("ascii")).decode("utf-8")