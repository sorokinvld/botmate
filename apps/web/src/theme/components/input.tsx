import type { StyleConfig } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const Input: StyleConfig = {
	baseStyle: (props) => ({
		field: {
			bg: 'transparent',
			// borderColor: '#454545af',
			borderWidth: 1.5,
			':focus': {
				bg: mode('secondary.light', 'secondary.dark')(props),
			},
		},
	}),
	defaultProps: {
		variant: '',
	},
};

export { Input };
