import { useBotMateApp } from '../useBotMateApp';

export const useService = () => {
  const { apiBaseUrl } = useBotMateApp();

  return {
    runService: (plugin, service, payload) => {
      return fetch(apiBaseUrl + '/plugins/run-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pluginName: plugin,
          pluginService: service,
          payload,
        }),
      });
    },
  };
};
