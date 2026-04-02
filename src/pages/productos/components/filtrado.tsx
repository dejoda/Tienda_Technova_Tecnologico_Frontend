import type { Filtros } from "../../../service/interfaces/Filtros";

interface Props {
  filtros: Filtros;
  setFiltros: React.Dispatch<React.SetStateAction<Filtros>>;
}

const Filtrado = ({ filtros, setFiltros }: Props) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value,
    });
  };

  const handlePrecioMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({
      ...filtros,
      minPrecio: e.target.value,
    });
  };

  const handlePrecioMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({
      ...filtros,
      maxPrecio: e.target.value,
    });
  };

  const mostrarTodos = () => {
    setFiltros({
      categoria: "",
      marca: "",
      minPrecio: "",
      maxPrecio: "",
      nombre: "",
    });
  };

  return (
  <aside className="filtros-container">
    <h2 className="filtros-titulo">Filtros</h2>

    <div className="filtro-grupo">
      <label>Buscar producto</label>
      <input
        type="text"
        name="nombre"
        placeholder="Ej: Laptop gamer"
        value={filtros.nombre}
        onChange={handleChange}
      />
    </div>

    <div className="filtro-grupo">
      <label>Marca</label>
      <input
        type="text"
        name="marca"
        placeholder="Ej: ASUS, Lenovo"
        value={filtros.marca}
        onChange={handleChange}
      />
    </div>

    <div className="filtro-grupo">
      <label>Categoría</label>
      <select
        name="categoria"
        value={filtros.categoria}
        onChange={handleChange}
      >
        <option value="">Todas</option>
        <option value="Laptops">Laptops</option>
        <option value="Monitores">Monitores</option>
        <option value="Teclados">Teclados</option>
      </select>
    </div>

    <div className="filtro-grupo">
      <label>Rango de precio</label>

      <div className="precio-inputs">
        <span>S/ {filtros.minPrecio || 0}</span>
        <span>S/ {filtros.maxPrecio || 10000}</span>
      </div>

      <input
        type="range"
        min="0"
        max="10000"
        step="50"
        value={filtros.minPrecio || 0}
        onChange={handlePrecioMin}
      />

      <input
        type="range"
        min="0"
        max="10000"
        step="50"
        value={filtros.maxPrecio || 10000}
        onChange={handlePrecioMax}
      />
    </div>

    <button className="btn-limpiar" onClick={mostrarTodos}>
      Limpiar filtros
    </button>
  </aside>
);
};

export default Filtrado;