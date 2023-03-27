const Button = {
  baseStyle: {
    _focus: {
      boxShadow: '0 0 0 0px #9eacfa',
    },
  },
  variants: {
    brand: () => ({
      bgGradient: 'linear(45deg, brand.500, brand.400)',
      borderWidth: '0px',
      _hover: {
        backgroundColor: 'brand.400',
        bgGradient: 'linear(90deg, brand.600, brand.400)',
      },
      _active: {
        transform: 'scale(0.98)',
        bgGradient: 'linear(90deg, brand.600, brand.400)',
      },
      transition: 'all 0.2s ease-in-out',
      color: 'white',
    }),
  },
  sizes: {},
  defaultProps: {},
};

export { Button };
