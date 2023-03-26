const Input = {
  baseStyle: () => ({
    field: {
      bg: 'transparent',
      borderWidth: 1.5,
      ':focus': {
        bg: 'input',
      },
    },
  }),
  defaultProps: {
    variant: '',
  },
};

export { Input };
