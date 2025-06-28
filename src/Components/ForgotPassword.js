import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/ForgotPassword.css';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulación de envío de email (aquí irías al backend)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsEmailSent(true);
      
    } catch (error) {
      setErrors({ general: 'Error al enviar el email. Intenta nuevamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (isEmailSent) {
    return (
      <div className="forgot-password-container">
        <div className="forgot-password-background">
          <div className="background-overlay"></div>
        </div>
            <div className="forgot-password-content">
        <div className="forgot-password-form-container">
          <div className="success-container">
            <div className="success-icon">
              <span>✅</span>
            </div>
            <div className="success-header">
              <h1>Email enviado</h1>
              <p>Hemos enviado las instrucciones para restablecer tu contraseña a <strong>{formData.email}</strong></p>
            </div>
            
            <div className="success-instructions">
              <h3>¿Qué hacer ahora?</h3>
              <ul>
                <li>Revisa tu bandeja de entrada</li>
                <li>Si no lo encuentras, revisa la carpeta de spam</li>
                <li>Haz clic en el enlace del email para restablecer tu contraseña</li>
                <li>El enlace expira en 24 horas</li>
              </ul>
            </div>

            <div className="success-actions">
              <button
                onClick={handleBackToLogin}
                className="form-submit-button"
              >
                Volver al login
              </button>
              
              <button
                onClick={() => setIsEmailSent(false)}
                className="resend-button"
              >
                Enviar de nuevo
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-background">
        <div className="background-overlay"></div>
      </div>
      
      <div className="forgot-password-content">
        <div className="forgot-password-form-container">
          <div className="forgot-password-header">
            <h1>¿Olvidaste tu contraseña?</h1>
            <p>No te preocupes, te ayudamos a recuperar tu cuenta</p>
          </div>

          <form onSubmit={handleSubmit} className="forgot-password-form">
            {errors.general && (
              <div className="error-message general-error">
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <span className="label-icon">📧</span>
                Email de tu cuenta
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Ingresa tu email"
                autoComplete="email"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-info">
              <p>Te enviaremos un enlace para restablecer tu contraseña a este email.</p>
            </div>

            <button
              type="submit"
              className={`form-submit-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Enviando email...
                </>
              ) : (
                'Enviar instrucciones'
              )}
            </button>
          </form>

          <div className="forgot-password-footer">
            <p>
              ¿Recordaste tu contraseña?{' '}
              <Link to="/login" className="back-to-login-link">
                Volver al login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
