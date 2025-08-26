import { FONTS } from '@assets';
import { useStyles } from '@hooks';
import { useAppConfigStore } from '@store';
import { PALETTE, type Theme } from '@themes';
import type { StyleFnParams } from '@types';
import {
  Text as RNText,
  StyleSheet,
  type TextProps as RNTextProps,
} from 'react-native';
type Weight = keyof typeof FONTS;
type TextProps = {
  weight?: Weight;
  color?: keyof Theme;
  center?: boolean;
} & RNTextProps;
const Text = ({ weight, color, center, ...props }: TextProps) => {
  const styles = useStyles(styleFn);
  const theme = useAppConfigStore(state => state.theme);
  // const lang = useAppConfigStore(state => state.language);

  return (
    <RNText
      {...props}
      style={[
        styles.text,
        props.style,
        {
          fontFamily: FONTS[weight || 'REGULAR'],
          color: PALETTE[theme][color || 'text'],
        },
        center && styles.center,
      ]}
    >
      {props.children}
    </RNText>
  );
};

export default Text;

const styleFn = (_: StyleFnParams) =>
  StyleSheet.create({
    text: {
      textAlign: _.isRtl ? 'right' : 'left',
    },
    center: {
      textAlign: 'center',
    },
  });
