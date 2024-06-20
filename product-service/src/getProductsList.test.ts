import { handler } from './getProductsList';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { apiGatewayProxyEvent, Ok } from './helpers';
import { createStore } from './store';


describe('getProductsList', () => {

  test('should return products', async () => {

    // Arrange
    const store = createStore();
    const mockEvent: APIGatewayProxyEventV2 = apiGatewayProxyEvent('GET', '/products');
    const data = await store.getProducts();

    // Act
    const response = await handler(mockEvent);
   
    // Assert
    expect(response).toStrictEqual(
      Ok(data),
    );
  });

});
