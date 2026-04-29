import axios from 'axios';
import { useEffect, useState } from 'react';
import type { AxiosRequestConfig } from 'axios';

export function useTmdb<T>(url: string, params: Record<string, any>, deps: any[]) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const token = import.meta.env.VITE_TMDB_V4_TOKEN;
        const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

        const config: AxiosRequestConfig = {
          params: { ...params },
          signal: controller.signal as any,
        };

        if (token) {
          config.headers = { Authorization: `Bearer ${token}` };
        } else if (apiKey) {
          config.params = { api_key: apiKey, ...config.params };
        }

        const response = await axios.get<T>(url, config);

        setData(response.data);
      } catch (err: any) {
        if (axios.isCancel?.(err)) return;
        console.error(err);
      }
    };

    fetchData();

    return () => controller.abort();
  }, deps);

  return { data };
}
