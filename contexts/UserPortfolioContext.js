import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserPortfolioContext = createContext();

export const UserPortfolioProvider = ({ children }) => {
  const initialState = {
    coins: [],
    totalInvestment: 0,
  };
  const [portfolio, setPortfolio] = useState(initialState);

  useEffect(() => {
    console.log(portfolio);
    const loadPortfolio = async () => {
      try {
        const storedPortfolio = await AsyncStorage.getItem("userPortfolio");
        if (storedPortfolio) {
          setPortfolio(JSON.parse(storedPortfolio));
        }
      } catch (error) {
        console.error("Error loading portfolio from AsyncStorage:", error);
      }
    };
    loadPortfolio();
  }, []);

  useEffect(() => {
    const savePortfolio = async () => {
      try {
        await AsyncStorage.setItem("userPortfolio", JSON.stringify(portfolio));
      } catch (error) {
        console.error("Error saving portfolio to AsyncStorage:", error);
      }
    };

    savePortfolio();
  }, [portfolio]);

  const addOrUpdateCoin = (
    coinName,
    amount,
    price,
    inversion,
    coinId,
    coinImage
  ) => {
    const date = new Date().toISOString();
    setPortfolio((prevPortfolio) => {
      const updatedCoins = Array.isArray(prevPortfolio.coins)
        ? [...prevPortfolio.coins]
        : [];
      const coinIndex = updatedCoins.findIndex(
        (coin) => coin.symbol === coinName
      );

      if (coinIndex !== -1) {
        const existingCoin = updatedCoins[coinIndex];
        updatedCoins[coinIndex] = {
          ...existingCoin,
          transactions: [
            ...existingCoin.transactions,
            {
              amount: parseFloat(amount),
              price: parseFloat(price),
              transactionInversion: parseFloat(inversion),
              date,
            },
          ],
          totalAmount:
            parseFloat(existingCoin.totalAmount) + parseFloat(amount),
          totalCoinInversion:
            parseFloat(existingCoin.totalCoinInversion) + parseFloat(inversion),
        };
      } else {
        updatedCoins.push({
          symbol: coinName,
          coinId: coinId,
          coinImage,
          transactions: [
            {
              amount: parseFloat(amount),
              price: parseFloat(price),
              transactionInversion: parseFloat(inversion),
              date,
            },
          ],
          totalAmount: parseFloat(amount),
          totalCoinInversion: parseFloat(inversion),
        });
      }

      return {
        ...prevPortfolio,
        coins: updatedCoins,
        totalInvestment:
          parseFloat(prevPortfolio.totalInvestment || 0) +
          parseFloat(inversion),
      };
    });
  };

  // const getAmountOfXCoin = (coinName) => {
  //   const total = Object.keys(portfolio.coins);
  //   console.log(total);

  //   return total;
  // };

  return (
    <UserPortfolioContext.Provider
      value={{ portfolio, setPortfolio, addOrUpdateCoin }}
    >
      {children}
    </UserPortfolioContext.Provider>
  );
};
