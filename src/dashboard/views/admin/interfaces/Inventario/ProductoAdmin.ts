export interface ProductoAdmin {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoriaId: number;
  categoria: string;
  descripcion: string;
  marcaId?: number;
  marca: string;
  modelo: string;
  garantia: number;
  imagen: string;
}