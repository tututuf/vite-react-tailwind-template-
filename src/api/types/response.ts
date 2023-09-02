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
