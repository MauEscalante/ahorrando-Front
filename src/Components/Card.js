import  {  useState, forwardRef } from "react";
import { useNavigate } from 'react-router-dom';
import { toggleFavorites } from "../controller/miApp.controller";
import notFoundImage from "../Assets/notFound.jfif";

// forwardRef permite que este componente reciba un 'ref' desde su padre (Home)
const Card = forwardRef(({ data , esFavorito}, ref) => {
  
  const [isFavorite, setIsFavorite] = useState(esFavorito);
  const navigate = useNavigate();

  const toggleFavorite = async (e) => {
    e.stopPropagation(); // Evitar que el clic se propague al card
    await toggleFavorites( data._id, isFavorite);
    setIsFavorite(!isFavorite);    
  };

  const handleCardClick = () => {
    navigate(`/product/${data._id}`);
  };

  return (
    <div className="card-product" onClick={handleCardClick} style={{ cursor: 'pointer' }} ref={ref}>
      <div className="card-image">
        {data.imagenURL ?(
           <img src={data.imagenURL} alt={data.titulo} />
        ) :(
          <img src={notFoundImage} alt="No encontrado" />
        )
        
        }
       
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
});

export default Card;
