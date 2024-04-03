import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import Logo from '../components/assets/logo.png'

export function ExportPdf(orderDetail: any, table: any) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  var totalPayment = 0

  orderDetail.map((item: any) => {
    const thanhTien = item.product.price * item.quantity
    item.thanhTien = thanhTien
    totalPayment += thanhTien
  })

  const documentDefinition = {
    pageSize: 'A5',

    content: [
      { text: 'LoveKafe', style: 'header' },
      { text: `Tên bàn: ${table.name} - Khu vực: ${table.area?.name}`, style: 'title' },
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          headerRows: 1,
          widths: ['10%', '40%', '10%', '20%', '20%'],
          body: [
            ['STT', 'Sản phẩm', 'SL', 'Giá SP', 'Thành tiền'],
            ...orderDetail.map((item: any, index: any) => [
              index + 1,
              item.product.name,
              item.quantity,
              item.product.price,
              item.thanhTien
            ]),
            ['', '', '', { text: 'Tổng tiền:', bold: true }, totalPayment]
          ],
          style: 'subheader'
        }
      },
      {
        // qr: '00020101021138570010A000000727012700069704220113VQRQ0000avfvq0208QRIBFTTA53037045802VN62280107NPS68690813Thanh toan QR6304B5FA',
        qr: 'LoveKafe Thanh toan',
        fit: 120,
        alignment: 'center',
        margin: [0, 80, 0, 0]
      },
      { text: 'Quét mã QR - LoveKafe - Xin chân thành cảm ơn', style: 'footer' }
      //   {
      //     // if you specify both width and height - image will be stretched
      //     image: Logo,
      //     width: 150,
      //     height: 150
      //   }
    ],
    styles: {
      header: {
        fontSize: 22,
        color: '#EAB308',
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 30] as [number, number, number, number]
      },
      title: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 20] as [number, number, number, number]
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5] as [number, number, number, number]
      },
      footer: {
        fontSize: 14,
        italics: true,
        alignment: 'center',
        margin: [0, 20, 0, 5] as [number, number, number, number]
      }
    }
  }

  const pdfDoc = pdfMake.createPdf(documentDefinition as TDocumentDefinitions)
  return pdfDoc.open()
}
