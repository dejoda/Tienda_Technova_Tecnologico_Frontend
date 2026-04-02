import { useState } from "react";
import Filtrado from "./components/filtrado";
import MostrarProductos from "./components/mostrarproductos";
import type { Filtros } from "../../service/interfaces/Filtros";
import "./productos.css";

const Productos = () => {
  const [filtros, setFiltros] = useState<Filtros>({
    categoria: "",
    marca: "",
    minPrecio: "",
    maxPrecio: "",
    nombre: "",
  });

  return (
    <div className="pagina-productos">
      <div className="productos-layout">
        <Filtrado filtros={filtros} setFiltros={setFiltros} />
        <MostrarProductos filtros={filtros} />
      </div>
    </div>
  );
};

export default Productos;