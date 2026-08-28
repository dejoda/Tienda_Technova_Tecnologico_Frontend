import { STOCK_BAJO } from "../data";

interface StockBadgeProps {
  stock: number;
}

export default function StockBadge({ stock }: StockBadgeProps) {
  let cls = "badge-ok";
  let label: string | number = stock;
  if (stock === 0) {
    cls = "badge-out";
    label = "Agotado";
  } else if (stock <= STOCK_BAJO) {
    cls = "badge-low";
    label = `${stock} bajo`;
  }
  return <span className={`stock-badge ${cls}`}>{label}</span>;
}
