aws cloudformation deploy \
  --stack-name simple-tracking-2024 \
  --template-file build-stack.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --tags Project=IDEA \
         Project:Detail=SimpleTracking \
  --profile default
