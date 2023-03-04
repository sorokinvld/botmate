import type { StyleConfig } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const Button: StyleConfig = {
  baseStyle: {
    textTransform: 'uppercase',
  },
  variants: {
    solid: (props) => ({
      backgroundColor: mode('primary.light', 'primary.dark')(props),
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
    variant: 'solid',
  },
};

export { Button };
