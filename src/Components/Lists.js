import { useEffect, useState, useRef, use } from "react";
import { useParams } from "react-router-dom";
import { getFavorites, getProductByTitle } from "../controller/miApp.controller";
import Card from "./Card";
import bannerImage from "../Assets/banner-vertical-large-1.jpg";
import "../Style/Lists.css";
import { useSearch } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchTerm } = useSearch();
  const { user } = useAuth();
  const { searchTerm: urlSearchTerm } = useParams(); // Obtener término de búsqueda de la URL


  // Usar el término de búsqueda de la URL o del contexto
  const currentSearchTerm = urlSearchTerm || searchTerm;

  useEffect(() => {
    const loadFavorites = async () => {
      if (user) {
        const response = await getFavorites();
        setFavorites(response.favoritos || []);
      }
    };
    loadFavorites();
  }, []);

  //si busca
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll instantáneo al top

    const busquedaActiva = async () => {
      setCurrentPage(1); // Reiniciar la página actual al buscar
      setProducts([]); // Limpiar los productos actuales
      setHasMore(true); // Reiniciar hasMore

      setLoading(true);
      await getProductByTitle(currentSearchTerm, 1)
        .then(res => {
          if (res.data.length === 0) setHasMore(false);
          else {
            setProducts(res.data); // Reemplazar completamente los productos
            if (res.data.length < 12) {
              setHasMore(false);
            }
          }
        })
        .catch(err => console.error('Error obteniendo productos:', err))
        .finally(() => setLoading(false));
    }

    if (currentSearchTerm) {
      busquedaActiva();
    }
  }, [searchTerm, urlSearchTerm]);

  // Crear una referencia que apuntará al último producto de la lista
  const lastProductRef = useRef(null);

  const obtenerProductos = async (page) => {

    setLoading(true);
    await getProductByTitle(currentSearchTerm, page)
      .then(res => {
        if (res.data.length === 0) setHasMore(false);
        else {
          setProducts(prevProducts => [...prevProducts, ...res.data]);
          if (res.data.length < 12) {
            setHasMore(false); // Si la cantidad de productos es menor a 12, no hay más productos
          }
        }
      })
      .catch(err => console.error('Error obteniendo productos:', err))
      .finally(() => setLoading(false));
  };

  // Paso 2: Configurar el IntersectionObserver para detectar cuándo el último producto es visible
  useEffect(() => {
    const observer = new IntersectionObserver(OnIntersection, {
      threshold: 0.3
    });

    // Paso 3: Conectar el observer al último producto (si existe)
    if (lastProductRef.current) {
      observer.observe(lastProductRef.current);
    }

    // Paso 4: Limpiar el observer cuando el componente se desmonte o cambien las dependencias
    return () => {
      observer.disconnect();
    }
  }, [products, hasMore, loading]);

  // Paso 5: Función que se ejecuta cuando el último producto entra en el viewport
  const OnIntersection = async (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore && !loading) {
      await obtenerProductos(currentPage + 1);
      setCurrentPage(currentPage + 1); // Incrementar la página actual
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
                <Card data={data} key={`${data._id}-${index}`} esFavorito={favorites.includes(data._id)} ref={index === products.length - 1 ? lastProductRef : null} />
              ))
            ) : (
              !loading && (
                <p>
                  {currentSearchTerm
                    ? `No se encontraron productos para "${currentSearchTerm}"`
                    : "No se encontraron productos"
                  }
                </p>
              )
            )}

            {/* Skeleton cards para carga inicial */}
            {loading && (
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
          {loading && hasMore && (
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