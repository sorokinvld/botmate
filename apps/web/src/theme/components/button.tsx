import type { StyleConfig } from '@chakra-ui/styled-system';

const Button: StyleConfig = {
	baseStyle: {
		textTransform: 'uppercase',
	},
	variants: {
		solid: {
			backgroundColor: '#1d1e2b',
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
