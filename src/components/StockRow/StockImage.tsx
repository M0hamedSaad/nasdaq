import { TICKER_URL } from '@constants';
import { useStyles } from '@hooks';
import { StyleFnParams } from '@types';
import { px } from '@utils';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Image, Text, View } from '../base';

interface StockImageProps {
  ticker: string;
}
const StockImage = ({ ticker }: StockImageProps) => {
  const styles = useStyles(styleFn);
  const [isValidImage, setIsValidImage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <View style={styles.imageContainer}>
      <Image
        resizeMode="contain"
        style={[
          styles.imageContainer,
          styles.image,
          !isValidImage && styles.hidden,
        ]}
        onLoad={() => setIsValidImage(true)}
        onLoadEnd={() => setIsLoaded(true)}
        onError={() => {
          setIsValidImage(false);
          setIsLoaded(true);
        }}
        source={{ uri: TICKER_URL(ticker) }}
      />
      {isLoaded && !isValidImage && (
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          color={'text'}
          weight="BOLD"
          style={{ marginHorizontal: px(4) }}
        >
          {ticker || ''}
        </Text>
      )}
    </View>
  );
};

export default StockImage;

const styleFn = (_: StyleFnParams) =>
  StyleSheet.create({
    imageContainer: {
      width: px(40),
      height: px(40),
      borderRadius: px(40),
      backgroundColor: _.theme.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      position: 'absolute',
      zIndex: 3,
    },
    hidden: {
      zIndex: -1,
    },
  });
