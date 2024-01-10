docker run --rm \
    -P -p 127.0.0.1:5432:5432 \
    -e POSTGRES_PASSWORD="1234" \
    -e POSTGRES_DB="tracking" \
    --name tracking-db \
    postgres:14.2
