/** @format */

import axios from 'axios';
import { useKey } from '@hooks/useKey';
import { KEY_CONTEXT } from './constant';
import { useAuth } from '@/hooks/useAuth';

const config = {
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosClient = axios.create(config);

axiosClient.interceptors.request.use(
  async (req: any) => {
    const { getKey } = useKey();
    const token = getKey(KEY_CONTEXT.TOKEN);
    console.log(token);
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    req.headers.Authorization = `Bearer ${token || ''}`;
    return req;
  },
  (err: any) => Promise.reject(err)
);

axiosClient.interceptors.response.use(
  (res: any) => Promise.resolve(res.data),
  async (err: any) => {
    return Promise.reject(((err || {}).response || {}).data);
  }
);

/** @format */

export interface RequestProps {
  endPoint: string;
  method: string;
  body?: any;
}
let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

const useApi = () => {
  const { setKeySite, setUserLogin, removeKey, getKey } = useKey();

  const { onLogout } = useAuth();

  async function requestApi({ endPoint, method, body }: RequestProps) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    const instance = axios.create({ headers });

    instance.interceptors.request.use(
      (config) => {
        const token = getKey(KEY_CONTEXT.TOKEN);
        console.log('🚀 ~ requestApi ~ token:', token);
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        return response;
      },

      async (error) => {
        console.log('🚀 ~ requestApi ~ error:', error);
        const originalConfig = error.config;

        if (
          error.response &&
          error.response.data.statusCode === 419 &&
          error.response.data.message == 'Token expired'
        ) {
          try {
            console.log('Access token expired');
            if (!isRefreshing) {
              isRefreshing = true;
              refreshPromise = refreshAccessToken();
            }
            console.log('call refresh token api');
            await refreshPromise;

            if (!getKey(KEY_CONTEXT.REFRESH_TOKEN)) {
              onLogout();
            }
            const res = await axiosClient.post('/auth/refresh-token', {
              refreshToken: getKey(KEY_CONTEXT.REFRESH_TOKEN),
            });
            originalConfig.headers['Authorization'] = `Bearer ${getKey(
              KEY_CONTEXT.TOKEN
            )}`;

            return instance(originalConfig);
          } catch (err) {
            console.log('🚀 ~ requestApi ~ err:', err);
            onLogout();
            return Promise.reject(err);
          }
        }
        if (
          error.response &&
          error.response.data.statusCode === 403 &&
          error.response.data.message == 'Forbidden resource'
        ) {
          onLogout();
        }
        return Promise.reject(error);
      }
    );

    const res = await instance.request({
      method: method,
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${endPoint}`,
      data: body,
    });
    return res?.data;
  }
  async function refreshAccessToken() {
    try {
      console.log('Access token expired');
      if (!getKey(KEY_CONTEXT.REFRESH_TOKEN)) {
        onLogout();
      }

      const res = await axiosClient.post('/auth/refresh-token', {
        refreshToken: getKey(KEY_CONTEXT.REFRESH_TOKEN),
      });

      if (res?.data?.accessToken && res?.data?.refreshToken) {
        setKeySite({
          token: res?.data?.accessToken,
          refreshToken: res?.data?.refreshToken,
        });
      }

      isRefreshing = false;
      return Promise.resolve();
    } catch (err) {
      console.log('🚀 ~ refreshAccessToken ~ err:', err);
      onLogout();
      return Promise.reject(err);
    }
  }
  return {
    requestApi,
  };
};

export { axiosClient, useApi };
