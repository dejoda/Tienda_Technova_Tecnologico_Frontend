import { useEffect, useState } from "react";
import Filtrado from "./components/filtrado";
import MostrarProductos from "./components/mostrarproductos";
import type { Filtros } from "../../service/interfaces/Filtros";
import "./productos.css";
import { useSearchParams } from "react-router";

const Productos = () => {
  const [searchParams] = useSearchParams();

  const [filtros, setFiltros] = useState<Filtros>({
    categoria: "",
    marca: "",
    minPrecio: "",
    maxPrecio: "",
    nombre: "",
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const categoriaURL = searchParams.get("categoria");

    setFiltros((prev) => ({
      ...prev,
      categoria: categoriaURL || "",
    }));

    setReady(true);
  }, [searchParams]);

  return (
    <div className="pagina-productos">
      <div className="productos-layout">
        <Filtrado filtros={filtros} setFiltros={setFiltros} />

        {ready && <MostrarProductos filtros={filtros} />}
      </div>
    </div>
  );
};

export default Productos;
