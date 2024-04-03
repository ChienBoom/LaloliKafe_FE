import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  PlusOutlined,
  PrinterOutlined,
  SwapOutlined
} from '@ant-design/icons'
import { Button, Flex, Input, message, Popconfirm, Switch, Table, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import Api from '../../../apis/Api'
import { useDispatch } from 'react-redux'
import { OrderSlice } from './OrderSlice'
import moment from 'moment'
import { useAraSelector } from '../../../store/ConfigStore'
import OrderDetailForm from './OrderDetailForm'
import { error } from 'console'
import { ExportPdf } from '../../../utils/ExportPdf'
import { useNavigate } from 'react-router-dom'

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
      render: (text: any, record: any, index: any) => <>{moment(text).format('DD/MM/YYYY, h:mm:ss a')}</>
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
          <Tooltip placement="top" title="Order" arrow={true}>
            <Button onClick={() => handleClickUpdate(record)} disabled={!record.isActive}>
              <EditOutlined />
            </Button>
          </Tooltip>

          <Popconfirm
            title="Thanh toán cho order này?"
            description="Bạn chắc chắn?"
            onConfirm={() => handleConfirmPay(record)}
            onCancel={() => console.log('Cancel')}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip placement="top" title="Thanh toán" arrow={true}>
              <Button disabled={!record.isActive}>
                <CheckOutlined />
              </Button>
            </Tooltip>
          </Popconfirm>

          <Popconfirm
            title="In hóa đơn"
            description="Bạn chắc chắn?"
            onConfirm={() => handleConfirmPrint(record.id)}
            onCancel={() => console.log('Cancel')}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip placement="top" title="In" arrow={true}>
              <Button>
                <PrinterOutlined />
              </Button>
            </Tooltip>
          </Popconfirm>
        </>
      )
    }
  ]

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { table } = useAraSelector((state) => state.order)
  const { tableId, onUnActiveTable, onActiveTable } = props

  const [data, setData] = useState([])
  const [dataShow, setDataShow] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const handleClickAdd = () => {
    var order = {
      code: '',
      orderDate: '',
      tableId: '',
      isActive: true
    }
    order.code = generateOrderCode()
    order.orderDate = moment(moment.now()).format()
    order.tableId = tableId
    Api.Order.post(order)
      .then((ren: any) => {
        message.success('Thêm mới Order thành công!')
        reloadData()
        onActiveTable()
      })
      .catch((error: any) => {
        message.error('Thêm mới Order thất bại!')
      })
  }

  const handleClickUpdate = (record: any) => {
    dispatch(
      OrderSlice.actions.handleOrderForm({
        type: 'UPDATE',
        option: 'ORDERDETAIL',
        orderId: record.id,
        orderDetail: {
          id: '',
          orderId: '',
          productId: '',
          quantity: 1,
          description: ''
        },
        lstOrderDetail: []
      })
    )
  }

  const handleConfirmPay = (record: any) => {
    record.isActive = false
    Api.Order.put(record.id, record)
      .then((res: any) => {
        message.success('Thanh toán order thành công!')
        reloadData()
        onUnActiveTable()
      })
      .catch((error: any) => {
        message.error('Thanh toán order thất bại!')
      })
  }

  const handleConfirmPrint = (record: any) => {
    Api.OrderDetail.get({ orderId: record })
      .then((res: any) => {
        const result = ExportPdf(res.data, table)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  const reloadData = () => {
    Api.Order.get({ tableId: tableId })
      .then((res: any) => {
        setData(res.data)
        setDataShow(res.data)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  const generateOrderCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const charactersLength = characters.length
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  useEffect(() => {
    Api.Order.get({ tableId: tableId })
      .then((res: any) => {
        setData(res.data)
        setDataShow(res.data)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [tableId])

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
          <SwapOutlined onClick={() => navigate(-1)} />
          <div className="text-2xl ml-[10px]">Order</div>
        </Flex>
        <Flex className="mt-[10px] h-[40px] items-center">
          <Input.Search
            placeholder="Tìm kiếm theo thời gian tạo"
            allowClear
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Popconfirm
            title="Thêm mới Order"
            description="Bạn chắc chắn?"
            onConfirm={handleClickAdd}
            onCancel={() => console.log('Cancel')}
            okText="Yes"
            cancelText="No"
          >
            <Button className="absolute right-20" disabled={table.isActive}>
              Thêm mới
              <PlusOutlined />
            </Button>
          </Popconfirm>
        </Flex>
      </Flex>
      <Table columns={columns} dataSource={dataShow} rowKey="id" pagination={false} />
      <OrderDetailForm />
    </Flex>
  )
}

export default OrderTable
