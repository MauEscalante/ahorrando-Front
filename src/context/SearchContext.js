import { createContext, useContext, useState } from 'react';

// Crear el contexto de búsqueda
export const SearchContext = createContext();

// Hook personalizado para usar el contexto de búsqueda
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

// Proveedor del contexto de búsqueda
export const SearchProvider = ({ children }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const buscarProducto = async (searchQuery) => {
    try {
      setSearchTerm(searchQuery);
      setIsSearching(true);

    } catch (error) {
      console.error('Error al buscar producto:', error);
    }
  };

  const limpiarBusqueda = () => {
    setSearchTerm("");
    setIsSearching(false);
  };

  return (
    <SearchContext.Provider value={{ buscarProducto, isSearching, limpiarBusqueda, searchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
