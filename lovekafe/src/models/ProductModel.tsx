import { CategoryModel } from './CategoryModel'
import { OrderDetailModel } from './OrderDetailModel'

export interface ProductModel {
  id: string
  name: string
  code: string
  categoryId: string
  category?: CategoryModel
  price: number
  orderDetails?: [OrderDetailModel]
  description: string
  urlImage?: string
}
