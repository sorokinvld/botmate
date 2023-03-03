import type { StyleConfig } from '@chakra-ui/styled-system';

const Button: StyleConfig = {
	baseStyle: {
		textTransform: 'uppercase',
	},
	variants: {
		solid: {
			backgroundColor: '#292a35',
			borderColor: '#ffffff29',
			borderWidth: '1px',
		},
	},
	sizes: {
		md: {
			fontSize: 12,
		},
	},
	defaultProps: {
		size: 'sm',
		variant: 'solid',
	},
};

export { Button };
