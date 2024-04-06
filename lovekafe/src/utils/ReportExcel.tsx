import ExcelJS from 'exceljs'
export function ReportExcel(data: any) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('My Sheet')
  const labels: [] = data.labels
  const revenues: [] = data.revenues
  worksheet.addRow(['STT', 'Tháng', 'Doanh thu'])
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
    a.download = 'example.xlsx'
    a.click()
    window.URL.revokeObjectURL(url)
  })
  return
}

export default ReportExcel
