import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SwapOutlined
} from '@ant-design/icons'
import { Button, Flex, Input, Popconfirm, Switch, Table, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import Api from '../../../apis/Api'
import { useDispatch } from 'react-redux'
import { OrderSlice } from './OrderSlice'
import moment from 'moment'

export function OrderTable(props: any) {
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
      title: 'Thời gian tạo',
      dataIndex: 'orderDate',
      key: 'orderDate',
      width: '20%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => <>{moment(text.code).format('DD/MM/YYYY, h:mm:ss a')}</>
    },
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
      width: '20%',
      align: 'center' as const
    },
    {
      title: 'Mã bàn',
      dataIndex: 'table',
      key: 'table',
      width: '20%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => <>{text.code}</>
    },
    {
      title: 'Kích hoạt',
      dataIndex: 'isActive',
      key: 'isActive',
      width: '10%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => (
        <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} checked={text} />
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
          {/* <Tooltip placement="top" title="Xem chi tiết" arrow={true}>
                <Button onClick={() => handleClickDetail(record)}>
                  <EyeOutlined />
                </Button>
              </Tooltip> */}

          <Tooltip placement="top" title="Sửa" arrow={true}>
            <Button onClick={() => handleClickUpdate(record)}>
              <EditOutlined />
            </Button>
          </Tooltip>

          {/* <Popconfirm
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
              </Popconfirm> */}
        </>
      )
    }
  ]

  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [dataShow, setDataShow] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const handleAddButton = () => {
    dispatch(
      OrderSlice.actions.handleOrderForm({
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
      OrderSlice.actions.handleOrderForm({
        type: 'UPDATE',
        table: record
      })
    )
  }

  useEffect(() => {
    Api.Order.get()
      .then((res: any) => {
        setData(res.data)
        setDataShow(res.data)
      })
      .catch((error: any) => {
        console.log(error)
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
          <div className="text-2xl ml-[10px]">Order</div>
        </Flex>
        <Flex className="mt-[10px] h-[40px] items-center">
          <Input.Search
            placeholder="Tìm kiếm theo thời gian tạo"
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
    </Flex>
  )
}

export default OrderTable
