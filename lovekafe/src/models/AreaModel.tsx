import { TableModel } from './TableModel'

export interface AreaModel {
  id: string
  name: string
  code: string
  tables?: [TableModel]
  description: string
}
