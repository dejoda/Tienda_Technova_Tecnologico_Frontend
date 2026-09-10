import { useEffect, useState } from "react";
import { AlertTriangle, Boxes, History, Tag } from "lucide-react";
import ProductosTab from "./components/ProductosTab";
import MovimientosTab from "./components/MovimientosTab";
import CategoriasTab from "./components/CategoriasTab";
import AlertasTab from "./components/AlertasTab";
import { STOCK_BAJO } from "./utils/data";
import { adaptProductoAdmin } from "./utils/adapters";
import { InventarioAdminService } from "../../services/inventario/InventarioAdminService";
import { CategoriaService } from "../../../../../service/categoriaService";
import type { Categoria, Marca, Movimiento, Producto } from "../../interfaces/Inventario/types";
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
  const [alertas, setAlertas] = useState<Producto[]>([]);
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

  const loadMarcas = async () => {
    try {
      const m = await inventarioAdminService.getMarcas();
      setMarcas(m as Marca[]);
    } catch (err) {
      console.error("Error cargando marcas en componente:", err);
    }
  };

  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const catPageData = await inventarioAdminService.getCategoriasAdmin(0, 1000);
        setCategorias(catPageData.content);
      } catch (err) {
        console.error("Error cargando categorías:", err);
      }

      await loadMarcas();

      try {
        const movPageData = await inventarioAdminService.getMovimientosAdmin({ page: 0, size: 1000 });
        setMovimientos(movPageData.content.map(m => ({
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

      await loadAlerts();
    };
    cargarDatosIniciales();
  }, []);

  const loadProductos = async () => {
    const categoriaNombre = catFilter === "all" ? undefined : catName(Number(catFilter));
    try {
      const page = await inventarioAdminService.getProductosAdmin(
        { nombre: search || undefined, categoria: categoriaNombre },
        0,
        1000
      );
      setProductos(page.content.map(adaptProductoAdmin));
    } catch (err) {
      console.error("Error al cargar productos:", err);
    }
  };

  const loadMovimientos = async (filters = {}) => {
    try {
      const pageData = await inventarioAdminService.getMovimientosAdmin({
        page: 0,
        size: 1000,
        ...filters
      });
      setMovimientos(pageData.content.map(m => ({
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
      console.error("Error al cargar movimientos:", err);
    }
  };

  const loadAlerts = async () => {
    try {
      const pageData = await inventarioAdminService.getProductosAdmin(
        { stockMax: STOCK_BAJO },
        0,
        1000
      );
      const filteredAlerts = pageData.content
        .map(adaptProductoAdmin)
        .filter(p => p.stock <= STOCK_BAJO);
      setAlertas(filteredAlerts);
    } catch (err) {
      console.error("Error al cargar alertas:", err);
    }
  };

  const handleMovSearch = async (filters: any) => {
    await loadMovimientos(filters);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadProductos();
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, catFilter]);

  const movimientosOrdenados = [...movimientos].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

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
      await loadMarcas();
      return newMarca as Marca;
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

  const updatePrincipalImage = async (imagenId: number, isPrincipal: boolean) => {
    try {
      await inventarioAdminService.updateImagenPrincipal(imagenId, isPrincipal);
    } catch (err) {
      console.error("Error actualizando imagen principal:", err);
      alert("Error al actualizar la imagen principal");
    }
  };

  const deleteProductImage = async (imagenId: number) => {
    try {
      await inventarioAdminService.deleteProductoImagen(imagenId);
    } catch (err) {
      console.error("Error eliminando imagen del producto:", err);
      alert("Error al eliminar la imagen del servidor");
    }
  };

  const saveCategory = async (c: Categoria) => {
    try {
      const isNew = !categorias.some((x) => x.id === c.id);
      if (isNew) {
        await categoriaService.createCategoria(c);
      } else {
        await categoriaService.updateCategoria(c.id, c);
      }
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

  const saveMovement = async (mov: Movimiento) => {
    try {
      await inventarioAdminService.registrarMovimiento({
        productoId: mov.productoId,
        tipo: mov.tipo,
        cantidad: mov.cantidad,
        motivo: mov.motivo,
        usuarioId: 1
      });
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
      await loadProductos();
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
          <AlertTriangle size={15} /> Stock bajo <span className="count">{alertas.length}</span>
        </button>
      </div>

      {tab === "productos" && (
        <ProductosTab
          productos={productos}
          categorias={categorias}
          marcas={marcas}
          filtered={productos}
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
          onUpdatePrincipal={updatePrincipalImage}
          onDeleteImagen={deleteProductImage}
        />
      )}

      {tab === "movimientos" && (
        <MovimientosTab
          movimientos={movimientosOrdenados}
          productos={productos}
          onSearch={handleMovSearch}
        />
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
        <AlertasTab
          lowStock={alertas}
          catName={catName}
          setMovementProduct={setMovementProduct}
        />
      )}
    </div>
  );
}
