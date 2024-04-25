import { notification } from 'antd'
import axios, { AxiosResponse } from 'axios'
import { getAxiosParams, sleep } from '../utils/Utils'
import { Category } from './Category'
import { UserDetail } from './UserDetail'
import { Area } from './Area'
import { Table } from './Table'
import { Product } from './Product'
import { Order } from './Order'
import { OrderDetail } from './OrderDetail'
import { Revenue } from './Revenue'
import { Auth } from './Auth'
import Login from '../components/Log/Login/Login'
import moment from 'moment'

const responseBody = (response: AxiosResponse) => response.data

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await Api.Auth.getAccessToken({ refreshToken: refreshToken })
    return response.accessToken
  } catch (error) {
    throw error
  }
}

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
  async (error) => {
    const { status } = error.response as AxiosResponse
    const originalRequest = error?.config
    switch (status) {
      case 400:
        notification.error({ message: 'Có lỗi xảy ra !' })
        break
      case 401:
        if (!originalRequest._retry) {
          originalRequest._retry = true
          const expirationRefreshToken = localStorage.getItem('expirationRefreshToken')
          const expirationAccessToken = localStorage.getItem('expirationAccessToken')
          const curentTime = moment()
          if (curentTime.isAfter(expirationAccessToken) && curentTime.isAfter(expirationRefreshToken)) {
            return <Login />
          }
          if (curentTime.isAfter(expirationAccessToken)) {
            const accessToken = await refreshToken()
            localStorage.setItem('accessToken', accessToken)
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            return axios.request(originalRequest)
          }
        }
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
  getById: (url: string) => axios.get(url).then(responseBody),
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
  Table,
  Product,
  Order,
  OrderDetail,
  Revenue,
  Auth
} as any

export default Api
