import { useState } from "react";
import { X } from "lucide-react";
import ImageManager from "../utils/ImageManager";
import type { Categoria, ImagenProducto, Producto, ProductoFormState } from "../../types";

interface ProductModalProps {
  producto: Producto | null;
  categorias: Categoria[];
  onClose: () => void;
  onSave: (producto: Producto) => void;
}

export default function ProductModal({ producto, categorias, onClose, onSave }: ProductModalProps) {
  const isEdit = !!producto;
  const [form, setForm] = useState<ProductoFormState>(
    producto || { nombre: "", descripcion: "", precio: "", stockInicial: "", marca: "", modelo: "", garantia: "", categoria_id: categorias[0]?.id || "" }
  );
  const [imagenes, setImagenes] = useState<ImagenProducto[]>(producto?.imagenes || []);
  const [error, setError] = useState("");

  const set = <K extends keyof ProductoFormState>(k: K, v: ProductoFormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.nombre.trim() || form.precio === "" || (!isEdit && form.stockInicial === "") || !form.categoria_id) {
      setError("Completa nombre, precio, stock inicial y categoría.");
      return;
    }
    if (imagenes.length === 0) {
      setError("Sube al menos una imagen del producto.");
      return;
    }
    onSave({
      ...form,
      id: isEdit ? (form.id as number) : Date.now(),
      precio: Number(form.precio),
      stock: isEdit ? (form.stock as number) : Number(form.stockInicial),
      garantia: Number(form.garantia) || 0,
      categoria_id: Number(form.categoria_id),
      imagenes,
    } as Producto);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{isEdit ? "Editar producto" : "Nuevo producto"}</h3>
          <button className="icon-btn" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal-body">
          <div className="field-row">
            <div className="field" style={{ flex: 2 }}>
              <label>Nombre</label>
              <input value={form.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Ej. Laptop ASUS TUF F15" />
            </div>
            <div className="field">
              <label>Categoría</label>
              <select value={form.categoria_id} onChange={(e) => set("categoria_id", Number(e.target.value))}>
                {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </div>
          </div>

          <div className="field">
            <label>Descripción</label>
            <textarea rows={2} value={form.descripcion} onChange={(e) => set("descripcion", e.target.value)} placeholder="Descripción breve del producto" />
          </div>

          <div className="field-row">
            <div className="field"><label>Precio (S/)</label><input type="number" value={form.precio} onChange={(e) => set("precio", e.target.value === "" ? "" : Number(e.target.value))} /></div>
            {isEdit ? (
              <div className="field">
                <label>Stock actual</label>
                <input value={form.stock} disabled />
              </div>
            ) : (
              <div className="field"><label>Stock inicial</label><input type="number" value={form.stockInicial} onChange={(e) => set("stockInicial", e.target.value === "" ? "" : Number(e.target.value))} /></div>
            )}
            <div className="field"><label>Garantía (meses)</label><input type="number" value={form.garantia} onChange={(e) => set("garantia", e.target.value === "" ? "" : Number(e.target.value))} /></div>
          </div>
          {isEdit && <p className="hint" style={{ marginTop: -6 }}>El stock ya no se edita aquí — usa "Registrar movimiento" para que quede el historial.</p>}

          <div className="field-row">
            <div className="field"><label>Marca</label><input value={form.marca} onChange={(e) => set("marca", e.target.value)} /></div>
            <div className="field"><label>Modelo</label><input value={form.modelo} onChange={(e) => set("modelo", e.target.value)} /></div>
          </div>

          <ImageManager nombreProducto={form.nombre} imagenes={imagenes} setImagenes={setImagenes} />

          {error && <p className="error-text">{error}</p>}
        </div>

        <div className="modal-foot">
          <button className="btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={submit}>{isEdit ? "Guardar cambios" : "Crear producto"}</button>
        </div>
      </div>
    </div>
  );
}
