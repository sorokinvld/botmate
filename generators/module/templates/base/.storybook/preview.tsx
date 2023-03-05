import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { addDecorator } from '@storybook/react';
import { theme } from '@botmate/theme';

addDecorator((storyFn) => (
  <ChakraProvider theme={theme}>{storyFn()}</ChakraProvider>
));

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
