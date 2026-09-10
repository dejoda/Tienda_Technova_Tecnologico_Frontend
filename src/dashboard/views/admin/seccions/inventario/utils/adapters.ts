import type { Producto } from "../../../interfaces/Inventario/types";
import { ImageService } from "../../../../../../service/utils/imageService";

/**
 * Adapta un ProductoAdminDTO del backend al tipo Producto del frontend.
 * Asegura la correcta asignación de IDs y categorías independientemente
 * de si el backend usa camelCase o snake_case.
 */
export function adaptProductoAdmin(adminProd: any): Producto {
  if (!adminProd) return {} as Producto;

  const { categoria_id, idProducto, ...rest } = adminProd;

  const imagenes = adminProd.imagenes
    ? adminProd.imagenes.map((img: any, index: number) => ({
        id: img.id || img.idImagen || index,
        url: ImageService.resolve(img.urlImagen),
        ruta: img.urlImagen,
        principal: img.principal
      }))
    : [];

  // Asegurar que haya al menos una imagen principal si hay imágenes
  if (imagenes.length > 0 && !imagenes.some((img: { principal: any; }) => img.principal)) {
    imagenes[0].principal = true;
  }

  return {
    ...rest,
    // Prioridad: idProducto (backend admin) -> id (estándar)
    id: idProducto || adminProd.id,
    // Prioridad: categoriaId -> categoria_id
    categoriaId: adminProd.categoriaId != null
      ? Number(adminProd.categoriaId)
      : (categoria_id != null ? Number(categoria_id) : null),
    imagenes: imagenes
  };
}
