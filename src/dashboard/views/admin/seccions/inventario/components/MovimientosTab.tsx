import type { Movimiento, Producto } from "../types";
import { TIPO_INFO, fechaCorta } from "../data";

type MovimientosTabProps = {
  movimientos: Movimiento[];
  productos: Producto[];
};

export default function MovimientosTab({ movimientos, productos }: MovimientosTabProps) {
  const prodName = (id: number) => productos.find((p) => p.id === id)?.nombre || "Producto eliminado";

  return (
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
        {movimientos.map((m) => {
          const info = TIPO_INFO[m.tipo];
          return (
            <tr key={m.id}>
              <td>{fechaCorta(m.fecha)}</td>
              <td>{prodName(m.productoId)}</td>
              <td>
                <span className={`mov-tipo ${info.cls}`}>
                  <info.icon size={12} /> {info.label}
                </span>
              </td>
              <td>
                {m.tipo === "salida" ? "-" : "+"}
                {m.cantidad}
              </td>
              <td>{m.motivo}</td>
              <td>{m.usuario}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
