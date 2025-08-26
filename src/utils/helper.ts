const BUFFER_SIZE = 10;

export const getBufferedTickers = (visible: string[], all: string[]) => {
  const indexes = visible
    .map(ticker => all.indexOf(ticker))
    .filter(i => i !== -1);
  const bufferedSet = new Set<string>();

  indexes.forEach(i => {
    const start = Math.max(0, i - BUFFER_SIZE);
    const end = Math.min(all.length, i + BUFFER_SIZE + 1);
    for (let j = start; j < end; j++) {
      bufferedSet.add(all[j]);
    }
  });

  return Array.from(bufferedSet);
};
