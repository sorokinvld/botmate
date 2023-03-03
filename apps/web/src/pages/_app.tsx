import { AppProps } from 'next/app';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider } from '@chakra-ui/react';

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

function BotMate({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</ApolloProvider>
	);
}

export default BotMate;
