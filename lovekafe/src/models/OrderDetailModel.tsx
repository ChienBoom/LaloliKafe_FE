import { OrderModel } from './OrderModel'
import { ProductModel } from './ProductModel'

export interface OrderDetailModel {
  id: string
  orderId: string
  productId: string
  quantity: number
  description: string
  order?: OrderModel
  product?: ProductModel
}
