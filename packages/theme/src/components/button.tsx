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
    solid: () => ({
      backgroundColor: mode('#8488fc', '#5458c5'),
      color: mode('#fff', '#1e2532'),
      borderWidth: '1px',
      _hover: {
        backgroundColor: '#6165cd',
      },
      _active: {
        transform: 'scale(0.98)',
        backgroundColor: '#5458c5',
      },
      transition: 'all 0.2s ease-in-out',
    }),
  },
  sizes: {},
  defaultProps: {
    size: 'sm',
    variant: 'outline',
  },
};

export { Button };
