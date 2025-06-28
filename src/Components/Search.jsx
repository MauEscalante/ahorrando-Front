import React from "react";
import axios from "axios";
import { useState } from "react";
import "../Style/Search.css";

export function Search({ media }) {
  const [value, setValue] = useState("");
  const [entretenimiento, setEntretenimiento] = useState([]);

  const handleValue = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.themoviedb.org/3/search/${media}?api_key=425c2d87b8b9c812c4101db1f80fd9e5&language=en-US&query=${value}&include_adult=false`
      )
      .then((res) => setEntretenimiento(res.data.results));
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