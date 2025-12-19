import { ProductData } from "../../interfaces/CreateProduct";

export const productsData: ProductData[] = [
    {
        title: "JERSEY DE PRUEBA RAYADOS 2025-26 ",
        slug: "men_latest_rayados_prueba_2025",
        description: "Camiseta de prueba para Playwright",
        price: 299,
        stock: 50,
        tags: "ropa,camiseta,prueba rayados",
        gender: "Unisex",
        sizes: ["L", "XS", "XXL"],
        image: "assets/camisa.jpg"
    },
    {
        title: "Jersey Azules",
        slug: "men_blue_sky_tee",
        description: "Camiseta azul de prueba",
        price: 279,
        stock: 30,
        tags: "ropa,camiseta,azul",
        gender: "Unisex",
        sizes: ["M", "L", "XL"],
        image: "assets/camisa.jpg"
    },
    {
        title: "Jersey Verde",
        slug: "men_green_forest_tee",
        description: "Camiseta verde de prueba",
        price: 319,
        stock: 20,
        tags: "ropa,camiseta,verde",
        gender: "Unisex",
        sizes: ["S", "M", "L"],
        image: "assets/camisa.jpg"
    }
];
