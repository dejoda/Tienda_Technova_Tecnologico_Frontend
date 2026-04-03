import { useEffect, useState } from "react";
import Filtrado from "./components/filtrado";
import MostrarProductos from "./components/mostrarproductos";
import type { Filtros } from "../../service/interfaces/Filtros";
import "./productos.css";
import { useSearchParams } from "react-router";

const Productos = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filtros, setFiltros] = useState<Filtros>({
    categoria: "",
    marca: "",
    minPrecio: "",
    maxPrecio: "",
    nombre: "",
  });

  const [ready, setReady] = useState(false);

  // 1. Leer URL → estado
  useEffect(() => {
    const categoriaURL = searchParams.get("categoria") || "";
    const marcaURL = searchParams.get("marca") || "";
    const nombreURL = searchParams.get("nombre") || "";
    const minPrecioURL = searchParams.get("minPrecio") || "";
    const maxPrecioURL = searchParams.get("maxPrecio") || "";

    setFiltros((prev) => {
      const nuevosFiltros = {
        categoria: categoriaURL,
        marca: marcaURL,
        nombre: nombreURL,
        minPrecio: minPrecioURL,
        maxPrecio: maxPrecioURL,
      };

      // evita renders innecesarios / loops
      if (JSON.stringify(prev) === JSON.stringify(nuevosFiltros)) {
        return prev;
      }

      return nuevosFiltros;
    });

    setReady(true);
  }, [searchParams]);

  //  2. Estado → URL
  useEffect(() => {
    if (!ready) return; // evita que se ejecute antes de tiempo

    const params: any = {};

    if (filtros.categoria) params.categoria = filtros.categoria;
    if (filtros.marca) params.marca = filtros.marca;
    if (filtros.nombre) params.nombre = filtros.nombre;
    if (filtros.minPrecio) params.minPrecio = filtros.minPrecio;
    if (filtros.maxPrecio) params.maxPrecio = filtros.maxPrecio;

    setSearchParams(params);
  }, [filtros, ready]);

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