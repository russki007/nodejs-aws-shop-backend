#!/usr/bin/env node
import { App, CfnOutput, Stack, StackProps, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ProductApi }  from './productApi';

const owner = 'russki007';
const stackName = `${owner}-WebAppStack-backend`;
const project: string = 'react-shop-cloudfront';
const environment = 'develop';

const props = {
    projectName: project,
    environment: environment,
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    }
};

export default class ProductServiceStack extends Stack {

    constructor(scope: Construct, id: string) {
        super(scope, id);

        const productApi = new ProductApi(this, 'ProductApi', {
            ...props
        });

        new CfnOutput(this, "APIEndpoint", {
            value: productApi.httpApi.apiEndpoint
        });
    }
}

const stack = new ProductServiceStack(new App(), stackName);


Tags.of(stack).add('environment', environment);
Tags.of(stack).add('owner', owner);
Tags.of(stack).add('project', project);