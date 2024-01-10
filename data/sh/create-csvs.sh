docker cp ./queries tracking-db:/queries
docker exec tracking-db mkdir -p ./csv
for i in ./queries/*; do
    query_name=$(basename -- "$i")
    echo $query_name
    docker exec tracking-db PGPASSWORD="1234" psql -h localhost -U postgres -d tracking --csv -f $i > ./csv/${query_name%.*}.csv
done
docker cp tracking-db:/csv/ .

