import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Search.css";

export function Search({ onSearchResults, onSearchStart }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleValue = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      const searchQuery = value.trim();
      onSearchStart(searchQuery); // Envía el término de búsqueda al componente padre
      
      // Navegar con el estado de búsqueda para asegurar que se mantenga
      navigate("/", { state: { searchTerm: searchQuery } });
    }
  };


  return (
    <>
      <div
        className="  py-4 pt-5 pb-5"
      >

        <form onSubmit={handleSubmit}>
          <div className="contenedor-input">
            <input
              type="text"
              placeholder="Buscar..."
              className="form-control"
              onChange={handleValue}
              value={value}
            />
            <button type="submit" className="search-button">
              <span className="search-icon">🔍</span>
            </button>
          </div>
        </form>
      </div>

      
    </>
  );
};

export default Search;