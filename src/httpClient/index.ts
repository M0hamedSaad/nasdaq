import { ENV } from '@constants';
import axios, { AxiosError } from 'axios';
import { Platform } from 'react-native';

const HttpClient = axios.create({
  timeout: 60000,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'device-type': Platform.OS.toUpperCase(),
  },
});

HttpClient.interceptors.request.use(config => {
  config.baseURL = ENV.POLYGON_REST;
  console.log('[HttpClient] request', config);

  return config;
});

HttpClient.interceptors.response.use(
  res => {
    console.log('[HttpClient] response', res);
    return res;
  },
  (error: AxiosError) => {
    console.log('[HttpClient] error', error);
    return Promise.reject(error);
  },
);

export { HttpClient };
