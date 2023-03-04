import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  overlay: {},
  dialog: {
    _dark: {
      bg: 'primary.dark',
    },
  },
});

export const Modal = defineMultiStyleConfig({
  baseStyle,
});
