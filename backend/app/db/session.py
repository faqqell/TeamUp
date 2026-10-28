from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings


engine = create_engine(
	settings.database_url,
	future=True,
	pool_size=settings.database_pool_size,
	max_overflow=settings.database_max_overflow,
	pool_timeout=settings.database_pool_timeout,
	pool_pre_ping=True,
	pool_recycle=1800,
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True)
