import { mode } from '@chakra-ui/theme-tools';

const Drawer = {
  baseStyle: (props: any) => ({
    dialog: {
      bg: mode('#181a2e', '#191a23')(props),
      color: 'white',
    },
  }),
  sizes: {},
  variants: {},
};

export { Drawer };
