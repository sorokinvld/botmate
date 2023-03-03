import type { StyleConfig } from '@chakra-ui/styled-system';

const Button: StyleConfig = {
	baseStyle: {
		backgroundColor: '#292a35',
		textTransform: 'uppercase',
	},
	variants: {},
	sizes: {
		md: {
			fontSize: 13,
		},
	},
	defaultProps: {
		size: 'md',
		variant: 'outline',
	},
};

export { Button };
