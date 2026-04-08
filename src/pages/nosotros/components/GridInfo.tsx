import {
  IconAward,
  IconEyeFilled,
  IconShieldCheck,
} from "@tabler/icons-react";

import "./style/GridInfo.css"

const GridInfo = () => {
  return (
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
  );
};

export default GridInfo;