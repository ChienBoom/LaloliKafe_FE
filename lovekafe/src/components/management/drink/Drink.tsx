import { Button, Flex } from 'antd'
import { useEffect } from 'react'
import PushNotifi from '../../../utils/PushNotifi'

export function Drink(props: any) {
  useEffect(() => {
    PushNotifi()
  }, [])

  return <Button>Push Notification</Button>
}

export default Drink
