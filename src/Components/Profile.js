import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {  getProfile,getProductById } from '../controller/miApp.controller';
import Card from './Card';
import '../Style/Profile.css';

const Profile = () => {
  const [user,setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const response = await getProfile();

        const favorites = await Promise.all(
          response.data.user.favoritos.map(async productId => 
            await getProductById(productId)
          )
        );
        setFavorites(favorites);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error loading favorites:', error);
        setError('Error al cargar los favoritos');
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <h2>Debes iniciar sesión para ver tu perfil</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="user-info">
          <div className="user-avatar">
            <span className="avatar-icon">👤</span>
          </div>
          <div className="user-details">
            <h1 className="user-name">{user.nombre || 'Usuario'}</h1>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="favorites-section">
        <h2 className="section-title">Mis Favoritos</h2>
        
        {loading ? (
          <div className="loading">
            <p>Cargando favoritos...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="no-favorites">
            <p>No tienes productos favoritos aún</p>
            <p className="no-favorites-subtitle">
              Explora nuestros productos y marca tus favoritos para verlos aquí
            </p>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((product) => (
              <Card key={product._id} data={product.data} esFavorito={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;