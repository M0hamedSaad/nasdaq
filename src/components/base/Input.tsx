import { FONTS } from '@assets';
import { useStyles } from '@hooks';
import { StyleFnParams } from '@types';
import { fontSize, px } from '@utils';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

const Input = (props: TextInputProps) => {
  const styles = useStyles(styleFn);

  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor={styles.placeholderText.color}
      cursorColor={styles.selection.color}
      selectionColor={styles.selection.color}
    />
  );
};

export default Input;

const styleFn = (_: StyleFnParams) =>
  StyleSheet.create({
    input: {
      textAlign: _.isRtl ? 'right' : 'left',
      borderWidth: 1,
      borderColor: _.theme.border,
      color: _.theme.text,
      padding: 0,
      paddingHorizontal: 12,
      paddingVertical: 0,
      height: px(42),
      borderRadius: 12,
      fontFamily: FONTS.SEMI_BOLD,
      fontSize: fontSize(15),
    },
    selection: {
      color: _.theme.primary,
    },

    placeholderText: { color: _.theme.textMuted },
  });
