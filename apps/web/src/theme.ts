import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';
import { components } from './theme/components';

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const styles = {
	global: (props: StyleFunctionProps) => ({
		body: {
			color: mode('gray.800', 'whiteAlpha.800')(props),
			bg: mode('gray.100', '#141214')(props),
		},
		html: {
			fontSize: '14px',
		},
	}),
};

const theme = extendTheme({
	config,
	styles,
	components,
	fonts: {
		heading: `'Open Sans', sans-serif`,
		body: `'Inter', sans-serif`,
	},
	fontSizes: {
		md: '1rem',
		sm: '0.875rem',
	},
});

export default theme;