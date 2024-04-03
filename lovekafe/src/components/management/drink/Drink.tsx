import { Button, Flex } from 'antd'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { useEffect, useState } from 'react'
import Api from '../../../apis/Api'
import { ExportPdf } from '../../../utils/ExportPdf'

export function Drink(props: any) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const [table, setTable] = useState([])
  const [orderDetails, setOrderDetails] = useState([])

  const invoiceData = {
    customer: {
      name: 'John Doe',
      address: '123 Main Street, Anytown, USA'
    },
    items: [
      { description: 'Coffee', quantity: 2, price: 3 },
      { description: 'Croissant', quantity: 1, price: 2 }
    ],
    total: 8
  }

  const documentDefinition = {
    // content: [
    pageSize: 'A5',
    //   { text: 'LoveKafe', style: 'header' },
    //   {
    //     columns: [
    //       {
    //         width: '10%',
    //         text: 'STT'
    //       },
    //       {
    //         width: '40%',
    //         text: 'Sản phẩm'
    //       },
    //       {
    //         width: '10%',
    //         text: 'SL'
    //       },
    //       {
    //         width: '20%',
    //         text: 'Gía SP'
    //       },
    //       {
    //         width: '20%',
    //         text: 'Thành tiền'
    //       }
    //     ],
    //     // optional space between columns
    //     columnGap: 10
    //   }
    // ],

    content: [
      { text: 'LoveKafe', style: 'header' },
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ['10%', '40%', '10%', '20%', '20%'],

          body: [
            ['STT', 'Sản phẩm', 'SL', 'Gía SP', 'Thành tiền'],
            [1, 'Nước ép mận', '2', '35.000 VNĐ', '70.000 VNĐ'],
            [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4', 'val5']
          ]
        }
      },
      { qr: 'text in QR' }
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        margin: [0, 0, 0, 50] as [number, number, number, number]
      },
      subheader: {
        fontSize: 18,
        bold: true,
        margin: [0, 10, 0, 5] as [number, number, number, number]
      }
    }
  }

  const handleClickSend = () => {
    const result = ExportPdf(orderDetails, table)
    // const pdfDoc = pdfMake.createPdf(documentDefinition as TDocumentDefinitions)
    // pdfDoc.open()
    // pdfDoc.download('invoice.pdf');
  }

  useEffect(() => {
    Api.OrderDetail.get({ orderId: '31cdd07c-fde3-47f6-406e-08dc5388b91f' })
      .then((res: any) => {
        setOrderDetails(res.data)
      })
      .catch((error: any) => {
        console.log(error)
      })

    Api.Table.getById('9c664733-df53-4ffd-f580-08dc4d768712')
      .then((res: any) => {
        setTable(res)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])

  return (
    <Flex vertical>
      <Button className="w-[60px]" onClick={handleClickSend}>
        Send
      </Button>
    </Flex>
  )
}

export default Drink
