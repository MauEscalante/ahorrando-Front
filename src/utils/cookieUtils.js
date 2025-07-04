// Función para obtener el valor de una cookie
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Función para eliminar una cookie
export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Función para obtener los datos del usuario desde la cookie token
export const getUserFromToken = () => {
  const token = getCookie('token');
  if (!token) return null;
  
  try {
    // Decodificar el JWT (solo la parte del payload)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const decoded = JSON.parse(jsonPayload);
    
    // Verificar si el token no ha expirado
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      deleteCookie('token');
      return null;
    }
    
    return decoded;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    deleteCookie('token');
    return null;
  }
};
