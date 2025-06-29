import React from "react";
import { useState } from "react";
import "../Style/Search.css";

export function Search({ onSearchResults, onSearchStart }) {
  const [value, setValue] = useState("");

  const handleValue = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      console.log('🔍 Searching for:', value);
      onSearchStart(value.trim()); // Envía el término de búsqueda al componente padre
    }
    setValue("")
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