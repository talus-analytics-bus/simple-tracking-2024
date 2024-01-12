#!/bin/bash

if ! command -v aws --version &> /dev/null
then
    echo "AWS CLI not found, please download database dump manually."
else
    aws s3 sync s3://tracking-db-dump-2024/ ./data/dumps/
fi
docker exec -e PGPASSWORD="1234" simple-tracking-db psql -h localhost -U postgres -d tracking -c "DROP SCHEMA public CASCADE;"
docker exec -e PGPASSWORD="1234" simple-tracking-db pg_restore --no-owner --no-privileges -d tracking -U postgres -h localhost /dumps/dump-tracking

