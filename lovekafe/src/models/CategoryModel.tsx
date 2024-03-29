import { ProductModel } from './ProductModel'

export interface CategoryModel {
  id: string
  name: string
  code: string
  products?: ProductModel
  description: string
  urlImage?: string
}
