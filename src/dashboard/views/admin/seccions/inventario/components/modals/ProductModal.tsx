import { useState, useMemo, useRef, useEffect } from "react";
import { X, Loader2, Plus, Search, ChevronDown } from "lucide-react";
import ImageManager from "../utils/ImageManager";
import type { Categoria, ImagenProducto, Producto, ProductoFormState, Marca } from "../../types";

interface ProductModalProps {
  producto: Producto | null;
  categorias: Categoria[];
  marcas: Marca[];
  onClose: () => void;
  onSave: (producto: Producto) => Promise<void>;
  onCreateMarca: (nombre: string) => Promise<Marca>;
}

export default function ProductModal({ producto, categorias, marcas, onClose, onSave, onCreateMarca }: ProductModalProps) {
  console.log("ProductModal marcas prop:", marcas);
  const isEdit = !!producto;
  const [form, setForm] = useState<ProductoFormState>(
    producto || { nombre: "", descripcion: "", precio: "", stockInicial: "", marcaId: marcas[0]?.idMarca || "", modelo: "", garantia: "", categoriaId: categorias[0]?.id || "" }
  );
  const [imagenes, setImagenes] = useState<ImagenProducto[]>(producto?.imagenes || []);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isAddingMarca, setIsAddingMarca] = useState(false);
  const [nuevaMarca, setNuevaMarca] = useState("");

  // Searchable Brand Select State
  const [brandSearch, setBrandSearch] = useState("");
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (brandRef.current && !brandRef.current.contains(event.target as Node)) {
        setIsBrandOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredMarcas = useMemo(() => {
    return marcas.filter(m => m.nombre.toLowerCase().includes(brandSearch.toLowerCase()));
  }, [marcas, brandSearch]);

  const selectedMarcaName = useMemo(() => {
    return marcas.find(m => m.idMarca === form.marcaId)?.nombre || "Seleccionar marca";
  }, [marcas, form.marcaId]);

  const set = <K extends keyof ProductoFormState>(k: K, v: ProductoFormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.nombre.trim() || form.precio === "" || (!isEdit && form.stockInicial === "") || !form.categoriaId || !form.marcaId) {
      setError("Completa nombre, precio, stock inicial, categoría y marca.");
      return;
    }
    if (imagenes.length === 0) {
      setError("Sube al menos una imagen del producto.");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      await onSave({
        ...form,
        id: isEdit ? (form.id as number) : Date.now(),
        precio: Number(form.precio),
        stock: isEdit ? (form.stock as number) : Number(form.stockInicial),
        garantia: Number(form.garantia) || 0,
        categoriaId: Number(form.categoriaId),
        marcaId: Number(form.marcaId),
        imagenes,
      } as Producto);
    } catch (err) {
      setError("Error al guardar los cambios. Inténtalo de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddMarca = async () => {
    if (!nuevaMarca.trim()) {
      setError("Escribe el nombre de la marca.");
      return;
    }
    try {
      setIsSaving(true);
      const marca = await onCreateMarca(nuevaMarca);
      set("marcaId", marca.idMarca);
      setNuevaMarca("");
      setIsAddingMarca(false);
      setError("");
    } catch (err) {
      setError("Error al registrar la marca.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{isEdit ? "Editar producto" : "Nuevo producto"}</h3>
          <button className="icon-btn" onClick={onClose} disabled={isSaving}><X size={18} /></button>
        </div>

        <div className="modal-body">
          {isSaving && (
            <div className="modal-loader-overlay">
              <div className="loader-content">
                <Loader2 className="spin" size={40} />
                <p>Guardando datos...</p>
              </div>
            </div>
          )}
          <div className="field-row">
            <div className="field" style={{ flex: 2 }}>
              <label>Nombre</label>
              <input value={form.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Ej. Laptop ASUS TUF F15" disabled={isSaving} />
            </div>
            <div className="field">
              <label>Categoría</label>
              <select value={form.categoriaId} onChange={(e) => set("categoriaId", Number(e.target.value))} disabled={isSaving}>
                {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </div>
          </div>

          <div className="field">
            <label>Descripción</label>
            <textarea rows={2} value={form.descripcion} onChange={(e) => set("descripcion", e.target.value)} placeholder="Descripción breve del producto" disabled={isSaving} />
          </div>

          <div className="field-row">
            <div className="field"><label>Precio (S/)</label><input type="number" value={form.precio} onChange={(e) => set("precio", e.target.value === "" ? "" : Number(e.target.value))} disabled={isSaving} /></div>
            {isEdit ? (
              <div className="field">
                <label>Stock actual</label>
                <input value={form.stock} disabled />
              </div>
            ) : (
              <div className="field"><label>Stock inicial</label><input type="number" value={form.stockInicial} onChange={(e) => set("stockInicial", e.target.value === "" ? "" : Number(e.target.value))} disabled={isSaving} /></div>
            )}
            <div className="field"><label>Garantía (meses)</label><input type="number" value={form.garantia} onChange={(e) => set("garantia", e.target.value === "" ? "" : Number(e.target.value))} disabled={isSaving} /></div>
          </div>
          {isEdit && <p className="hint" style={{ marginTop: -6 }}>El stock ya no se edita aquí — usa "Registrar movimiento" para que quede el historial.</p>}

          <div className="field-row">
            <div className="field">
              <label>Marca</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, position: "relative" }}>
                <div
                  ref={brandRef}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#16161f",
                    border: "1px solid #292937",
                    borderRadius: "8px",
                    padding: "9px 11px",
                    cursor: "pointer",
                    fontSize: "13.5px",
                    color: form.marcaId ? "#e9e9f2" : "#6d6d82",
                    minHeight: "38px"
                  }}
                  onClick={() => setIsBrandOpen(!isBrandOpen)}
                  disabled={isSaving}
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {selectedMarcaName}
                  </span>
                  <ChevronDown size={14} style={{ opacity: 0.5 }} />
                </div>

                {isBrandOpen && (
                  <div style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    background: "#121219",
                    border: "1px solid #262633",
                    borderRadius: "8px",
                    marginTop: "4px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                    maxHeight: "200px",
                    overflowY: "auto"
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px",
                      borderBottom: "1px solid #22222d",
                      position: "sticky",
                      top: 0,
                      background: "#121219"
                    }}>
                      <Search size={14} color="#7f7f95" />
                      <input
                        autoFocus
                        placeholder="Buscar marca..."
                        value={brandSearch}
                        onChange={(e) => setBrandSearch(e.target.value)}
                        style={{
                          background: "none",
                          border: "none",
                          outline: "none",
                          color: "#e9e9f2",
                          fontSize: "13px",
                          width: "100%",
                          padding: "4px 0"
                        }}
                      />
                    </div>
                    {filteredMarcas.length > 0 ? (
                      filteredMarcas.map(m => (
                        <div
                          key={m.idMarca}
                          onClick={() => {
                            set("marcaId", m.idMarca);
                            setIsBrandOpen(false);
                            setBrandSearch("");
                          }}
                          style={{
                            padding: "9px 11px",
                            fontSize: "13px",
                            cursor: "pointer",
                            color: m.idMarca === form.marcaId ? "#b45cf0" : "#cfcfe0",
                            background: m.idMarca === form.marcaId ? "rgba(180, 92, 240, 0.1)" : "transparent",
                            borderBottom: "1px solid rgba(255,255,255,0.02)"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                          onMouseLeave={(e) => e.currentTarget.style.background = m.idMarca === form.marcaId ? "rgba(180, 92, 240, 0.1)" : "transparent"}
                        >
                          {m.nombre}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: "12px", fontSize: "12px", color: "#6d6d82", textAlign: "center" }}>
                        No se encontraron marcas.
                      </div>
                    )}
                  </div>
                )}

                {!isEdit && !isAddingMarca && (
                  <button
                    className="btn-ghost"
                    style={{ padding: "9px 16px", marginTop: 4 }}
                    onClick={() => setIsAddingMarca(true)}
                    title="Registrar nueva marca"
                  >
                    <Plus size={16} /> Registrar nueva marca
                  </button>
                )}

                {isAddingMarca && (
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <input
                      autoFocus
                      placeholder="Nombre de la marca"
                      value={nuevaMarca}
                      onChange={(e) => setNuevaMarca(e.target.value)}
                      disabled={isSaving}
                      style={{ flex: 1 }}
                    />
                    <button className="btn-primary" onClick={handleAddMarca} disabled={isSaving}>
                      {isSaving ? <Loader2 size={14} className="spin" /> : "Ok"}
                    </button>
                    <button className="btn-ghost" onClick={() => setIsAddingMarca(false)} disabled={isSaving}>
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="field"><label>Modelo</label><input value={form.modelo} onChange={(e) => set("modelo", e.target.value)} disabled={isSaving} /></div>
          </div>

          <ImageManager nombreProducto={form.nombre} imagenes={imagenes} setImagenes={setImagenes} />

          {error && <p className="error-text">{error}</p>}
        </div>

        <div className="modal-foot">
          <button className="btn-ghost" onClick={onClose} disabled={isSaving}>Cancelar</button>
          <button className="btn-primary" onClick={submit} disabled={isSaving}>
            {isSaving ? (
              <><Loader2 size={16} className="spin" /> Guardando...</>
            ) : (
              isEdit ? "Guardar cambios" : "Crear producto"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

