import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, APIGatewayProxyResult } from 'aws-lambda'
import { ProductStore, IProduct, InMemoryProductStore } from './store/productStore';

/*
export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    return {
        statusCode: 200,
        body: "Hello World!",
    };
};
*/

export const handler = async(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    
    let store = new InMemoryProductStore();
    const result = await store.getProducts();

    return {
        statusCode: 200,
        body: JSON.stringify(result),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
             'Access-Control-Allow-Origin': '*'
          }
    };
}

