import urlWebServices from './webServices.js';


//user-related endpoints

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
  
export const getProfile = async () => {
  let url = urlWebServices.getProfile;
  console.log('Fetching profile from:', url);
  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include', // Incluir cookies en la petición
    });

    if (response.status === 404) {
      throw new Error('Usuario no encontrado');
    }

    let data = await response.json();
    return { data }; // Wrapping data to match expected structure
  } catch (error) {
    throw error;
  }
}

export const getFavorites = async () => {
  let url = urlWebServices.getFavorite;

  try {
      let response = await fetch(`${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include', // Incluir cookies en la petición
      });

      if (response.status === 404) {
        throw new Error('Usuario no encontrado');
      }

      
      let data = await response.json();
    return data; // Retorna el estado de favorito
  } catch (error) {
    throw error;
  }
}

export const toggleFavorites = async (productId, isFavorite) => {
  let url = `${urlWebServices.toggleFavorite}${productId}`;
  try {
    let response = await fetch(url, {
      method: isFavorite ? 'DELETE' : 'PUT', // DELETE si es favorito, PUT si no lo es
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include', // Incluir cookies en la petición
    });

    if (response.status === 404) {
      throw new Error('Usuario o producto no encontrado');
    }

    let data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

  // Product-related endpoints
export const getProducts=async (page, limit) => {
  let url = `${urlWebServices.getProducts}?page=${page}&limit=${limit}`;
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
      throw new Error('Productos no encontrados');
    }

    return { data }; // Wrapping data to match expected structure
  } catch (error) {
    throw error;
  }
}

export const getDetailsById = async (id) => {
  let url = `${urlWebServices.getDetailsById}${id}`;

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
      throw new Error('Detalles no encontrados');
    }

    return { data }; // Wrapping data to match expected structure
  } catch (error) {
    throw error;
  }
}

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








