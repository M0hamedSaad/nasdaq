import {
  EmptyStockList,
  ExceedLimit,
  Header,
  Input,
  Screen,
  StockRow,
  StockRowSkeleton,
  View,
} from '@components';
import { useMockWs, useNasdaqTickers, useStyles } from '@hooks';
import { t } from '@localization';
import { FlashList, FlashListRef, ViewToken } from '@shopify/flash-list';
import { useStockStore } from '@store';
import { StockItem, StyleFnParams } from '@types';
import { getBufferedTickers, px } from '@utils';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';

export default function NasdaqBrowser() {
  const styles = useStyles(styleFn);
  const [query, setQuery] = useState('');
  const [viewableTickers, setViewableTickers] = useState<string[]>([]);
  const setInitialStocks = useStockStore(s => s.setInitialStocks);
  const flashListRef = useRef<FlashListRef<StockItem>>(null);

  const viewabilityConfig = useMemo(
    () => ({ itemVisiblePercentThreshold: 1, minimumViewTime: 150 }),
    [],
  );

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken<StockItem>> }) => {
      setViewableTickers(
        viewableItems.map(vi => vi.item?.ticker).filter(Boolean) as string[],
      );
    },
    [],
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    error,
    isFetched,
  } = useNasdaqTickers(query);

  const filteredTickers = useMemo(
    () =>
      data?.pages.flatMap(
        p => p.results?.map(r => ({ ticker: r.ticker, name: r.name })) ?? [],
      ) ?? [],
    [data],
  );

  useEffect(() => {
    if (filteredTickers.length > 0 && !isFetchingNextPage) {
      setInitialStocks(filteredTickers);
    }
  }, [filteredTickers, setInitialStocks, isFetchingNextPage]);

  useEffect(() => {
    if (filteredTickers.length > 0) {
      // If FlashList hasn't fired yet, assume all items visible
      setViewableTickers(filteredTickers.map(item => item.ticker));
    } else {
      setViewableTickers([]);
    }
  }, [filteredTickers]);

  const bufferedTickers = useMemo(() => {
    return getBufferedTickers(
      viewableTickers,
      filteredTickers.map(ticker => ticker.ticker),
    );
  }, [viewableTickers, filteredTickers]);

  // usePolygonWs(bufferedTickers);
  useMockWs(bufferedTickers);

  return (
    <Screen>
      {/* Header with Input Search */}
      <Header>
        <Input
          value={query}
          onChangeText={setQuery}
          placeholder={t('search_placeholder')}
        />
      </Header>
      {isFetching && !hasNextPage && <StockRowSkeleton />}
      {/* Tickers */}
      {isFetched && (
        <FlashList
          ref={flashListRef}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          contentContainerStyle={styles.contentContainerStyle}
          data={filteredTickers}
          keyExtractor={(item, index) => item.ticker + `_${index}`}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.1}
          renderItem={({ item, index }) => (
            <StockRow item={item} index={index} />
          )}
          ListEmptyComponent={isFetching ? null : <EmptyStockList />}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          ListFooterComponent={
            <>
              {isFetchingNextPage && hasNextPage ? <StockRowSkeleton /> : null}
              {!isFetchingNextPage &&
                hasNextPage &&
                error?.message.includes('429') && (
                  <ExceedLimit onRefresh={fetchNextPage} />
                )}
            </>
          }
        />
      )}
    </Screen>
  );
}

const styleFn = (_: StyleFnParams) =>
  StyleSheet.create({
    contentContainerStyle: {
      paddingTop: px(12),
      paddingBottom: px(80),
    },
    statusBarBg: { backgroundColor: _.theme.primary },
    divider: { height: 2, backgroundColor: _.theme.surface },
  });
