import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    // ...
  },
  thumb: {
    bg: '#151621',
  },
  track: {
    bg: '#313248',
    _checked: {
      bg: '#B0BCFF',
    },
  },
});

export const Switch = defineMultiStyleConfig({ baseStyle });
