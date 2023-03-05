import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { theme } from '@botmate/theme';

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
    <AnimatePresence>
      <ChakraProvider theme={theme}>{layout}</ChakraProvider>
    </AnimatePresence>
  );
}

export default BotMate;
