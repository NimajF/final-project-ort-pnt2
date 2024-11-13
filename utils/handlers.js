export async function addToPortfolio(userId, portfolio) {
  const response = await fetch(
    `https://66fc939ac3a184a84d175ec7.mockapi.io/api/users/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ portfolio }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update portfolio");
  }

  return response.json();
}

export async function addToFavorites(userId, coin, favorites){
  favorites.push(coin)
  const response = await fetch(
    `https://66fc939ac3a184a84d175ec7.mockapi.io/api/users/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorites }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update favorites");
  }

  return response.json();
}