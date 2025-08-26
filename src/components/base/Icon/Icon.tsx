import { useStyles } from '@hooks';
import { useAppConfigStore } from '@store';
import { PALETTE, Theme } from '@themes';
import { StyleFnParams } from '@types';
import { px } from '@utils';

import { StyleSheet } from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';
import CustomIcon from './CustomIcon';
import { IconNames } from './types';

const Icon = ({
  size = px(24),
  color = 'text',
  ...props
}: IconProps & { name: IconNames; color?: keyof Theme }) => {
  const styles = useStyles(styleFn);
  const theme = useAppConfigStore(state => state.theme);

  return (
    <CustomIcon
      {...props}
      style={[styles.icon, props.style]}
      size={size}
      color={PALETTE[theme][color]}
    />
  );
};

export default Icon;

const styleFn = (_: StyleFnParams) =>
  StyleSheet.create({
    icon: {
      textAlign: _.isRtl ? 'right' : 'left',
    },
  });
