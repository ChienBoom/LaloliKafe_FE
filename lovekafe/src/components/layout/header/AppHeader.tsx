import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'

export function AppHeader(props: any) {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a rel="noopener noreferrer" href="http://localhost:4321/log/login">
          Đăng xuất
        </a>
      )
    }
  ]

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button className="h-[50px] text-lg absolute top-[5px] right-[10px]">
        <Avatar size="large" className="mr-[5px]" icon={<UserOutlined />}></Avatar>
        RootAdmin
      </Button>
    </Dropdown>
  )
}

export default AppHeader
