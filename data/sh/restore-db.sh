#!/bin/bash

if ! command -v aws --version &> /dev/null
then
    echo "AWS CLI not found, please download database dump manually."
else
    aws s3 sync s3://tracking-db-dump-2024/ ./dumps/
fi
docker exec tracking-db mkdir -p /dumps
docker cp ./dumps/dump-tracking tracking-db:/dumps/dump-tracking
docker exec -e PGPASSWORD="1234" tracking-db psql -h localhost -U postgres -d tracking -c "DROP SCHEMA public CASCADE;"
docker exec -e PGPASSWORD="1234" tracking-db pg_restore --no-owner --no-privileges -d tracking -U postgres -h localhost /dumps/dump-tracking

