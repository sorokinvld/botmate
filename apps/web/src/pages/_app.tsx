import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { Provider as ReduxProvider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { theme } from '@botmate/theme';
import { store } from '@store';
import { AuthProvider } from '@providers';

import '../styles/globals.css';
import '@fontsource/ubuntu/400.css';
import '@fontsource/open-sans/700.css';
import { SocketProvider } from 'src/providers/socket-provider';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

Sentry.init({
  dsn: 'https://de87b8e2ab2f4fb9a8cb1ec6c1dc6331@o4504821126987776.ingest.sentry.io/4504821129150464',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

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
          <SocketProvider>
            <AuthProvider>
              <>{layout}</>
            </AuthProvider>
          </SocketProvider>
        </AnimatePresence>
      </ReduxProvider>
    </ChakraProvider>
  );
}

export default BotMate;
