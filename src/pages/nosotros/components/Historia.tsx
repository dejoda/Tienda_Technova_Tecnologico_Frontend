import { IconRocket } from "@tabler/icons-react";
import "./style/Historia.css"
const Historia = () => {
  return (
    <section className="nosotros-section">
      <div className="nosotros-text">
        <h2>Nuestra Historia</h2>

          <p>
            Technova nace con la visión de revolucionar la forma en que las personas
            acceden a la tecnología. Desde nuestros inicios, nos enfocamos en ofrecer
            productos de alta calidad, combinando innovación, rendimiento y diseño.
          </p>

          <p>
            Lo que empezó como una pequeña iniciativa, hoy se ha convertido en una
            tienda tecnológica en crecimiento, conectando a cientos de usuarios con
            lo último en laptops, smartphones y accesorios.
          </p>
      </div>

      <div className="nosotros-card">
        <span className="hero-icon">
          <IconRocket stroke={2} size={42} />
        </span>
        <h3>Innovación constante</h3>
        <p>Siempre a la vanguardia en tecnología</p>
      </div>
    </section>
  );
};

export default Historia;