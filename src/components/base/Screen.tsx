import { useStyles } from '@hooks';
import { StyleFnParams } from '@types';
import React, { ReactNode } from 'react';
import { StatusBar, StatusBarProps, StyleSheet, ViewStyle } from 'react-native';
import View from './View';
import { useAppConfigStore } from '@store';
interface ScreenProps {
  style?: ViewStyle;
  insets?: ('bottom' | 'top')[];
  children?: ReactNode;
  statusBarProps?: StatusBarProps;
}
const Screen = (props: ScreenProps) => {
  const styles = useStyles(styleFn);
  const theme = useAppConfigStore(state => state.theme);

  return (
    <View style={[styles.container, props.style]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={styles.statusBarBg.backgroundColor}
        {...props.statusBarProps}
      />
      {props.insets?.includes('top') && <View style={styles.topInset} />}
      {props.children}
      {props.insets?.includes('bottom') && <View style={styles.bottomInset} />}
    </View>
  );
};

export default Screen;

const styleFn = (_: StyleFnParams) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: _.theme.bg,
    },
    topInset: {
      paddingTop: _.insets?.top,
    },
    bottomInset: {
      paddingBottom: _.insets?.bottom,
    },
    statusBarBg: {
      backgroundColor: _.theme.bg,
    },
  });
