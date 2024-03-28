import { requests } from './Api'

export default function BaseApi(apisName: string) {
  return {
    get: (params: any) => requests.get(apisName, params),
    getById: (id: string) => requests.get(`${apisName}/${id}}`),
    post: (body: any) => requests.post(apisName, body),
    put: (id: string, body: any) => requests.put(`${apisName}/${id}`, body),
    delete: (id: string) => requests.delete(`${apisName}/${id}`)
  }
}
