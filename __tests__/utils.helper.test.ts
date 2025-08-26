import { getBufferedTickers } from '@utils';

describe('getBufferedTickers', () => {
  const all = Array.from({ length: 30 }, (_, i) => `T${i + 1}`);

  it('returns buffered tickers around visible items', () => {
    const visible = ['T5'];
    const result = getBufferedTickers(visible, all);

    // T5 index is 4 -> buffer 10 before and after
    expect(result).toContain('T5');
    expect(result[0]).toBe('T1'); // should start from T1 due to lower bound
    expect(result).toContain('T15'); // 10 after T5 (4+10=14 -> T15)
    expect(result.length).toBe(15); // 0..14 inclusive
  });

  it('handles multiple visible items and merges overlapping buffers', () => {
    const visible = ['T5', 'T20'];
    const result = getBufferedTickers(visible, all);

    expect(result).toContain('T5');
    expect(result).toContain('T20');
    expect(result).toContain('T30'); // last possible ticker
    expect(result.length).toBeGreaterThan(20); // combined unique items
  });

  it('ignores unknown tickers in visible', () => {
    const visible = ['T5', 'UNKNOWN'];
    const result = getBufferedTickers(visible, all);

    expect(result).not.toContain('UNKNOWN');
    expect(result).toContain('T5');
  });

  it('returns empty when visible is empty', () => {
    expect(getBufferedTickers([], all)).toEqual([]);
  });

  it('returns empty when all is empty', () => {
    expect(getBufferedTickers(['T1'], [])).toEqual([]);
  });
});
