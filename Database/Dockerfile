From postgres:14.2
ENV POSTGRES_PASSWORD "1234"
ENV POSTGRES_DB tracking

COPY dumps/dump-tracking-v12 /dumps/

EXPOSE 5432

# ENTRYPOINT ["pg_restore --no-owner --no-privileges -d tracking -U postgres /dumps/dump-tracking-v12"]

# docker run --rm \
#     -P -p 127.0.0.1:5432:5432 \
#     -e POSTGRES_PASSWORD="1234" \
#     -e POSTGRES_DB="tracking" \
#     --name tracking-db \
#     postgres:14

