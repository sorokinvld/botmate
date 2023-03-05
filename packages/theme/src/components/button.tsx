import type { StyleConfig } from '@chakra-ui/styled-system';

const Button: StyleConfig = {
  baseStyle: {
    textTransform: 'uppercase',
    _focus: {
      boxShadow: '0 0 0 2px #9eacfa',
    },
  },
  variants: {
    solid: () => ({
      backgroundColor: '#5458c5',
      borderWidth: '1px',
      _active: {
        transform: 'scale(0.95)',
      },
      transition: 'all 0.2s ease-in-out',
    }),
  },
  sizes: {
    md: {
      fontSize: 12,
    },
  },
  defaultProps: {
    size: 'sm',
    variant: 'outline',
  },
};

export { Button };
