import { useEffect } from 'react';
import { useBotControllerGetBotsQuery } from '../api';
import { Loader } from '../ui';

type BotsProviderProps = {
  children?: React.ReactNode;
};
function BotsProvider({ children }: BotsProviderProps) {
  const { data: bots, isLoading } = useBotControllerGetBotsQuery();

  useEffect(() => {}, [bots, isLoading]);

  if (isLoading) {
    return <Loader text="loading bots data..." />;
  }

  return <>{children}</>;
}

export { BotsProvider };
