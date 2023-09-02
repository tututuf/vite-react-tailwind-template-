import request from '@/utils/request';
import { LoginReq } from './types/request';

export function login(data: LoginReq) {
  return request({
    method: 'post',
    url: '/user/login',
    data
  });
}
