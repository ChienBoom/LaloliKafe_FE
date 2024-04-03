import { useParams } from 'react-router-dom'
import OrderTable from './OrderTable'
import { useEffect, useState } from 'react'
import Api from '../../../apis/Api'
import { useDispatch } from 'react-redux'
import { OrderSlice } from './OrderSlice'
import { TableModel } from '../../../models/TableModel'

export function Order(props: any) {
  const dispatch = useDispatch()

  const { tableId } = useParams()
  const [table, setTable] = useState<TableModel>({
    id: '',
    name: '',
    code: '',
    areaId: '',
    description: '',
    isActive: false
  })

  const handleActiveTable = () => {
    Api.Table.put(table.id, {
      id: table.id,
      name: table.name,
      code: table.code,
      areaId: table.areaId,
      description: table.description,
      isActive: true
    })
      .then((res: any) => {
        dispatch(OrderSlice.actions.setTable(res))
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  const handleUnActiveTable = () => {
    Api.Table.put(table.id, {
      id: table.id,
      name: table.name,
      code: table.code,
      areaId: table.areaId,
      description: table.description,
      isActive: false
    })
      .then((res: any) => {
        dispatch(OrderSlice.actions.setTable(res))
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  useEffect(() => {
    Api.Table.getById(tableId)
      .then((res: any) => {
        setTable(res)
        dispatch(OrderSlice.actions.setTable(res))
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [tableId])
  return <OrderTable tableId={tableId} onUnActiveTable={handleUnActiveTable} onActiveTable={handleActiveTable} />
}

export default Order
