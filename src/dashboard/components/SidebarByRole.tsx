import { IconBuildingStore,IconMapPins,IconBrandCashapp,IconPresentationAnalyticsFilled , IconClipboardListFilled, IconHomeFilled, IconLayoutDashboardFilled, IconReportAnalyticsFilled, IconSettingsFilled, IconShoppingCartFilled, IconUserCheck, IconUserFilled, IconUsers } from "@tabler/icons-react";
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
const PagosMenuIcon: SidebarIcon = (props) => <IconBrandCashapp stroke={2} {...props} />;
const ResumenMenuIcon: SidebarIcon = (props) => <IconPresentationAnalyticsFilled {...props} />;
const AddressMenuIcon: SidebarIcon = (props) => <IconMapPins stroke={2} {...props} />;

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
        { label: "Dashboard",    path: "/dashboard/admin/resumen",        icon: ResumenMenuIcon },
        { label: "Usuarios",   path: "/dashboard/admin/usuarios",       icon: UsersMenuIcon },
        { label: "Clientes",   path: "/dashboard/admin/clientes",       icon: ClientsMenuIcon },
        { label: "Inventario",  path: "/dashboard/admin/inventario",      icon: ProductsMenuIcon },
        { label: "Pedidos",    path: "/dashboard/admin/pedidos",        icon: OrdersMenuIcon },
        { label: "Pagos",    path: "/dashboard/admin/pagos",        icon: PagosMenuIcon },
      

        
      ],
    },
    {
      section: "Análisis",
      items: [
        { label: "Reportes",   path: "/dashboard/admin/reportes",       icon: ReportsMenuIcon },
      ],
    },
    {
      section: "Sistema",
      items: [
          { label: "Perfil",    path: "/dashboard/admin/perfil",        icon: UserMenuIcon },
        { label: "Configuración", path: "/dashboard/admin/configuracion", icon: SettingsMenuIcon },
      ],
    },
  ],

  vendedor: [
    {
      section: "Principal",
      items: [
        { label: "Dashboard",         path: "/dashboard/vendedor/resumen",        icon: ResumenMenuIcon },
        { label: "Catalogo",      path: "/dashboard/vendedor/catalogo",     icon: ProductsMenuIcon },
        { label: "Pedidos",         path: "/dashboard/vendedor/pedidos",        icon: OrdersMenuIcon },
      ],
    },
    {
      section: "Gestión",
      items: [
        { label: "Clientes",        path: "/dashboard/vendedor/clientes",       icon: ClientsMenuIcon },
        { label: "Pagos",       path: "/dashboard/vendedor/pagos",     icon: PagosMenuIcon },
        { label: "Ventas",       path: "/dashboard/vendedor/ventas",     icon: ReportsMenuIcon },
      ],
    },
    {
      section: "Cuenta",
      items: [
        { label: "Mi Perfil",       path: "/dashboard/vendedor/perfil",         icon: UserMenuIcon },
        { label: "Configuración",   path: "/dashboard/vendedor/configuracion", icon: SettingsMenuIcon },
      ],
    },
  ],

  cliente: [
    {
      section: "Inicio",
      items: [
        {label: "Inicio",     path: "/dashboard/cliente/resumen",      icon: HomeMenuIcon },
        { label: "Mis Pedidos", path: "/dashboard/cliente/mis-pedidos",  icon: OrdersMenuIcon },
        { label: "Mis Pagos",   path: "/dashboard/cliente/pagos",        icon: PagosMenuIcon },
      ],
    },
    {
      section: "Tienda",
      items: [
        
        { label: "Dirección",   path: "/dashboard/cliente/direcciones",    icon: AddressMenuIcon },
        
      ],
    },
    {
      section: "Cuenta",
      items: [
        { label: "Mi Perfil",   path: "/dashboard/cliente/perfil",       icon: UserMenuIcon },
        { label: "Configuración", path: "/dashboard/cliente/configuracion", icon: SettingsMenuIcon },
      ],
    },
  ],
};

export const getRoleColor = (rol: "admin" | "vendedor" | "cliente"): string => {
  const colors = {
    admin:    "#ff0000",
    vendedor: "#aa34b9",
    cliente:  "#12b112",
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