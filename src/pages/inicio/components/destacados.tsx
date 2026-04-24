import { useEffect, useState } from "react";
import type { ProductoPresentacion } from "../../../service/interfaces/ProductoPresentacion";
import { ProductoService } from "../../../service/productoService";
import { Link } from "react-router";
import { useCart } from "../../../context/CartContext";
import defaultImg from "../../../assets/default.jpg";

import "../../productos/components/style/mostrarproductos.css";
import "./style/destacados.css";

const Destacados = () => {
  const [productos, setProductos] = useState<ProductoPresentacion[]>([]);
  const { addToCart } = useCart();

  const recortarTexto = (texto?: string, max = 55) => {
    if (!texto) return "";
    return texto.length > max ? texto.slice(0, max) + "..." : texto;
  };

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const service = new ProductoService();
        const data = await service.getProductosPresentacion();

        setProductos(data.sort(() => 0.5 - Math.random()).slice(0, 8));
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    cargarProductos();
  }, []);

  return (
    <section className="products-section destacados-section">
      <h2>Recomendados para ti</h2>

      <div className="product-grid">
        {productos.map((producto) => (
          <Link
            key={producto.id}
            to={`/Productos/detalle_product/${producto.id}/${producto.nombre}`}
            className="product-link"
          >
            <div className="product-card">
              <div
                className="product-card-img"
                style={{ backgroundImage: `url(${producto.imagen || defaultImg})` }}
              >
                <span className="product-brand">{producto.marca}</span>
              </div>

              <div className="product-body">
                <p className="product-category">{producto.categoria}</p>
                <h3 className="product-name">{producto.nombre}</h3>
                <p className="product-description">
                  {recortarTexto(producto.descripcion, 55)}
                </p>

                <div className="product-footer">
                  <span className="price">
                    <em>S/</em> {producto.precio}
                  </span>

                  <button
                    className="btn-small"
                    onClick={(e) => {
                      e.preventDefault();

                      addToCart({
                        id: producto.id,
                        name: producto.nombre,
                        price: producto.precio,
                        image: producto.imagen || defaultImg,
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
