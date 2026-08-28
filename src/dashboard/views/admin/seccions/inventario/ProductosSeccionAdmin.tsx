import { useMemo, useState } from "react";
import { AlertTriangle, Boxes, History, Tag } from "lucide-react";
import ProductosTab from "./components/ProductosTab";
import MovimientosTab from "./components/MovimientosTab";
import CategoriasTab from "./components/CategoriasTab";
import AlertasTab from "./components/AlertasTab";
import { STOCK_BAJO, initialCategorias, initialMovimientos, initialProductos } from "./data";
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
        <ProductosTab
          productos={productos}
          categorias={categorias}
          filtered={filtered}
          search={search}
          setSearch={setSearch}
          catFilter={catFilter}
          setCatFilter={setCatFilter}
          setEditingProduct={setEditingProduct}
          showProductModal={showProductModal}
          setShowProductModal={setShowProductModal}
          editingProduct={editingProduct}
          deleteProduct={deleteProduct}
          setMovementProduct={setMovementProduct}
          movementProduct={movementProduct}
          saveProduct={saveProduct}
          saveMovement={saveMovement}
          catName={catName}
        />
      )}

      {tab === "movimientos" && (
        <MovimientosTab movimientos={movimientosOrdenados} productos={productos} />
      )}

      {tab === "categorias" && (
        <CategoriasTab
          categorias={categorias}
          productos={productos}
          editingCategory={editingCategory}
          showCategoryModal={showCategoryModal}
          setEditingCategory={setEditingCategory}
          setShowCategoryModal={setShowCategoryModal}
          saveCategory={saveCategory}
          deleteCategory={deleteCategory}
        />
      )}

      {tab === "alertas" && (
        <AlertasTab lowStock={lowStock} catName={catName} setMovementProduct={setMovementProduct} />
      )}
    </div>
  );
}
