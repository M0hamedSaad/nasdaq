import { useEffect, useRef } from 'react';
import { useStockStore } from '@store';

type TickerMessage = {
  ev: 'T';
  sym: string;
  p: number; // price
  v: number; // volume
};

// generate updates for selected tickers
const generateRandomUpdate = (tickers: string[]): TickerMessage[] => {
  return tickers.map(ticker => ({
    ev: 'T',
    sym: ticker,
    p: parseFloat((Math.random() * 500).toFixed(2)),
    v: Math.floor(Math.random() * 10000),
  }));
};

// pick N random tickers from the list
const pickRandomTickers = (tickers: string[], count: number) => {
  const shuffled = [...tickers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const useMockWs = (tickers: string[]) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!tickers.length) return;

    intervalRef.current = setInterval(() => {
      // pick 4 random tickers each interval
      const randomTickers = pickRandomTickers(tickers, 4);
      const updates = generateRandomUpdate(randomTickers);

      updates.forEach(msg => {
        useStockStore.getState().updateStock(msg.sym, {
          lastPrice: msg.p,
          volume: msg.v,
          updatedAt: Date.now(),
        });
      });
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [tickers]);
};
