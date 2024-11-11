const API_URL = "https://66fc939ac3a184a84d175ec7.mockapi.io/api/users";

export class FavoriteService {
  static async addFavorite(userId, coin) {
    try {
      const response = await fetch(`${API_URL}/${userId}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coin),
      });
      if (!response.ok) {
        throw new Error("Error al agregar el favorito");
      }
      return await response.json();
    } catch (error) {
      console.error("Error al agregar favorito:", error);
      throw error;
    }
  }

  static async getFavorites(userId) {
    try {
      const response = await fetch(`${API_URL}/${userId}/favorites`);
      if (!response.ok) {
        throw new Error("Error al obtener los favoritos");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
      throw error;
    }
  }
}
