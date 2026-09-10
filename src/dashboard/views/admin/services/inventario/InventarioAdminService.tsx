import axios from "axios";
import type {
  ApiResponse,
  PageResponse
} from "../../../../../service/common/index.model";

import type { ProductoAdmin } from "../../interfaces/Inventario/ProductoAdmin";
import type {
  MovimientoInventarioRequest,
  MovimientoInventarioResponse
} from "../../interfaces/Inventario/MovimientoInventario";
import { environment } from "../../../../../environments/environment.development";

const PRODUCTOS_URL = `${environment.apiBaseUrl}/productos`;
const MOVIMIENTOS_URL = `${environment.apiBaseUrl}/movimientos-inventario`;
const IMAGENES_URL = `${environment.apiBaseUrl}/producto-imagenes`;
const MARCAS_URL = `${environment.apiBaseUrl}/marcas`;

export class InventarioAdminService {

  private getAuthHeader() {
    const token = localStorage.getItem("auth_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // =========================
  // LISTAR PRODUCTOS (ADMIN) — con stock real, categoriaId y modelo
  // =========================
  async getProductosAdmin(
    filtros: any = {},
    page: number = 0,
    size: number = 10
  ): Promise<PageResponse<ProductoAdmin>> {

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
      ApiResponse<PageResponse<ProductoAdmin>>
    >(`${PRODUCTOS_URL}/table-admin`, {
      params,
      headers: this.getAuthHeader()
    });

    return response.data.data;
  }

  async getCategoriasAdmin(page: number = 0, size: number = 10): Promise<PageResponse<any>> {
    const response = await axios.get<ApiResponse<PageResponse<any>>>(`${environment.apiBaseUrl}/categorias`, {
      params: { page, size },
      headers: this.getAuthHeader()
    });
    return response.data.data;
  }

  async getMovimientosAdmin(
    filters: {
      page?: number;
      size?: number;
      productoId?: number;
      tipo?: string;
      fechaDesde?: string;
      fechaHasta?: string;
      search?: string;
    } = {}
  ): Promise<PageResponse<MovimientoInventarioResponse>> {
    try {
      // Usamos directamente el endpoint básico para evitar el error 403 del table-admin
      const response = await axios.get<ApiResponse<MovimientoInventarioResponse[]>>(`${MOVIMIENTOS_URL}`, {
        headers: this.getAuthHeader()
      });

      const data = response.data.data ?? [];
      return {
        content: data,
        totalPages: 1,
        totalElements: data.length,
        size: data.length,
        number: 0,
        first: true,
        last: true,
        numberOfElements: data.length,
        empty: data.length === 0
      };
    } catch (error: any) {
      console.error("Error cargando movimientos:", error);
      throw error;
    }
  }

  async createProducto(producto: any): Promise<ProductoAdmin> {
    const { categoria, ...data } = producto;

    const payload = {
      ...data,
      categoria: data.categoriaId ? { idCategoria: data.categoriaId } : null,
    };

    const response = await axios.post<ApiResponse<any>>(`${PRODUCTOS_URL}`, payload, {
      headers: this.getAuthHeader()
    });

    const dataResult = response.data.data;
    return {
      ...dataResult,
      id: dataResult.idProducto || dataResult.id
    };
  }

  async updateProducto(id: number, producto: any): Promise<ProductoAdmin> {
    const { categoria, ...data } = producto;

    const payload = {
      ...data,
      categoria: data.categoriaId ? { idCategoria: data.categoriaId } : null,
    };

    const response = await axios.put<ApiResponse<any>>(`${PRODUCTOS_URL}/${id}`, payload, {
      headers: this.getAuthHeader()
    });

    const dataResult = response.data.data;
    return {
      ...dataResult,
      id: dataResult.idProducto || dataResult.id
    };
  }

  async deleteProducto(id: number): Promise<void> {
    await axios.delete<ApiResponse<void>>(`${PRODUCTOS_URL}/${id}`, {
      headers: this.getAuthHeader()
    });
  }

  // =========================
  // GESTION DE MARCAS
  // =========================
  async getMarcas(): Promise<any[]> {
    try {
      const response = await axios.get<ApiResponse<any>>(`${MARCAS_URL}`, {
        headers: this.getAuthHeader()
      });

      const data = response.data?.data;

      if (data && typeof data === 'object' && 'content' in data) {
        return data.content;
      }

      if (Array.isArray(data)) {
        return data;
      }

      return [];
    } catch (error: any) {
      console.error("Error in getMarcas service:", error);
      if (error.response) {
        console.error("Server error data:", error.response.data);
      }
      throw error;
    }
  }

  async createMarca(nombre: string): Promise<any> {
    const response = await axios.post<ApiResponse<any>>(`${MARCAS_URL}`, { nombre }, {
      headers: this.getAuthHeader()
    });
    return response.data.data;
  }

  // =========================
  // GESTION DE IMAGENES
  // =========================
  async uploadProductoImagen(productoId: number, file: File, isPrincipal: boolean): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productoId", productoId.toString());
    formData.append("isPrincipal", isPrincipal.toString());

    const response = await axios.post<ApiResponse<any>>(`${IMAGENES_URL}/upload`, formData, {
      headers: {
        ...this.getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data;
  }

  async updateImagenPrincipal(imagenId: number, isPrincipal: boolean): Promise<void> {
    await axios.put(`${IMAGENES_URL}/principal/${imagenId}`, null, {
      params: { isPrincipal },
      headers: this.getAuthHeader()
    });
  }

  async deleteProductoImagen(imagenId: number): Promise<void> {
    await axios.delete(`${IMAGENES_URL}/${imagenId}`, {
      headers: this.getAuthHeader()
    });
  }

  // =========================
  // REGISTRAR MOVIMIENTO DE INVENTARIO
  // =========================
  async registrarMovimiento(
    movimiento: MovimientoInventarioRequest
  ): Promise<MovimientoInventarioResponse> {

    const response = await axios.post<
      ApiResponse<MovimientoInventarioResponse>
    >(MOVIMIENTOS_URL, movimiento, {
      headers: this.getAuthHeader()
    });

    return response.data.data;
  }

  // =========================
  // LISTAR TODOS LOS MOVIMIENTOS
  // =========================
  async getMovimientos(): Promise<MovimientoInventarioResponse[]> {

    const response = await axios.get<
      ApiResponse<MovimientoInventarioResponse[]>
    >(MOVIMIENTOS_URL, {
      headers: this.getAuthHeader()
    });

    return response.data.data ?? [];
  }

  // =========================
  // LISTAR MOVIMIENTOS DE UN PRODUCTO
  // =========================
  async getMovimientosPorProducto(
    productoId: number
  ): Promise<MovimientoInventarioResponse[]> {

    const response = await axios.get<
      ApiResponse<MovimientoInventarioResponse[]>
    >(`${MOVIMIENTOS_URL}/producto/${productoId}`, {
      headers: this.getAuthHeader()
    });

    return response.data.data ?? [];
  }
}
