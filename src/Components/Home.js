import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Card from "../Components/Card";
import { LocalMarketplace, ReferralAd } from "../Components/LocalAds";
import "../Style/Home.css";

const Home = ({  searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  
  const PRODUCTS_PER_PAGE = 12; // Número de productos por página
  
  const fetchProducts = useCallback(async (pageNum = 1, reset = false, searchQuery = null) => {
    try {
      setLoading(true);
      let response;
      
      if (searchQuery) {
        // Buscar productos con paginación
        response = await axios.get(`http://localhost:4000/api/products/${searchQuery}?page=${pageNum}&limit=${PRODUCTS_PER_PAGE}`);
      } else {
        // Obtener todos los productos con paginación
        response = await axios.get(`http://localhost:4000/api/products?page=${pageNum}&limit=${PRODUCTS_PER_PAGE}`);
      }
      
      if (reset) {
        setProducts(response.data);
        console.log('📦 Productos cargados (reset):', response.data.length);
        console.log('🔍 Muestra de datos:', response.data.slice(0, 2));
      } else {
        setProducts(prev => [...prev, ...response.data]);
        console.log('📦 Productos agregados:', response.data.length);
      }
      
      // Si recibimos menos productos que el límite, no hay más páginas
      setHasMore(response.data.length === PRODUCTS_PER_PAGE);
      setInitialLoad(false);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [PRODUCTS_PER_PAGE]);
  
  useEffect(() => {
    fetchProducts(1, true); // Carga inicial
  }, [fetchProducts]);

  // Efecto para manejar inicio de búsqueda
  useEffect(() => {
    if (searchTerm !== null) {
      console.log('� Starting search for:', searchTerm);
      setIsSearching(true);
      setCurrentPage(1);
      setHasMore(true);
      fetchProducts(1, true, searchTerm);
    }
  }, [searchTerm, fetchProducts]);

  // Efecto para manejar el reset de búsqueda
  useEffect(() => {
    if (searchTerm === null && isSearching) {
      console.log('🏠 Resetting to all products');
      setIsSearching(false);
      setCurrentPage(1);
      setHasMore(true);
      fetchProducts(1, true);
    }
  }, [searchTerm, isSearching, fetchProducts]);

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;
      
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Si el usuario está cerca del final (200px antes), cargar más
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        setCurrentPage(prevPage => {
          const newPage = prevPage + 1;
          // Pasar el término de búsqueda si estamos buscando
          fetchProducts(newPage, false, isSearching ? searchTerm : null);
          return newPage;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, isSearching, searchTerm, fetchProducts]);


  return (
    <>
    <div className="home-layout">
      {/* Banner publicitario izquierdo - Anuncios Locales */}
      <div className="ad-banner left-ad">
        <LocalMarketplace />
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        <div className="container text-center">
          
          <div className="contenedor-populars">
            {products.length > 0 ? (
              products.map((data, index) => (
                <Card data={data} key={data._id || index} />
              ))
            ) : (
              !loading && !initialLoad && <p>No se encontraron productos</p>
            )}
            
            {/* Skeleton cards para carga inicial */}
            {loading && initialLoad && (
              <>
                {[...Array(8)].map((_, index) => (
                  <div key={`skeleton-${index}`} className="skeleton-card">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-content">
                      <div className="skeleton-store"></div>
                      <div className="skeleton-title"></div>
                      <div className="skeleton-title short"></div>
                      <div className="skeleton-price"></div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          
          {/* Indicador de carga para scroll infinito */}
          {loading && !initialLoad && (
            <div className="loading-indicator">
              <div className="loading-spinner"></div>
              <p>Cargando más productos...</p>
            </div>
          )}
          
          
        </div>
      </div>

      {/* Banner publicitario derecho - Anuncio de referidos */}
      <div className="ad-banner right-ad">
        <ReferralAd />
      </div>
    </div>
  </>
  );
};

export default Home;