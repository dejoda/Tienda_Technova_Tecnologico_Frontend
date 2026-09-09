import type { Producto, ImagenProducto } from "./types";
import { environment } from "../../../../../environments/environment.development";
import { ImageService } from "../../../../../service/utils/imageService";

/**
 * Adapta un ProductoAdminDTO del backend al tipo Producto del frontend.
 * El backend devuelve la imagen principal como un string o un objeto simple,
 * y el frontend espera un array de ImagenProducto.
 */
export function adaptProductoAdmin(adminProd: any): Producto {
  const { categoria_id, ...rest } = adminProd;

  const imagenes = adminProd.imagenes
    ? adminProd.imagenes.map((img: any) => ({
        id: img.id || Math.random(),
        url: ImageService.resolve(img.urlImagen),
        ruta: img.urlImagen,
        principal: img.principal
      }))
    : [];

  // Asegurar que haya al menos una imagen principal si hay imágenes
  if (imagenes.length > 0 && !imagenes.some(img => img.principal)) {
    imagenes[0].principal = true;
  }

  return {
    ...rest,
    categoriaId: adminProd.categoriaId != null ? Number(adminProd.categoriaId) : (categoria_id != null ? Number(categoria_id) : null),
    imagenes: imagenes
  };
}
