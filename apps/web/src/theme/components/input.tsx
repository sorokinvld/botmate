import type { StyleConfig } from '@chakra-ui/styled-system';

const Input: StyleConfig = {
	baseStyle: {
		field: {
			bg: 'transparent',
			borderColor: '#454545af',
			borderWidth: 1.5,
			':focus': {
				borderColor: '#606060',
				bg: '#00000030',
			},
		},
	},
	defaultProps: {
		variant: '',
	},
};

export { Input };
