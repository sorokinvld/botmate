import { useEffect } from 'react';
import { useUsersControllerProfileQuery } from '@api';
import { useDispatch } from 'react-redux';
import { setUser } from '../store';
import { useRouter } from 'next/router';
import { Loader } from '@atoms';

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
    return <Loader text="loading user data..." />;
  }

  if (data || r.pathname === '/welcome') return <>{children}</>;

  return null;
}

export { AuthProvider };