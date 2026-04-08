import { useEffect, useState } from "react";
import type { ProductoPresentacion } from "../../../service/interfaces/ProductoPresentacion";
import { ProductoService } from "../../../service/productoService";
import { Link } from "react-router";
import { useCart } from "../../../context/CartContext";

import "./style/destacados.css";

const Destacados = () => {
  const [productos, setProductos] = useState<ProductoPresentacion[]>([]);
  const { addToCart } = useCart();
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const service = new ProductoService();
        const data = await service.getProductosPresentacion();

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
          <Link
            key={producto.id}
            to={`/Productos/detalle_product/${producto.id}/${producto.nombre}`}
            style={{ textDecoration: "none" }}
          >
            <div
              className="product-card"
              style={
                producto.imagen
                  ? { backgroundImage: `url(${producto.imagen})` }
                  : {}
              }
            >
              <div className="product-overlay">
                <span className="product-brand">{producto.marca}</span>

                <h3>{producto.nombre}</h3>

                <p>{producto.descripcion}</p>

                <div className="product-footer">
                  <span className="price">S/ {producto.precio}</span>

                  {/* 🔥 botón visual (no navegación aparte) */}
                  <button
                    className="btn-small"
                    onClick={(e) => {
                      e.preventDefault(); // 🚫 evita ir al detalle

                      addToCart({
                        id: producto.id,
                        name: producto.nombre,
                        price: producto.precio,
                        image: producto.imagen || "",
                      });
                    }}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Destacados;
