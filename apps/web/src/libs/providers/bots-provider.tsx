import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useBotControllerGetBotsQuery } from '../api';
import { setActiveBot } from '../store';
import { Loader } from '../ui';

type BotsProviderProps = {
  children?: React.ReactNode;
};
function BotsProvider({ children }: BotsProviderProps) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { data: bots, isLoading } = useBotControllerGetBotsQuery();

  useEffect(() => {
    if (isLoading || !bots) return;

    if (bots?.length > 0) {
      dispatch(
        setActiveBot({
          bot: bots[0],
        }),
      );
      setLoading(false);
    }
  }, [bots, isLoading]);

  if (loading) {
    return <Loader text="loading bots data..." />;
  }

  return <>{children}</>;
}

export { BotsProvider };
