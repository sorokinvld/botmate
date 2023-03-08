import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { Provider as ReduxProvider } from 'react-redux';
import { theme } from '@botmate/theme';
import { store } from '@store';
import { AuthProvider } from '@providers';

import '../styles/globals.css';
import '@fontsource/inter/400.css';
import '@fontsource/open-sans/700.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function BotMate({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);

  return (
    <ChakraProvider theme={theme}>
      <ReduxProvider store={store}>
        <AnimatePresence>
          <AuthProvider>
            <>{layout}</>
          </AuthProvider>
        </AnimatePresence>
      </ReduxProvider>
    </ChakraProvider>
  );
}

export default BotMate;
