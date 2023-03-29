import React, { useState } from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from '../../theme';

import '@fontsource/ubuntu/700.css';
import '@fontsource/ubuntu/500.css';
import '@fontsource/ubuntu/400.css';
import { MenuProvider } from '../../hooks/useMenu';

type BotMateUIProviderProps = {
  children: React.ReactNode;
};
function BotMateUIProvider({ children }: BotMateUIProviderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <MenuProvider
      value={{
        open: menuOpen,
        setOpen: setMenuOpen,
      }}
    >
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {children}
      </ChakraProvider>
    </MenuProvider>
  );
}

export { BotMateUIProvider };
