docker run --rm \
    -v tracking-db-data:/var/lib/postgresql/data \
    -P -p 127.0.0.1:5432:5432 \
    -e POSTGRES_PASSWORD="1234" \
    -e POSTGRES_DB="tracking" \
    -e PGPASSWORD="1234" \
    --name tracking-db \
    postgres:14.2
