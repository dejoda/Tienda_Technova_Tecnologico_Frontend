import axios from "axios";
import type { ApiResponse, PageResponse } from "./common/index.model";
import type { Categoria } from "./interfaces/Categoria";
import { environment } from "../environments/environment.development";

const URL = `${environment.apiBaseUrl}`;

export class CategoriaService {

  async getCategorias(page = 0, size = 8): Promise<PageResponse<Categoria>> {

    const response = await axios.get<ApiResponse<PageResponse<Categoria>>>(
      `${URL}/categorias?page=${page}&size=${size}`
    );

    return response.data.data;
  }
}