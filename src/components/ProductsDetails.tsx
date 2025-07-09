import { Link, useNavigate } from "react-router-dom"
import { formatCurrency } from "../helpers"
import type { Product } from "../types"

type ProductDetailsProps = {
    product : Product
}

export default function ProductsDetails( { product } : ProductDetailsProps ) {

    const navigate = useNavigate()
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
                { isAvailable ? 'Disponible' : 'No disponible' }
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <Link
                        className="bg-indigo-400 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-indigo-600"
                        to={`/productos/${ product.id }/editar`} 
                    > Editar </Link> 

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
