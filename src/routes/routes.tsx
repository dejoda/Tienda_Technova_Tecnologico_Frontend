import { createBrowserRouter } from "react-router";
import App from "../App";
import inicio from "../pages/inicio/inicio";
import Productos from "../pages/productos/productos";
import Detalle_product from "../pages/detalle_producto/detalle_product";
import Login from "../pages/login/login";
import Error404 from "../pages/error404/Error404";
import Register from "../pages/register/register";
import Nosotros from "../pages/nosotros/nosotros";
import DashboardLayout from "../dashboard/DashboardLayout";
import ProtectedRoute from "../dashboard/ProtectedRoute";

// Placeholder para las vistas del dashboard (las iremos creando)
const DashboardHome = () => <div>Dashboard Home</div>;

export const routes = createBrowserRouter([
  // ── Rutas públicas (con Header + Footer) ──────────────────────────
  {
    path: "",
    Component: App,
    children: [
      { path: "", Component: inicio },
      { path: "productos", Component: Productos },
      { path: "Productos/detalle_product/:id/:name", Component: Detalle_product },
      { path: "Nosotros", Component: Nosotros },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "*", Component: Error404 },
    ],
  },

  // ── Rutas del dashboard (sin Header/Footer públicos) ───────────────
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", Component: DashboardHome },

      // Admin
      { path: "usuarios",      element: <ProtectedRoute allowedRoles={["admin"]}><div>Usuarios</div></ProtectedRoute> },
      { path: "productos",     element: <ProtectedRoute allowedRoles={["admin"]}><div>Productos Admin</div></ProtectedRoute> },
      { path: "reportes",      element: <ProtectedRoute allowedRoles={["admin"]}><div>Reportes</div></ProtectedRoute> },
      { path: "configuracion", element: <ProtectedRoute allowedRoles={["admin"]}><div>Configuración</div></ProtectedRoute> },

      // Vendedor
      { path: "mis-productos", element: <ProtectedRoute allowedRoles={["vendedor"]}><div>Mis Productos</div></ProtectedRoute> },
      { path: "pedidos",       element: <ProtectedRoute allowedRoles={["vendedor"]}><div>Pedidos</div></ProtectedRoute> },
      { path: "clientes",      element: <ProtectedRoute allowedRoles={["vendedor"]}><div>Clientes</div></ProtectedRoute> },
      { path: "ventas",        element: <ProtectedRoute allowedRoles={["vendedor"]}><div>Reportes de Ventas</div></ProtectedRoute> },

      // Cliente
      { path: "mis-pedidos",   element: <ProtectedRoute allowedRoles={["cliente"]}><div>Mis Pedidos</div></ProtectedRoute> },
      { path: "carrito",       element: <ProtectedRoute allowedRoles={["cliente"]}><div>Carrito</div></ProtectedRoute> },

      // Compartida
      { path: "perfil", Component: DashboardHome },
    ],
  },
]);