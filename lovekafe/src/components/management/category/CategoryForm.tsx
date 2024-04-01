import { Form, Input, message, Upload, UploadFile } from 'antd'
import { useDispatch } from 'react-redux'
import { useAraSelector } from '../../../store/ConfigStore'
import ChDrawer from '../../ChComponent/ChDrawer'
import { CategorySlice } from './CategorySlice'
import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import Api from '../../../apis/Api'
import UploadService from '../../../services/uploadFile/UploadService'
import { useForm } from 'antd/es/form/Form'
import { CategoryModel } from '../../../models/CategoryModel'

export function CategoryForm(props: any) {
  const dispatch = useDispatch()

  const { openForm } = useAraSelector((state) => state.category)
  const { onReloadData } = props

  const [form] = useForm()

  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [img, setImg] = useState<any>('')

  const [open, setOpen] = useState(false)
  const [dis, setDis] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<CategoryModel>({
    id: '',
    name: '',
    code: '',
    description: '',
    urlImage: ''
  })

  const handleChangeUpload = (lstFile: any) => {
    setFileList(lstFile.fileList)
    lstFile.fileList.length > 0 ? setImg(lstFile.fileList[0].originFileObj) : setImg('')
  }

  const handleCloseForm = () => {
    dispatch(
      CategorySlice.actions.handleCategoryForm({
        type: 'CLOSE',
        category: {
          id: '',
          name: '',
          code: '',
          description: '',
          urlImage: ''
        }
      })
    )
    setFileList([])
    setImg('')
  }

  const handleSaveForm = async (values: any) => {
    var urlImg = await UploadService(img)
    switch (openForm.type) {
      case 'ADD':
        values.urlImage = urlImg ?? ''
        console.log('category:', values)
        Api.Category.post(values)
          .then((response: any) => {
            message.success('Thêm mới danh mục thành công!')
            handleCloseForm()
            onReloadData()
          })
          .catch((error: any) => {
            message.error('Thêm mới danh mục thất bại!')
          })
        break
      case 'UPDATE':
        values.urlImage = urlImg ?? category.urlImage
        values.id = category.id
        console.log('category:', values)
        Api.Category.put(category.id, values)
          .then((response: any) => {
            message.success('Cập nhật danh mục thành công!')
            handleCloseForm()
            onReloadData()
          })
          .catch((error: any) => {
            message.error('Cập nhật danh mục thất bại!')
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
        setTitle('Thêm mới danh mục')
        setCategory(openForm.category)
        setDis(false)
        form.setFieldsValue(openForm.category)
        setOpen(true)
        break
      case 'UPDATE':
        setTitle('Sửa danh mục')
        setCategory(openForm.category)
        setDis(false)
        form.setFieldsValue(openForm.category)
        setOpen(true)
        break
      case 'DETAIL':
        setTitle('Xem chi tiết danh mục')
        setCategory(openForm.category)
        setDis(true)
        form.setFieldsValue(openForm.category)
        setOpen(true)
        break
      case 'CLOSE':
        setTitle('')
        setCategory(openForm.category)
        setDis(false)
        form.setFieldsValue(openForm.category)
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
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
          >
            <Input size="large" disabled={dis} />
          </Form.Item>

          <Form.Item
            label="Mã danh mục"
            name="code"
            rules={[{ required: true, message: 'Vui lòng nhập mã danh mục!' }]}
          >
            <Input size="large" disabled={dis} />
          </Form.Item>
        </div>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} disabled={dis} />
        </Form.Item>

        <Form.Item label="Tải ảnh lên" name="urlImg">
          <Upload listType="picture-card" onChange={handleChangeUpload} fileList={fileList} maxCount={1} disabled={dis}>
            {'Upload'}
          </Upload>
        </Form.Item>
      </Form>
    </ChDrawer>
  )
}
