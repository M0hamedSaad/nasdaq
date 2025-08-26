import { useStyles } from '@hooks';
import { i18nChangeLanguage, t } from '@localization';
import { useAppConfigStore } from '@store';
import { StyleFnParams } from '@types';
import { px } from '@utils';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Text from './base/Text';

const Lang = () => {
  const styles = useStyles(styleFn);
  const lang = useAppConfigStore(state => state.language);
  const setLanguage = useAppConfigStore(state => state.setLanguage);
  const changeLang = useCallback(() => {
    const changedLang = lang === 'ar' ? 'en' : 'ar';
    setLanguage(changedLang);
    i18nChangeLanguage(changedLang);
  }, [lang, setLanguage]);
  return (
    <Pressable onPress={changeLang} style={styles.container}>
      <Text weight="SEMI_BOLD" style={styles.text}>
        {t('lang')}
      </Text>
    </Pressable>
  );
};

export default Lang;

const styleFn = (_: StyleFnParams) =>
  StyleSheet.create({
    container: {
      borderRadius: px(12),
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: _.theme.border,
    },
    text: { fontSize: 12, textDecorationLine: 'underline' },
  });
