import ExcelJS from 'exceljs'
export function ReportExcel(data: any, fileName: string, exportType: string) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('My Sheet')
  const labels: [] = data.labels
  const revenues: [] = data.revenues
  switch (exportType) {
    case 'Month':
      worksheet.addRow(['STT', 'Tháng', 'Doanh thu'])
      break
    case 'Category':
      worksheet.addRow(['STT', 'Danh mục sản phẩm', 'Doanh thu'])
      break
    case 'Product':
      worksheet.addRow(['STT', 'Sản phẩm', 'Doanh thu'])
      break
  }

  labels.map((item: any, index) => {
    worksheet.addRow([index + 1, item, revenues[index]])
  })
  // Save the workbook
  workbook.xlsx.writeBuffer().then((buffer) => {
    // Do something with the buffer, for example, download it
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fileName}.xlsx`
    a.click()
    window.URL.revokeObjectURL(url)
  })
  return
}

export default ReportExcel
