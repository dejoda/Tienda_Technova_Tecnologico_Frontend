import Hero from "./components/Hero";
import Historia from "./components/Historia";
import GridInfo from "./components/GridInfo";
import Circles from "./components/Circles";

import "./nosotros.css";

const Nosotros = () => {
  return (
    <div className="nosotros-container">
      <Hero />
      <Historia />
      <GridInfo />
      <Circles />
    </div>
  );
};

export default Nosotros;