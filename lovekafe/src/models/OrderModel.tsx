import { OrderDetailModel } from './OrderDetailModel'
import { TableModel } from './TableModel'

export interface OrderModel {
  id: string
  orderDate: string
  tableId: string
  table?: TableModel
  orderDetails?: [OrderDetailModel]
}
