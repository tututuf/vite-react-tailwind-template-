import request from '@/utils/request';
import { LoginReq, GetChatListReq, GetHistoryReq } from './types/request';
import { LoginRes, ChatListRes, HistoryInfoRes } from './types/response';

export function loginApi(data: LoginReq) {
  return request<LoginRes>({
    method: 'post',
    url: '/user/login',
    data
  });
}

export function getHistory(params: GetHistoryReq) {
  return request<HistoryInfoRes>({
    method: 'get',
    url: '/gpt/get_history',
    params
  });
}

export function getChatList(params?: GetChatListReq) {
  return request<ChatListRes>({
    method: 'get',
    url: '/gpt/get_chat_list',
    params
  });
}
