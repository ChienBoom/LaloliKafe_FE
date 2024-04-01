import { useParams } from 'react-router-dom'
import OrderTable from './OrderTable'

export function Order(props: any) {
  const { tableId } = useParams()
  return <OrderTable tableId={tableId} />
}

export default Order
