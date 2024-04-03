import { AreaModel } from './AreaModel'
import { OrderModel } from './OrderModel'

export interface TableModel {
  id: string
  name: string
  code: string
  areaId: string
  area?: AreaModel
  orders?: [OrderModel]
  description: string
  isActive?: boolean
  isDelete?: boolean
}
