#!/bin/sh
set -e

# Apply all local database migrations before starting the API.
alembic upgrade heads
python /app/app/db/seed.py

uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-80}"
