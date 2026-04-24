import { useState } from "react";
import { useNavigate } from "react-router";
import "./buscador.css";
import { IconSearchFilled } from "@tabler/icons-react";
import Sugerencias from "./components/sugerencias";

const Buscador = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const goToSearch = (nombre: string) => {
    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      navigate("/productos");
      setSearchValue("");
      return;
    }

    navigate(`/productos?nombre=${encodeURIComponent(nombreLimpio)}`);
    setSearchValue("");
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    goToSearch(searchValue);
  };

  return (
    <div className="header-search-wrap">
      <form className="header-search" onSubmit={handleSearchSubmit}>
        <input
          className="header-search__input"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Buscar productos"
          aria-label="Buscar productos"
        />
        <button className="header-search__button" type="submit" aria-label="Buscar">
          <IconSearchFilled size={16} />
        </button>
      </form>

      <Sugerencias query={searchValue} onSelect={goToSearch} />
    </div>
  );
};

export default Buscador;
