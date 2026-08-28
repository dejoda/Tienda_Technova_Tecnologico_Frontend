import { useState } from "react";
import { X } from "lucide-react";
import { TIPO_INFO } from "../data";
import type { Movimiento, Producto, TipoMovimiento } from "../types";

interface MovementModalProps {
  producto: Producto;
  onClose: () => void;
  onSave: (movimiento: Movimiento) => void;
}

export default function MovementModal({ producto, onClose, onSave }: MovementModalProps) {
  const [tipo, setTipo] = useState<TipoMovimiento>("entrada");
  const [cantidad, setCantidad] = useState<number | "">("");
  const [motivo, setMotivo] = useState("");
  const [error, setError] = useState("");

  const cantidadNum = Number(cantidad) || 0;
  const resultante =
    tipo === "entrada" ? producto.stock + cantidadNum
    : tipo === "salida" ? producto.stock - cantidadNum
    : cantidadNum;

  const submit = () => {
    if (cantidad === "" || cantidadNum < 0) {
      setError("Ingresa una cantidad válida.");
      return;
    }
    if (!motivo.trim()) {
      setError("Indica el motivo del movimiento.");
      return;
    }
    if (tipo === "salida" && cantidadNum > producto.stock) {
      setError(`No puedes sacar más de lo disponible (${producto.stock}).`);
      return;
    }
    if (tipo === "ajuste" && cantidadNum < 0) {
      setError("El ajuste no puede ser negativo.");
      return;
    }
    onSave({
      id: Date.now(),
      producto_id: producto.id,
      tipo,
      cantidad: cantidadNum,
      motivo: motivo.trim(),
      usuario: "admin",
      fecha: new Date().toISOString(),
      nuevoStock: resultante,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>Registrar movimiento</h3>
          <button className="icon-btn" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">
          <p className="mov-product">{producto.nombre} <span>· stock actual: {producto.stock}</span></p>

          <div className="field">
            <label>Tipo de movimiento</label>
            <div className="tipo-select">
              {(Object.entries(TIPO_INFO) as [TipoMovimiento, typeof TIPO_INFO[TipoMovimiento]][]).map(([key, info]) => (
                <button key={key} type="button" className={`tipo-opt ${tipo === key ? "active " + info.cls : ""}`} onClick={() => setTipo(key)}>
                  <info.icon size={14} /> {info.label}
                </button>
              ))}
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label>{tipo === "ajuste" ? "Nuevo stock" : "Cantidad"}</label>
              <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value === "" ? "" : Number(e.target.value))} placeholder="0" />
            </div>
            <div className="field">
              <label>Stock resultante</label>
              <input value={cantidad === "" ? "—" : resultante} disabled />
            </div>
          </div>

          <div className="field">
            <label>Motivo</label>
            <input value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Ej. Compra a proveedor, venta, merma..." />
          </div>

          {error && <p className="error-text">{error}</p>}
        </div>
        <div className="modal-foot">
          <button className="btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={submit}>Registrar</button>
        </div>
      </div>
    </div>
  );
}
