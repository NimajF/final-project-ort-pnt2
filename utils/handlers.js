import { MdExposureZero } from "react-icons/md";

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

export async function addToFavorites(userId, coin, favorites) {
  favorites.push(coin);
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

export async function getFavorites(userId) {
  try {
    const response = await fetch(
      `https://66fc939ac3a184a84d175ec7.mockapi.io/api/users/${userId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch favorites");
    }
    const data = await response.json();
    return data.favorites;
  } catch (error) {
    console.error(error);
  }
}

export function calculateTotalPnL(portfolio, prices) {
  if (!portfolio?.coins || portfolio.coins.length === 0) return 0;
  let totalPnL = 0;
  portfolio.coins.forEach((c) => {
    const currentPrice = prices[c.coinId]?.usd;
    if (currentPrice) {
      const currentValue = c.totalAmount * currentPrice;
      const pnl = currentValue - c.totalCoinInversion;
      totalPnL += pnl;
    }
  });
  return totalPnL.toFixed(3);
}

export function calculateCoinPnL(
  totalAmount,
  currentPrice,
  totalCoinInversion
) {
  const currentValue = totalAmount * currentPrice;
  const pnl = currentValue - totalCoinInversion;
  const percentage = (pnl * 100) / totalCoinInversion;
  return {
    pnl: pnl.toFixed(3),
    percentage: percentage.toFixed(2),
  };
}

export async function fetchPricesFromAPI(symbols) {
  try {
    const symbolsQuery = symbols.join(",");
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${symbolsQuery}&vs_currencies=usd`
    );
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching prices from API:", error);
    throw error;
  }
}
