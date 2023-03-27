const Button = {
  baseStyle: {
    textTransform: 'uppercase',
    _focus: {
      boxShadow: '0 0 0 0px #9eacfa',
    },
  },
  variants: {
    solid: () => ({
      backgroundColor: 'primary',
      textTransform: 'none',
      borderWidth: '0px',
      _hover: {
        backgroundColor: '#6165cd',
      },
      _active: {
        transform: 'scale(0.98)',
        backgroundColor: '#5458c5',
      },
      transition: 'all 0.2s ease-in-out',
    }),
  },
  sizes: {},
  defaultProps: {},
};

export { Button };
