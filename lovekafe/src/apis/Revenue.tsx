import { requests } from './Api'
import BaseApi from './BaseApi'

export const Revenue = {
  ...BaseApi('api/Revenue'),
  getDataTypeMonth: (params: any) => requests.get('api/Revenue/month', params),
  getDataTypeCategory: (params: any) => requests.get('api/Revenue/category', params),
  getDataTypeProduct: (params: any) => requests.get('api/Revenue/product', params)
}
