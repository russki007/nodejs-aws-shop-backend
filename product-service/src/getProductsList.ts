import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, APIGatewayProxyResult } from 'aws-lambda'
import { ProductStore, IProduct, createStore } from './store';


export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    let store = createStore();
    const result = await store.getProducts();

    return {
        statusCode: 200,        
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(result),
    };
}

