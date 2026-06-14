
import { useEffect, useState } from "react";
import Filtrado from "./components/filtrado";
import MostrarProductos from "./components/mostrarproductos";
import type { Filtros } from "../../service/interfaces/Filtros";
import "./productos.css";

import { useSearchParams } from "react-router";

const Productos = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  // =========================
  // FILTROS
  // =========================
  const [filtros, setFiltros] = useState<Filtros>({
    categoria: "",
    marca: "",
    minPrecio: "",
    maxPrecio: "",
    nombre: "",
  });

  // =========================
  // PAGINACIÓN
  // =========================
  const [page, setPage] = useState<number>(0);

  const [size] = useState<number>(12);

  // =========================
  // CONTROL
  // =========================
  const [ready, setReady] = useState(false);

  // ==================================================
  // 1. LEER URL → ESTADO
  // ==================================================
  useEffect(() => {

    const categoriaURL = searchParams.get("categoria") || "";
    const marcaURL = searchParams.get("marca") || "";
    const nombreURL = searchParams.get("nombre") || "";
    const minPrecioURL = searchParams.get("minPrecio") || "";
    const maxPrecioURL = searchParams.get("maxPrecio") || "";

    const pageURL = Number(searchParams.get("page")) || 0;

    setPage(pageURL);

    setFiltros((prev) => {

      const nuevosFiltros = {
        categoria: categoriaURL,
        marca: marcaURL,
        nombre: nombreURL,
        minPrecio: minPrecioURL,
        maxPrecio: maxPrecioURL,
      };

      // Evita renders innecesarios
      if (
        JSON.stringify(prev) ===
        JSON.stringify(nuevosFiltros)
      ) {
        return prev;
      }

      return nuevosFiltros;
    });

    setReady(true);

  }, [searchParams]);

  // ==================================================
  // 2. ESTADO → URL
  // ==================================================
  useEffect(() => {

    if (!ready) return;

    const params: any = {};

    // FILTROS
    if (filtros.categoria)
      params.categoria = filtros.categoria;

    if (filtros.marca)
      params.marca = filtros.marca;

    if (filtros.nombre)
      params.nombre = filtros.nombre;

    if (filtros.minPrecio)
      params.minPrecio = filtros.minPrecio;

    if (filtros.maxPrecio)
      params.maxPrecio = filtros.maxPrecio;

    // PAGINACIÓN
    params.page = page;

    setSearchParams(params);

  }, [filtros, page, ready]);

  // ==================================================
  // RESET PAGINACIÓN CUANDO CAMBIAN FILTROS
  // ==================================================
  useEffect(() => {

    setPage(0);

  }, [
    filtros.categoria,
    filtros.marca,
    filtros.nombre,
    filtros.minPrecio,
    filtros.maxPrecio
  ]);

  return (
    <div className="pagina-productos">

      <div className="productos-layout">

        <Filtrado
          filtros={filtros}
          setFiltros={setFiltros}
        />

        {ready && (

          <MostrarProductos
            filtros={filtros}
            page={page}
            size={size}
            setPage={setPage}
          />

        )}

      </div>

    </div>
  );
};

export default Productos;

