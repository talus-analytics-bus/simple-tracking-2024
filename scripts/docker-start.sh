#!/bin/bash

reset=0;
clean=0;

# parse params
while [[ "$#" > 0 ]];
  do case $1 in
    -r|--reset) reset=1; shift;;
    -c|--clean) clean=1; shift;;
    *) echo "Unknown parameter passed: $1"; exit 1 ;;
  esac
  shift
done


if [[ -z "${AIRTABLE_API_KEY}" ]]; then
  # fetch airtable api key from secrets manager
  echo "Fetch AIRTABLE_API_KEY from secrets manager"
  export AIRTABLE_API_KEY=$(
    aws secretsmanager get-secret-value --secret-id airtable-api-key --region us-west-1 |\
    jq  -r .SecretString | jq -r .AIRTABLE_API_KEY\
  )
fi

if [[ -z "${GATSBY_MAPBOX_API_KEY}" ]]; then
  # fetch mapbox api key from secrets manager
  echo "Fetch GATSBY_MAPBOX_API_KEY from secrets manager"
  export GATSBY_MAPBOX_API_KEY=$(
    aws secretsmanager get-secret-value --secret-id pharos-mapbox-api-key --region us-west-1 |\
    jq  -r .SecretString | jq -r .MAPBOX_API_KEY\
  )
fi

if [ "$reset" == "1" ]; then
  npm i;
  gatsby clean;
fi

if [ "$clean" == "1" ]; then
  gatsby clean
fi

export INTERNAL_STATUS_PORT=8888

database_ready=$(pg_isready -h database -U postgres -d tracking)

if [ "$database_ready" = "database:5432 - accepting connections" ]; then
  database_stakeholder_count=$(psql -h database -U postgres -d tracking -t -c 'SELECT COUNT(DISTINCT(name)) FROM stakeholders')

  if (( database_stakeholder_count > 0)); then
    for i in data/queries/*; do
        query_name=$(basename -- "$i")
        echo "Running Query $query_name"
        psql -h database -U postgres -d tracking --csv -f $i > data/csv/${query_name%.*}.csv
    done

    {
      inotifywait -m -e modify data/queries/ |
      while read -r directory events filename; do
        echo "Running Query $filename"
        new_data=$(psql -h database -U postgres -d tracking --csv -f data/queries/$filename)
        echo "$new_data" > data/csv/${filename%.*}.csv
        sleep 2
        echo "$new_data" > data/csv/${filename%.*}.csv
      done
    } &

  else
    echo "Database is empty, ingest tracking dump to use queries."
  fi
else
  echo "Skipping database connection"
fi

gatsby clean;
gatsby develop -H 0.0.0.0;



