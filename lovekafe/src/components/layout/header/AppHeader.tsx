import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginSlice } from '../../Log/Login/LoginSlice'
import { useAraSelector } from '../../../store/ConfigStore'
import { useEffect } from 'react'

export function AppHeader(props: any) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAraSelector((state) => state.auth)
  const handleClickLogout = () => {
    dispatch(LoginSlice.actions.setAccessToken(null))
    localStorage.removeItem('accessToken')
    navigate('login')
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <div onClick={handleClickLogout}>Đăng xuất</div>
    }
  ]

  useEffect(() => {}, [user])

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button className="h-[50px] text-lg absolute top-[5px] right-[10px]">
        <Avatar src={user.urlImage} size="large" className="mr-[5px]" icon={<UserOutlined />}></Avatar>
        {user.fullName}
      </Button>
    </Dropdown>
  )
}

export default AppHeader
