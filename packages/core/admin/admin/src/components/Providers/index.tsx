import React from 'react';
import axios from 'axios';
import { Platform } from '@botmate/types/admin';
import { BotMateAppProvider, BotsProvider } from '@botmate/helper-plugin';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { BotMateUIProvider } from '@botmate/ui';

const BASE_URL = import.meta.env.VITE_APP_API_URL;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey: [url] }) => {
        if (typeof url === 'string') {
          const { data } = await axios.get(`${BASE_URL}/${url.toLowerCase()}`);
          return data;
        }
        throw new Error('Invalid QueryKey');
      },
    },
  },
});

type Props = {
  menu: any[];
  plugins: any;
  platforms: {
    [key: string]: Platform;
  };
  children: React.ReactNode;
};
function Providers({ menu, plugins, children, platforms }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <BotMateAppProvider menu={menu} plugins={plugins} platforms={platforms}>
        <BotsProvider
          bots={[
            {
              _id: '1',
              name: 'Bot 1',
              platform: 'facebook',
              secrets: {},
              config: {},
              status: 'active',
              updatedAt: new Date().toString(),
              createdAt: new Date().toString(),
            },
          ]}
        >
          <BotMateUIProvider>{children}</BotMateUIProvider>
        </BotsProvider>
      </BotMateAppProvider>
    </QueryClientProvider>
  );
}

export default Providers;
