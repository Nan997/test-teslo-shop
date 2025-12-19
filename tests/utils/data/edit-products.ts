import { ProductData } from "../../interfaces/CreateProduct";



export const editProductData: Partial<ProductData & { id: string }>[] = [
    {
        id: "Jersey-Rayados",
        title: "Jersey-Rayados",
        price: 1800,
        gender: "Masculino",
        sizes: ["M"]
    },

    {
        id: "Jersey-Rayados",
        title: "",
        price: 1800,
        gender: "Masculino",
        sizes: ["M"]
    },
];