import {
  IconAward,
  IconCloud,
  IconEyeFilled,
  IconLock,
  IconRocket,
  IconShieldCheck,
  IconTruckFilled
} from "@tabler/icons-react";
import "./nosotros.css";

const Nosotros = () => {
  return (
    <div className="nosotros-container">

      {/* HERO */}
      <section className="nosotros-hero">
        <h1>Sobre <span>TECHNOVA</span></h1>
        <p>Innovación tecnológica al alcance de todos</p>
      </section>

      {/* HISTORIA */}
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

      {/* GRID */}
     <section className="nosotros-grid">

  <div className="card mission-card">
    <h3>
      <IconShieldCheck size={26} stroke={2} />
      Misión
    </h3>
    <p>
      Brindar productos tecnológicos de calidad, con una experiencia de compra
      moderna, segura y accesible para todos.
    </p>
  </div>

  <div className="card vision-card">
    <h3>
      <IconEyeFilled size={26} />
      Visión
    </h3>
    <p>
      Convertirnos en una de las principales tiendas tecnológicas del país,
      destacando por innovación y confianza.
    </p>
  </div>

  <div className="card logros-card">
    <h3>
      <IconAward size={26} stroke={2} />
      Valores
    </h3>
    <p>
      Compromiso, innovación, calidad y enfoque en el cliente.
    </p>
  </div>

</section>

      {/* CIRCULOS */}
      <section className="nosotros-circles">

        <div className="circle highlight">
          <span>
            <IconTruckFilled size={34} />
          </span>
          <h3>Envíos rápidos</h3>
          <p>Todo el país</p>
        </div>

        <div className="circle highlight">
          <span>
            <IconLock size={34} stroke={2} />
          </span>
          <h3>Compra segura</h3>
          <p>Pagos verificados</p>
        </div>

        <div className="circle highlight">
          <span>
            <IconCloud size={34} stroke={2} />
          </span>
          <h3>Soporte 24/7</h3>
          <p>Atención rápida</p>
        </div>

      </section>

    </div>
  );
};

export default Nosotros;