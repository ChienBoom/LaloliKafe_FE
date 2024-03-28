import { Flex, Image, Typography } from 'antd'
import { Outlet } from 'react-router-dom'
import logo from '../assets/logo.png'

const { Title } = Typography

export function LogLayout(props: any) {
  return (
    <Flex>
      <Flex vertical className="w-2/3 items-center">
        <Image src={logo} width={400} height={400} preview={false} />
        <Title level={1} type="warning" italic>
          LoveKafe
        </Title>
      </Flex>
      <Flex className="w-1/3">
        <Outlet />
      </Flex>
    </Flex>
  )
}

export default LogLayout
