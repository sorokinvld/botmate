import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from '../../theme';

import '@fontsource/roboto/400.css';
import '@fontsource/ubuntu/700.css';

type BotMateUIProviderProps = {
  children: React.ReactNode;
};
function BotMateUIProvider({ children }: BotMateUIProviderProps) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
    </ChakraProvider>
  );
}

export { BotMateUIProvider };
