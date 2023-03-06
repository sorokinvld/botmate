import { alertAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(alertAnatomy.keys);

const baseStyle = definePartsStyle((props) => {
  let bg = 'alert.error.dark';

  // todo: add more alert types checks

  return {
    title: {
      color: 'white',
    },
    description: {
      color: 'white',
    },
    icon: {
      color: 'white',
    },
    container: {
      bg,
    },
  };
});

export const Alert = defineMultiStyleConfig({ baseStyle });
