import { Menu } from 'antd'
import SubMenu from 'antd/es/menu/SubMenu'
import { useNavigate } from 'react-router-dom'

export function Login(props: any) {
  const navigate = useNavigate()

  const handleMenuClick = (route: any) => {
    navigate(route)
  }

  return (
    <Menu>
      <Menu.Item key="home" onClick={() => handleMenuClick('/')}>
        Home
      </Menu.Item>
      <Menu.Item key="about" onClick={() => handleMenuClick('/about')}>
        About
      </Menu.Item>
      <SubMenu title="Contact">
        <Menu.Item key="contact1" onClick={() => handleMenuClick('/contact')}>
          Contact 1
        </Menu.Item>
        <Menu.Item key="contact2" onClick={() => handleMenuClick('/contact2')}>
          Contact 2
        </Menu.Item>
      </SubMenu>
    </Menu>
  )
}

export default Login
