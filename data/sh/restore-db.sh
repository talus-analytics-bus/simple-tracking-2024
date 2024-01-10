docker exec tracking-db mkdir -p /dumps
docker cp ./dumps/dump-tracking tracking-db:/dumps/dump-tracking
docker exec -e PGPASSWORD="1234" tracking-db psql -h localhost -U postgres -d tracking -c "DROP SCHEMA public CASCADE;"
docker exec -e PGPASSWORD="1234" tracking-db pg_restore --no-owner --no-privileges -d tracking -U postgres -h localhost /dumps/dump-tracking

