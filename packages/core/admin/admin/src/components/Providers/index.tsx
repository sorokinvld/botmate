import React from 'react';
import { Platform } from '@botmate/types/admin';
import { BotMateAppProvider, BotsProvider, useAuth } from '@botmate/helper-plugin';
import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import { Center, Loader } from '@botmate/ui';

const LoginPage = loadable(() => import('../../pages/Login'));
const RegisterPage = loadable(() => import('../../pages/Register'));

const BASE_URL = import.meta.env.VITE_APP_API_URL;

type Props = {
  menu: any[];
  plugins: any;
  platforms: {
    [key: string]: Platform;
  };
  children: React.ReactNode;
};
function Providers({ menu, plugins, children, platforms }: Props) {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader text="loading user data..." />
      </Center>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  return (
    <BotMateAppProvider apiBaseUrl={BASE_URL} menu={menu} plugins={plugins} platforms={platforms}>
      <BotsProvider>{children}</BotsProvider>
    </BotMateAppProvider>
  );
}

export default Providers;
