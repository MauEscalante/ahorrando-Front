const urlApi= process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const urlWebServices = {
  signUp: `${urlApi}/users/register`,
  signIn: `${urlApi}/users/login`,
  getPromediosById: `${urlApi}/products/search/`,
  getProductById: `${urlApi}/products/id/`,
};

export default urlWebServices;
