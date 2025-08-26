import { ENV } from '@constants';
import { HttpClient } from '@httpClient';
import { TickerResponse, TickersDTO } from '@types';
export const fetchNasdaqTickers = ({ limit = 50, ...dto }: TickersDTO) =>
  HttpClient.get<TickerResponse>(`/reference/tickers`, {
    params: {
      market: 'stocks',
      exchange: 'XNAS',
      active: true,
      order: 'asc',
      limit,
      sort: 'ticker',
      apiKey: ENV.POLYGON_API_KEY,
      ...dto,
    },
  }).then(res => res.data);

/** Extract cursor from next_url (Polygon sends full url) */
export function getCursorFromUrl(urlString?: string) {
  const match = urlString?.match(/[?&]cursor=([^&#]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}
