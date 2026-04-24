import { createBrowserRouter, Navigate, Outlet } from "react-router";
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
import SettingSeccion from "../dashboard/views/Global/SettingsSeccion/SettingSeccion";
import PagosSeccionAdmin from "../dashboard/views/admin/seccions/pagos/PagosSeccionAdmin";
import PedidosSeccionAdmin from "../dashboard/views/admin/seccions/pedidos/PedidosSeccionAdmin";

import ReportesSeccionAdmin from "../dashboard/views/admin/seccions/reportes/ReportesSeccionAdmin";
import UsuariosSeccionAdmin from "../dashboard/views/admin/seccions/usuarios/UsuariosSeccionAdmin";
import ResumenSeccionAdmin from "../dashboard/views/admin/seccions/resumen/ResumenSeccionAdmin";
import ResumenSeccionClient from "../dashboard/views/client/seccion/resumen/ResumenSeccionClient";
import { useAuth } from "../context/authcontext";
import PedidosSeccionClient from "../dashboard/views/client/seccion/pedidos/PedidosSeccionClient";
import PerfilSeccion from "../dashboard/views/Global/Perfil/PerfilSeccion";
import DireccionSeccionClient from "../dashboard/views/client/seccion/direccion/DireccionSeccionClient";
import ResumenSeccionCustom from "../dashboard/views/custom/seccion/resumen/ResumenSeccionCustom";

import PedidosSeccionCustom from "../dashboard/views/custom/seccion/pedidos/PedidosSeccionCustom";
import ClientesSeccionCustom from "../dashboard/views/custom/seccion/clientes/ClientesSeccionCustom";
import CatalogoSeccionCustom from "../dashboard/views/custom/seccion/catalogo/CatalogoSeccionCustom";
import ClienteSeccionAdmin from "../dashboard/views/admin/seccions/clientes/ClienteSeccionAdmin";
import InventarioSeccionAdmin from "../dashboard/views/admin/seccions/inventario/ProductosSeccionAdmin";
import PagosSeccionCustom from "../dashboard/views/custom/seccion/pagos/PagosSeccionCustom";
import VentasSeccionCustom from "../dashboard/views/custom/seccion/ventas/VentasSeccionCustom";
import PagosSeccionClient from "../dashboard/views/client/seccion/pagos/PagosSeccionClient";

const DashboardRoleRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return <Navigate to={`/dashboard/${user.rol.nombre}`} replace />;
};

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
      { path: "", element: <DashboardRoleRedirect /> },

      // Admin
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { path: "", element: <ResumenSeccionAdmin /> },
          { path: "resumen", element: <ResumenSeccionAdmin /> },
          { path: "usuarios", element: <UsuariosSeccionAdmin /> },
          { path: "inventario", element: <InventarioSeccionAdmin /> },
          { path: "reportes", element: <ReportesSeccionAdmin /> },
          { path: "pagos", element: <PagosSeccionAdmin /> },
          { path: "pedidos", element: <PedidosSeccionAdmin /> },
          { path: "clientes", element: <ClienteSeccionAdmin /> },
          { path: "configuracion", element: <SettingSeccion /> },
          { path: "perfil", element: <PerfilSeccion /> },
        ],
      },

      // Vendedor
      {
        path: "vendedor",
        element: (
          <ProtectedRoute allowedRoles={["vendedor"]}>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { path: "", element: <ResumenSeccionCustom /> },
          { path: "resumen", element: <ResumenSeccionCustom /> },
          { path: "catalogo", element: <CatalogoSeccionCustom /> },
          { path: "pedidos", element: <PedidosSeccionCustom /> },
          { path: "clientes", element: <ClientesSeccionCustom /> },
          { path: "ventas", element: <VentasSeccionCustom /> },
          { path: "pagos", element: <PagosSeccionCustom /> },
          { path: "perfil", element: <PerfilSeccion /> },
          { path: "configuracion", element: <SettingSeccion /> },
        ],
      },

      // Cliente
      {
        path: "cliente",
        element: (
          <ProtectedRoute allowedRoles={["cliente"]}>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [

          { path: "", element: <ResumenSeccionClient /> },
          { path: "resumen", element: <ResumenSeccionClient /> },
          { path: "mis-pedidos", element: <PedidosSeccionClient /> },
          { path: "pagos", element: <PagosSeccionClient /> },
          { path: "direcciones", element: <DireccionSeccionClient /> },
          { path: "perfil", element: <PerfilSeccion /> },
          { path: "configuracion", element: <SettingSeccion /> },
        ],
      },
    ],
  },
]);