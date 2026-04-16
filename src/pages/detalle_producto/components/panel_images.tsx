import "./style/panel_images.css";
import type { ProductoDetalle } from "../../../service/interfaces/ProductoDetalle";

const API_BASE = "http://localhost:8080";

const resolverImagen = (url: string) => {
  if (!url) return "";

  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }

  return `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
};

interface Props {
  producto: ProductoDetalle;
  imagenPrincipal: string;
  setImagenPrincipal: (url: string) => void;
}

const Panel_Images = ({
  producto,
  imagenPrincipal,
  setImagenPrincipal,
}: Props) => {
  return (
    <div className="detalle-img">
      <img className="detalle-img-main" src={resolverImagen(imagenPrincipal)} alt={producto.nombre} />

      <div className="miniaturas">
        {producto.imagenes.map((img, index) => (
          <img
            key={index}
            src={resolverImagen(img.urlImagen)}
            alt="mini"
            onClick={() => setImagenPrincipal(resolverImagen(img.urlImagen))}
          />
        ))}
      </div>
    </div>
  );
};

export default Panel_Images;
