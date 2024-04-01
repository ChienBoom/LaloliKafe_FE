import { Form, Input, message, Upload, UploadFile } from 'antd'
import ChDrawer from '../../ChComponent/ChDrawer'
import ChSelect from '../../ChComponent/ChSelect'
import { useEffect, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { PlusOutlined } from '@ant-design/icons'
import { useAraSelector } from '../../../store/ConfigStore'
import { ProductModel } from '../../../models/ProductModel'
import { useDispatch } from 'react-redux'
import { ProductSlice } from './ProductSlice'
import Api from '../../../apis/Api'
import UploadService from '../../../services/uploadFile/UploadService'

export function ProductForm(props: any) {
  const dispatch = useDispatch()

  const { openForm } = useAraSelector((state) => state.product)
  const { onReloadData } = props

  const [form] = useForm()

  const [product, setProduct] = useState<ProductModel>({
    id: '',
    name: '',
    code: '',
    categoryId: '',
    category: {
      id: '',
      name: '',
      code: '',
      description: '',
      urlImage: ''
    },
    price: 40000,
    description: '',
    urlImage: ''
  })

  const [title, setTitle] = useState('')
  const [open, setOpen] = useState(false)
  const [dis, setDis] = useState(false)
  const [categoryName, setCategoryName] = useState<any>('')

  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [img, setImg] = useState<any>('')

  const handleChangeUpload = (lstFile: any) => {
    setFileList(lstFile.fileList)
    lstFile.fileList.length > 0 ? setImg(lstFile.fileList[0].originFileObj) : setImg('')
  }

  const handleCloseForm = () => {
    dispatch(
      ProductSlice.actions.handleProductForm({
        type: 'CLOSE',
        product: {
          id: '',
          name: '',
          code: '',
          categoryId: '',
          category: {
            id: '',
            name: '',
            code: '',
            description: '',
            urlImage: ''
          },
          price: 40000.0,
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
        Api.Product.post(values)
          .then((response: any) => {
            message.success('Thêm mới sản phẩm thành công!')
            handleCloseForm()
            onReloadData()
          })
          .catch((error: any) => {
            message.error('Thêm mới sản phẩm thất bại!')
          })
        break
      case 'UPDATE':
        values.id = product.id
        values.urlImage = urlImg ?? product.urlImage
        Api.Product.put(product.id, values)
          .then((response: any) => {
            message.success('Cập nhật sản phẩm thành công!')
            handleCloseForm()
            onReloadData()
          })
          .catch((error: any) => {
            message.error('Cập nhật sản phẩm thất bại!')
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
        setTitle('Thêm mới sản phẩm')
        setProduct(openForm.product)
        form.setFieldsValue(openForm.product)
        setDis(false)
        setOpen(true)
        break
      case 'UPDATE':
        setTitle('Sửa sản phẩm')
        setProduct(openForm.product)
        form.setFieldsValue(openForm.product)
        setDis(false)
        setCategoryName(openForm.product.category?.name)
        setOpen(true)
        break
      case 'DETAIL':
        setTitle('Xem chi tiết sản phẩm')
        setProduct(openForm.product)
        form.setFieldsValue(openForm.product)
        setDis(true)
        setCategoryName(openForm.product.category?.name)
        setOpen(true)
        break
      case 'CLOSE':
        setTitle('')
        setProduct(openForm.product)
        form.setFieldsValue(openForm.product)
        setDis(false)
        setCategoryName('')
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
          <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên bàn!' }]}>
            <Input size="large" disabled={dis} />
          </Form.Item>

          <Form.Item label="Mã sản phẩm" name="code" rules={[{ required: true, message: 'Vui lòng nhập mã bàn!' }]}>
            <Input size="large" disabled={dis} />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Form.Item
            label="Danh mục sản phẩm"
            name="categoryId"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm!' }]}
          >
            <ChSelect
              size="large"
              apiName="Category"
              disabled={dis}
              value={categoryName}
              onChange={(value) => {
                setCategoryName(value)
              }}
            />
          </Form.Item>
          <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}>
            <Input type="number" size="large" disabled={dis} />
          </Form.Item>
        </div>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} disabled={dis} />
        </Form.Item>

        <Form.Item label="Tải ảnh lên" name="urlImg">
          <Upload listType="picture-card" onChange={handleChangeUpload} disabled={dis} fileList={fileList} maxCount={1}>
            {'Upload'}
          </Upload>
        </Form.Item>
      </Form>
    </ChDrawer>
  )
}

export default ProductForm
