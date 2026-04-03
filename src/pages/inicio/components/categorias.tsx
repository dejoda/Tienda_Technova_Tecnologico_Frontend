import { useEffect, useState } from "react";
import type { Categoria } from "../../../service/interfaces/Categoria";
import { CategoriaService } from "../../../service/categoriaService";

import Laptops from "../../../assets/categoria/laptop.jpg";
import Teclados from "../../../assets/categoria/perifericos.jpg";
import Audifono from "../../../assets/categoria/audifonos.jpg";
import Componentes_Pc from "../../../assets/categoria/componentes.jpg";
import Mouse from "../../../assets/categoria/Mouses.webp";
import Monitor from "../../../assets/categoria/Monitor.jpg";
import Celulares from "../../../assets/categoria/Celulares.webp";

import "./style/categorias.css";
import { Link } from "react-router";

/* 🔹 Mapa de imágenes por clave */
const imagenesMap: Record<string, string> = {
  lapt: Laptops,
  tecl: Teclados,
  audi: Audifono,
  comp: Componentes_Pc,
  mous: Mouse,
  moni: Monitor,
  celu: Celulares,
};

/* 🔹 Función que relaciona nombre con imagen */
const obtenerImagen = (nombre: string): string => {
  const nombreLower = nombre.toLowerCase();

  for (const key in imagenesMap) {
    if (nombreLower.includes(key)) {
      return imagenesMap[key];
    }
  }

  // Imagen por defecto
  return Laptops;
};

const Categorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const service = new CategoriaService();

    service
      .getCategorias()
      .then((data) => {
        const randomCategorias = [...data]
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        setCategorias(randomCategorias);
      })
      .catch((error) => {
        console.error("Error al cargar categorías:", error);
      });
  }, []);

  return (
    <section className="categories-section">
      <h2>Categorías</h2>

      <div className="category-grid">
        {categorias.map((categoria) => (
          <article
            key={categoria.idCategoria}
            className="category-card"
            style={{
              backgroundImage: `url(${obtenerImagen(categoria.nombre)})`,
            }}
          >
            <div className="category-overlay">
              <h3>{categoria.nombre}</h3>
              <p>{categoria.descripcion}</p>

              <Link
                className="btn-small"
                to={`/productos?categoria=${encodeURIComponent(categoria.nombre)}`}
              >
                Explorar
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Categorias;
