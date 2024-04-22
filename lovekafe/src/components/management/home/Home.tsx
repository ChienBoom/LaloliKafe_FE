import { Button } from 'antd'
import { useEffect } from 'react'
import PushNotifi from '../../../utils/PushNotifi'

export function Home(props: any) {
  useEffect(() => {
    PushNotifi()
  }, [])
  return <Button></Button>
}

export default Home
