import {
  CheckSquareOutlined,
  PieChartOutlined,
  ProductOutlined,
  TableOutlined,
  TeamOutlined,
  UnorderedListOutlined
} from '@ant-design/icons'
import { Avatar, Flex, Layout, Menu, MenuProps, Typography } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import AppHeader from './header/AppHeader'
import AppFooter from './footer/AppFooter'

const { Title } = Typography

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

export function AppLayout(props: any) {
  const navigate = useNavigate()

  const handleClickMenu = (item: any) => {
    navigate(item.key)
  }

  const items: MenuItem[] = [
    getItem('Quản lý nhân viên', 'management/staff', <TeamOutlined />),
    getItem('Quản lý danh mục sản phẩm', 'management/category', <ProductOutlined />),
    getItem('Quản lý sản phẩm', 'management/product', <UnorderedListOutlined />),
    getItem('Order', 'management/orderTable', <CheckSquareOutlined />),
    getItem('Quản lý khu vực - bàn', 'management/area_table', <TableOutlined />, [
      getItem('Khu vực', 'management/area'),
      getItem('Bàn', 'management/table')
    ]),
    getItem('Báo cáo doanh thu', 'management/report', <PieChartOutlined />)
  ]

  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '150vh' }}>
      <Sider theme="dark" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Flex vertical>
          <Flex vertical className="items-center mt-[80px] mb-[30px]">
            <Avatar className="bg-transparent w-[80px] h-[80px] " src={logo} />
            <Title level={5} type="warning" className="text-white">
              LoveKafe
            </Title>
          </Flex>
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            onClick={(item) => handleClickMenu(item)}
          />
        </Flex>
      </Sider>
      <Layout>
        <Header className="bg-white">
          <AppHeader />
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AppLayout
