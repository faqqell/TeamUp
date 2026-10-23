#!/bin/sh
set -e

echo "Starting local TeamUp stack..."
docker compose up -d --build

echo "Seeding local verification accounts and base data..."
docker compose exec -T backend python /app/app/db/seed.py

echo ""
echo "Backend:  http://localhost:8000"
echo "Swagger:  http://localhost:8000/docs"
echo "Frontend: http://localhost:5173"
echo ""
echo "Test partner credentials:"
echo "email:    partner.test@teamup.kg"
echo "password: Partner123!"
echo ""
echo "Test admin credentials:"
echo "email:    admin@teamup.com"
echo "password: admin123"
echo ""
echo "Test user credentials:"
echo "email:    user.test@teamup.kg"
echo "password: User123!"
