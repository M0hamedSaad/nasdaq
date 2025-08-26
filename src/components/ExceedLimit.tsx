import { useStyles } from '@hooks';
import { t } from '@localization';
import { StyleFnParams } from '@types';
import { fontSize, px } from '@utils';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from './base';

interface EmptyStockListProps {
  onRefresh?: () => void;
}

const ExceedLimit = ({ onRefresh }: EmptyStockListProps) => {
  const styles = useStyles(styleFn);

  return (
    <View style={styles.warningContainer}>
      <Text weight="SEMI_BOLD" style={styles.message} color="orange">
        {t('exceed_limit')}
      </Text>
      {onRefresh && (
        <Button title={t('update')} onPress={onRefresh} style={styles.button} />
      )}
    </View>
  );
};

const styleFn = (_: StyleFnParams) =>
  StyleSheet.create({
    warningContainer: {
      backgroundColor: _.theme.orangeBg,
      borderRadius: 8,
      marginHorizontal: px(16),
      paddingHorizontal: px(16),
      marginTop: px(12),
      paddingVertical: px(8),
      gap: px(8),
      flexDirection: _.isRtl ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    button: {
      backgroundColor: _.theme.orange,
    },
    message: {
      fontSize: fontSize(13),
      flex: 1,
    },
  });
export default ExceedLimit;
