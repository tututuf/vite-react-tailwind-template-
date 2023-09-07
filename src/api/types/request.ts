export interface LoginReq {
  username: string; //用户名
  psw: string; // 密码
}

export interface GetHistoryReq {
  page?: number;
  size?: number;
  chat_id?: number;
}

export interface GetChatListReq {
  page?: number;
  size?: number;
}
