import axios from "axios";
import type { Categoria } from "./interfaces/Categoria";

const URL = "http://localhost:8080";

export class CategoriaService {

  
async getCategorias(): Promise<Categoria[]> {
  const response = await axios.get(`${URL}/categorias`);
  return response.data;
}

}