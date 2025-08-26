import { Dimensions } from 'react-native';

// | Use Case         | Function          |
// | ---------------- | ----------------- |
// | Font size        | `fontSize()`      |
// | Padding/margin   | `px()`            |
// | Vertical spacing | `HeightScale()`   |

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Based on iPhone 11 scale (you can adjust this)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const px = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

export const HeightScale = (size: number) =>
  (SCREEN_HEIGHT / guidelineBaseHeight) * size;

export const fontSize = (size: number) => {
  return px(size);
};
