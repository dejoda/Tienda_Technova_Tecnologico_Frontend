import { ArrowDownCircle, ArrowUpCircle, SlidersHorizontal } from "lucide-react";
import type { TipoMovimiento } from "../../../interfaces/Inventario/types";

export const STOCK_BAJO = 5;

export const slugify = (s: string) => {
  if (!s) return "producto";
  let cleanS = s.toLowerCase();
  const genericPrefixes = ["laptop", "mouse", "teclado", "monitor", "auriculares", "impresora", "silla", "mesa"];

  for (const prefix of genericPrefixes) {
    if (cleanS.startsWith(prefix + " ")) {
      cleanS = cleanS.substring(prefix.length).trim();
      break;
    }
  }

  return cleanS
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const rutaImagen = (nombreProducto: string, index: number) => {
  const slug = slugify(nombreProducto || "producto");
  return `/images/products/${slug}/${slug}-${index + 1}.jpg`;
};

export const soles = (n: number) => `S/ ${Number(n).toLocaleString("es-PE", { minimumFractionDigits: 2 })}`;

export const principalDe = (p: any) => p.imagenes?.find((i: any) => i.principal)?.url || p.imagenes?.[0]?.url;

export const fechaCorta = (iso: string) =>
  new Date(iso).toLocaleString("es-PE", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

export const TIPO_INFO: Record<TipoMovimiento, { label: string; cls: string; icon: typeof ArrowUpCircle }> = {
  entrada: { label: "Entrada", cls: "tipo-entrada", icon: ArrowUpCircle },
  salida: { label: "Salida", cls: "tipo-salida", icon: ArrowDownCircle },
  ajuste: { label: "Ajuste", cls: "tipo-ajuste", icon: SlidersHorizontal },
};
