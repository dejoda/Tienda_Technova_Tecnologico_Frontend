import type { Filtros } from "../../../service/interfaces/Filtros";
import { useEffect, useState } from "react";
import { CategoriaService } from "../../../service/categoriaService";
import type { Categoria } from "../../../service/interfaces/Categoria";
import { ProductoService } from "../../../service/productoService";

import "./style/fitlrado.css";
interface Props {
  filtros: Filtros;
  setFiltros: React.Dispatch<React.SetStateAction<Filtros>>;
}

const Filtrado = ({ filtros, setFiltros }: Props) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const service = new CategoriaService();

  const [marcas, setMarcas] = useState<string[]>([]);
  const productoService = new ProductoService();

  useEffect(() => {
    service.getCategorias().then(setCategorias);
    productoService.getMarcas().then(setMarcas);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value,
    });
  };

  const mostrarTodos = () => {
    setFiltros({
      categoria: "",
      marca: "",
      minPrecio: "", //no puestos por ahora
      maxPrecio: "", //no puestos por ahora
      nombre: "",
    });
  };

  return (
    <aside className="filtros-container">
      <h2 className="filtros-titulo">Filtros</h2>

      <div className="filtro-grupo">
        <span className="titulo-seccion">Buscar producto</span>
        <input
          type="text"
          name="nombre"
          value={filtros.nombre}
          onChange={handleChange}
        />
      </div>
      <div className="filtro-grupo">
        <span className="titulo-seccion">Categorías</span>

        <div className="lista-categorias">
          <div
            className={`categoria-item ${filtros.categoria === "" ? "activa" : ""}`}
            onClick={() =>
              setFiltros({
                ...filtros,
                categoria: "",
              })
            }
          >
            Todas
          </div>
          {categorias.map((cat) => (
            <div
              key={cat.idCategoria}
              className={`categoria-item ${
                filtros.categoria === cat.nombre ? "activa" : ""
              }`}
              onClick={() =>
                setFiltros({
                  ...filtros,
                  categoria: cat.nombre,
                })
              }
            >
              {cat.nombre}
            </div>
          ))}
        </div>
      </div>
     <div className="filtro-grupo">
  <span className="titulo-seccion">Marcas</span>

  <div className="lista-marcas">
    <div
      className={`categoria-item ${filtros.marca === "" ? "activa" : ""}`}
      onClick={() =>
        setFiltros({
          ...filtros,
          marca: "",
        })
      }
    >
      Todas
    </div>

    {marcas.map((marca) => (
      <div
        key={marca}
        className={`categoria-item ${
          filtros.marca === marca ? "activa" : ""
        }`}
        onClick={() =>
          setFiltros({
            ...filtros,
            marca,
          })
        }
      >
        {marca}
      </div>
    ))}
  </div>
</div>

      <button className="btn-limpiar" onClick={mostrarTodos}>
        Limpiar filtros
      </button>
    </aside>
  );
};

export default Filtrado;
