import { useState } from 'react';
import { useBotMateApp } from '../useBotMateApp';

export const useService = (pluginName: string) => {
  const [loading, setLoading] = useState(false);
  const { apiBaseUrl } = useBotMateApp();

  return {
    loading,
    runService: async (service, payload?) => {
      setLoading(true);
      const data = await fetch(apiBaseUrl + '/plugins/run-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pluginName,
          pluginService: service,
          payload,
        }),
      }).then((res) => res.json());

      setLoading(false);

      return data;
    },
  };
};
