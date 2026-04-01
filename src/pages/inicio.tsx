import heroImg from "../assets/hero.jpg";
import laptopImg from "../assets/categoria/laptop.jpg";
import perifericos from "../assets/categoria/perifericos.jpg";
import audifonosImg from "../assets/categoria/audifonos.jpg";
import componentesImg from "../assets/categoria/componentes.jpg";
import "./style/inicio.css";

const inicio = () => {
  const marcas = ["TECHNOVA", "Quantum", "NextGear", "HyperOne", "NeonPulse"];

  const categorias = [
    {
      name: "Laptops",
      icon: "💻",
      description: "Portátiles de alto rendimiento",
      image: laptopImg,
    },
    {
      name: "Periféricos",
      icon: "🖱️",
      description: "Teclados, mouses y más",
      image: perifericos,
    },
    {
      name: "Audio",
      icon: "🎧",
      description: "Audífonos y parlantes",
      image: audifonosImg,
    },
    {
      name: "Componentes",
      icon: "🔧",
      description: "Partes para ensamblar",
      image: componentesImg,
    },
  ];

  const productos = [
    {
      id: 1,
      name: "Laptop Ultrabook X1",
      price: "$999",
      description: "Rendimiento pro para trabajo y gaming ligero.",
    },
    {
      id: 2,
      name: "Teclado Mecánico RGB",
      price: "$79",
      description: "Tactile y duradero con luces personalizables.",
    },
    {
      id: 3,
      name: "Mouse Gummies",
      price: "$49",
      description: "Precisión 16K DPI y grip ergonómico.",
    },
    {
      id: 4,
      name: "Audífonos 7.1 Surround",
      price: "$129",
      description: "Sonido inmersivo y micrófono con cancelación de ruido.",
    },
  ];

  return (
    <main className="home-page">
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImg})` }}
        aria-label="Hero introductorio de la tienda"
      >
        <div className="hero-overlay">
          <p className="hero-subtitle">Tu destino tecnológico</p>
          <h1>Bienvenido a TECHNOVA</h1>
          <p className="hero-text">
            Equipamos tu día a día con equipos y accesorios de última
            generación.
          </p>
          <a href="/Productos" className="hero-btn">
            Ver catálogos y ofertas
          </a>
        </div>
      </section>

      <section className="categories-section">
        <h2>Categorías</h2>
        <div className="category-grid">
          {categorias.map((categoria) => (
            <article
              key={categoria.name}
              className="category-card"
              style={
                categoria.image
                  ? { backgroundImage: `url(${categoria.image})` }
                  : {}
              }
            >
              <div className="category-overlay">
                <div className="category-icon">{categoria.icon}</div>
                <h3>{categoria.name}</h3>
                <p>{categoria.description}</p>
                <a className="btn-small" href="/Productos">
                  Explorar
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="brands-section">
        <h2>Marcas</h2>
        <ul className="brand-list">
          {marcas.map((marca) => (
            <li key={marca} className="brand-item">
              {marca}
            </li>
          ))}
        </ul>
      </section>
      <section className="products-section">
        <h2>Productos destacados</h2>
        <div className="product-grid">
          {productos.map((producto) => (
            <div key={producto.id} className="product-card">
              <div className="product-thumb">{producto.name.charAt(0)}</div>
              <h3>{producto.name}</h3>
              <p>{producto.description}</p>

              <div className="product-footer">
                <span className="price">{producto.price}</span>
                <a href="/Productos" className="btn-small">
                  Ver más
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default inicio;
