import { useStyles } from '@hooks';
import { StyleFnParams } from '@types';
import { px } from '@utils';
import React, { memo, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { useStockStore } from '@store';
import { Text, View } from '../base';
interface PriceCellProps {
  ticker: string;
}
const PriceCell = ({ ticker }: PriceCellProps) => {
  const styles = useStyles(styleFn);
  const price = useStockStore(s => s.stocks[ticker]?.lastPrice);

  const prevPriceRef = useRef<number | undefined>(undefined);

  const change =
    price !== undefined && prevPriceRef.current !== undefined
      ? price - prevPriceRef.current
      : 0;

  const isUp = change > 0;
  const isDown = change < 0;
  const color = isUp ? 'up' : isDown ? 'down' : 'text';
  const symbol = isUp ? '↑' : isDown ? '↓' : '';

  useEffect(() => {
    if (price !== undefined) {
      prevPriceRef.current = price;
    }
  }, [price]);
  return (
    <View style={styles.container}>
      <Text color={color}>
        {price?.toFixed(2)} {symbol}
      </Text>
    </View>
  );
};

export default memo(PriceCell);

const styleFn = (_: StyleFnParams) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: px(8),
      end: _.isRtl ? undefined : px(16),
      start: _.isRtl ? px(16) : undefined,
    },
    stockDetailsContainer: {
      flexDirection: _.isRtl ? 'row-reverse' : 'row',
      gap: px(8),
      flex: 1,
    },
  });
