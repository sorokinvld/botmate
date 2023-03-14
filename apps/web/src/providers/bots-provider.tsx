import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useBotControllerGetBotsQuery } from '@api';
import { setActiveBot } from '../store';
import { Loader } from '@atoms';

type BotsProviderProps = {
  children?: React.ReactNode;
};
function BotsProvider({ children }: BotsProviderProps) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { data: bots, isLoading } = useBotControllerGetBotsQuery();

  useEffect(() => {
    if (isLoading || !bots) return;

    const localActiveBot = localStorage.getItem('activeBot');
    const activeBot = bots.find((bot) => bot.id === localActiveBot);

    if (bots?.length > 0) {
      dispatch(
        setActiveBot({
          bot: activeBot || bots[0],
        }),
      );
      setLoading(false);
    }
  }, [bots, dispatch, isLoading]);

  if (loading) {
    return <Loader text="loading bots data..." />;
  }

  return <>{children}</>;
}

export { BotsProvider };
