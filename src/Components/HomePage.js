
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from './Search';
import '../Style/HomePage.css';


const HomePage = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleViewAllProducts = () => {
        navigate('/products/all');
    };

    return (
        <div className="homepage">
            {/* Hero Section - Completamente Rediseñada desde 0 */}
            <section className={`new-hero ${isVisible ? 'animate-in' : ''}`}>
                {/* Background Elements */}
                <div className="hero-bg-wrapper">
                    <div className="hero-bg-gradient"></div>
                    <div className="hero-bg-pattern"></div>
                    <div className="hero-floating-elements">
                        <div className="floating-shape shape-1"></div>
                        <div className="floating-shape shape-2"></div>
                        <div className="floating-shape shape-3"></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="hero-main-content">
                    <div className="hero-container-new">
                        {/* Left Side - Content */}
                        <div className="hero-content-left">
                           

                            {/* Main Title */}
                            <h1 className="hero-main-title">
                                <span className="title-line-1">Compara precios</span>
                                <span className="title-line-2">
                                    y encuentra las 
                                    <span className="title-highlight"> mejores ofertas</span>
                                </span>
                                <span className="title-line-3">en tecnología</span>
                            </h1>

                            {/* Description */}
                            <p className="hero-description-new">
                                Agrega tus productos favoritos y recibe alertas de precios.
                            </p>

                            {/* Search Bar Enhanced */}
                           

                            {/* Action Buttons */}
                            <div className="hero-actions">
                                <button 
                                    className="btn-primary-new"
                                    onClick={handleViewAllProducts}
                                >
                                    <span className="btn-content">
                                        <span className="btn-icon-new">🔍</span>
                                        <span className="btn-text">Explorar Productos</span>
                                    </span>
                                    <div className="btn-glow"></div>
                                </button>
                               
                            </div>

                         
                        </div>

                        {/* Right Side - Visual */}
                        <div className="hero-content-right">
                            <div className="hero-visual-new">
                                {/* Interactive Price Comparison Card */}
                                <div className="price-comparison-card">
                                    <div className="card-header">
                                        <div className="card-title">
                                            <span className="card-icon">�</span>
                                            <span>Comparación en vivo</span>
                                        </div>
                                        <div className="live-indicator">
                                            <div className="live-dot"></div>
                                            <span>En tiempo real</span>
                                        </div>
                                    </div>
                                    
                                    <div className="product-showcase">
                                        <div className="product-image-new">
                                            <div className="product-placeholder-new">
                                                <div className="placeholder-icon">🎮</div>
                                            </div>
                                            <div className="product-badge">Popular</div>
                                        </div>
                                        <div className="product-details">
                                            <h3 className="product-name">GeForce RTX 4070 Ti</h3>
                                            <p className="product-specs">12GB GDDR6X • Ray Tracing</p>
                                        </div>
                                    </div>

                                    

                                    <div className="savings-highlight">
                                        <div className="savings-amount">
                                            <span className="savings-label">Ahorro potencial:</span>
                                            <span className="savings-value">$20.000</span>
                                        </div>
                                        <div className="savings-percentage">-6.5%</div>
                                    </div>
                                </div>

                                {/* Floating Stats */}
                                <div className="floating-stats">
                                    <div className="stat-item stat-1">
                                        <div className="stat-icon">🏪</div>
                                        <div className="stat-number">5+</div>
                                        <div className="stat-label">Tiendas</div>
                                    </div>
                                    <div className="stat-item stat-2">
                                        <div className="stat-icon">📦</div>
                                        <div className="stat-number">1000+</div>
                                        <div className="stat-label">Productos</div>
                                    </div>
                                    <div className="stat-item stat-3">
                                        <div className="stat-icon">⚡</div>
                                        <div className="stat-number">24/7</div>
                                        <div className="stat-label">Actualización</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <div className="features-section">
                <h2 className="section-title">¿Por qué elegirnos?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Búsqueda Rápida</h3>
                        <p>Encuentra productos en segundos con nuestro sistema de búsqueda inteligente</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💰</div>
                        <h3>Precios históricos</h3>
                        <p>Consulta el historial de precios para tomar decisiones informadas</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔄</div>
                        <h3>Actualización Constante</h3>
                        <p>Nuestros datos se actualizan regularmente para ofrecerte información precisa</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Notificación de Baja de Precio</h3>
                        <p>Recibe alertas cuando los precios bajen en tus productos favoritos</p>
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default HomePage;