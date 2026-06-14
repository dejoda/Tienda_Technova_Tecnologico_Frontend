import { useEffect, useState } from "react";
import { ProductoService } from "../../../service/productoService";
import type { ProductoPresentacion } from "../../../service/interfaces/ProductoPresentacion";
import type { Filtros } from "../../../service/interfaces/Filtros";
import defaultImg from "../../../assets/default.jpg";
import { ImageService } from "../../../service/utils/imageService";
import { Link } from "react-router";
import { useCart } from "../../../context/CartContext";
import SinProductos from "../components/sinproductos";
import "./style/mostrarproductos.css";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const service = new ProductoService();

interface Props {
  filtros: Filtros;
  page: number;
  size: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const MostrarProductos = ({ filtros, page, size, setPage }: Props) => {

  // =========================
  // ESTADOS
  // =========================
  const [productos, setProductos] = useState<ProductoPresentacion[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const { addToCart } = useCart();

  // =========================
  // CARGAR PRODUCTOS
  // =========================
  useEffect(() => {

    const cargarProductos = async () => {
      try {
        setLoading(true);
        const data = await service.filtrarProductos(filtros, page, size);
        setProductos(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();

  }, [filtros, page, size]);

  // =========================
  // CARRITO
  // =========================
  const agregarAlCarrito = (producto: ProductoPresentacion) => {
    addToCart({
      id: producto.id,
      name: producto.nombre,
      price: producto.precio,
      image: producto.imagen || (defaultImg as string),
    });
  };

  // =========================
  // RECORTAR TEXTO
  // =========================
  const recortarTexto = (texto?: string, max = 55) => {
    if (!texto) return "";
    return texto.length > max ? texto.slice(0, max) + "..." : texto;
  };
return (

    <section className={`products-section ${!loading && productos.length === 0 ? "products-empty" : ""}`}>

      {/* =========================
          TOTAL PRODUCTOS
         ========================= */}
      <div className="products-topbar"></div>

      {/* =========================
          LOADING
         ========================= */}
      {loading ? (

        <p className="products-loading">Cargando productos...</p>

      ) : productos.length === 0 ? (

        /* =========================
           SIN PRODUCTOS
          ========================= */
        <SinProductos />

      ) : (

        /* =========================
           GRID PRODUCTOS
          ========================= */
        <div className="product-grid">

          {productos.map((p) => {

            const imgUrl = ImageService.resolve(p.imagen ?? undefined) || (defaultImg as string);

            return (
              <Link
                to={`/Productos/detalle_product/${p.id}/${p.nombre}`}
                key={p.id}
                className="product-link"
              >
                <div className="product-card">

                  {/* IMAGEN */}
                  <div
                    className="product-card-img"
                    style={{ backgroundImage: `url(${imgUrl})` }}
                  >
                    <span className="product-brand">{p.marca}</span>
                  </div>

                  {/* CONTENIDO */}
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
            );
          })}

        </div>

      )}

      {/* =========================
          PAGINACIÓN
         ========================= */}
      {!loading && totalPages > 1 && (

        <div className="pagination">

          <button
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <IconChevronLeft stroke={2} /> Anterior
          </button>

          <span>
            Página {page + 1} de {totalPages}
          </span>

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Siguiente <IconChevronRight stroke={2} />
          </button>

        </div>

      )}

    </section>
  );
};

export default MostrarProductos;