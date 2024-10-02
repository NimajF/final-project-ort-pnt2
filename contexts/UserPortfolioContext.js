import { unloadAllAsync } from "expo-font";
import { createContext, useEffect, useState } from "react";

const UserPortFolioContext = createContext();

export const UserPortFolioProvider = ({ children }) => {
  const initialState = {
    coins: {},
    total: 0,
  };
  const [portfolio, setPortfolio] = useState(initialState);

  useEffect(() => {
    const storedPortfolio = localStorage.getItem("userPortfolio");
    if (storedPortfolio) {
      setPortfolio(JSON.parse(storedPortfolio));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("userPortfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  const addOrUpdateCoin = (coinName, amount, date, price) => {
    setPortfolio(prevPortfolio => {
        const updatedCoins = { ...prevPortfolio.coins }; 

        if (updatedCoins[coinName]) {
            updatedCoins[coinName].amount += amount;
            updatedCoins[coinName].date = date;
            updatedCoins[coinName].price = price;
        } else {
            updatedCoins[coinName] = { amount, date, price };
        }

        return { ...prevPortfolio, coins: updatedCoins };
    });
};

  const getAmountOfXCoin = (coinName) => {
    const total = Object.keys(portfolio.coins)
    console.log(total)

    return total;
  };

  return (
    <UserPortFolioContext.Provider
      value={{ portfolio, setPortfolio, addOrUpdateCoin }}
    >
      {children}
    </UserPortFolioContext.Provider>
  );
};
