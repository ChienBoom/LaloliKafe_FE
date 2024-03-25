import { Button, Flex, Image, Table, Typography } from 'antd'
import { useEffect, useState } from 'react'
import Api from '../../../apis/Api'
import { PlusOutlined, SwapOutlined } from '@ant-design/icons'

const { Title } = Typography

const columns = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
    width: '10%',
    align: 'center' as const,
    render: (text: any, record: any, index: any) => index + 1
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    width: '20%',
    align: 'center' as const
  },
  {
    title: 'Mã',
    dataIndex: 'code',
    key: 'code',
    width: '20%',
    align: 'center' as const
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    width: '20%',
    align: 'center' as const
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'urlImage',
    key: 'urlImage',
    width: '30%',
    align: 'center' as const,
    render: (text: any, record: any, index: any) => (
      <Image
        width={20}
        height={20}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    )
  }
]

export function StaffTable(props: any) {
  const [data, setData] = useState([])

  useEffect(() => {
    Api.Category.get().then((res: any) => setData(res.data))
  }, [])
  return (
    <Flex vertical>
      <Flex className="mt-[20px] bg-white h-[60px]">
        <Flex className="items-center text-blue-500 ml-[20px] font-bold">
          <SwapOutlined />
          <div className="text-2xl ml-[10px]">Quản lý nhân viên</div>
        </Flex>
        <Button className="mt-[10px] absolute right-20">
          Thêm mới
          <PlusOutlined />
        </Button>
      </Flex>
      <Table columns={columns} dataSource={data} rowKey="id" pagination={false} />
    </Flex>
  )
}
