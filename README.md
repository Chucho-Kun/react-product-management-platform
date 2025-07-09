# FRONT REST API REACT - TypeScript
React Web Platform connected to an API hosted on a Node 22.14 + PostgreSQL 16.9 server ( PERN )
## Technologies
React + Typescript + TailwindCSS + Axios + Zod + Valibot + React Router
## Developer Notes

### API documented with swagger - PERN Stack
#### src/services/ProductService.ts
```
import { safeParse , number , parse, pipe, transform , string } from "valibot";
import { DrafProductSchema , ProductSchema, ProductsSchema, type Product } from "../types";
import axios from "axios";
import { toBoolean } from "../helpers";

type ProductData = {
    [ k: string ] :FormDataEntryValue
}

export async function addProduct( data : ProductData  ) {
    
    try{
        const result = safeParse( DrafProductSchema , {
            name: data.name,
            price: +data.price
        } )
        if( result.success ){
            const url = `${ import.meta.env.VITE_API_URL }/api/products`

            await axios.post( url , { 
                name: result.output.name,
                price: result.output.price
             } )

             
        }else{
            throw new Error(' Datos no válidos ')
        }
        
    }catch(error){
        console.log( error );
    }

}

export async function getProducts() {
    try{
        const url = `${ import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios( url )        
        const result = safeParse( ProductsSchema , data.data )
   
        if( result.success ){
            return result.output
        }else{
            throw new Error('Hubo un error...')
        }
        
    }catch(error){
        console.log(error);
    }
}

export async function getProductsById( id : Product['id']) {
    try{
        const url = `${ import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios( url )        
        const result = safeParse( ProductSchema , data.data )
        
        if( result.success ){
            return result.output
        }else{
            throw new Error('Hubo un error...')
        }
        
    }catch(error){
        console.log(error);
    }
}

export async function updateProduct( data : ProductData , id : Product['id'] ) {
    
    try{
        const NumberSchema = pipe( string(), transform(Number) , number() )

        const result = safeParse( ProductSchema , {
            id,
            name: data.name,
            price: parse( NumberSchema , data.price ),
            availibility: toBoolean( data.availability.toString() )
        })
        
        if( result.success ){
            const url = `${ import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put( url , result.output)
        }
        
    }catch(error){
        console.log(error);
        
    }
    
}
```
