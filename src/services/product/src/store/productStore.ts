
export interface IProduct {
    id: string;
    title: string;
    description: string;
    price: number;
}

export interface ProductStore {
    getProduct: (id: string) => Promise<IProduct>;
    getProducts: () => Promise<IProduct[]>;
}

export class InMemoryProductStore implements ProductStore {
    private products: IProduct[];

    constructor() {
        this.products = [
            {
                id: '1',
                title: 'Product 1',
                description: 'Description of product 1',
                price: 100
            },
            {
                id: '2',
                title: 'Product 2',
                description: 'Description of product 2',
                price: 200
            },
            {
                id: '3',
                title: 'Product 3',
                description: 'Description of product 3',
                price: 300
            },
            {
                id: '4',
                title: 'Product 4',
                description: 'Description of product 4',
                price: 400
            },
            {
                id: '5',
                title: 'Product 5',
                description: 'Description of product 5',
                price: 500
            },
            {
                id: '6',
                title: 'Product 6',
                description: 'Description of product 6',
                price: 600
            },
            {
                id: '7',
                title: 'Product 7',
                description: 'Description of product 7',
                price: 700
            },
            {
                id: '8',
                title: 'Product 8',
                description: 'Description of product 8',
                price: 800
            },
            {
                id: '9',
                title: 'Product 9',
                description: 'Description of product 9',
                price: 900
            },
            {
                id: '10',
                title: 'Product 10',
                description: 'Description of product 10',
                price: 1000
            }
        ];
    }

    async getProduct(id: string): Promise<IProduct> {
        const product = this.products.find(p => p.id === id);
        if (product) {
            return Promise.resolve(product);
        } else {
            throw new Error(`Product with id ${id} not found`);
        }
    }

    
    async getProducts(): Promise<IProduct[]> {
        return Promise.resolve(this.products);
    }
}