import type { Filtros } from "../../../service/interfaces/Filtros";
import { useEffect, useState } from "react";
import { CategoriaService } from "../../../service/categoriaService";
import type { Categoria } from "../../../service/interfaces/Categoria";
import { ProductoService } from "../../../service/productoService";
import "./style/fitlrado.css";
import { IconFilter, IconFilterFilled } from "@tabler/icons-react";

interface Props {
  filtros: Filtros;
  setFiltros: React.Dispatch<React.SetStateAction<Filtros>>;
}

const Filtrado = ({ filtros, setFiltros }: Props) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [marcas, setMarcas] = useState<string[]>([]);

  const categoriaService = new CategoriaService();
  const productoService = new ProductoService();

  useEffect(() => {
    categoriaService.getCategorias().then(setCategorias);
    productoService.getMarcas().then(setMarcas);
  }, []);

  const handleNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({ ...filtros, nombre: e.target.value });
  };

  const mostrarTodos = () => {
    setFiltros({ categoria: "", marca: "", minPrecio: "", maxPrecio: "", nombre: "" });
  };

  return (
    <aside className="fc">
      {/* ── Header ── */}
      <div className="fc-header">
        <p className="fc-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2.5">
          <IconFilterFilled />
          </svg>
          Filtros
        </p>
        <button className="fc-clear" onClick={mostrarTodos}>
          Limpiar todo
        </button>
      </div>

      {/* ── Buscar ── */}
      <div className="fc-section">
        <p className="fc-label">Buscar</p>
        <div className="fc-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            name="nombre"
            value={filtros.nombre}
            onChange={handleNombre}
            placeholder="Nombre del producto..."
          />
        </div>
      </div>

      {/* ── Categorías ── */}
      <div className="fc-section">
        <p className="fc-label">Categoría</p>
        <div className="fc-chips">
          <div
            className={`fc-chip ${filtros.categoria === "" ? "active" : ""}`}
            onClick={() => setFiltros({ ...filtros, categoria: "" })}
          >
            Todas
          </div>
          {categorias.map((cat) => (
            <div
              key={cat.idCategoria}
              className={`fc-chip ${filtros.categoria === cat.nombre ? "active" : ""}`}
              onClick={() => setFiltros({ ...filtros, categoria: cat.nombre })}
            >
              {cat.nombre}
            </div>
          ))}
        </div>
      </div>

      {/* ── Marcas ── */}
      <div className="fc-section">
        <p className="fc-label">Marca</p>
        <div className="fc-marcas">
          <div
            className={`fc-marca ${filtros.marca === "" ? "active" : ""}`}
            onClick={() => setFiltros({ ...filtros, marca: "" })}
          >
            <span>Todas</span>
            <div className="fc-marca-dot" />
          </div>
          {marcas.map((marca) => (
            <div
              key={marca}
              className={`fc-marca ${filtros.marca === marca ? "active" : ""}`}
              onClick={() => setFiltros({ ...filtros, marca })}
            >
              <span>{marca}</span>
              <div className="fc-marca-dot" />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filtrado;