import { requests } from './Api'

export default function (apisName: string) {
  return {
    get: (params: any) => requests.get(apisName, params),
    getById: (id: string) => requests.get(`${apisName}/${id}}`),
    post: (body: any) => requests.post(apisName, body),
    put: (body: any) => requests.put(apisName, body),
    delete: (id: string) => requests.delete(`${apisName}/${id}`)
  }
}
