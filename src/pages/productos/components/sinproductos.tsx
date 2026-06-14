import { IconSearchFilled } from "@tabler/icons-react";
import "../components/style/sinproductos.css";

const SinProductos = () => {
  return (
    <div className="sin-productos">

      <div className="sin-productos-icon-wrapper">
        <IconSearchFilled size={36} />
      </div>

      <div className="sin-productos-text">
        <h3 className="sin-productos-title">No se encontraron productos</h3>
        <p className="sin-productos-desc">Intenta con otros filtros o términos de búsqueda</p>
      </div>

      <div className="sin-productos-tags">
        <span>Cambia la categoría</span>
        <span>Prueba otra marca</span>
        <span>Limpia los filtros</span>
      </div>

    </div>
  );
};

export default SinProductos;