import React, { useState } from "react";

const Card = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Función para limpiar y formatear el precio
  const formatPrice = (precio) => {
    if (!precio) return 'Precio no disponible';
    
    // Si el precio contiene múltiples precios separados por espacios o líneas
    const precios = precio.toString().split(/\s+|\n/).filter(p => p.trim());
    
    // Tomar solo el primer precio válido
    const primerPrecio = precios.find(p => 
      p.includes('$') || p.includes('€') || /\d/.test(p)
    );
    
    return primerPrecio || precios[0] || precio;
  };

  return (
    <div className="card-product">
      <div className="card-image">
        <img src={data.imagenURL} alt={data.titulo} />
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{data.titulo}</h3>
        <p className="card-store">{data.local}</p>
        <div className="card-footer">
          <span className="card-price">{formatPrice(data.precio)}</span>
          <button 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={toggleFavorite}
          >
            <span className="heart-icon">
              {isFavorite ? '❤️' : '🤍'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
