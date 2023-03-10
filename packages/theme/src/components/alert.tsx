import { alertAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(alertAnatomy.keys);

const baseStyle = definePartsStyle((props) => {
  let bg = props.status === 'success' ? '#379381' : 'alert.error.dark';

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
    bg: 'red',
  };
});

export const Alert = defineMultiStyleConfig({ baseStyle });
