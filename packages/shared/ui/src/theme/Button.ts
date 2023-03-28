const createButtonVariant = (color: string) => ({
  bgGradient: `linear(45deg, ${color}.500, ${color}.400)`,
  borderWidth: '0px',
  _hover: {
    backgroundColor: `${color}.400`,
    bgGradient: `linear(90deg, ${color}.600, ${color}.400)`,
  },
  _active: {
    transform: 'scale(0.98)',
    bgGradient: `linear(90deg, ${color}.600, ${color}.400)`,
  },
  transition: 'all 0.2s ease-in-out',
  color: 'white',
});

const Button = {
  baseStyle: {
    _focus: {
      boxShadow: '0 0 0 0px #9eacfa',
    },
  },
  variants: {
    brand: () => createButtonVariant('brand'),
    danger: () => createButtonVariant('red'),
    success: () => createButtonVariant('green'),
  },
  sizes: {},
  defaultProps: {},
};

export { Button };
