import { Button } from 'antd'
import ExcelJS from 'exceljs'
import { useEffect, useState } from 'react'
import Api from '../../../apis/Api'
import ReportExcel from '../../../utils/ReportExcel'

export function Food(props: any) {
  // const workbook = new ExcelJS.Workbook()
  // const worksheet = workbook.addWorksheet('My Sheet')

  // const [labels, setLabels] = useState([])
  // const [revenues, setRevenues] = useState([])
  const [data, setData] = useState([])

  // Add data to the worksheet
  // worksheet.addRow(['Name', 'Age'])
  // worksheet.addRow(['John Doe', 30])
  // worksheet.addRow(['Jane Smith', 25])

  const handleExport = () => {
    // worksheet.addRow(['STT', 'Tháng', 'Doanh thu'])
    // labels.map((item: any, index) => {
    //   worksheet.addRow([index + 1, item, revenues[index]])
    // })
    // // Save the workbook
    // workbook.xlsx.writeBuffer().then((buffer) => {
    //   // Do something with the buffer, for example, download it
    //   const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    //   const url = window.URL.createObjectURL(blob)
    //   const a = document.createElement('a')
    //   a.href = url
    //   a.download = 'example.xlsx'
    //   a.click()
    //   window.URL.revokeObjectURL(url)
    // })
    ReportExcel(data, 'Báo cáo doanh thu', 'Product')
  }

  useEffect(() => {
    Api.Revenue.getDataTypeProduct()
      .then((res: any) => {
        // setLabels(res.labels)
        // setRevenues(res.revenues)
        setData(res)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])
  return <Button onClick={handleExport}>Export</Button>
}

export default Food
