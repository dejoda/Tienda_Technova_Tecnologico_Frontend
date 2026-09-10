/**
 * TIPOS PARA LA SECCIÓN DE INVENTARIO (ADMIN)
 * Convención: camelCase para todas las propiedades
 */

// =============================================================================
// PRODUCTOS
// =============================================================================

export interface ImagenProducto {
  id: number;
  url: string;
  ruta: string;
  principal: boolean;
  file?: File; // Agregado para manejar la subida al servidor
}

// =============================================================================
// PRODUCTOS
// =============================================================================
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  marca: string;
  modelo: string;
  garantia: number;
  categoriaId: number; // Corregido de categoria_id
  imagenes: ImagenProducto[];
}

/**
 * Estado del formulario para el modal de producto.
 * Incluye stockInicial, que es requerido solo durante la creación.
 */
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
  categoriaId: number | ""; // Corregido de categoria_id
}

// =============================================================================
// MARCAS
// =============================================================================
export interface Marca {
  idMarca: number;
  nombre: string;
}

// =============================================================================
// CATEGORÍAS
// =============================================================================

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

// =============================================================================
// MOVIMIENTOS DE INVENTARIO
// =============================================================================

export type TipoMovimiento = "entrada" | "salida" | "ajuste";

export interface Movimiento {
  id: number;
  productoId: number; // Corregido de producto_id
  tipo: TipoMovimiento;
  cantidad: number;
  motivo: string;
  usuario: string;
  fecha: string;
  nuevoStock?: number;
}
