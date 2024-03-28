import { notification } from 'antd'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { getAxiosParams, sleep } from '../utils/Utils'
import { Category } from './Category'
import { UserDetail } from './UserDetail'
import { Area } from './Area'
import { Table } from './Table'

const responseBody = (response: AxiosResponse) => response.data

/**
 * Cấu hình API URL
 * */
axios.defaults.baseURL = process.env.REACT_APP_DOMAIN_SERVER
axios.defaults.withCredentials = true

/**
 * Custom Request Headers*/
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

/**
 * Custom Response Headers*/
axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === 'development') await sleep()
    return response
  },
  (error: AxiosError) => {
    const { status } = error.response as AxiosResponse
    switch (status) {
      case 400:
        notification.error({ message: 'Có lỗi xảy ra !' })
        break
      case 401:
        notification.error({ message: 'Có lỗi xác thực !' })
        break
      case 403:
        notification.error({ message: 'Không có quyền truy cập !' })
        break
      case 404:
        notification.error({ message: 'Không tồn tại !' })
        break
      case 500:
        notification.error({ message: 'Có lỗi đến từ máy chủ !' })
        break
      default:
        notification.error({ message: 'Có lỗi xảy ra !' })
        break
    }
    return Promise.reject(error.response)
  }
)

/**
 * Override method*/
export const requests = {
  get: (url: string, params?: any) => axios.get(url, { params: getAxiosParams(params) }).then(responseBody),
  post: (url: string, body: any) => axios.post(url, body).then(responseBody),
  put: (url: string, body: any) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: { 'Content-type': 'multipart/form-data' }
      })
      .then(responseBody)
}

/**
 * Tạo các file API tương ứng rồi import*/
const Api = {
  Category,
  UserDetail,
  Area,
  Table
} as any

export default Api
