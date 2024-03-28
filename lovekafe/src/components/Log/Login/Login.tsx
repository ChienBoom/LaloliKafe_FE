import { Button, Flex, Input, Typography } from 'antd'

const { Title } = Typography

export function Login(props: any) {
  return (
    <div className="w-2/3 mt-[100px] rounded border">
      <Flex vertical className="mt-[20px] ml-[10px] mr-[10px]">
        <Flex vertical className="items-center">
          <Title level={4} type="warning">
            Đăng nhập LoveKafe
          </Title>
        </Flex>
        <Flex vertical className="mt-[20px]">
          <Title level={5} type="warning">
            Tài khoản
          </Title>
          <Input className="h-[50px]" />
        </Flex>
        <Flex vertical className="mt-[20px]">
          <Title level={5} type="warning">
            Mật khẩu
          </Title>
          <Input className="h-[50px]" />
        </Flex>
        <Flex vertical className="mt-[40px]">
          <Button className="h-[40px] text-amber-500">Đăng nhập</Button>
        </Flex>
      </Flex>
    </div>
  )
}

export default Login
