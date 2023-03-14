import type { StyleConfig } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const Button: StyleConfig = {
  baseStyle: {
    textTransform: 'uppercase',
    _focus: {
      boxShadow: '0 0 0 0px #9eacfa',
    },
  },
  variants: {
    secondary: () => ({
      backgroundColor: mode('#292a35', '#292a35'),
      textTransform: 'none',
      _hover: {
        opacity: 0.8,
      },
      _active: {
        transform: 'scale(0.98)',
        opacity: 1,
      },
      transition: 'all 0.2s ease-in-out',
    }),
    solid: () => ({
      backgroundColor: mode('#8488fc', '#5458c5'),
      color: mode('#fff', '#1e2532'),
      textTransform: 'none',
      borderWidth: '0px',
      _hover: {
        backgroundColor: '#6165cd',
      },
      _active: {
        transform: 'scale(0.98)',
        backgroundColor: '#5458c5',
      },
      transition: 'all 0.2s ease-in-out',
    }),
    danger: () => ({
      backgroundColor: mode('#e36f6f', '#e36f6f'),
      textTransform: 'none',
      borderWidth: '0px',
      _hover: {
        backgroundColor: '#e36f6fc7',
      },
      _active: {
        transform: 'scale(0.98)',
        backgroundColor: '#e36f6f',
      },
      transition: 'all 0.2s ease-in-out',
    }),
  },
  sizes: {},
  defaultProps: {
    variant: 'secondary',
  },
};

export { Button };
