import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { Input } from './theme/Input';
import { Button } from './theme/Button';
import { Menu } from './theme/Menu';

// TODO: Refactor

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Input,
    Button,
    Menu,
  },
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
    red: {
      '50': '#ffeaed',
      '100': '#ffccd0',
      '200': '#f69796',
      '300': '#ee6e6d',
      '400': '#f94a47',
      '500': '#fd3528',
      '600': '#ef2929',
      '700': '#dd1b23',
      '800': '#d00e1b',
      '900': '#c2000b',
    },
  },
  semanticTokens: {
    colors: {
      background: {
        default: 'gray.100',
        _dark: '#1c1d2a',
      },
      surface: {
        default: 'white',
        _dark: '#191A23',
      },
      logo: {
        default: 'brand.400',
        _dark: 'brand.300',
      },
      primary: {
        default: 'brand.500',
        _dark: 'brand.400',
      },
      secondary: {
        default: 'brand.50',
        _dark: '#272832',
      },
      text: {
        default: 'gray.500',
        _dark: 'gray.300',
      },
      input: {
        default: 'gray.100',
        _dark: '#1c1d2a',
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'background',
      },
    },
  },
});

export { theme };
