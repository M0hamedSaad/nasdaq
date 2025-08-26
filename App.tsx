/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { initI18n } from '@localization';
import { Root } from '@navigation';
import { NavigationContainer } from '@react-navigation/native';
import { useAppConfigStore } from '@store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { enabled: false, retry: false },
  },
});

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for Zustand to rehydrate
    const unsub = useAppConfigStore.persist.onFinishHydration(() => {
      initI18n(useAppConfigStore.getState().language);
      setIsReady(true);
    });

    return unsub;
  }, []);

  if (!isReady) return null;
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
