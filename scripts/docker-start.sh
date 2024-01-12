#!/bin/bash

reset=0;
clean=0;
# airtable_secret='';

# parse params
while [[ "$#" > 0 ]];
  do case $1 in
    -r|--reset) reset=1; shift;;
    -c|--clean) clean=1; shift;;
    # -a|--airtable-secret); shift;;
    *) echo "Unknown parameter passed: $1"; exit 1 ;;
  esac
  shift
done

# fetch environment variables from secrets manager
export AIRTABLE_API_KEY=$(
  aws secretsmanager get-secret-value --secret-id airtable-api-key --region us-west-1 |\
  jq  -r .SecretString | jq -r .AIRTABLE_API_KEY\
)


  # echo $AIRTABLE_SECRET | jq  -r .SecretString | jq -r .AIRTABLE_API_KEY\

if [ "$reset" == "1" ]; then 
  bvm upgrade;
  yarn install;
  gatsby clean;
fi

if [ "$clean" == "1" ]; then 
  gatsby clean
fi

export INTERNAL_STATUS_PORT=8888

gatsby develop -H 0.0.0.0;



