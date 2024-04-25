import { Button, Flex, Image, Input, Typography } from 'antd'
import { useState } from 'react'
import Api from '../../../apis/Api'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LoginSlice } from './LoginSlice'
import logo from '../../assets/logo.png'

const { Title } = Typography

export function Login(props: any) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleClickLogin = () => {
    Api.Auth.login({
      username: username,
      password: password
    })
      .then((res: any) => {
        localStorage.setItem('refreshToken', res.refreshToken)
        localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('expirationRefreshToken', res.expirationRefreshToken)
        localStorage.setItem('expirationAccessToken', res.expirationAccessToken)
        dispatch(LoginSlice.actions.setAccessToken(res.accessToken))
        dispatch(LoginSlice.actions.setUserProfile(res.userDetail))
        navigate('/home')
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  return (
    <Flex className="item-center">
      <Flex vertical className="w-2/3 items-center">
        <Image src={logo} width={400} height={400} preview={false} />
        <Title level={1} type="warning" italic>
          LoveKafe
        </Title>
      </Flex>
      <div className="w-1/3 mt-[100px] ">
        <div className="w-2/3 rounded border">
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
              <Input className="h-[50px]" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Flex>
            <Flex vertical className="mt-[20px]">
              <Title level={5} type="warning">
                Mật khẩu
              </Title>
              <Input.Password className="h-[50px]" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Flex>
            <Flex vertical className="mt-[40px]">
              <Button className="h-[40px] text-amber-500 mb-[30px]" onClick={handleClickLogin}>
                Đăng nhập
              </Button>
            </Flex>
          </Flex>
        </div>
      </div>
    </Flex>
  )
}

export default Login
