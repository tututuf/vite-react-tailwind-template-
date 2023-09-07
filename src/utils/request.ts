import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ResponseData } from '@/api/types/response';
import MessageBox from '@/components/MessageBox';

interface CustomAxiosInstance extends AxiosInstance {
  <T>(config: AxiosRequestConfig): Promise<ResponseData<T>>;
}

const request: CustomAxiosInstance = axios.create({
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
    const err = error.response.data;
    MessageBox.error(err.msg || '服务器连接失败');
    return Promise.reject(error);
  }
);

export default request;
