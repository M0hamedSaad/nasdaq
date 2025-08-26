export type TickersDTO = {
  search?: string;
  limit?: number;
  cursor?: string; // polygon uses cursor in next_url
};
