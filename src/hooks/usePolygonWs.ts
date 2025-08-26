import { useStockStore } from '@store';
import { useEffect, useRef } from 'react';
import _ from 'lodash';
import { ENV } from '@constants';
export const usePolygonWs = (tickers: string[]) => {
  const wsRef = useRef<WebSocket | null>(null);
  const prevTickersRef = useRef<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket(ENV.POLYGON_DELAYED_WS_STOCKS);
    wsRef.current = ws;

    const updateStock = _.throttle((ticker, data) => {
      useStockStore.getState().updateStock(ticker, data);
    }, 100);

    ws.onopen = () => {
      console.log('ws.onopen');
      ws.send(JSON.stringify({ action: 'auth', params: ENV.POLYGON_API_KEY }));
    };

    ws.onmessage = event => {
      const messages = JSON.parse(event.data);
      messages.forEach((msg: any) => {
        console.log('ws.onmessage', JSON.stringify(msg));

        if (msg.ev === 'T') {
          updateStock(msg.sym, {
            lastPrice: msg.p,
            volume: msg.v,
            updatedAt: Date.now(),
          });
        }
      });
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;

    const prev = prevTickersRef.current;
    const toSubscribe = tickers.filter(t => !prev.includes(t));
    const toUnsubscribe = prev.filter(t => !tickers.includes(t));
    console.log('toSubscribe:', toSubscribe);
    console.log('toUnsubscribe:', toUnsubscribe);

    if (toSubscribe.length > 0) {
      ws.send(
        JSON.stringify({
          action: 'subscribe',
          params: toSubscribe.map(t => `T.${t}`).join(','),
        }),
      );
    }

    if (toUnsubscribe.length > 0) {
      ws.send(
        JSON.stringify({
          action: 'unsubscribe',
          params: toUnsubscribe.map(t => `T.${t}`).join(','),
        }),
      );
    }

    prevTickersRef.current = tickers;
  }, [tickers]);
};
