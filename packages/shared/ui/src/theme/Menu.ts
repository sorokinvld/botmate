import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

// define the base component styles
const baseStyle = {
  // define the part you're going to style
  button: {
    // this will style the MenuButton component
    fontWeight: 'medium',
    color: 'gray.300',
    _hover: {
      bg: 'red.600',
      color: 'white',
    },
  },
  list: {
    // this will style the MenuList component
    py: '4',
    borderRadius: 'xl',
    border: 'none',
    bg: 'surface',
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    color: 'text',
    bg: 'transparent',
    _hover: {
      bg: 'blackAlpha.300',
    },
    _focus: {
      color: 'brand.400',
    },
  },
  groupTitle: {
    // this will style the text defined by the title prop
    // in the MenuGroup and MenuOptionGroup components
    textTransform: 'uppercase',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 'wider',
    opacity: '0.7',
  },
  command: {
    // this will style the text defined by the command
    // prop in the MenuItem and MenuItemOption components
    opacity: '0.8',
    fontFamily: 'mono',
    fontSize: 'sm',
    letterSpacing: 'tighter',
    pl: '4',
  },
  divider: {
    // this will style the MenuDivider component
    my: '4',
  },
};
// export the base styles in the component theme
export const Menu = {
  baseStyle,
};
