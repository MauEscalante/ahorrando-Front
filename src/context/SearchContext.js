import React, { createContext, useContext, useState } from 'react';
import { getProductByTitle } from '../controller/miApp.controller';

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
  const[productosBuscados, setProductos] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const buscarProducto=async (searchQuery) => {
    try{
        console.log('Buscando producto:', searchQuery);
        setIsSearching(true);
        const response = await getProductByTitle(searchQuery);
        setProductos(response.data);
    }catch (error) {
        console.error('Error al buscar producto:', error);
    }
  };

  const limpiarBusqueda = () => {
    setProductos([]);
    setIsSearching(false);
  };

  return (
    <SearchContext.Provider value={{ productosBuscados, buscarProducto,isSearching,setIsSearching, limpiarBusqueda }}>
      {children}
    </SearchContext.Provider>
  );
};
