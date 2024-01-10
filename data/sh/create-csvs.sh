docker exec tracking-db mkdir -p ./csv
docker exec tracking-db mkdir -p ./queries
for i in ./queries/*; do
    docker cp $i tracking-db:$i
    query_name=$(basename -- "$i")
    docker exec -e PGPASSWORD="1234" tracking-db psql -h localhost -U postgres -d tracking --csv -f $i > ./csv/${query_name%.*}.csv
done
docker cp tracking-db:/csv/ .

