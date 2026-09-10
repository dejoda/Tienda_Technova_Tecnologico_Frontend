import { type Dispatch, type SetStateAction } from "react";
import type { Producto } from "../../../interfaces/Inventario/types";
import { principalDe } from "../utils/data";
import StockBadge from "./utils/StockBadge";

type AlertasTabProps = {
  lowStock: Producto[];
  catName: (id: any, fallback?: string) => string;
  setMovementProduct: Dispatch<SetStateAction<Producto | null>>;
};

export default function AlertasTab({ lowStock, catName, setMovementProduct }: AlertasTabProps) {
  return (
    <div className="alert-list">
      {lowStock.length === 0 && <div className="empty">Todo el inventario tiene stock saludable.</div>}
      {lowStock.map((p) => (
        <div className={`alert-item ${p.stock === 0 ? "out" : ""}`} key={p.id}>
          <img src={principalDe(p)} alt="" />
          <div className="info">
            <div className="n">{p.nombre}</div>
            <div className="s">
              {catName(p.categoriaId, (p as any).categoria)} · {p.marca} {p.modelo}
            </div>
          </div>
          <StockBadge stock={p.stock} />
          <button className="btn-ghost" onClick={() => setMovementProduct(p)}>
            Reponer stock
          </button>
        </div>
      ))}
    </div>
  );
}
