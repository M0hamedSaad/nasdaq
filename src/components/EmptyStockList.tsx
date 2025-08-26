import { useStyles } from '@hooks';
import { t } from '@localization';
import { StyleFnParams } from '@types';
import { px } from '@utils';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Text, View } from './base';

interface EmptyStockListProps {
  onRefresh?: () => void;
}

const EmptyStockList = ({ onRefresh }: EmptyStockListProps) => {
  const styles = useStyles(styleFn);

  return (
    <View style={styles.container}>
      <Icon name="chart-bar" size={60} color="textMuted" />
      <View>
        <Text center weight="SEMI_BOLD" style={styles.title}>
          {t('no_stocks')}
        </Text>
        <Text center>{t('no_stocks_subtitle')}</Text>
      </View>
      {onRefresh && <Button onPress={onRefresh} title={t('update')} />}
    </View>
  );
};

const styleFn = (_: StyleFnParams) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: px(24),
      gap: px(8),
    },
    title: {
      fontSize: 18,
    },
  });
export default EmptyStockList;
