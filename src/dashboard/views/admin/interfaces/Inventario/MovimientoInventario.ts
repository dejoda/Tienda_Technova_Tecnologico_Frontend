export type TipoMovimiento = "entrada" | "salida" | "ajuste";

export interface MovimientoInventarioRequest {
  productoId: number;
  usuarioId: number;
  tipo: TipoMovimiento;
  cantidad: number;
  motivo: string;
}

export interface MovimientoInventarioResponse {
  idMovimiento: any;
  id: number;
  productoId: number;
  productoNombre: string;
  usuarioNombre: string;
  tipo: TipoMovimiento;
  cantidad: number;
  stockResultante: number;
  motivo: string;
  fecha: string;
}