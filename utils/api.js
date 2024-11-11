const API_URL = "https://673102b37aaf2a9aff0f9326.mockapi.io/api/users";

// Función para hacer un GET de todos los usuarios
export const getUsers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener los usuarios");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUser = async (usuario) => {
  try {
    // Asegúrate de que el objeto usuario contiene todos los campos necesarios
    const body = JSON.stringify({
      username: usuario.username, // Asegurarte de que el username esté bien asignado
      email: usuario.email,
      password: usuario.password,
      portfolio: usuario.portfolio || {}, // Si no hay portfolio, pasar un objeto vacío
      admin: usuario.admin || false, // Si no se especifica admin, por defecto será false
      favorites: usuario.favorites || [], // Si no se especifica, será un array vacío
    });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error("Error al registrar el usuario");
    }

    // Retornar la respuesta del servidor
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para hacer un POST (login de usuario)
export const loginUser = async (username, password) => {
  try {
    const users = await getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
