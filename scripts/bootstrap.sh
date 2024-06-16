#!/bin/bash

# Get AWS account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Get AWS region
REGION=$(aws configure get region)

# Check if ACCOUNT_ID and REGION are retrieved successfully
if [[ -z "$ACCOUNT_ID" || -z "$REGION" ]]; then
  echo "Error: Unable to retrieve AWS account ID or region."
  exit 1
fi

echo "AWS Account ID: $ACCOUNT_ID"
echo "AWS Region: $REGION"

# Perform CDK bootstrapping
cdk bootstrap aws://$ACCOUNT_ID/$REGION
