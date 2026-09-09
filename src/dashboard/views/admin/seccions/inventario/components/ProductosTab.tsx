import { type Dispatch, type SetStateAction } from "react";
import { ArrowUpDown, PackageSearch, Pencil, Plus, Search, Trash2 } from "lucide-react";
import type { Categoria, Producto, Marca } from "../types";
import { principalDe, soles } from "../data";
import StockBadge from "./utils/StockBadge";
import ProductModal from "./modals/ProductModal";
import MovementModal from "./modals/MovementModal";

type ProductosTabProps = {
  productos: Producto[];
  categorias: Categoria[];
  marcas: Marca[];
  filtered: Producto[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  catFilter: string;
  setCatFilter: Dispatch<SetStateAction<string>>;
  setEditingProduct: Dispatch<SetStateAction<Producto | null>>;
  showProductModal: boolean;
  setShowProductModal: Dispatch<SetStateAction<boolean>>;
  editingProduct: Producto | null;
  deleteProduct: (id: number) => void;
  setMovementProduct: Dispatch<SetStateAction<Producto | null>>;
  movementProduct: Producto | null;
  saveProduct: (p: Producto) => void;
  saveMovement: (mov: any) => void;
  handleCreateMarca: (nombre: string) => Promise<Marca>;
  catName: (id: any, fallback?: string) => string;
};

export default function ProductosTab({
  categorias,
  marcas,
  filtered,
  search,
  setSearch,
  catFilter,
  setCatFilter,
  setEditingProduct,
  showProductModal,
  setShowProductModal,
  editingProduct,
  deleteProduct,
  setMovementProduct,
  movementProduct,
  saveProduct,
  saveMovement,
  handleCreateMarca,
  catName,
}: ProductosTabProps) {
  return (
    <>
      <div className="toolbar">
        <div className="search-box">
          <Search size={15} color="#7f7f95" />
          <input
            placeholder="Buscar por nombre, marca o modelo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select className="filter" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
          <option value="all">Todas las categorías</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>

        <button
          className="btn-primary"
          onClick={() => {
            setEditingProduct(null);
            setShowProductModal(true);
          }}
        >
          <Plus size={15} /> Nuevo producto
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Garantía</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td>
                <div className="prod-cell">
                  <img src={principalDe(p)} alt="" />
                  <div>
                    <div className="prod-name">{p.nombre}</div>
                    <div className="prod-sub">
                      {p.marca} · {p.modelo}
                    </div>
                  </div>
                </div>
              </td>
              <td>{catName(p.categoriaId, (p as any).categoria)}</td>
              <td>{soles(p.precio)}</td>
              <td>
                <StockBadge stock={p.stock} />
              </td>
              <td>{p.garantia} meses</td>
              <td>
                <div className="row-actions">
                  <button
                    className="icon-btn accent"
                    title="Registrar movimiento"
                    onClick={() => setMovementProduct(p)}
                  >
                    <ArrowUpDown size={14} />
                  </button>
                  <button
                    className="icon-btn"
                    title="Editar"
                    onClick={() => {
                      setEditingProduct(p);
                      setShowProductModal(true);
                    }}
                  >
                    <Pencil size={14} />
                  </button>
                  <button className="icon-btn danger" title="Eliminar" onClick={() => deleteProduct(p.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <div className="empty">
          <PackageSearch size={22} style={{ marginBottom: 8 }} />
          <div>No se encontraron productos con esos filtros.</div>
        </div>
      )}

      {showProductModal && (
        <ProductModal
          producto={editingProduct}
          categorias={categorias}
          marcas={marcas}
          onClose={() => {
            setShowProductModal(false);
            setEditingProduct(null);
          }}
          onSave={saveProduct}
          onCreateMarca={handleCreateMarca}
        />
      )}

      {movementProduct && (
        <MovementModal
          producto={movementProduct}
          onClose={() => setMovementProduct(null)}
          onSave={saveMovement}
        />
      )}
    </>
  );
}
