import mockProducts from './products.json';

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

export const createStore = () => new InMemoryProductStore();

class InMemoryProductStore implements ProductStore {

    constructor() {
    }

    async getProduct(id: string): Promise<IProduct> {
        const product = mockProducts.find(p => p.id === id);
        if (product) {
            return Promise.resolve(product);
        } else {
            throw new Error("Product not found");
        }
    }

    async getProducts(): Promise<IProduct[]> {
        return Promise.resolve(mockProducts);
    }
}