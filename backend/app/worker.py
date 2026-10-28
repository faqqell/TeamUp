import logging

from app.services.email_queue import EmailQueueWorker
from app.services.post_game_service import build_scheduler

logging.basicConfig(level=logging.INFO)


def main() -> None:
    scheduler = build_scheduler()
    if scheduler:
        scheduler.start()
    try:
        EmailQueueWorker().run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        if scheduler:
            scheduler.stop()


if __name__ == "__main__":
    main()