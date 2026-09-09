export interface ProductoAdmin {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoriaId: number;
  categoria: string;
  descripcion: string;
  marca: string;
  modelo: string;
  garantia: number;
  imagen: string;
}