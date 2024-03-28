import { Button, Flex, Input, message, Typography, Upload } from 'antd'
import { useDispatch } from 'react-redux'
import { useAraSelector } from '../../../store/ConfigStore'
import ChDrawer from '../../ChComponent/ChDrawer'
import { CategorySlice } from './CategorySlice'
import { useEffect, useState } from 'react'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import Api from '../../../apis/Api'
import UploadService from '../../../services/uploadFile/UploadService'

const { Title } = Typography

export function CategoryForm(props: any) {
  const dispatch = useDispatch()

  const { openForm } = useAraSelector((state) => state.category)
  const { onReloadData } = props

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [img, setImg] = useState<any>('')
  const [category, setCategory] = useState({
    id: '',
    name: '',
    code: '',
    description: '',
    urlImage: ''
  })

  const handleChangeUpload = (e: any) => {
    setImg(e.file.originFileObj)
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
    setImg('')
  }

  const handleSaveForm = async () => {
    if (img != '') {
      var urlImg = await UploadService(img)
      console.log('urlImg:', urlImg)
    }
    switch (openForm.type) {
      case 'ADD':
        Api.Category.post({
          name: category.name,
          code: category.code,
          description: category.description,
          urlImage: urlImg ?? ''
        })
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
        Api.Category.put(category.id, {
          id: category.id,
          name: category.name,
          code: category.code,
          description: category.description,
          urlImage: urlImg ?? category.urlImage
        })
          .then((response: any) => {
            message.success('Cập nhật danh mục thành công!')
            handleCloseForm()
            onReloadData()
          })
          .catch((error: any) => {
            message.error('Cập nhật danh mục thất bại!')
          })
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
        setOpen(true)
        break
      case 'UPDATE':
        setTitle('Sửa danh mục')
        setCategory(openForm.category)
        console.log('category: ' + openForm.category)
        setOpen(true)
        break
      case 'CLOSE':
        setTitle('')
        setCategory(openForm.category)
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
      onFtSave={handleSaveForm}
      closeIcon={true}
      iconTitle={<PlusOutlined />}
    >
      <Flex>
        <Flex vertical className="w-1/2 pr-[10px]">
          <Title level={4}>Tên danh mục</Title>
          <Input
            className="h-[50px]"
            value={category.name}
            onChange={(e) =>
              setCategory({
                id: category.id,
                name: e.target.value,
                code: category.code,
                description: category.description,
                urlImage: category.urlImage
              })
            }
          />
        </Flex>
        <Flex vertical className="w-1/2 pl-[10px]">
          <Title level={4}>Mã danh mục</Title>
          <Input
            className="h-[50px]"
            value={category.code}
            onChange={(e) =>
              setCategory({
                id: category.id,
                name: category.name,
                code: e.target.value,
                description: category.description,
                urlImage: category.urlImage
              })
            }
          />
        </Flex>
      </Flex>
      <Flex vertical className="mt-[10px]">
        <Title level={4}>Mô tả</Title>
        <Input.TextArea
          rows={4}
          value={category.description}
          onChange={(e) =>
            setCategory({
              id: category.id,
              name: category.name,
              code: category.code,
              description: e.target.value,
              urlImage: category.urlImage
            })
          }
        />
      </Flex>
      <Flex vertical className="mt-[20px]">
        <Title level={4}>Tải ảnh cho danh mục</Title>
        <Upload
          listType="picture-card"
          onChange={handleChangeUpload}
          // onPreview={onPreview}
          maxCount={1}
        >
          {'Upload'}
        </Upload>
      </Flex>
    </ChDrawer>
  )
}
