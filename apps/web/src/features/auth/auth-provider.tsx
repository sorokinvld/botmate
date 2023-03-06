import { useEffect } from 'react';
import Head from 'next/head';
import { useUsersControllerProfileQuery } from '@/libs/api';
import { useDispatch } from 'react-redux';
import { setUser } from './auth-slice';
import { Center, HStack, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type AuthProviderProps = {
  children: React.ReactNode;
};
function AuthProvider({ children }: AuthProviderProps) {
  const r = useRouter();
  const dispatch = useDispatch();
  const { data, isLoading } = useUsersControllerProfileQuery();

  useEffect(() => {
    const exlude = ['/welcome'];

    if (!isLoading) {
      if (!data) {
        if (!exlude.includes(r.pathname)) r.push('/welcome');
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (data) {
      dispatch(
        setUser({
          user: data,
        }),
      );
    }
  }, [data]);

  if (isLoading) {
    return (
      <Center h="100vh" opacity={0.7}>
        <Head>
          <title>Loading...</title>
        </Head>
        <HStack spacing={4}>
          <Spinner />
          <Text>loading user data...</Text>
        </HStack>
      </Center>
    );
  }

  if (data || r.pathname === '/welcome') return <>{children}</>;

  return null;
}

export { AuthProvider };
