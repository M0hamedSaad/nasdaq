export interface TickerResponse {
  count: number;
  next_url: string;
  request_id: string;
  results: TickerResItem[];
  status: string;
}

export interface TickerResItem {
  active?: boolean;
  cik?: string;
  composite_figi?: string;
  currency_name?: string;
  last_updated_utc?: string;
  locale: string;
  market: string;
  name: string;
  primary_exchange?: string;
  share_class_figi?: string;
  ticker: string;
  type?: string;
}
