import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';
import { components } from './components';
import { colors } from './colors';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

// todo: create common package for theme sharing
const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.800')(props),
      bg: mode('primary.light', 'primary.dark')(props),
    },
    html: {
      fontSize: '14px',
    },
  }),
};

const theme = extendTheme({
  config,
  styles,
  colors,
  components,
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Ubuntu', sans-serif`,
  },
  fontSizes: {
    md: '1rem',
    sm: '0.875rem',
  },
});

export { theme };
