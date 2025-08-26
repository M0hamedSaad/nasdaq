import { useStyles } from '@hooks';
import { StyleFnParams } from '@types';
import { px } from '@utils';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { useStockStore } from '@store';
import { Icon, Text } from '../base';
interface PriceCellProps {
  ticker: string;
}
const PriceCell = ({ ticker }: PriceCellProps) => {
  const styles = useStyles(styleFn);
  const price = useStockStore(s => s.stocks[ticker]?.lastPrice);
  const flashAnim = useRef(new Animated.Value(0)).current; // 0 = no flash, 1 = flash

  const prevPriceRef = useRef<number | undefined>(undefined);

  const change = useMemo(() => {
    if (price !== undefined && prevPriceRef.current !== undefined) {
      return price - prevPriceRef.current;
    }
    return 0;
  }, [price]);

  const { isUp, isDown, color } = useMemo(() => {
    const up = change > 0;
    const down = change < 0;
    return {
      isUp: up,
      isDown: down,
      color: up ? 'up' : down ? 'down' : 'text',
    };
  }, [change]);

  // Trigger animation on price change
  useEffect(() => {
    if (change !== 0) {
      flashAnim.setValue(1);
      Animated.timing(flashAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    if (price !== undefined) {
      prevPriceRef.current = price;
    }
  }, [price, change, flashAnim]);

  // Animated styles: flash up or down
  const animatedStyle = {
    transform: [
      {
        translateY: flashAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, isUp ? -5 : 5, 0], // moves up if up, down if down
        }),
      },
    ],
    opacity: flashAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.5, 1], // briefly brightens
    }),
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {(isUp || isDown) && (
        <Icon
          size={px(18)}
          name={isUp ? 'stock-up' : 'stock-down'}
          color={isUp ? 'up' : 'down'}
        />
      )}
      <Text color={color as any}>{price?.toFixed(2)}</Text>
    </Animated.View>
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
      flexDirection: _.isRtl ? 'row-reverse' : 'row',
      alignItems: 'center',
      gap: px(4),
    },
  });
