import { StockItem } from '@types';
import { create } from 'zustand';

type State = {
  stocks: Record<string, StockItem>;
  setInitialStocks: (list: StockItem[]) => void;
  updateStock: (ticker: string, data: Partial<StockItem>) => void;
};

export const useStockStore = create<State>(set => ({
  stocks: {},
  setInitialStocks: items =>
    set(state => {
      const updated = { ...state.stocks };
      items.forEach(item => {
        if (!updated[item.ticker]) {
          updated[item.ticker] = {
            ticker: item.ticker,
            name: item.name,
            lastPrice: parseFloat((Math.random() * 1000).toFixed(2)),
            volume: Math.floor(Math.random() * 10000),
          };
        } else
          updated[item.ticker] = {
            ...state.stocks[item.ticker],
            ticker: item.ticker,
            name: item.name,
          };
      });
      return { stocks: updated };
    }),
  updateStock: (ticker, data) =>
    set(state => ({
      stocks: {
        ...state.stocks,
        [ticker]: { ...state.stocks[ticker], ...data },
      },
    })),
}));
