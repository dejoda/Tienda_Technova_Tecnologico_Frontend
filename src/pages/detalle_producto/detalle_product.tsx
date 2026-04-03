import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProductoService } from "../../service/productoService";
import type { ProductoDetalle } from "../../service/interfaces/ProductoDetalle";


import "./detalle_product.css";
import { IconAlignJustified, IconShieldCheckFilled } from "@tabler/icons-react";

const Detalle_product = () => {
  const { id } = useParams<{ id: string }>();

  const [producto, setProducto] = useState<ProductoDetalle | null>(null);
  const [imagenPrincipal, setImagenPrincipal] = useState<string>("");
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const service = new ProductoService();
        const data = await service.getProductoDetalle(Number(id));

        setProducto(data);

        const imgPrincipal =
          data.imagenes.find((img) => img.principal)?.urlImagen ||
          data.imagenes[0]?.urlImagen;

        setImagenPrincipal(imgPrincipal);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (id) cargarProducto();
  }, [id]);

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="detalle-container">
      
      {/* IZQUIERDA */}
      <div className="detalle-img">
        <img src={imagenPrincipal} alt={producto.nombre} />

        <div className="miniaturas">
          {producto.imagenes.map((img, index) => (
            <img
              key={index}
              src={img.urlImagen}
              alt="mini"
              onClick={() => setImagenPrincipal(img.urlImagen)}
            />
          ))}
        </div>
      </div>

      {/* DERECHA */}
      <div className="detalle-info">
        
        {/* NOMBRE */}
        <h1>{producto.nombre}</h1>

        {/* ⭐ VALORACIÓN */}
        <div className="rating">
          ⭐⭐⭐⭐☆ <span>(4.0)</span>
        </div>

        {/* MARCA */}
        <p className="marca">
          {producto.marca} - {producto.modelo}
        </p>

        {/* DESCRIPCIÓN */}
        <p className="descripcion">{producto.descripcion}</p>

        {/* GARANTÍA */}
        <p className="garantia">
          <IconShieldCheckFilled /> Garantía: {producto.garantia} meses
        </p>

        {/* CARACTERÍSTICAS */}
        <div className="caracteristicas">
          <h3><IconAlignJustified stroke={2} />Características</h3>
          <ul>
            {producto.caracteristicas.map((c, index) => (
              <li key={index}>
                <strong>{c.nombre}</strong>
                <span>{c.valor}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* COMPRA */}
        <div className="compra-box">

          <span className="precio">S/ {producto.precio}</span>

          <div className="acciones">
            {/* CANTIDAD */}
            <div className="cantidad">
              <button onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</button>
              <span>{cantidad}</span>
              <button onClick={() => setCantidad(cantidad + 1)}>+</button>
            </div>

            {/* BOTÓN */}
            <button className="btn-comprar">
              Agregar al carrito 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle_product;