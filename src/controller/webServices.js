const urlApi= "https://ahorrando-api.onrender.com/api" // para producción
// const urlApi = "http://localhost:4000/api"; // para desarrollo local

const urlWebServices = {
  // User-related endpoints
  signUp: `${urlApi}/users/register`,
  signIn: `${urlApi}/users/login`,
  logout: `${urlApi}/users/logout`,
  isLogged: `${urlApi}/users/me/logged`,
  getProfile: `${urlApi}/users/me/profile`,

  getFavorite: `${urlApi}/users/list/favorito`,
  toggleFavorite: `${urlApi}/users/favoritos/`,

  // Product-related endpoints
  getProducts: `${urlApi}/products`,
  getDetailsById: `${urlApi}/products/detalles/`,
  getPromediosById: `${urlApi}/products/search/`,
  getProductById: `${urlApi}/products/id/`,
  getProductByTitle: `${urlApi}/products/title/`,
};

export default urlWebServices;
