import { ArrowDownCircle, ArrowUpCircle, SlidersHorizontal } from "lucide-react";
import type { Categoria, Movimiento, Producto, TipoMovimiento } from "./types";

export const STOCK_BAJO = 5;

export const initialCategorias: Categoria[] = [
  { id: 1, nombre: "Laptops", descripcion: "Computadoras portátiles" },
  { id: 2, nombre: "Periféricos", descripcion: "Mouse, teclados, audífonos" },
  { id: 3, nombre: "Monitores", descripcion: "Pantallas y monitores" },
  { id: 4, nombre: "Almacenamiento", descripcion: "SSD, discos duros, USB" },
];

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const rutaImagen = (nombreProducto: string, index: number) => {
  const slug = slugify(nombreProducto || "producto");
  return `/images/products/${slug}/${slug}-${index + 1}.jpg`;
};

export const initialProductos: Producto[] = [
  {
    id: 1, nombre: "Laptop ASUS TUF F15", descripcion: "Laptop gamer, RTX, 16GB RAM", precio: 3899, stock: 12,
    marca: "ASUS", modelo: "TUF F15", garantia: 12, categoria_id: 1,
    imagenes: [
      { id: 1, url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300", ruta: "/images/products/asus-tuf-f15/asus-tuf-f15-1.jpg", principal: true },
      { id: 2, url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300", ruta: "/images/products/asus-tuf-f15/asus-tuf-f15-2.jpg", principal: false },
    ],
  },
  {
    id: 2, nombre: "Laptop Lenovo IdeaPad 3", descripcion: "Laptop para oficina y estudio", precio: 2299, stock: 5,
    marca: "Lenovo", modelo: "IdeaPad 3", garantia: 12, categoria_id: 1,
    imagenes: [
      { id: 3, url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300", ruta: "/images/products/lenovo-ideapad-3/lenovo-ideapad-3-1.jpg", principal: true },
      { id: 4, url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300", ruta: "/images/products/lenovo-ideapad-3/lenovo-ideapad-3-2.jpg", principal: false },
    ],
  },
  {
    id: 3, nombre: "Mouse Logitech G502", descripcion: "Mouse gamer, sensor HERO 25K", precio: 189, stock: 3,
    marca: "Logitech", modelo: "G502", garantia: 6, categoria_id: 2,
    imagenes: [
      { id: 5, url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300", ruta: "/images/products/logitech-g502/logitech-g502-1.jpg", principal: true },
      { id: 6, url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300", ruta: "/images/products/logitech-g502/logitech-g502-2.jpg", principal: false },
    ],
  },
  {
    id: 4, nombre: "Teclado Mecánico RGB", descripcion: "Switches rojos, retroiluminado", precio: 249, stock: 0,
    marca: "NovaTech", modelo: "KM80", garantia: 12, categoria_id: 2,
    imagenes: [
      { id: 7, url: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300", ruta: "/images/products/teclado-mecanico-rgb/teclado-mecanico-rgb-1.jpg", principal: true },
    ],
  },
  {
    id: 5, nombre: "Monitor Curvo 27''", descripcion: "144Hz, QHD, panel VA", precio: 1199, stock: 8,
    marca: "VisionPlus", modelo: "C27Q", garantia: 24, categoria_id: 3,
    imagenes: [
      { id: 8, url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300", ruta: "/images/products/monitor-curvo-27/monitor-curvo-27-1.jpg", principal: true },
    ],
  },
  {
    id: 6, nombre: "SSD NVMe 1TB", descripcion: "Lectura 3500MB/s", precio: 329, stock: 2,
    marca: "DataCore", modelo: "N1000", garantia: 60, categoria_id: 4,
    imagenes: [
      { id: 9, url: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300", ruta: "/images/products/ssd-nvme-1tb/ssd-nvme-1tb-1.jpg", principal: true },
    ],
  },
];

export const initialMovimientos: Movimiento[] = [
  { id: 1, producto_id: 1, tipo: "entrada", cantidad: 15, motivo: "Carga inicial", usuario: "admin", fecha: "2026-08-01T09:12:00" },
  { id: 2, producto_id: 1, tipo: "salida", cantidad: 3, motivo: "Venta", usuario: "admin", fecha: "2026-08-15T14:40:00" },
  { id: 3, producto_id: 3, tipo: "entrada", cantidad: 10, motivo: "Compra a proveedor", usuario: "admin", fecha: "2026-08-05T11:00:00" },
  { id: 4, producto_id: 3, tipo: "salida", cantidad: 7, motivo: "Venta", usuario: "admin", fecha: "2026-08-20T16:22:00" },
  { id: 5, producto_id: 4, tipo: "salida", cantidad: 1, motivo: "Merma - unidad dañada", usuario: "admin", fecha: "2026-08-22T10:05:00" },
];

export const soles = (n: number) => `S/ ${Number(n).toLocaleString("es-PE", { minimumFractionDigits: 2 })}`;

export const principalDe = (p: Producto) => p.imagenes?.find((i) => i.principal)?.url || p.imagenes?.[0]?.url;

export const fechaCorta = (iso: string) =>
  new Date(iso).toLocaleString("es-PE", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

export const TIPO_INFO: Record<TipoMovimiento, { label: string; cls: string; icon: typeof ArrowUpCircle }> = {
  entrada: { label: "Entrada", cls: "tipo-entrada", icon: ArrowUpCircle },
  salida: { label: "Salida", cls: "tipo-salida", icon: ArrowDownCircle },
  ajuste: { label: "Ajuste", cls: "tipo-ajuste", icon: SlidersHorizontal },
};
