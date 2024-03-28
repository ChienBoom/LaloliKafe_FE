import { Button, Flex, Image, Popconfirm, Table, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import Api from '../../../apis/Api'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { TableSlice } from './TableSlice'
import TableForm from './TableForm'

export function TableTb(props: any) {
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
      width: '10%',
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
      title: 'Khu vực',
      dataIndex: 'urlImage',
      key: 'urlImage',
      width: '20%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => (
        <Image
          width={20}
          height={20}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      )
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: 'options',
      width: '20%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => (
        <>
          <Tooltip placement="top" title="Xem chi tiết" arrow={true}>
            <Button>
              <EyeOutlined />
            </Button>
          </Tooltip>

          <Tooltip placement="top" title="Sửa" arrow={true}>
            <Button onClick={() => handleClickUpdate(record)}>
              <EditOutlined />
            </Button>
          </Tooltip>

          <Popconfirm
            title="Xóa bản ghi này"
            description="Bạn chắc chắn?"
            onConfirm={() => console.log('Ok')}
            onCancel={() => console.log('Cancel')}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip placement="top" title="Xóa" arrow={true}>
              <Button>
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Popconfirm>
        </>
      )
    }
  ]

  const dispatch = useDispatch()

  const [data, setData] = useState([])

  const handleAddButton = () => {
    dispatch(
      TableSlice.actions.handleTableForm({
        type: 'ADD',
        table: {
          id: '',
          name: '',
          code: '',
          areaId: '',
          description: ''
        }
      })
    )
  }

  const handleClickUpdate = (record: any) => {
    dispatch(
      TableSlice.actions.handleTableForm({
        type: 'UPDATE',
        table: record
      })
    )
  }

  useEffect(() => {
    Api.Table.get().then((res: any) => setData(res.data))
  }, [])
  return (
    <Flex vertical>
      <Flex className="mt-[20px] bg-white h-[60px]">
        <Flex className="items-center text-blue-500 ml-[20px] font-bold">
          <SwapOutlined />
          <div className="text-2xl ml-[10px]">Quản lý bàn</div>
        </Flex>
        <Button className="mt-[10px] absolute right-20" onClick={handleAddButton}>
          Thêm mới
          <PlusOutlined />
        </Button>
      </Flex>
      <Table columns={columns} dataSource={data} rowKey="id" pagination={false} />
      <TableForm />
    </Flex>
  )
}

export default TableTb
