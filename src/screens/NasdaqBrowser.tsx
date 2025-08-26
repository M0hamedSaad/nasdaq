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
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function NasdaqBrowser() {
  const styles = useStyles(styleFn);
  const [query, setQuery] = useState('');
  const [viewableTickers, setViewableTickers] = useState<string[]>([]);
  const setInitialStocks = useStockStore(s => s.setInitialStocks);
  const flashListRef = useRef<FlashListRef<StockItem>>(null);
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken<StockItem>>;
  }) => {
    const visible = viewableItems.map(vi => vi.item?.ticker).filter(Boolean);
    setViewableTickers(visible as string[]);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    error,
    isFetched,
  } = useNasdaqTickers(query);

  const filteredTickers: StockItem[] = useMemo(() => {
    const items: StockItem[] = [];
    data?.pages.forEach(p => {
      p.results?.forEach(r => {
        items.push({ ticker: r.ticker, name: r.name });
      });
    });
    return items;
  }, [data]);

  useEffect(() => {
    if (filteredTickers.length > 0) {
      console.log('setInitialStocks');
      setInitialStocks(filteredTickers);
    }
  }, [filteredTickers, setInitialStocks]);

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
          contentContainerStyle={{ paddingTop: px(12), paddingBottom: px(80) }}
          data={filteredTickers}
          keyExtractor={(item, index) => item.ticker + `_${index}`}
          onEndReached={() => {
            console.log('onEndReached');
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
    statusBarBg: { backgroundColor: _.theme.primary },
    divider: { height: 2, backgroundColor: _.theme.surface },
  });
