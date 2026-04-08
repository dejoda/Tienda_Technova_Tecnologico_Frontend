import {
  IconCloud,
  IconLock,
  IconTruckFilled
} from "@tabler/icons-react";
import "./style/Circles.css"

const Circles = () => {
  return (
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
  );
};

export default Circles;