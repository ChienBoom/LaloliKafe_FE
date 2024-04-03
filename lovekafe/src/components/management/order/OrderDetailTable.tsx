import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Popconfirm, Table, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import Api from '../../../apis/Api'
import { OrderDetailModel } from '../../../models/OrderDetailModel'
import { useForm } from 'antd/es/form/Form'
import ChSelect from '../../ChComponent/ChSelect'

export function OrderDetailTable(props: any) {
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
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'product',
      width: '20%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => <>{text.name}</>
    },
    {
      title: 'SL',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '10%',
      align: 'center' as const
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: '30%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => <>{text.code}</>
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: 'options',
      width: '30%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => (
        <>
          <Tooltip placement="top" title="Sửa" arrow={true}>
            <Button onClick={() => handleUpdate(record)}>
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

  const { lstOrDe, onReloadData } = props
  const [form] = useForm()

  const [data, setData] = useState(lstOrDe)
  const [open, setOpen] = useState(false)
  const [orderDetail, setOrderDetail] = useState<OrderDetailModel>({
    id: '',
    orderId: '',
    productId: '',
    quantity: 1,
    description: ''
  })

  const handleConfirmDelete = (id: any) => {
    Api.OrderDetail.delete(id)
      .then((res: any) => {
        message.success('Xóa bản ghi thành công!')
        onReloadData()
      })
      .catch((error: any) => {
        message.error('Xóa bản ghi thất bại!')
      })
  }

  const handleUpdate = (record: any) => {
    console.log(record)
    setOrderDetail(record)
    form.setFieldsValue(record)
    setOpen(true)
  }

  const handleSave = (values: any) => {
    values.id = orderDetail.id
    values.orderId = orderDetail.orderId
    Api.OrderDetail.put(values.id, values)
      .then((res: any) => {
        message.success('Cập nhật chi tiết Order thành công!')
        onReloadData()
        setOpen(false)
      })
      .catch((error: any) => {
        message.error('Cập nhật chi tiết Order thất bại!')
      })
  }

  const handleCancel = () => {
    console.log('Cancel')
    setOpen(false)
  }

  useEffect(() => {
    setData(lstOrDe)
  }, [lstOrDe])

  return (
    <>
      <Table columns={columns} dataSource={data} rowKey="id" pagination={false} />
      <Modal title="Cập nhật chi tiết Order" open={open} onOk={() => form.submit()} onCancel={handleCancel}>
        <Form onFinish={handleSave} layout="vertical" form={form}>
          <div className="grid grid-cols-2 gap-2">
            <Form.Item
              label="Sản phẩm"
              name="productId"
              rules={[{ required: true, message: 'Vui lòng chọn sản phẩm!' }]}
            >
              <ChSelect
                size="large"
                apiName="Product"
                // value={categoryName}
                // onChange={(value) => {
                //   setCategoryName(value)
                // }}
              />
            </Form.Item>

            <Form.Item label="Số lượng" name="quantity">
              <Input size="large" type="number" />
            </Form.Item>
          </div>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default OrderDetailTable
