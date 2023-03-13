import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const brand = defineStyle({
  bg: 'transparent',
  borderWidth: 1.5,
  _focus: {
    bg: 'secondary.dark',
  },
});

export const Textarea = defineStyleConfig({
  variants: { brand },
});
