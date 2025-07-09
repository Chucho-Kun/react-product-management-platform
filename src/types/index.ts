import { boolean, number, object, string, array , type InferOutput } from 'valibot';

export const DrafProductSchema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availibility: boolean()
})

export const ProductsSchema = array(ProductSchema)
export type Product = InferOutput<typeof ProductsSchema>