import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products , { action as updateAvailabilityAction , loader as productsLoader } from "./views/Products";
import NewProducts , { action as newProductAction } from "./views/NewProducts";
import EditProduct, { loader as editProductLoader , action as editProductAction } from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductsDetails";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Layout />,
        children:[
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: updateAvailabilityAction
            },{
                path:'productos/nuevo',
                element: <NewProducts />,
                action: newProductAction
            },{
                path: 'productos/:id/editar', // ROA Pattern - Resource-oriented desing
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },{
                path:'productos/:id/eliminar',
                action: deleteProductAction
            }
        ]
    }
])