import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebouncedValue } from './useDebouncedValue';
import { fetchNasdaqTickers, getCursorFromUrl } from '@services';
import { queryClient } from '../../App';

export function useNasdaqTickers(search: string) {
  const q = useDebouncedValue(search.trim(), 1000);
  const query = useInfiniteQuery({
    queryKey: ['nasdaq-tickers', q],
    queryFn: ({ pageParam }) =>
      fetchNasdaqTickers({
        search: q || undefined,
        cursor: pageParam as string | undefined,
        limit: 50,
      }),
    getNextPageParam: lastPage => getCursorFromUrl(lastPage.next_url),
    initialPageParam: undefined as string | undefined,
    enabled:
      queryClient.getQueryData(['nasdaq-tickers', q]) === undefined
        ? true
        : false,
  });
  return query;
}
