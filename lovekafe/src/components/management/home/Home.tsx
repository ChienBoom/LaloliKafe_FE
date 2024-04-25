import { Card, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import Meta from 'antd/es/card/Meta'
import Api from '../../../apis/Api'

export function Home(props: any) {
  const [products, setProducts] = useState([])
  useEffect(() => {
    Api.Product.get()
      .then((res: any) => {
        setProducts(res.data)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])
  return (
    <Row gutter={16}>
      {products.map((item: any) => (
        <Col span={6} key={item.id} className=" p-[10px]">
          <Card
            hoverable
            className="w-full h-[300px]"
            cover={<img className="h-[200px]" alt={item.name} src={item.urlImage} />}
          >
            <Meta title={item.name} description={item.price + 'VND'} />
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default Home
