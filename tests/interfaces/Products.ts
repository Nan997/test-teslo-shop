export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    slug: string;
    stock: number;
    sizes: string[];
    gender: 'men' | 'women' | 'unisex';
    tags: string[];
    images: string[];
}

export interface ProductsResponse {
    count: number;
    pages: number;
    products: Product[];
}
