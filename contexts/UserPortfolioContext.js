import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { calculateTotalPnL, fetchPricesFromAPI } from "../utils/handlers";

export const UserPortfolioContext = createContext();

export const UserPortfolioProvider = ({ children }) => {
  const initialState = {
    coins: [],
    totalInvestment: 0,
  };
  const [portfolio, setPortfolio] = useState(initialState);
  const [symbols, setSymbols] = useState([]);
  const [prices, setPrices] = useState(null);
  const [pnl, setPnl] = useState(0);

  useEffect(() => {
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

    if (portfolio?.coins) {
      const generatedSymbols = Array.from(
        new Set(portfolio.coins.map((c) => c.coinId))
      );
      setSymbols(generatedSymbols);
    }
  }, [portfolio]);

  useEffect(() => {
    const fetchPrices = async () => {
      if (!symbols.length || prices) return;

      try {
        const res = await fetchPricesFromAPI(symbols);
        if (res) {
          setPrices(res);
          const calculatedPnL = calculateTotalPnL(portfolio, res);
          console.log(calculatedPnL);
          setPnl(calculatedPnL);
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
  }, [symbols, prices]);

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

  return (
    <UserPortfolioContext.Provider
      value={{ portfolio, setPortfolio, addOrUpdateCoin, symbols, pnl, prices }}
    >
      {children}
    </UserPortfolioContext.Provider>
  );
};
