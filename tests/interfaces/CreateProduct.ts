export interface ProductData {
    title: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    tags: string;
    gender: 'Masculino' | 'Femenino' | 'Unisex' | 'Kid ';
    sizes: Array<"XS" | "S" | "M" | "L" | "XL" | "XXL">;
    image: string
}
