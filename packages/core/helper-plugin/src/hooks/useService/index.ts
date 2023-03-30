import { useState } from 'react';

export const useService = (pluginName: string) => {
  const [loading, setLoading] = useState(false);

  return {
    loading,
    runService: async (service, payload?) => {
      setLoading(true);
      const apiBaseUrl = process.env.BACKEND;
      const data = await fetch(apiBaseUrl + '/api/plugins/run-service', {
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
