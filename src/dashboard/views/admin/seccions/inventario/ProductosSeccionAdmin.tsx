import { useMemo, useState } from "react";
import { AlertTriangle, Boxes, History, Pencil, Plus, Search, Tag, Trash2, ArrowUpDown, PackageSearch } from "lucide-react";
import StockBadge from "./components/StockBadge";
import ProductModal from "./components/ProductModal";
import CategoryModal from "./components/CategoryModal";
import MovementModal from "./components/MovementModal";
import { STOCK_BAJO, TIPO_INFO, fechaCorta, initialCategorias, initialMovimientos, initialProductos, principalDe, soles } from "./data";
import type { Categoria, Movimiento, Producto } from "./types";
import "./style/inventario.css";

type Tab = "productos" | "movimientos" | "categorias" | "alertas";

export default function ProductosSeccionAdmin() {
  const [tab, setTab] = useState<Tab>("productos");
  const [productos, setProductos] = useState<Producto[]>(initialProductos);
  const [categorias, setCategorias] = useState<Categoria[]>(initialCategorias);
  const [movimientos, setMovimientos] = useState<Movimiento[]>(initialMovimientos);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<string>("all");
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Categoria | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [movementProduct, setMovementProduct] = useState<Producto | null>(null);

  const catName = (id: number) => categorias.find((c) => c.id === id)?.nombre || "—";
  const prodName = (id: number) => productos.find((p) => p.id === id)?.nombre || "Producto eliminado";

  const filtered = useMemo(() => {
    return productos.filter((p) => {
      const matchesSearch = (p.nombre + p.marca + p.modelo).toLowerCase().includes(search.toLowerCase());
      const matchesCat = catFilter === "all" || p.categoria_id === Number(catFilter);
      return matchesSearch && matchesCat;
    });
  }, [productos, search, catFilter]);

  const lowStock = productos.filter((p) => p.stock <= STOCK_BAJO);
  const movimientosOrdenados = [...movimientos].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  const saveProduct = (p: Producto) => {
    const isNew = !productos.some((x) => x.id === p.id);
    setProductos((list) => (isNew ? [p, ...list] : list.map((x) => (x.id === p.id ? p : x))));
    if (isNew && p.stock > 0) {
      setMovimientos((list) => [
        { id: Date.now() + 1, producto_id: p.id, tipo: "entrada", cantidad: p.stock, motivo: "Carga inicial", usuario: "admin", fecha: new Date().toISOString() },
        ...list,
      ]);
    }
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const deleteProduct = (id: number) => {
    if (confirm("¿Eliminar este producto del inventario?")) {
      setProductos((list) => list.filter((p) => p.id !== id));
    }
  };

  const saveCategory = (c: Categoria) => {
    setCategorias((list) => {
      const exists = list.some((x) => x.id === c.id);
      return exists ? list.map((x) => (x.id === c.id ? c : x)) : [...list, c];
    });
    setShowCategoryModal(false);
    setEditingCategory(null);
  };

  const deleteCategory = (id: number) => {
    if (productos.some((p) => p.categoria_id === id)) {
      alert("No puedes eliminar una categoría que tiene productos asignados.");
      return;
    }
    if (confirm("¿Eliminar esta categoría?")) setCategorias((list) => list.filter((c) => c.id !== id));
  };

  const saveMovement = (mov: Movimiento) => {
    setMovimientos((list) => [mov, ...list]);
    setProductos((list) => list.map((p) => (p.id === mov.producto_id ? { ...p, stock: mov.nuevoStock ?? p.stock } : p)));
    setMovementProduct(null);
  };

  return (
    <div className="wrap">
      <h2>Inventario</h2>
      <p className="sub">Gestiona el catálogo de productos, sus categorías, el stock y los movimientos.</p>

      <div className="tabs">
        <button className={`tab-btn ${tab === "productos" ? "active" : ""}`} onClick={() => setTab("productos")}>
          <Boxes size={15} /> Productos <span className="count">{productos.length}</span>
        </button>
        <button className={`tab-btn ${tab === "movimientos" ? "active" : ""}`} onClick={() => setTab("movimientos")}>
          <History size={15} /> Movimientos <span className="count">{movimientos.length}</span>
        </button>
        <button className={`tab-btn ${tab === "categorias" ? "active" : ""}`} onClick={() => setTab("categorias")}>
          <Tag size={15} /> Categorías <span className="count">{categorias.length}</span>
        </button>
        <button className={`tab-btn ${tab === "alertas" ? "active" : ""}`} onClick={() => setTab("alertas")}>
          <AlertTriangle size={15} /> Stock bajo <span className="count">{lowStock.length}</span>
        </button>
      </div>

      {tab === "productos" && (
        <>
          <div className="toolbar">
            <div className="search-box">
              <Search size={15} color="#7f7f95" />
              <input placeholder="Buscar por nombre, marca o modelo..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select className="filter" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
              <option value="all">Todas las categorías</option>
              {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
            <button className="btn-primary" onClick={() => { setEditingProduct(null); setShowProductModal(true); }}>
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
                        <div className="prod-sub">{p.marca} · {p.modelo}</div>
                      </div>
                    </div>
                  </td>
                  <td>{catName(p.categoria_id)}</td>
                  <td>{soles(p.precio)}</td>
                  <td><StockBadge stock={p.stock} /></td>
                  <td>{p.garantia} meses</td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-btn accent" title="Registrar movimiento" onClick={() => setMovementProduct(p)}><ArrowUpDown size={14} /></button>
                      <button className="icon-btn" title="Editar" onClick={() => { setEditingProduct(p); setShowProductModal(true); }}><Pencil size={14} /></button>
                      <button className="icon-btn danger" title="Eliminar" onClick={() => deleteProduct(p.id)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="empty"><PackageSearch size={22} style={{ marginBottom: 8 }} /><div>No se encontraron productos con esos filtros.</div></div>
          )}
        </>
      )}

      {tab === "movimientos" && (
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Motivo</th>
              <th>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {movimientosOrdenados.map((m) => {
              const info = TIPO_INFO[m.tipo];
              return (
                <tr key={m.id}>
                  <td>{fechaCorta(m.fecha)}</td>
                  <td>{prodName(m.producto_id)}</td>
                  <td><span className={`mov-tipo ${info.cls}`}><info.icon size={12} /> {info.label}</span></td>
                  <td>{m.tipo === "salida" ? "-" : "+"}{m.cantidad}</td>
                  <td>{m.motivo}</td>
                  <td>{m.usuario}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {tab === "categorias" && (
        <>
          <div className="toolbar">
            <div style={{ flex: 1 }} />
            <button className="btn-primary" onClick={() => { setEditingCategory(null); setShowCategoryModal(true); }}>
              <Plus size={15} /> Nueva categoría
            </button>
          </div>
          <div className="cat-grid">
            {categorias.map((c) => {
              const n = productos.filter((p) => p.categoria_id === c.id).length;
              return (
                <div className="cat-card" key={c.id}>
                  <h4><Tag size={14} color="#b45cf0" /> {c.nombre}</h4>
                  <p>{c.descripcion || "Sin descripción."}</p>
                  <div className="cat-foot">
                    <span className="count-tag">{n} producto{n !== 1 ? "s" : ""}</span>
                    <div className="row-actions">
                      <button className="icon-btn" onClick={() => { setEditingCategory(c); setShowCategoryModal(true); }}><Pencil size={13} /></button>
                      <button className="icon-btn danger" onClick={() => deleteCategory(c.id)}><Trash2 size={13} /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab === "alertas" && (
        <div className="alert-list">
          {lowStock.length === 0 && <div className="empty">Todo el inventario tiene stock saludable.</div>}
          {lowStock.map((p) => (
            <div className={`alert-item ${p.stock === 0 ? "out" : ""}`} key={p.id}>
              <img src={principalDe(p)} alt="" />
              <div className="info">
                <div className="n">{p.nombre}</div>
                <div className="s">{catName(p.categoria_id)} · {p.marca} {p.modelo}</div>
              </div>
              <StockBadge stock={p.stock} />
              <button className="btn-ghost" onClick={() => setMovementProduct(p)}>Reponer stock</button>
            </div>
          ))}
        </div>
      )}

      {showProductModal && (
        <ProductModal
          producto={editingProduct}
          categorias={categorias}
          onClose={() => { setShowProductModal(false); setEditingProduct(null); }}
          onSave={saveProduct}
        />
      )}
      {showCategoryModal && (
        <CategoryModal
          categoria={editingCategory}
          onClose={() => { setShowCategoryModal(false); setEditingCategory(null); }}
          onSave={saveCategory}
        />
      )}
      {movementProduct && (
        <MovementModal
          producto={movementProduct}
          onClose={() => setMovementProduct(null)}
          onSave={saveMovement}
        />
      )}
    </div>
  );
}
