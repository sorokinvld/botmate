import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: 'Ubuntu',
    body: 'Ubuntu',
  },
  colors: {
    brand: {
      '50': '#edefff',
      '100': '#d0d6ff',
      '200': '#b0bcff',
      '300': '#90a0fb',
      '400': '#7888f4',
      '500': '#6371ed',
      '600': '#5c67e1',
      '700': '#535bd3',
      '800': '#4c51c7',
      '900': '#413db0',
    },
  },
  semanticTokens: {
    colors: {
      error: 'red.300',
      success: 'green.300',
      background: {
        default: 'gray.100',
        _dark: '#1c1d2a',
      },
      surface: {
        default: 'white',
        _dark: '#191A23',
      },
      primary: {
        default: 'red.500',
        _dark: 'red.400',
      },
      secondary: {
        default: 'brand.50',
        _dark: '#272832',
      },
      text: {
        default: 'gray.500',
        _dark: 'gray.100',
      },
      logo: {
        default: 'brand.400',
        _dark: 'gray.400',
      },
    },
  },
});

export { theme };
