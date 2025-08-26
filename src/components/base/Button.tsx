import { useStyles } from '@hooks';
import type { StyleFnParams } from '@types';
import { px } from '@utils';
import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import Text from './Text';
import { Theme } from '@themes';
type ButtonProps = PressableProps & {
  title: string;
  style?: ViewStyle;
  variant?: 'outline' | 'solid' | 'plain';
  textColor?: keyof Theme;
  onPress?: () => void;
};
const Button = ({
  title,
  style,
  variant = 'solid',
  textColor,
  ...props
}: ButtonProps) => {
  const styles = useStyles(styleFn);

  return (
    <Pressable
      {...props}
      style={[
        styles.button,
        variant === 'outline' && styles.outline,
        variant === 'plain' && styles.plain,
        style,
      ]}
    >
      <Text
        weight="SEMI_BOLD"
        center
        color={textColor || (variant === 'solid' ? 'white' : 'text')}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styleFn = (_: StyleFnParams) =>
  StyleSheet.create({
    button: {
      height: px(38),
      borderRadius: px(12),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: _.theme.primary,
      paddingHorizontal: px(16),
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: _.theme.primary,
    },
    plain: {
      backgroundColor: 'transparent',
    },

    center: {
      textAlign: 'center',
    },
  });
