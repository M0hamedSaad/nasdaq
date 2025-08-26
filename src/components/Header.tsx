import { IMAGES } from '@assets';
import { useStyles } from '@hooks';
import { t } from '@localization';
import { StyleFnParams } from '@types';
import { fontSize, px } from '@utils';
import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import Lang from './Lang';
import ThemeIcon from './ThemeIcon';
import { Image, Text, View } from './base';

interface HeaderProps {
  children?: ReactNode;
}
const Header = (props: HeaderProps) => {
  const styles = useStyles(styleFn);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.nasdaqContainer}>
          <Image
            resizeMode="contain"
            style={[styles.image]}
            source={IMAGES.splash_logo}
          />
          <Text color="textMuted" style={styles.nasdaq} weight="BLACK">
            {t('nasdaq')}
          </Text>
        </View>
        <View style={styles.iconsContainer}>
          <ThemeIcon />
          <Lang />
        </View>
      </View>
      {props.children}
    </View>
  );
};

export default Header;

const styleFn = (_: StyleFnParams) =>
  StyleSheet.create({
    container: {
      padding: px(16),
      paddingTop: px(16) + (_.insets?.top || 0),
      backgroundColor: _.theme.bg,
      borderBottomLeftRadius: px(24),
      borderBottomRightRadius: px(24),
      shadowColor: _.theme.shadow,
      shadowOffset: {
        width: 0,
        height: 0.5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      gap: px(8),
    },
    header: {
      flexDirection: _.isRtl ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
    },
    nasdaqContainer: {
      flexDirection: _.isRtl ? 'row-reverse' : 'row',
      alignItems: 'center',
      flex: 1,
    },
    image: {
      width: px(40),
      height: px(40),
    },
    nasdaq: {
      fontSize: fontSize(20),
    },

    iconsContainer: {
      flexDirection: _.isRtl ? 'row-reverse' : 'row',
      alignItems: 'center',
      gap: px(8),
    },
  });
