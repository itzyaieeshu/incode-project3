psql -h localhost -d mrcoffee -f database/migrations/create_db.sql
psql -h localhost -d mrcoffee -f database/migrations/create_users.sql
psql -h localhost -d mrcoffee -f database/migrations/create_schedules.sql