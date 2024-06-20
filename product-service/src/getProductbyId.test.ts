import { handler } from './getProductById';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { apiGatewayProxyEvent, Ok } from './helpers';
import { createStore } from './store';
import path from 'path';

describe('getProductById returns 404', () => {

  test('if record not found', async () => {

    // Arrange
    const mockEvent: APIGatewayProxyEventV2 = apiGatewayProxyEvent(
      'GET', '/products/{id}', {}, { id: '-1' });

    // Act
    const response = await handler(mockEvent);

    // Assert
    expect(response).toStrictEqual(
      Ok({ "message": "Product not found" }),
    );

  });

});