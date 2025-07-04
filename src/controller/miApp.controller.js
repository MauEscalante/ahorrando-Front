import urlWebServices from './webServices.js';

export const signUp = async userData => {
  let url = urlWebServices.signUp;
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userData),
    });

    let data = await response.json();

    if (data.status === 400) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
};


export const signIn = async userData => {
  let url = urlWebServices.signIn;
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include', // Incluir cookies en la petición
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });

    let data = await response.json();
    if (data.status >= 400) {
      throw data;
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPromedios = async (id) => {
  let url = `${urlWebServices.getPromediosById}${id}`;

  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    let data = await response.json();

    if (response.status === 404) {
      throw new Error('Producto no encontrado');
    }

    return { data }; // Wrapping data to match expected structure
  } catch (error) {
    throw error;
  }
};

export const getDetalles = async (id, año, mes) => {
  let url = `${urlWebServices.getProduct}/detalles/${id}`;

  try {
    let response = await fetch(`${url}?año=${año}&mes=${mes}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    let data = await response.json();

    if (response.status === 404) {
      throw new Error('Detalles no encontrados');
    }

    return { data }; // Wrapping data to match expected structure
  } catch (error) {
    throw error;
  }
}

export const getProductById = async (id) => {
  let url = `${urlWebServices.getProductById}${id}`;

  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    let data = await response.json();

    if (response.status === 404) {
      throw new Error('Producto no encontrado');
    }

    return { data }; // Wrapping data to match expected structure
  } catch (error) {
    throw error;
  }
}

export const isLogged= async () => {
  let url = urlWebServices.isLogged;

  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include', // Incluir cookies en la petición
    });

    if (response.status === 401) {
      throw new Error('No autenticado');
    }

    let data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export const logout = async () => {
  let url = `${urlWebServices.logout}`;

  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include', // Incluir cookies en la petición
    });

    if (response.status !== 200) {
      throw new Error('Error al cerrar sesión');
    }

    return { message: 'Sesión cerrada correctamente' };
  } catch (error) {
    throw error;
  }
};    
