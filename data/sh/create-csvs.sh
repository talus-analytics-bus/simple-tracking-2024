export PGPASSWORD="1234";
for i in ./queries/*; do
    query_name=$(basename -- "$i")
    psql -h localhost -U postgres -d tracking --csv -f $i > ./csv/${query_name%.*}.csv
done

