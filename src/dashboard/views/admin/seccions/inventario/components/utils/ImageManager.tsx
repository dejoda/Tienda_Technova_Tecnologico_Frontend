import { Star, Trash2, Upload } from "lucide-react";
import { rutaImagen } from "../../utils/data";
import type { ImagenProducto } from "../../../../interfaces/Inventario/types";

interface ImageManagerProps {
  nombreProducto: string;
  imagenes: ImagenProducto[];
  setImagenes: (imagenes: ImagenProducto[]) => void;
  onUpdatePrincipal?: (id: number, isPrincipal: boolean) => Promise<void>;
  onDeleteImagen?: (id: number) => Promise<void>;
}

export default function ImageManager({ nombreProducto, imagenes, setImagenes, onUpdatePrincipal, onDeleteImagen }: ImageManagerProps) {
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

  const marcarPrincipal = async (id: number) => {
    const img = imagenes.find(i => i.id === id);

    const nextImagenes = imagenes.map((im) => ({ ...im, principal: im.id === id }));
    setImagenes(nextImagenes);

    if (onUpdatePrincipal && img) {
      const isBlob = img.url.startsWith("blob:");
      if (!isBlob) {
        try {
          await onUpdatePrincipal(id, true);
        } catch (err) {
          console.error("Error actualizando imagen principal en servidor:", err);
        }
      }
    }
  };

  const eliminar = async (id: number) => {
    const img = imagenes.find(i => i.id === id);

    const restantes = imagenes.filter((im) => im.id !== id);
    if (restantes.length && !restantes.some((im) => im.principal)) restantes[0].principal = true;
    setImagenes(restantes);

    if (onDeleteImagen && img) {
      const isBlob = img.url.startsWith("blob:");
      if (!isBlob) {
        try {
          await onDeleteImagen(id);
        } catch (err) {
          console.error("Error eliminando imagen en servidor:", err);
        }
      }
    }
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
