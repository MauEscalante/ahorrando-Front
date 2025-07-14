import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Search.css";
import { useSearch } from "../context/SearchContext";

export function Search() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { buscarProducto, isSearching } = useSearch();

  useEffect(() => {
    if (!isSearching) {
      setValue("");
    }
  }, [isSearching]);

  const handleValue = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.trim()) {
      try {
        const searchQuery = value.trim();
        await buscarProducto(searchQuery);
        // Cambiar la URL para incluir el término de búsqueda
        navigate(`/products/${encodeURIComponent(searchQuery)}`);
      } catch (error) {
        console.error('Error al iniciar búsqueda:', error);
      }
    }
  };

  return (
    <>
      <div className="py-4 pt-5 pb-5">
        <form onSubmit={handleSubmit}>
          <div className="contenedor-input">
            <input
              type="text"
              placeholder="Buscar..."
              className="form-control"
              onChange={handleValue}
              value={value}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Search;