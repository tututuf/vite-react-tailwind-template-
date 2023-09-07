declare enum ResCode {
  SUCCESS = 200,
  FAIL = 300,
  Error = 400
}

declare enum ResMsg {
  SUCCESS = '操作成功',
  FAIL = '操作失败',
  Error = '服务器发生错误'
}

export enum ResType {
  SUCCESS = 'success',
  FAIL = 'warning',
  Error = 'error'
}

export interface ResponseData<T> {
  type: ResType;
  data: T;
  msg: ResMsg;
  code: ResCode;
}

export interface PaginationRes<T> {
  rows: T[];
  total: number;
}

export interface LoginRes {
  id: number;
  username: string;
  nickname: string;
  mark: string;
  real_name: string;
  age: string;
  status: string;
  token: string;
}

export interface HistoryInfoItem {
  id: number;
  user_id: number;
  message: string;
  chat_id: number;
  create_date: Date;
}

export type HistoryInfoRes = PaginationRes<HistoryInfoItem>;

export interface ChatListItem {
  id: number;
  user_id: number;
  title: string;
  create_date: Date;
}

export type ChatListRes = PaginationRes<ChatListItem>;
