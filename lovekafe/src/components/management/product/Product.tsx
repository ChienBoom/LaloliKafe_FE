import { useParams } from 'react-router-dom'
import ProductTable from './ProductTable'

export function Product(props: any) {
  const { categoryId } = useParams()
  return <ProductTable categoryId={categoryId} />
}

export default Product
