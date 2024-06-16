import { CfnOutput, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ProductApi, ProductApiProps } from './productApi';

export interface ApiStackProps extends StackProps {
  projectName: string
  environment: string
}

export default class ApiStack extends Stack {

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);
         
    const productApi = new ProductApi(this, 'ProductApi', {
      ...props
    });
    
    new CfnOutput(this, "APIEndpoint", {
      value: productApi.httpApi.apiEndpoint
    });
  }
}