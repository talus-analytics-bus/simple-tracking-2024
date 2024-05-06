aws cloudformation update-stack \
  --stack-name simple-tracking-2024 \
  --template-body file://build-stack.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-east-1 \
  --tags Key=Project,Value=IDEA \
         Key=ProjectDetail,Value=SimpleTracking \
