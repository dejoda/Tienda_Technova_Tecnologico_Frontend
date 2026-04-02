import axios from "axios";
import type { Categoria } from "./interfaces/Categoria";
import type { Marca } from "./interfaces/Marca";

const URL = "http://localhost:8080";

export class CategoriaService {

  
async getCategorias(): Promise<Categoria[]> {
  const response = await axios.get(`${URL}/categorias`);
  return response.data;
}

async getMarcas(): Promise<Marca[]> {
  const response = await axios.get(`${URL}/marcas`);
  return response.data;
}
 


}