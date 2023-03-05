import type { StyleConfig } from '@chakra-ui/styled-system';

const Button: StyleConfig = {
  baseStyle: {
    textTransform: 'uppercase',
    _focus: {
      boxShadow: '0 0 0 0px #9eacfa',
    },
  },
  variants: {
    solid: () => ({
      backgroundColor: '#5458c5',
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
