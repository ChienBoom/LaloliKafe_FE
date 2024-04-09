import Login from '../components/Log/Login/Login'
import AppLayout from '../components/layout/AppLayout'
import { useAraSelector } from '../store/ConfigStore'

export function Auth() {
  const { accessToken } = useAraSelector((state) => state.auth)
  if (!accessToken) return <Login />
  else return <AppLayout />
}

export default Auth
