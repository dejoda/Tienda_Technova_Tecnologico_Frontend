import "./style/panel_images.css";
import type { ProductoDetalle } from "../../../service/interfaces/ProductoDetalle";
import { ImageService } from "../../../service/utils/imageService";

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
      <img
        className="detalle-img-main"
        src={ImageService.resolve(imagenPrincipal)}
        alt={producto.nombre}
      />

      <div className="miniaturas">
        {producto.imagenes.map((img, index) => (
          <img
            key={index}
            src={ImageService.resolve(img.urlImagen ?? undefined)}
            alt="mini"
            onClick={() => setImagenPrincipal(ImageService.resolve(img.urlImagen ?? undefined))}
          />
        ))}
      </div>
    </div>
  );
};

export default Panel_Images;