import { Form, Link, redirect, useFetcher, type ActionFunctionArgs } from "react-router-dom"
import { formatCurrency } from "../helpers"
import type { Product } from "../types"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
    product : Product
}

export async function action({ params } : ActionFunctionArgs ) {
    
    if( params.id !== undefined ){
        await deleteProduct( +params.id )
        return redirect('/')
    }
    
}

export default function ProductsDetails( { product } : ProductDetailsProps ) {

    const fetcher = useFetcher()
    const isAvailable = product.availibility

  return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                { product.name }
            </td>
            <td className="p-3 text-lg text-gray-800">
                { formatCurrency( product.price ) }
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST" >
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-blue-100 cursor-pointer`}
                    >
                        { isAvailable ? 'Disponible' : 'No disponible' }
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <Link
                        className="bg-indigo-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-indigo-600"
                        to={`/productos/${ product.id }/editar`} 
                    > Editar </Link> 

                    <Form 
                        className="w-full"
                        method="POST"
                        action={`productos/${ product.id }/eliminar`}
                        onSubmit={ (e) => {
                            if( !confirm(`¿Desea Eliminar ${ product.name }?`) ){
                                e.preventDefault()
                            }
                        } }
                    >
                        <input 
                            type="submit"
                            value='Eliminar'
                            className="bg-red-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-red-600 cursor-pointer"
                         />
                    </Form>

                    {/**<button
                        className="bg-indigo-400 text-white rounded-lg w-10 p-2 uppercase font-bold text-xs text-center hover:bg-indigo-600 cursor-pointer"
                        onClick={ () => navigate( `/productos/${ product.id }/editar` , {
                            state: {
                                product
                            }
                        } ) }
                    >
                        *
                    </button> */}
                    
                </div>
            </td>
        </tr> 
  )
}
