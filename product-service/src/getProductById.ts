import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, APIGatewayProxyResult } from 'aws-lambda'
import { createStore } from './store';
import { CorsHeaders } from './helpers';


export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const store = createStore();

    if (event.pathParameters && event.pathParameters.id) {
        const id = event.pathParameters.id;

        try {

            const result = await store.getProduct(id);

            return {
                statusCode: 200,
                body: JSON.stringify(result),
                headers: CorsHeaders
            };
        }
        catch (e) {
            return {
                body: JSON.stringify({ "message": (e as Error).message }),
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            }
        }
    }

    return {
        body: JSON.stringify({ "message": "Product ID is required" }),
        statusCode: 400,
        headers: CorsHeaders
    }

}

