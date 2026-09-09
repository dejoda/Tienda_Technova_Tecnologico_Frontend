import axios from "axios";
import type { ApiResponse, PageResponse } from "./common/index.model";
import type { Categoria } from "./interfaces/Categoria";
import { environment } from "../environments/environment.development";

const URL = `${environment.apiBaseUrl}`;

// Helper para adaptar el modelo del backend (idCategoria) al del frontend (id)
const adaptCategoria = (cat: any): Categoria => ({
  id: Number(cat.idCategoria ?? cat.id),
  nombre: cat.nombre,
  descripcion: cat.descripcion
});

export class CategoriaService {

  async getCategorias(page = 0, size = 8): Promise<PageResponse<Categoria>> {
    const response = await axios.get<ApiResponse<PageResponse<any>>>(
      `${URL}/categorias?page=${page}&size=${size}`
    );

    return {
      ...response.data.data,
      content: response.data.data.content.map(adaptCategoria)
    };
  }

  async createCategoria(categoria: Categoria): Promise<Categoria> {
    // Convertimos de id -> idCategoria para el backend
    const payload = {
      idCategoria: categoria.id,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    };
    const response = await axios.post<ApiResponse<any>>(`${URL}/categorias`, payload);
    return adaptCategoria(response.data.data);
  }

  async updateCategoria(id: number, categoria: Categoria): Promise<Categoria> {
    const payload = {
      idCategoria: id,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    };
    const response = await axios.put<ApiResponse<any>>(`${URL}/categorias/${id}`, payload);
    return adaptCategoria(response.data.data);
  }

  async deleteCategoria(id: number): Promise<void> {
    await axios.delete<ApiResponse<void>>(`${URL}/categorias/${id}`);
  }
}
