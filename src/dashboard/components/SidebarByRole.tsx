import {
} from "lucide-react";
import { IconBuildingStore, IconClipboardListFilled, IconHomeFilled, IconLayoutDashboardFilled, IconReportAnalyticsFilled, IconSettingsFilled, IconShoppingCartFilled, IconUserCheck, IconUserFilled, IconUsers } from "@tabler/icons-react";
import type { ComponentType } from "react";

type SidebarIcon = ComponentType<{
  size?: number | string;
  className?: string;
}>;

const UsersMenuIcon: SidebarIcon = (props) => <IconUsers stroke={2} {...props} />;
const ProductsMenuIcon: SidebarIcon = (props) => <IconBuildingStore stroke={2} {...props} />;
const OrdersMenuIcon: SidebarIcon = (props) => <IconClipboardListFilled {...props} />;
const ReportsMenuIcon: SidebarIcon = (props) => <IconReportAnalyticsFilled {...props} />;
const SettingsMenuIcon: SidebarIcon = (props) => <IconSettingsFilled {...props} />;
const ClientsMenuIcon: SidebarIcon = (props) => <IconUserCheck stroke={2} {...props} />;
const HomeMenuIcon: SidebarIcon = (props) => <IconHomeFilled {...props} />;
const UserMenuIcon: SidebarIcon = (props) => <IconUserFilled {...props} />;
const CartMenuIcon: SidebarIcon = (props) => <IconShoppingCartFilled {...props} />;

export interface NavItem {
  label: string;
  path: string;
  icon: SidebarIcon;
}

export interface NavSection {
  section: string;
  items: NavItem[];
}

export const menuByRole: Record<"admin" | "vendedor" | "cliente", NavSection[]> = {
  admin: [
    {
      section: "Principal",
      items: [
        { label: "Dashboard",  path: "/dashboard",                icon: IconLayoutDashboardFilled },
        { label: "Usuarios",   path: "/dashboard/usuarios",       icon: UsersMenuIcon },
        { label: "Productos",  path: "/dashboard/productos",      icon: ProductsMenuIcon },
      ],
    },
    {
      section: "Análisis",
      items: [
        { label: "Reportes",   path: "/dashboard/reportes",       icon: ReportsMenuIcon },
      ],
    },
    {
      section: "Sistema",
      items: [
        { label: "Configuración", path: "/dashboard/configuracion", icon: SettingsMenuIcon },
      ],
    },
  ],

  vendedor: [
    {
      section: "Principal",
      items: [
        { label: "Dashboard",       path: "/dashboard",                icon: IconLayoutDashboardFilled },
        { label: "Mis Productos",   path: "/dashboard/mis-productos",  icon: ProductsMenuIcon },
        { label: "Pedidos",         path: "/dashboard/pedidos",        icon: OrdersMenuIcon },
      ],
    },
    {
      section: "Gestión",
      items: [
        { label: "Clientes",        path: "/dashboard/clientes",       icon: ClientsMenuIcon },
        { label: "Reportes Ventas", path: "/dashboard/ventas",         icon: ReportsMenuIcon },
      ],
    },
    {
      section: "Cuenta",
      items: [
        { label: "Mi Perfil",       path: "/dashboard/perfil",         icon: UserMenuIcon },
      ],
    },
  ],

  cliente: [
    {
      section: "Inicio",
      items: [
        { label: "Inicio",      path: "/dashboard",              icon: HomeMenuIcon },
        { label: "Mis Pedidos", path: "/dashboard/mis-pedidos",  icon: OrdersMenuIcon },
      ],
    },
    {
      section: "Tienda",
      items: [
        { label: "Carrito",     path: "/dashboard/carrito",      icon: CartMenuIcon },
      ],
    },
    {
      section: "Cuenta",
      items: [
        { label: "Mi Perfil",   path: "/dashboard/perfil",       icon: UserMenuIcon },
      ],
    },
  ],
};

export const getRoleColor = (rol: "admin" | "vendedor" | "cliente"): string => {
  const colors = {
    admin:    "#ef4444",
    vendedor: "#f59e0b",
    cliente:  "#10b981",
  };
  return colors[rol];
};

export const getRoleLabel = (rol: "admin" | "vendedor" | "cliente"): string => {
  const labels = {
    admin:    "Administrador",
    vendedor: "Vendedor",
    cliente:  "Cliente",
  };
  return labels[rol];
};