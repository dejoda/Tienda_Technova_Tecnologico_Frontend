import { useEffect, useState } from "react";
import type { ProductoPresentacion } from "../../../service/interfaces/ProductoPresentacion";
import { ProductoService } from "../../../service/productoService";

import "./style/destacados.css"

const Destacados = () => {

  const [productos, setProductos] = useState<ProductoPresentacion[]>([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const service = new ProductoService();
        const data = await service.getProductosPresentacion();

        // 👇 SOLO 8 PRODUCTOS
        setProductos(data.sort(() => 0.5 - Math.random()).slice(0, 6));
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    cargarProductos();
  }, []);
  return (
    <section className="products-section">
      <h2>Recomendados para ti</h2>
      <div className="product-grid">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="product-card"
            style={
              producto.imagen
                ? {
                    backgroundImage: `url(${producto.imagen})`,
                  }
                : {}
            }
          >
            <div className="product-overlay">
              <span className="product-brand">{producto.marca}</span>

              <h3>{producto.nombre}</h3>

              <p>{producto.descripcion}</p>

              <div className="product-footer">
                <span className="price">S/ {producto.precio}</span>

                <a href="/Productos" className="btn-small">
                  Ver más
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
 export default Destacados;