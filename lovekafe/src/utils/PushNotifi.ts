import { HubConnectionBuilder } from "@microsoft/signalr";
import { message } from "antd";

export function PushNotifi(){
    const hubConnection = new HubConnectionBuilder()
    .withUrl(`https://localhost:7049/chatHub`)
    .withAutomaticReconnect()
    .build()

    hubConnection
    .start()
    .then(() => {
      console.log('Đã kết nối tới hub')
    })
    .catch((err) => console.error(err))

    hubConnection.onreconnecting(() => {
        message.error("Reconnecting...")
      })

    hubConnection.onreconnected(() => {
        message.success("Reconnected!")
      })

    hubConnection.on('ReceiveMessage', (noti) => console.log(noti))

    hubConnection.on('ClientIdAssigned', async (clientId) => {
        console.log('Client ID assigned:', clientId)
        await hubConnection.invoke('RegisterClient', clientId, window.location.origin)
      })
}

export default PushNotifi