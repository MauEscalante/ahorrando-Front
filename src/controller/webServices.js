const urlApi= process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const urlWebServices = {
  signUp: `${urlApi}/user/register`,
  signIn: `${urlApi}/user/login`,
  getPromediosById: `${urlApi}/products/search/`,
  getProductById: `${urlApi}/products/id/`,
};

export default urlWebServices;
