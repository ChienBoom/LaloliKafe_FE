import { Carousel, Col, Image, Row } from 'antd'

export function Home(props: any) {
  return (
    <Row justify="center" align="middle">
      <Col span={18}></Col>
      <Col span={6}>
        <Carousel autoplay dotPosition="bottom">
          <Image
            height={500}
            width={300}
            src="https://hips.hearstapps.com/hmg-prod/images/delish-220517-dirty-shirley-cocktail-001-ab-web-1657145301.jpg"
          />
          <Image
            height={500}
            width={300}
            src="https://www.liquor.com/thmb/_ByJyW_TPQ0W7W2SkX2qMwxoL7o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/shirley-temple-720x720-primary-e0fa3d9417e94ae18fe5cee2131862fb.jpg"
          />
          <Image
            height={500}
            width={300}
            src="https://watermark.lovepik.com/photo/20211208/large/lovepik-summer-special-drink-picture_501587815.jpg"
          />
          <Image
            height={500}
            width={300}
            src="https://thumbs.dreamstime.com/z/iced-blue-lime-soda-drink-freshening-69521038.jpg"
          />
        </Carousel>
      </Col>
    </Row>
  )
}

export default Home
