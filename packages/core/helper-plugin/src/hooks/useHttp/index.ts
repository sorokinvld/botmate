import { useState } from 'react';
import axios from 'axios';

type HttpMethod = 'GET' | 'POST';

type HttpResponse<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

type HttpOptions<T> = {
  method: HttpMethod;
  data?: T;
};

function useHttp<T>() {
  const [response, setResponse] = useState<HttpResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const sendRequest = async (url: string, options: HttpOptions<T>) => {
    const URL = process.env.BACKEND + url;
    setResponse({ data: null, error: null, loading: true });

    try {
      const response = await axios(URL, options);

      setResponse({ data: response.data, loading: false, error: null });

      return response.data;
    } catch (error) {
      setResponse({ data: null, error: error.response.data, loading: false });
      throw new Error(error.response.data.error);
    }
  };

  const get = (url: string) => {
    return sendRequest(url, { method: 'GET' });
  };

  const post = (url: string, data: T) => {
    return sendRequest(url, { method: 'POST', data: data });
  };

  return { response, get, post };
}

export { useHttp };
