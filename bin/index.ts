#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import ApiStack from "../src";

const app = new cdk.App();

const owner = 'russki007';
const stackName = `${owner}-WebAppStack-backend`;

const stackDescription = 'Stack for deploying a backend';
const project:string = 'react-shop-cloudfront';
const environment = 'develop';

const props = {
    projectName: project,
    environment: environment,
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    }
};

const apiStack = new ApiStack(app, stackName, props);


cdk.Tags.of(apiStack).add('environment', environment);
cdk.Tags.of(apiStack).add('owner', owner);
cdk.Tags.of(apiStack).add('project', project);