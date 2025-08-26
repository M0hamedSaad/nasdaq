import { useStyles } from '@hooks';
import { StyleFnParams } from '@types';
import { px } from '@utils';
import React from 'react';
import { StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useAppConfigStore } from '@store';
import { View } from '../base';

const StockRowSkeleton = () => {
  const styles = useStyles(styleFn);
  const theme = useAppConfigStore(state => state.theme);

  return (
    <SkeletonPlaceholder
      backgroundColor={theme === 'dark' ? '#2c2c2c' : '#E1E9EE'}
      highlightColor={theme === 'dark' ? '#3c3c3c' : '#F2F8FC'}
      borderRadius={4}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.logo} />
          <View style={styles.textContainer}>
            <View style={styles.symbol} />
            <View style={styles.name} />
          </View>
          <View style={styles.price} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const styleFn = (_: StyleFnParams) =>
  StyleSheet.create({
    container: {
      padding: px(16),
    },
    row: {
      flexDirection: _.isRtl ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    logo: {
      width: px(40),
      height: px(40),
      borderRadius: px(20),
    },
    textContainer: {
      flex: 1,
      marginHorizontal: px(12),
      alignItems: _.isRtl ? 'flex-end' : 'flex-start',
    },
    symbol: {
      width: px(80),
      height: px(16),
      marginBottom: px(6),
    },
    name: {
      width: px(160),
      height: px(14),
    },
    price: {
      width: px(60),
      height: px(16),
    },
  });

export default StockRowSkeleton;
