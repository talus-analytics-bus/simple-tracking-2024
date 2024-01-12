#!/bin/bash
#airtable_secret=$(aws secretsmanager get-secret-value --secret-id airtable-api-key --region us-west-1)

docker run --rm \
  -v ~/.aws:/root/.aws \
  -v ./src:/app/src \
  --name 'simple-tracking' \
  -p 8000:8000 \
  -p 8888:8888 \
  'simple-tracking' 

  # --platform linux/amd64 \
  # --platform linux/x86_64 \
  # --platform linux/x86_64 \
  # -v ~/.aws:/root/.aws

  # -v ${HOME}/.aws/credentials:/root/.aws/credentials \

# --env AIRTABLE_SECRET="$airtable_secret" \

