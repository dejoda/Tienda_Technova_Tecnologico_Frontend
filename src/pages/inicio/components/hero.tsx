import heroImg from "../../../assets/hero.jpg";
import "./style/hero.css";

const Hero = () => {
  return (
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
        <a href="/productos" className="hero-btn">
          Ver catálogos y ofertas
        </a>
      </div>
    </section>
  );
};

export default Hero;