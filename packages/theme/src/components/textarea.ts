import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const brand = defineStyle({
  bg: 'transparent',
  borderWidth: 1.5,
});

export const Textarea = defineStyleConfig({
  variants: { brand },
});
