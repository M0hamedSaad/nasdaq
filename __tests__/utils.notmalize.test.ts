import { px, HeightScale, fontSize } from '@utils';
import { Dimensions } from 'react-native';

// Mock Dimensions
jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(),
  },
}));

describe('Scaling utilities', () => {
  beforeEach(() => {
    (Dimensions.get as jest.Mock).mockReturnValue({
      width: 375,
      height: 812,
    });
  });

  it('should scale horizontal sizes correctly with px()', () => {
    expect(px(10)).toBe(10); // same as base width
    expect(px(20)).toBe(20);
  });

  it('should scale vertical sizes correctly with HeightScale()', () => {
    expect(HeightScale(10)).toBe(10);
    expect(HeightScale(20)).toBe(20);
  });

  it('should scale font sizes correctly with fontSize()', () => {
    expect(fontSize(12)).toBe(12);
    expect(fontSize(16)).toBe(16);
  });

  it('should scale correctly on different screen sizes', () => {
    (Dimensions.get as jest.Mock).mockReturnValue({
      width: 414, // iPhone 11 Pro Max
      height: 896,
    });
    expect(px(10)).toBeCloseTo((414 / 375) * 10);
    expect(HeightScale(10)).toBeCloseTo((896 / 812) * 10);
    expect(fontSize(14)).toBeCloseTo((414 / 375) * 14);
  });
});
