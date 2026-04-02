import axios from "axios";
import type { ProductoPresentacion } from "../service/interfaces/ProductoPresentacion";

const URL = "http://localhost:8080/productos";

export class ProductoService {

  async getProductosPresentacion(): Promise<ProductoPresentacion[]> {
    const response = await axios.get(`${URL}/presentacion`);
    return response.data;
  }



  
  async filtrarProductos(filtros: any): Promise<ProductoPresentacion[]> {

  const params: any = {};

  if (filtros.categoria) params.categoria = filtros.categoria;
  if (filtros.marca) params.marca = filtros.marca;
  if (filtros.nombre) params.nombre = filtros.nombre;
  if (filtros.minPrecio) params.minPrecio = Number(filtros.minPrecio);
  if (filtros.maxPrecio) params.maxPrecio = Number(filtros.maxPrecio);

  const response = await axios.get(`${URL}/presentacion`, { params });

  return response.data;
}

async getMarcas(): Promise<string[]> {
  const response = await axios.get(`${URL}/marcas`);
  return response.data;
}

}