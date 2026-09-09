import { useEffect, useState } from "react";
import { AlertTriangle, Boxes, History, Tag } from "lucide-react";
import ProductosTab from "./components/ProductosTab";
import MovimientosTab from "./components/MovimientosTab";
import CategoriasTab from "./components/CategoriasTab";
import AlertasTab from "./components/AlertasTab";
import { STOCK_BAJO } from "./data";
import { adaptProductoAdmin } from "./adapters";
import { InventarioAdminService } from "../../services/inventario/InventarioAdminService";
import { CategoriaService } from "../../../../../service/categoriaService";
import type { Categoria, Movimiento, Producto, Marca } from "./types";
import "./style/inventario.css";

type Tab = "productos" | "movimientos" | "categorias" | "alertas";

const inventarioAdminService = new InventarioAdminService();
const categoriaService = new CategoriaService();

export default function ProductosSeccionAdmin() {
  const [tab, setTab] = useState<Tab>("productos");

  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<string>("all");
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Categoria | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [movementProduct, setMovementProduct] = useState<Producto | null>(null);

  const catName = (id: any, fallback?: string) => {
    if (id === null || id === undefined) return fallback || "—";
    const found = categorias.find((c) => Number(c.id) === Number(id));
    return found?.nombre || fallback || "—";
  };

  // Función dedicada para cargar marcas
  const loadMarcas = async () => {
    try {
      console.log("Ejecutando loadMarcas...");
      const m = await inventarioAdminService.getMarcas();
      console.log("Marcas recibidas en componente:", m);
      setMarcas(m);
    } catch (err) {
      console.error("Error cargando marcas en componente:", err);
    }
  };

  // 1. Carga inicial de datos (Categorías y Movimientos)
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      // Carga de categorías (Público)
      try {
        const catPage = await categoriaService.getCategorias(0, 100);
        setCategorias(catPage.content);
      } catch (err) {
        console.error("Error cargando categorías:", err);
      }

      // Carga de marcas (Admin)
      await loadMarcas();

      // Carga de movimientos (Privado/Admin)
      try {
        const movs = await inventarioAdminService.getMovimientos();
        setMovimientos(movs.map(m => ({
          id: m.idMovimiento,
          productoId: m.productoId,
          tipo: m.tipo,
          cantidad: m.cantidad,
          motivo: m.motivo,
          usuario: m.usuarioNombre,
          fecha: m.fecha,
          nuevoStock: m.stockResultante
        })));
      } catch (err) {
        console.error("Error cargando movimientos:", err);
      }
    };
    cargarDatosIniciales();
  }, []);

  // Función dedicada para cargar productos (para poder llamarla desde cualquier lugar)
  const loadProductos = async () => {
    const categoriaNombre = catFilter === "all" ? undefined : catName(Number(catFilter));
    try {
      const page = await inventarioAdminService.getProductosAdmin(
        { nombre: search || undefined, categoria: categoriaNombre },
        0,
        200
      );
      setProductos(page.content.map(adaptProductoAdmin));
    } catch (err) {
      console.error("Error al cargar productos:", err);
    }
  };

  // 2. Buscador y filtro de productos (Sincronizado con Backend)
  useEffect(() => {
    const timeout = setTimeout(() => {
      loadProductos();
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, catFilter]);

  const filtered = productos;
  const lowStock = productos.filter((p) => p.stock <= STOCK_BAJO);
  const movimientosOrdenados = [...movimientos].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  // =========================
  // ACCIONES DE PRODUCTOS
  // =========================
  const saveProduct = async (p: Producto) => {
    try {
      const isNew = !productos.some((x) => x.id === p.id);
      let productId: number;

      if (isNew) {
        const created = await inventarioAdminService.createProducto(p);
        productId = created.id;
      } else {
        const updated = await inventarioAdminService.updateProducto(p.id, p);
        productId = updated.id;
      }

      // Subir imágenes nuevas en PARALELO para eliminar el retraso
      const nuevasImagenes = p.imagenes.filter(img => img.file);
      if (nuevasImagenes.length > 0) {
        await Promise.all(
          nuevasImagenes.map(img =>
            inventarioAdminService.uploadProductoImagen(
              productId,
              img.file!,
              img.principal
            )
          )
        );
      }

      // Refrescar datos inmediatamente sin hacks de estado
      await loadProductos();

      setShowProductModal(false);
      setEditingProduct(null);
    } catch (err) {
      alert("Error al guardar el producto y sus imágenes");
      console.error(err);
    }
  };

  const handleCreateMarca = async (nombre: string) => {
    try {
      const newMarca = await inventarioAdminService.createMarca(nombre);
      console.log("Nueva marca creada exitosamente:", newMarca);
      await loadMarcas(); // Recargar la lista completa desde el servidor
      return newMarca;
    } catch (err) {
      alert("Error al registrar la marca");
      console.error(err);
      throw err;
    }
  };

  const deleteProduct = async (id: number) => {
    if (confirm("¿Eliminar este producto del inventario?")) {
      try {
        await inventarioAdminService.deleteProducto(id);
        setProductos((list) => list.filter((p) => p.id !== id));
      } catch (err) {
        alert("Error al eliminar el producto");
        console.error(err);
      }
    }
  };

  // =========================
  // ACCIONES DE CATEGORÍAS
  // =========================
  const saveCategory = async (c: Categoria) => {
    try {
      const isNew = !categorias.some((x) => x.id === c.id);
      if (isNew) {
        await categoriaService.createCategoria(c);
      } else {
        await categoriaService.updateCategoria(c.id, c);
      }

      // Refrescar categorías
      const catPage = await categoriaService.getCategorias(0, 100);
      setCategorias(catPage.content);

      setShowCategoryModal(false);
      setEditingCategory(null);
    } catch (err) {
      alert("Error al guardar la categoría");
      console.error(err);
    }
  };

  const deleteCategory = async (id: number) => {
    if (productos.some((p) => p.categoriaId === id)) {
      alert("No puedes eliminar una categoría que tiene productos asignados.");
      return;
    }
    if (confirm("¿Eliminar esta categoría?")) {
      try {
        await categoriaService.deleteCategoria(id);
        setCategorias((list) => list.filter((c) => c.id !== id));
      } catch (err) {
        alert("Error al eliminar la categoría");
        console.error(err);
      }
    }
  };

  // =========================
  // ACCIONES DE MOVIMIENTOS
  // =========================
  const saveMovement = async (mov: Movimiento) => {
    try {
      await inventarioAdminService.registrarMovimiento({
        productoId: mov.productoId,
        tipo: mov.tipo,
        cantidad: mov.cantidad,
        motivo: mov.motivo,
        usuarioId: 1 // ID admin por defecto
      });

      // Refrescar movimientos y productos
      const movs = await inventarioAdminService.getMovimientos();
      setMovimientos(movs.map(m => ({
        id: m.idMovimiento,
        productoId: m.productoId,
        tipo: m.tipo,
        cantidad: m.cantidad,
        motivo: m.motivo,
        usuario: m.usuarioNombre,
        fecha: m.fecha,
        nuevoStock: m.stockResultante
      })));

      setSearch(search); // Dispara el useEffect de productos para actualizar stock
      setMovementProduct(null);
    } catch (err) {
      alert("Error al registrar el movimiento");
      console.error(err);
    }
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
          marcas={marcas}
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
          handleCreateMarca={handleCreateMarca}
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
