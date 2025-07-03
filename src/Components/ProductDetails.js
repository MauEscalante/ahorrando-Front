import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js'; // Comentado temporalmente hasta instalar
import '../Style/ProductDetails.css';
import { getProductById, getDetalles } from '../controller/miApp.controller'; // Asegúrate de que esta función esté definida correctamente

const ProductDetails = () => {
    const params= useParams();
    const id=params.productId
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log('Product ID from params:', id);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProductById(id);
                console.log('Product data received:', productData);
                // El controlador devuelve { data: product }, así que accedemos a .data
                setProduct(productData.data);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching product:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Producto no encontrado</div>;

    return (
        <div className="product-details-container">
            <div className="product-info-section">
                <div className="product-main-info">
                    <div className="product-image-container">
                        <img 
                            src={product.imagenURL} 
                            alt={product.titulo} 
                            className="product-image"
                            loading="lazy"
                            decoding="async"
                            style={{
                                imageRendering: 'auto',
                                maxWidth: '100%',
                                height: 'auto'
                            }}
                        />
                    </div>
                    <div className="product-details-info">
                        <h1 className="product-title">{product.titulo}</h1>
                        <div className="product-price-info">
                            <span className="current-price">{product.precio}</span>
                            <span className="product-store">{product.local}</span>
                        </div>
                        <div className="product-actions">
                            <a href={product.localURL} target="_blank" rel="noopener noreferrer" className="btn-buy">
                                Ver producto en {product.local}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chart-section">
                <h3 className="chart-title">Historial de precios</h3>
                <div className="chart-container">
                    <p>Gráfico de precios pendiente</p>
                </div>
            </div>
        </div>
    );
}

    
export default ProductDetails;