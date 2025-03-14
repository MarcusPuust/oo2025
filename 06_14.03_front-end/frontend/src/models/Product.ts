import { Category } from "./Category"

export type Product = {
    id: number,
    name: string,
    price: number,
    image: string,
    active: boolean,
    category: Category
}