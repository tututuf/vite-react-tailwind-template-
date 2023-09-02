import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ResponseData } from '@/api/types/response';

interface CustomAxiosInstance<T> extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<ResponseData<T>>;
}

const request: CustomAxiosInstance<unknown> = axios.create({
  baseURL: '/server'
});

request.interceptors.request.use(
  (config) => {
    config.headers.Authorization = window.localStorage.getItem('user.token');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    const data = response.data;
    return data;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default request;
