import { APIGatewayProxyEventV2, APIGatewayProxyResult } from 'aws-lambda';

export function apiGatewayProxyEvent(
    method: string,
    uri: string,
    body: unknown = {},
    pathParameters: Record<string, string> = {},
    rest: Partial<APIGatewayProxyEventV2> = {},
): APIGatewayProxyEventV2 {
    return {
        routeKey: `${method.toUpperCase()} ${uri}`,
        body: JSON.stringify(body),
        pathParameters,
        ...rest,
    } as APIGatewayProxyEventV2;
}

type Headers = Record<string, string>
export const CorsHeaders: Headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
}


/*export interface JsonResult extends APIGatewayProxyResult {
    
}*/

export type JsonResult = Pick<APIGatewayProxyResult, 'statusCode' | 'body' | 'headers'>

export function Ok(value: any): APIGatewayProxyResult {
    return jsonResponse(200, value);
}

export function jsonResponse(statusCode: number, value: unknown = {}): APIGatewayProxyResult {
    return {
        statusCode,
        headers: CorsHeaders,
        body: JSON.stringify(value),
    };
}