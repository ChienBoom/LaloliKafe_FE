import { Button, Flex, Input, message, Popconfirm, Table, Tooltip } from 'antd'
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
      dataIndex: 'area',
      key: 'area',
      width: '20%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => <>{text.name}</>
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
            <Button onClick={() => handleClickDetail(record)}>
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
            onConfirm={() => handleConfirmDelete(record.id)}
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
  const [dataShow, setDataShow] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const handleClickDetail = (record: any) => {
    dispatch(
      TableSlice.actions.handleTableForm({
        type: 'DETAIL',
        table: record
      })
    )
  }

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

  const handleConfirmDelete = (id: any) => {
    Api.Table.delete(id)
      .then((response: any) => {
        message.success('Xóa bản ghi thành công!')
        handleReloadData()
      })
      .catch((error: any) => {
        message.error('Xóa bản ghi thất bại!')
        console.log(error)
      })
  }

  const handleReloadData = () => {
    Api.Table.get().then((res: any) => {
      setData(res.data)
      setDataShow(res.data)
    })
  }

  useEffect(() => {
    Api.Table.get().then((res: any) => {
      setData(res.data)
      setDataShow(res.data)
    })
  }, [])

  useEffect(() => {
    if (searchValue.trim() === '') {
      setDataShow(data)
    } else {
      const newData = data.filter(function (item: any) {
        return (
          item.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(searchValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '')) ||
          item.code
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(searchValue.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        )
      })
      setDataShow(newData)
    }
  }, [searchValue])

  return (
    <Flex vertical>
      <Flex className="mt-[20px] bg-white h-[60px]">
        <Flex className="items-center text-blue-500 ml-[20px] font-bold w-3/5">
          <SwapOutlined />
          <div className="text-2xl ml-[10px]">Quản lý bàn</div>
        </Flex>
        <Flex className="mt-[10px] h-[40px] items-center">
          <Input.Search
            placeholder="Tìm kiếm tên/mã sản phẩm"
            allowClear
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button className="absolute right-20" onClick={handleAddButton}>
            Thêm mới
            <PlusOutlined />
          </Button>
        </Flex>
      </Flex>
      <Table columns={columns} dataSource={dataShow} rowKey="id" pagination={false} />
      <TableForm onReloadData={handleReloadData} />
    </Flex>
  )
}

export default TableTb
