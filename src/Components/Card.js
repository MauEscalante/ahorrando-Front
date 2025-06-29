import React, { useState } from "react";

const Card = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
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
          <span className="card-price">{data.precio}</span>
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
