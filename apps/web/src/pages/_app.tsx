import { NextPage } from 'next';
import { AppProps } from 'next/app';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import theme from '../theme';

import '@fontsource/inter/400.css';
import '@fontsource/open-sans/700.css';

const httpLink = createHttpLink({
	uri: 'http://localhost:8080/graphql',
});

const authLink = setContext((_, { headers }) => {
	// todo: get token from cookie
	const token = localStorage.getItem('token');

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

type NextPageWithLayout = NextPage & {
	getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};
function BotMate({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);
	const layout = getLayout(<Component {...pageProps} />);

	return (
		<AnimatePresence mode='wait' initial={false}>
			<ApolloProvider client={client}>
				<ChakraProvider theme={theme}>{layout}</ChakraProvider>
			</ApolloProvider>
		</AnimatePresence>
	);
}

export default BotMate;
