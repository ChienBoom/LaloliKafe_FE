import { requests } from './Api'

export const Auth = {
  login: (body: any) => requests.post('api/Auth/login', body),
  register: (body: any) => requests.post('api/Auth/register', body),
  registerAdmin: (body: any) => requests.post('api/Auth/register-admin', body)
}
