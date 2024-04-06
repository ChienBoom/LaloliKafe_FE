import { Table } from 'antd'

const columns = [
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 80
  }
]

export function ChartTable(props: any) {
  return <Table columns={columns} />
}

export default ChartTable
