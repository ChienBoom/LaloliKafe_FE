import { HubConnectionBuilder } from "@microsoft/signalr";
import { notification } from "antd";

export function PushNotifi(){
    const hubConnection = new HubConnectionBuilder()
    .withUrl(`https://localhost:7037/loveHub`)
    .withAutomaticReconnect()
    .build()

    hubConnection
    .start()
    .then(() => {
      notification.success({
        message: 'Thông báo',
        description: 'Đã kết nối tới LoveHub',
      })
    })
    .catch((err) => console.error(err))

    hubConnection.onreconnecting(() => {
      notification.error({
        message: 'Thông báo',
        description: 'Mất kết nối. Đang kết nối lại với LoveHub',
      })
      })

    hubConnection.onreconnected(() => {
      notification.success({
        message: 'Thông báo',
        description: 'Đã kết nối lại với LoveHub',
      })
      })

    hubConnection.on('ReceiveMessage', (noti) => notification.success({
      message: 'Thông báo',
      description: noti,
    }))

    hubConnection.on('ClientIdAssigned', async (clientId) => {
        console.log('Client ID assigned:', clientId)
        await hubConnection.invoke('RegisterClient', clientId, window.location.origin, "LoveKafe")
      })
}

export default PushNotifi