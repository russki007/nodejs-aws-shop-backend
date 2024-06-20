import { Construct } from "constructs";
import { Duration, StackProps } from "aws-cdk-lib";
import { Runtime, Function, Code } from "aws-cdk-lib/aws-lambda";
import { CorsHttpMethod, HttpApi, HttpMethod } from "aws-cdk-lib/aws-apigatewayv2";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as path from 'path';

export interface ProductApiProps extends StackProps {
    projectName: string,
    environment: string,
}

export class ProductApi extends Construct {
    readonly httpApi: HttpApi

    constructor(scope: Construct, id: string, props: ProductApiProps) {
        super(scope, id)

        this.httpApi = new HttpApi(this, 'ProductsApi', {
            apiName: `${props.projectName}-api`,
            corsPreflight: {

                allowHeaders: ['Content-Type'],
                allowMethods: [CorsHttpMethod.GET],
                allowOrigins: [
                    '*'
                ],
                maxAge: Duration.hours(1)
            },
            createDefaultStage: true
        });


        const getProductsListFunction = new Function(
            this,
            "GetProductsListFunction",
            {
                functionName: `${props.projectName}-getProductsList`,
                runtime: Runtime.NODEJS_20_X,
                code: Code.fromAsset(path.join(__dirname, '..', 'src')),
                handler: "getProductsList.handler",
                environment: {}
            }
        );

        this.httpApi.addRoutes({
            path: '/products',
            methods: [
                HttpMethod.GET
            ],
            integration: new HttpLambdaIntegration(`getProductsIntegration`, getProductsListFunction)
        });

        const getProductByIdFunction = new Function(
            this,
            "GetProductByIdFunction",
            {
                functionName: `${props.projectName}-getProductById`,
                runtime: Runtime.NODEJS_20_X,
                code: Code.fromAsset(path.join(__dirname, '..', 'src')),
                handler: "getProductById.handler",
                environment: {}
            }
        );

        this.httpApi.addRoutes({
            path: '/products/{id}',
            methods: [
                HttpMethod.GET
            ],
            integration: new HttpLambdaIntegration(`getProductByIdIntegration`, getProductByIdFunction)
        });
    }
}