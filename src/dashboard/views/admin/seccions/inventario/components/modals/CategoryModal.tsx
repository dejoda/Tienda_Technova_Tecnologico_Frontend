import { useState } from "react";
import { X } from "lucide-react";
import type { Categoria } from "../../../../interfaces/Inventario/types";

interface CategoryModalProps {
  categoria: Categoria | null;
  onClose: () => void;
  onSave: (categoria: Categoria) => void;
}

export default function CategoryModal({ categoria, onClose, onSave }: CategoryModalProps) {
  const isEdit = !!categoria;
  const [form, setForm] = useState({ nombre: categoria?.nombre ?? "", descripcion: categoria?.descripcion ?? "" });
  const [error, setError] = useState("");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{isEdit ? "Editar categoría" : "Nueva categoría"}</h3>
          <button className="icon-btn" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">
          <div className="field">
            <label>Nombre</label>
            <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Ej. Laptops" />
          </div>
          <div className="field">
            <label>Descripción</label>
            <textarea rows={2} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
          </div>
          {error && <p className="error-text">{error}</p>}
        </div>
        <div className="modal-foot">
          <button className="btn-ghost" onClick={onClose}>Cancelar</button>
          <button
            className="btn-primary"
            onClick={() => {
              if (!form.nombre.trim()) {
                setError("Ponle un nombre a la categoría.");
                return;
              }
              // Aseguramos que el ID no sea undefined para evitar el error 403/400 en el servidor
              const categoryId = isEdit ? (categoria?.id ?? Date.now()) : Date.now();
              onSave({ ...form, id: categoryId });
            }}
          >
            {isEdit ? "Guardar" : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
}
