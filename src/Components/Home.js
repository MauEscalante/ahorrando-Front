import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getFavorites } from "../controller/miApp.controller";
import Card from "../Components/Card";
import bannerImage from "../Assets/banner-vertical-large-1.jpg";
import "../Style/Home.css";

const Home = ({  searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const[currentPage, setCurrentPage] = useState(1);

  // Crear una referencia que apuntará al último producto de la lista
  const lastProductRef = useRef(null);

  const getProducts=(page) => {
    setLoading(true);
    fetch(`http://localhost:4000/api/products?page=${page}&limit=12`)
    .then(async res =>{
      if(!res.ok) throw new Error('Error al cargar productos');
      return await res.json();
    })
    .then(res=>{
      if(res.length===0) setHasMore(false);
      else{
         setProducts(prevProducts => [...prevProducts, ...res]);
          setCurrentPage(prevPage => prevPage + 1);
      }
    })
    .catch(err => console.error('Error fetching products:', err))
    .finally(() => setLoading(false));
  };

  // Cargar productos iniciales
  useEffect(() => {
    getProducts(currentPage);
  }, []);

  // Paso 2: Configurar el IntersectionObserver para detectar cuándo el último producto es visible
  useEffect(() => {
    const observer = new IntersectionObserver(OnIntersection, {
      threshold: 0.3
    });
    
    // Paso 3: Conectar el observer al último producto (si existe)
    if(lastProductRef.current) {
      observer.observe(lastProductRef.current);
    }
    
    // Paso 4: Limpiar el observer cuando el componente se desmonte o cambien las dependencias
    return () => {
      observer.disconnect();
    }
  }, [products, hasMore, loading]); 
  
  // Paso 5: Función que se ejecuta cuando el último producto entra en el viewport
  const OnIntersection=(entries)=>{
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore && !loading) {
      getProducts(currentPage);
    }
  }

  return (
    <div className="home-layout">
      {/* Banner izquierdo */}
      <div className="left-banner">
        <img 
          src={bannerImage} 
          alt="Banner publicitario" 
          className="banner-image"
        />
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        <div className="container text-center">
          
          <div className="contenedor-populars">
            {products.length > 0 ? (
              products.map((data, index) => (
                <Card data={data} key={data._id } esFavorito={favorites.includes(data._id)} ref={index === products.length - 1 ? lastProductRef : null}/>
              ))
            ) : (
              !loading && <p>No se encontraron productos</p>
            )}
            
            {/* Skeleton cards para carga inicial */}
            {loading  && (
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
          {loading  && hasMore && (
            <div className="loading-indicator">
              <div className="loading-spinner"></div>
              <p>Cargando más productos...</p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Home;