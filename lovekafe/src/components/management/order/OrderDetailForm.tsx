import { Button, Form, Input, message } from 'antd'
import ChDrawer from '../../ChComponent/ChDrawer'
import ChSelect from '../../ChComponent/ChSelect'
import OrderDetailTable from './OrderDetailTable'
import { PlusOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'
import { useAraSelector } from '../../../store/ConfigStore'
import { useDispatch } from 'react-redux'
import { OrderSlice } from './OrderSlice'
import Api from '../../../apis/Api'
import { error } from 'console'

export function OrderDetailForm(props: any) {
  const dispatch = useDispatch()
  const { openForm } = useAraSelector((state) => state.order)

  const [form] = useForm()

  const [title, setTitle] = useState('Order')
  const [open, setOpen] = useState(false)
  const [lstOrDe, setLstOrDe] = useState([])

  const handleCloseForm = () => {
    dispatch(
      OrderSlice.actions.handleOrderForm({
        type: 'CLOSE',
        option: 'CLOSE',
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
    setOpen(false)
  }

  const handleSave = (values: any) => {
    values.orderId = openForm.orderId
    Api.OrderDetail.post(values)
      .then((res: any) => {
        message.success('Thêm mới thành công!')
        reLoadLstOrDe()
      })
      .catch((error: any) => {
        message.error('Thêm mới thất bại!')
        console.log()
      })
  }

  const reLoadLstOrDe = () => {
    Api.OrderDetail.get({ orderId: openForm.orderId })
      .then((res: any) => {
        setLstOrDe(res.data)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  useEffect(() => {
    switch (openForm.option) {
      case 'ORDERDETAIL':
        switch (openForm.type) {
          case 'UPDATE':
            form.setFieldsValue(openForm.orderDetail)
            reLoadLstOrDe()
            setOpen(true)
            break
          case 'CLOSE':
            form.setFieldsValue(openForm.orderDetail)
            setOpen(false)
            break
          default:
            break
        }
        break
      default:
        break
    }
  }, [openForm])

  return (
    <ChDrawer
      title={title}
      showFooterAction={false}
      open={open}
      onClose={handleCloseForm}
      closeIcon={true}
      iconTitle={<PlusOutlined />}
    >
      <Form onFinish={handleSave} layout="vertical" form={form} className="mb-[30px]">
        <div className="grid grid-cols-2 gap-2">
          <Form.Item
            label="Tên sản phẩm"
            name="productId"
            rules={[{ required: true, message: 'Vui lòng chọn sản phẩm!' }]}
          >
            <ChSelect size="large" apiName="Product" />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm!' }]}
          >
            <Input size="large" type="number" />
          </Form.Item>
        </div>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Button onClick={() => form.submit()}>Thêm mới</Button>
      </Form>
      <OrderDetailTable lstOrDe={lstOrDe} onReloadData={reLoadLstOrDe} />
    </ChDrawer>
  )
}

export default OrderDetailForm
