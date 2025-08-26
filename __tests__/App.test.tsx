import { render, waitFor } from '@testing-library/react-native';

import App from '../App';

jest.mock('@localization', () => ({
  initI18n: jest.fn(),
}));

jest.mock('@navigation', () => {
  const { Text } = require('react-native');
  return {
    Root: () => <Text testID="root-component">Root Component</Text>,
  };
});

jest.mock('@store', () => {
  const mockState = {
    language: 'en',
  };

  return {
    useAppConfigStore: {
      getState: () => mockState,
      persist: {
        onFinishHydration: (callback: () => void) => {
          setTimeout(callback, 0); // simulate async hydration
          return jest.fn(); // return unsub function
        },
      },
    },
  };
});

jest.mock('@tanstack/react-query', () => {
  const actual = jest.requireActual('@tanstack/react-query');
  return {
    ...actual,
    QueryClient: jest.fn().mockImplementation(() => ({
      defaultOptions: {},
    })),
    QueryClientProvider: ({ children }: any) => children,
  };
});

jest.mock('react-native-safe-area-context', () => {
  const actual = jest.requireActual('react-native-safe-area-context');
  return {
    ...actual,
    SafeAreaProvider: ({ children }: any) => children,
  };
});

describe('App Component', () => {
  it('renders Root component after hydration', async () => {
    const { getByTestId } = render(<App />);

    await waitFor(() => {
      expect(getByTestId('root-component')).toBeTruthy();
    });
  });
});
