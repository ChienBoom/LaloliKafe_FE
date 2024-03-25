import { Flex, Image, Typography } from 'antd'
import { Outlet } from 'react-router-dom'
import logo from '../assets/logo.png'

const { Title } = Typography

export function LogLayout(props: any) {
  return (
    <Flex className="justify-center">
      <Flex vertical className="items-center">
        <Image src={logo} width={400} height={400} />
        <Title level={1} type="warning" italic>
          LoveKafe
        </Title>
      </Flex>
      <Flex>
        <Outlet />
      </Flex>
    </Flex>
  )
}

export default LogLayout
