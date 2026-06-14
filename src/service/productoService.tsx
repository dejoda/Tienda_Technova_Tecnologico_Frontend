
import axios from "axios";

import type {
  ApiResponse,
  PageResponse
} from "./common/index.model";

import type { ProductoPresentacion } from "./interfaces/ProductoPresentacion";
import type { ProductoDetalle } from "./interfaces/ProductoDetalle";
import { environment } from "../environments/environment.development";

const URL = `${environment.apiBaseUrl}/productos`;

export class ProductoService {

  // =========================
  // LISTAR PRODUCTOS PRESENTACIÓN
  // =========================
  // =========================
// LISTAR PRODUCTOS PRESENTACIÓN
// =========================
async getProductosPresentacion(
  page: number = 0,
  size: number = 10
): Promise<ProductoPresentacion[]> {  // ✅ cambia el tipo de retorno

  const response = await axios.get<
    ApiResponse<PageResponse<ProductoPresentacion>>
  >(`${URL}/presentacion`, {
    params: {
      page,
      size
    }
  });

  return response.data.data.content ?? [];  // ✅ extrae el array
}

  // =========================
  // FILTRAR PRODUCTOS
  // =========================
  async filtrarProductos(
    filtros: any,
    page: number = 0,
    size: number = 10
  ): Promise<PageResponse<ProductoPresentacion>> {

    const params: any = {
      page,
      size
    };

    if (filtros.categoria)
      params.categoria = filtros.categoria;

    if (filtros.marca)
      params.marca = filtros.marca;

    if (filtros.nombre)
      params.nombre = filtros.nombre;

    if (filtros.minPrecio)
      params.minPrecio = Number(filtros.minPrecio);

    if (filtros.maxPrecio)
      params.maxPrecio = Number(filtros.maxPrecio);

    const response = await axios.get<
      ApiResponse<PageResponse<ProductoPresentacion>>
    >(`${URL}/presentacion`, {
      params
    });

    return response.data.data;
  }

  // =========================
  // LISTAR MARCAS
async getMarcas(): Promise<string[]> {

  const response = await axios.get<
    ApiResponse<string[]>  // ✅ array, no PageResponse
  >(`${URL}/marcas`);

  return response.data.data;  // ✅ sin .content
}

  // =========================
  // OBTENER DETALLE PRODUCTO
  // =========================
  async getProductoDetalle(
    id: number
  ): Promise<ProductoDetalle> {

    const response = await axios.get<
      ApiResponse<ProductoDetalle>
    >(`${URL}/${id}/detalle`);

    return response.data.data;
  }

async buscarPorNombre(nombre: string): Promise<ProductoPresentacion[]> {

  const response = await axios.get<
    ApiResponse<PageResponse<ProductoPresentacion>>
  >(`${URL}/presentacion`, {
    params: { nombre, page: 0, size: 5 }
  });

  return response.data.data.content ?? [];
}
}



