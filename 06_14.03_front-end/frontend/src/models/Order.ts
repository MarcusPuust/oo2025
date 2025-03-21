import { Person } from "./Person"
import { Product } from "./Product"

export type Order = {
    id: number,
    created: Date,
    person: Person,
    products: Product[],
    totalSum: number
}