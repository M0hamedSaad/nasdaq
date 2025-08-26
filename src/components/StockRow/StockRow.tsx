import { useStyles } from '@hooks';
import { StockItem, StyleFnParams } from '@types';
import { fontSize, px } from '@utils';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Text from '../base/Text';
import View from '../base/View';
import PriceCell from './PriceCell';
import StockImage from './StockImage';
interface StockItemProps {
  item: StockItem;
  index: number;
}
const StockRow = ({ item }: StockItemProps) => {
  const styles = useStyles(styleFn);
  // useEffect(() => {
  //   console.log(`Index ${index} is mounted [${item.ticker}]`);
  //   return () => {
  //     console.log(`Index ${index} is un-mounted [${item.ticker}]`);
  //   };
  // }, [item, index]);
  return (
    <View style={styles.container}>
      <View style={styles.stockDetailsContainer}>
        {/* Stock Image */}
        <StockImage ticker={item.ticker} />
        {/* Stock Details */}
        <View style={styles.stockDetails}>
          <Text style={{ fontSize: fontSize(14) }} weight="SEMI_BOLD">
            {item.ticker}
          </Text>
          <Text color="textMuted" numberOfLines={1}>
            {item.name}
          </Text>
        </View>
      </View>
      {/* PriceCell */}
      <PriceCell ticker={item.ticker} />
    </View>
  );
};

export default memo(StockRow);

const styleFn = (_: StyleFnParams) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: px(16),
      paddingVertical: px(8),
      flexDirection: _.isRtl ? 'row-reverse' : 'row',
      gap: px(8),
    },
    stockDetailsContainer: {
      flexDirection: _.isRtl ? 'row-reverse' : 'row',
      gap: px(8),
      flex: 1,
    },
    stockDetails: {
      flex: 1,
    },
    text: { fontSize: 12 },
  });
