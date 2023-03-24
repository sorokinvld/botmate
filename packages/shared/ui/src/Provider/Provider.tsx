import {
	defaultTheme,
	ThemeProvider,
	Preflight,
} from '@xstyled/styled-components';

type BotMateUIProviderProps = {
	children: React.ReactNode;
};
function BotMateUIProvider({ children }: BotMateUIProviderProps) {
	return (
		<ThemeProvider theme={defaultTheme}>
			<Preflight />
			{children}
		</ThemeProvider>
	);
}

export { BotMateUIProvider };
