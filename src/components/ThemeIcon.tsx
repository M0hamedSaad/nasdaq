import { useStyles } from '@hooks';
import { useAppConfigStore } from '@store';
import { StyleFnParams } from '@types';
import { px } from '@utils';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Icon } from './base';

const ThemeIcon = () => {
  const styles = useStyles(styleFn);
  const theme = useAppConfigStore(state => state.theme);
  const setTheme = useAppConfigStore(state => state.setTheme);
  const changeTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);
  return (
    <Pressable onPress={changeTheme} style={styles.container}>
      <Icon
        name={theme === 'light' ? 'theme2-solid' : 'always-on-display'}
        size={px(15)}
      />
    </Pressable>
  );
};

export default ThemeIcon;

const styleFn = (_: StyleFnParams) =>
  StyleSheet.create({
    container: {
      width: px(24),
      height: px(24),
      borderRadius: px(12),
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: _.theme.border,
    },
    text: { fontSize: 12 },
  });
