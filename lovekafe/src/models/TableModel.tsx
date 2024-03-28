import { AreaModel } from './AreaModel'

export interface TableModel {
  id: string
  name: string
  code: string
  areaId: string
  area?: AreaModel
  orders?: string
  description: string
}
