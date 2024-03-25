import { requests } from './Api'

export const Auth = {
  getAccessToken: (body: any) => requests.postForm('sts/getaccesstoken', body)
}
