import { Button, Flex, Form, Input, message, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { useAraSelector } from '../../../store/ConfigStore'
import ChDrawer from '../../ChComponent/ChDrawer'
import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { AreaSlice } from './AreaSlice'
import Api from '../../../apis/Api'

export function AreaForm(props: any) {
  const dispatch = useDispatch()

  const [form] = Form.useForm()

  const { openForm } = useAraSelector((state) => state.area)
  const { onReloadData } = props

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [dis, setDis] = useState(false)
  const [area, setArea] = useState({
    id: '',
    name: '',
    code: '',
    description: ''
  })

  const handleCloseForm = () => {
    dispatch(
      AreaSlice.actions.handleAreaForm({
        type: 'CLOSE',
        area: {
          id: '',
          name: '',
          code: '',
          description: ''
        }
      })
    )
  }

  const handleSave = (values: any) => {
    console.log('values', values)
    switch (openForm.type) {
      case 'ADD':
        Api.Area.post(values)
          .then((response: any) => {
            message.success('Thêm mới khu vực thành công!')
            handleCloseForm()
            onReloadData()
          })
          .catch((error: any) => {
            message.error('Thêm mới khu vực thất bại!')
          })
        break
      case 'UPDATE':
        values.id = area.id
        console.log('values', values)
        Api.Area.put(values.id, values)
          .then((response: any) => {
            console.log('Success: ', response)
            message.success('Cập nhật khu vực thành công!')
            handleCloseForm()
            onReloadData()
          })
          .catch((error: any) => {
            console.log('Error: ', error)
            message.error('Cập nhật khu vực thất bại!')
          })
        break
      case 'DETAIL':
        break
      default:
        break
    }
  }

  useEffect(() => {
    switch (openForm.type) {
      case 'ADD':
        setTitle('Thêm mới khu vực')
        setArea(openForm.area)
        setOpen(true)
        setDis(false)
        form.setFieldsValue(openForm.area)
        break
      case 'UPDATE':
        setTitle('Sửa khu vực')
        setArea(openForm.area)
        setOpen(true)
        setDis(false)
        form.setFieldsValue(openForm.area)
        break
      case 'DETAIL':
        setTitle('Xem chi tiết khu vực')
        setArea(openForm.area)
        setOpen(true)
        setDis(true)
        form.setFieldsValue(openForm.area)
        break
      case 'CLOSE':
        setTitle('')
        setArea(openForm.area)
        setOpen(false)
        setDis(false)
        form.setFieldsValue(openForm.area)
        break
      default:
        setOpen(false)
        break
    }
  }, [openForm])

  return (
    <ChDrawer
      title={title}
      showFooterAction={true}
      open={open}
      onClose={handleCloseForm}
      closeIcon={true}
      onFtSave={() => form.submit()}
      iconTitle={<PlusOutlined />}
    >
      <Form onFinish={handleSave} layout="vertical" form={form}>
        <div className="grid grid-cols-2 gap-2">
          <Form.Item
            label="Tên khu vực"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên khu vực!' }]}
          >
            <Input className="w-full" size="large" disabled={dis} />
          </Form.Item>

          <Form.Item label="Mã khu vực" name="code" rules={[{ required: true, message: 'Vui lòng nhập mã khu vực!' }]}>
            <Input size="large" disabled={dis} />
          </Form.Item>
        </div>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} disabled={dis} />
        </Form.Item>
      </Form>
    </ChDrawer>
  )
}

export default AreaForm
