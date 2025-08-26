import { IMAGES } from '@assets';
import { Screen, Text, View } from '@components';
import { useStyles } from '@hooks';
import { useAppNavigation } from '@navigation';
import { StyleFnParams } from '@types';
import { px } from '@utils';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
const Splash = () => {
  const styles = useStyles(styleFn);
  const navigation = useAppNavigation();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'NasdaqBrowser' }],
      });
    });
  }, [opacity, scale, navigation]);

  //   scale.value = withTiming(
  //     1,
  //     {
  //       duration: 1200,
  //       easing: Easing.out(Easing.exp),
  //     },
  //     finished => {
  //       if (finished) {
  //         runOnJS(navigateToHome)();
  //       }
  //     },
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <Screen style={styles.container} insets={['bottom', 'top']}>
      <View style={styles.contentContainer}>
        <Animated.Image
          resizeMode="contain"
          style={[
            styles.image,
            {
              opacity: opacity,
              transform: [{ scale }],
            },
          ]}
          source={IMAGES.splash_logo}
        />
      </View>
      <Text weight="SEMI_BOLD">{'Developed by Mohamed Saad'}</Text>
      <Text color="textMuted">{'ms.rndeveloper@gmail.com'}</Text>
    </Screen>
  );
};

export default Splash;

const styleFn = (_: StyleFnParams) =>
  StyleSheet.create({
    container: {
      paddingBottom: px(16),
      alignItems: 'center',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: px(200),
      height: px(200),
    },
  });
