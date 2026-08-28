export interface ImagenProducto {
  id: number;
  url: string;
  ruta: string;
  principal: boolean;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  marca: string;
  modelo: string;
  garantia: number;
  categoria_id: number;
  imagenes: ImagenProducto[];
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

export type TipoMovimiento = "entrada" | "salida" | "ajuste";

export interface Movimiento {
  id: number;
  producto_id: number;
  tipo: TipoMovimiento;
  cantidad: number;
  motivo: string;
  usuario: string;
  fecha: string;
  nuevoStock?: number;
}

// Forma del formulario del modal de producto (incluye stockInicial, propio del alta)
export interface ProductoFormState {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number | "";
  stock?: number;
  stockInicial?: number | "";
  marca: string;
  modelo: string;
  garantia: number | "";
  categoria_id: number | "";
}
