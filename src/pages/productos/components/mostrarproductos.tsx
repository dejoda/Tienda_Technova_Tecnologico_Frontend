import { useEffect, useState } from "react";
import { ProductoService } from "../../../service/productoService";
import type { ProductoPresentacion } from "../../../service/interfaces/ProductoPresentacion";
import type { Filtros } from "../../../service/interfaces/Filtros";
import defaultImg from "../../../assets/default.jpg";
import { Link } from "react-router";
import { useCart } from "../../../context/CartContext";
import "./style/mostrarproductos.css";

const service = new ProductoService();

interface Props {
  filtros: Filtros;
}

const MostrarProductos = ({ filtros }: Props) => {
  const [productos, setProductos] = useState<ProductoPresentacion[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await service.filtrarProductos(filtros);
        setProductos(data);
      } catch (error) {
        console.error(error);
      }
    };
    cargarProductos();
  }, [filtros]);

  const agregarAlCarrito = (producto: ProductoPresentacion) => {
    addToCart({
      id: producto.id,
      name: producto.nombre,
      price: producto.precio,
      image: producto.imagen || defaultImg,
    });
  };

  const recortarTexto = (texto?: string, max = 55) => {
    if (!texto) return "";
    return texto.length > max ? texto.slice(0, max) + "..." : texto;
  };

  return (
    <section className="products-section">
      <div className="product-grid">
        {productos.map((p) => (
          <Link
            to={`/Productos/detalle_product/${p.id}/${p.nombre}`}
            key={p.id}
            className="product-link"
          >
            <div className="product-card">

              {/* ── Zona imagen ── */}
              <div
                className="product-card-img"
                style={{ backgroundImage: `url(${p.imagen || defaultImg})` }}
              >
                <span className="product-brand">{p.marca}</span>
              </div>

              {/* ── Zona contenido ── */}
              <div className="product-body">
                <p className="product-category">{p.categoria}</p>
                <h3 className="product-name">{p.nombre}</h3>
                <p className="product-description">
                  {recortarTexto(p.descripcion, 55)}
                </p>

                <div className="product-footer">
                  <span className="price">
                    <em>S/</em> {p.precio}
                  </span>
                  <button
                    className="btn-small"
                    onClick={(e) => {
                      e.preventDefault();
                      agregarAlCarrito(p);
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

export default MostrarProductos;