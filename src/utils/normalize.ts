import { Dimensions } from 'react-native';

// | Use Case         | Function          |
// | ---------------- | ----------------- |
// | Font size        | `fontSize()`      |
// | Padding/margin   | `px()`            |
// | Vertical spacing | `HeightScale()`   |

// Based on iPhone 11 scale (you can adjust this)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
export const px = (size: number) => {
  const { width } = Dimensions.get('window');
  return (width / guidelineBaseWidth) * size;
};

export const HeightScale = (size: number) => {
  const { height } = Dimensions.get('window');
  return (height / guidelineBaseHeight) * size;
};

export const fontSize = (size: number) => px(size);
