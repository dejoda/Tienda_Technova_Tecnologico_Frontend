import { createBrowserRouter } from "react-router";
import App from "../App";
import inicio from "../pages/inicio/inicio";
import Productos from "../pages/productos/productos";
import Detalle_product from "../pages/detalle_product";
import Login from "../pages/login";
import Error404 from "../pages/Error404";
import Register from "../pages/register";
import Nosotros from "../pages/nosotros";

export const routes=createBrowserRouter([
    {path:'',Component:App,children:[
        {path:'',Component:inicio},
        {path:'productos',Component:Productos},
        {path:'Productos/detalle_product/:id/:name',Component:Detalle_product},
        {path:'Nosotros',Component:Nosotros},
        {path:'login',Component:Login},
        {path:'register',Component:Register},
        {path:'*',Component:Error404}
    ]}
])