from fastapi import FastAPI
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.exc import IntegrityError, OperationalError, TimeoutError as SQLAlchemyTimeoutError

from app.api.router import api_router
from app.core.config import settings
from app.core.db_errors import map_integrity_error
from app.services.admin_access_service import sync_primary_admin_access

app = FastAPI(title="TeamUp API", version="0.1.0")

origins = [origin.strip() for origin in settings.cors_origins.split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.exception_handler(IntegrityError)
def handle_integrity_error(_: Request, exc: IntegrityError):
    """Преобразует ошибки целостности БД в клиентский HTTP-ответ."""
    status_code, detail = map_integrity_error(exc)
    return JSONResponse(status_code=status_code, content={"detail": detail})


@app.exception_handler(OperationalError)
def handle_operational_error(_: Request, __: OperationalError):
    """Возвращает 503, если база данных недоступна."""
    return JSONResponse(
        status_code=503,
        content={"detail": "Database is unavailable. Check DATABASE_URL and database reachability."},
    )


@app.exception_handler(SQLAlchemyTimeoutError)
def handle_database_pool_timeout(_: Request, __: SQLAlchemyTimeoutError):
    """Returns a retryable response when the database pool is temporarily full."""
    return JSONResponse(
        status_code=503,
        content={"detail": "Server is busy. Please retry shortly."},
        headers={"Retry-After": "2"},
    )


@app.get("/")
def health() -> dict[str, str]:
    """Проверка доступности API."""
    return {"status": "ok"}


@app.on_event("startup")
def startup_scheduler() -> None:
    """Инициализирует сервисы при старте приложения."""
    sync_primary_admin_access()
