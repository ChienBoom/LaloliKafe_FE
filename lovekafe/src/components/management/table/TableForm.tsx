import { Form, Input, message } from 'antd'
import { useDispatch } from 'react-redux'
import { useAraSelector } from '../../../store/ConfigStore'
import ChDrawer from '../../ChComponent/ChDrawer'
import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { TableSlice } from './TableSlice'
import { TableModel } from '../../../models/TableModel'
import { useForm } from 'antd/es/form/Form'
import Api from '../../../apis/Api'
import ChSelect from '../../ChComponent/ChSelect'

export function TableForm(props: any) {
  const dispatch = useDispatch()

  const { openForm } = useAraSelector((state) => state.table)

  const { onReloadData } = props

  const [form] = useForm()

  const [open, setOpen] = useState(false)
  const [dis, setDis] = useState(false)
  const [title, setTitle] = useState('')
  const [areaName, setAreaName] = useState<any>('')
  const [table, setTable] = useState<TableModel>({
    id: '',
    name: '',
    code: '',
    areaId: '',
    area: {
      id: '',
      name: '',
      code: '',
      description: ''
    },
    description: ''
  })

  const handleCloseForm = () => {
    dispatch(
      TableSlice.actions.handleTableForm({
        type: 'CLOSE',
        table: {
          id: '',
          name: '',
          code: '',
          areaId: '',
          area: {
            id: '',
            name: '',
            code: '',
            description: ''
          },
          description: ''
        }
      })
    )
  }

  const handleSaveForm = async (values: any) => {
    switch (openForm.type) {
      case 'ADD':
        Api.Table.post(values)
          .then((response: any) => {
            message.success('Thêm mới bàn thành công!')
            handleCloseForm()
            onReloadData()
          })
          .catch((error: any) => {
            message.error('Thêm mới bàn thất bại!')
          })
        break
      case 'UPDATE':
        values.id = table.id
        Api.Table.put(table.id, values)
          .then((response: any) => {
            message.success('Cập nhật bàn thành công!')
            handleCloseForm()
            onReloadData()
          })
          .catch((error: any) => {
            message.error('Cập nhật bàn thất bại!')
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
        setTitle('Thêm mới bàn')
        setTable(openForm.table)
        form.setFieldsValue(openForm.table)
        setDis(false)
        setOpen(true)
        break
      case 'UPDATE':
        setTitle('Sửa bàn')
        setTable(openForm.table)
        form.setFieldsValue(openForm.table)
        setAreaName(openForm.table.area?.name)
        setDis(false)
        setOpen(true)
        break
      case 'DETAIL':
        setTitle('Xem chi tiết bàn')
        setTable(openForm.table)
        form.setFieldsValue(openForm.table)
        setAreaName(openForm.table.area?.name)
        setDis(true)
        setOpen(true)
        break
      case 'CLOSE':
        setTitle('')
        setTable(openForm.table)
        form.setFieldsValue(openForm.table)
        setAreaName('')
        setDis(false)
        setOpen(false)
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
      onFtSave={() => form.submit()}
      closeIcon={true}
      iconTitle={<PlusOutlined />}
    >
      <Form onFinish={handleSaveForm} layout="vertical" form={form}>
        <div className="grid grid-cols-2 gap-2">
          <Form.Item label="Tên bàn" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên bàn!' }]}>
            <Input size="large" disabled={dis} />
          </Form.Item>

          <Form.Item label="Mã bàn" name="code" rules={[{ required: true, message: 'Vui lòng nhập mã bàn!' }]}>
            <Input size="large" disabled={dis} />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Form.Item label="Khu vực" name="areaId" rules={[{ required: true, message: 'Vui lòng chọn khu vực!' }]}>
            <ChSelect
              size="large"
              apiName="Area"
              value={areaName}
              disabled={dis}
              onChange={(value) => {
                setAreaName(value)
              }}
            />
          </Form.Item>
        </div>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} disabled={dis} />
        </Form.Item>
      </Form>
    </ChDrawer>
  )
}

export default TableForm
