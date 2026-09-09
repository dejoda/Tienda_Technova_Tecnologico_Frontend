import { Star, Trash2, Upload } from "lucide-react";
import { rutaImagen } from "../../data";
import type { ImagenProducto } from "../../types";

interface ImageManagerProps {
  nombreProducto: string;
  imagenes: ImagenProducto[];
  setImagenes: (imagenes: ImagenProducto[]) => void;
}

export default function ImageManager({ nombreProducto, imagenes, setImagenes }: ImageManagerProps) {
  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const nuevas: ImagenProducto[] = files.map((file, i) => ({
      id: Date.now() + i,
      url: URL.createObjectURL(file),
      ruta: rutaImagen(nombreProducto, imagenes.length + i),
      principal: imagenes.length === 0 && i === 0,
      file: file,
    }));
    setImagenes([...imagenes, ...nuevas]);
    e.target.value = "";
  };

  const marcarPrincipal = (id: number) =>
    setImagenes(imagenes.map((im) => ({ ...im, principal: im.id === id })));

  const eliminar = (id: number) => {
    const restantes = imagenes.filter((im) => im.id !== id);
    if (restantes.length && !restantes.some((im) => im.principal)) restantes[0].principal = true;
    setImagenes(restantes);
  };

  return (
    <div className="field">
      <label>Imágenes del producto</label>
      <div className="img-grid">
        {imagenes.map((im) => (
          <div className={`img-thumb ${im.principal ? "is-principal" : ""}`} key={im.id}>
            <img src={im.url} alt="" />
            <div className="img-thumb-actions">
              <button type="button" title="Marcar como principal" className={`star-btn ${im.principal ? "active" : ""}`} onClick={() => marcarPrincipal(im.id)}>
                <Star size={13} fill={im.principal ? "currentColor" : "none"} />
              </button>
              <button type="button" title="Eliminar imagen" className="del-btn" onClick={() => eliminar(im.id)}>
                <Trash2 size={13} />
              </button>
            </div>
            {im.principal && <span className="principal-tag">Principal</span>}
            <span className="img-path" title={im.ruta}>{im.ruta}</span>
          </div>
        ))}
        <label className="img-upload">
          <Upload size={18} />
          <span>Subir imagen</span>
          <input type="file" accept="image/*" multiple onChange={onFiles} hidden />
        </label>
      </div>
      <p className="hint">Al guardar, cada archivo se sube y se registra en producto_imagen con su ruta (/images/products/{"{slug}"}/...) y si es la principal.</p>
    </div>
  );
}
