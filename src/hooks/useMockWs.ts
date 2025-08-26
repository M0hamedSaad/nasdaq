import { useEffect, useRef } from 'react';
import { useStockStore } from '@store';

type TickerMessage = {
  ev: 'T';
  sym: string;
  p: number; // price
  v: number; // volume
};

const generateRandomUpdate = (tickers: string[]): TickerMessage[] => {
  return tickers.map(ticker => ({
    ev: 'T',
    sym: ticker,
    p: parseFloat((Math.random() * 1000).toFixed(2)),
    v: Math.floor(Math.random() * 10000),
  }));
};

export const useMockWs = (tickers: string[]) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!tickers.length) return;

    intervalRef.current = setInterval(() => {
      const updates = generateRandomUpdate(tickers);
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
