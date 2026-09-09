import { type Dispatch, type SetStateAction } from "react";
import { Pencil, Plus, Tag, Trash2 } from "lucide-react";
import type { Categoria, Producto } from "../types";
import CategoryModal from "./modals/CategoryModal";

type CategoriasTabProps = {
  categorias: Categoria[];
  productos: Producto[];
  editingCategory: Categoria | null;
  showCategoryModal: boolean;
  setEditingCategory: Dispatch<SetStateAction<Categoria | null>>;
  setShowCategoryModal: Dispatch<SetStateAction<boolean>>;
  saveCategory: (c: Categoria) => void;
  deleteCategory: (id: number) => void;
};

export default function CategoriasTab({
  categorias,
  productos,
  editingCategory,
  showCategoryModal,
  setEditingCategory,
  setShowCategoryModal,
  saveCategory,
  deleteCategory,
}: CategoriasTabProps) {
  return (
    <>
      <div className="toolbar">
        <div style={{ flex: 1 }} />
        <button
          className="btn-primary"
          onClick={() => {
            setEditingCategory(null);
            setShowCategoryModal(true);
          }}
        >
          <Plus size={15} /> Nueva categoría
        </button>
      </div>

      <div className="cat-grid">
        {categorias.map((c) => {
          const n = productos.filter((p) => p.categoriaId === c.id).length;
          return (
            <div className="cat-card" key={c.id}>
              <h4>
                <Tag size={14} color="#b45cf0" /> {c.nombre}
              </h4>
              <p>{c.descripcion || "Sin descripción."}</p>
              <div className="cat-foot">
                <span className="count-tag">
                  {n} producto{n !== 1 ? "s" : ""}
                </span>
                <div className="row-actions">
                  <button
                    className="icon-btn"
                    onClick={() => {
                      setEditingCategory(c);
                      setShowCategoryModal(true);
                    }}
                  >
                    <Pencil size={13} />
                  </button>
                  <button className="icon-btn danger" onClick={() => deleteCategory(c.id)}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showCategoryModal && (
        <CategoryModal
          categoria={editingCategory}
          onClose={() => {
            setShowCategoryModal(false);
            setEditingCategory(null);
          }}
          onSave={saveCategory}
        />
      )}
    </>
  );
}
