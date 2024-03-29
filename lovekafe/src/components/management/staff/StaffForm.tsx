import { DatePicker, Flex, Input, Select, Typography, Upload } from 'antd'
import { useDispatch } from 'react-redux'
import { useAraSelector } from '../../../store/ConfigStore'
import ChDrawer from '../../ChComponent/ChDrawer'
import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { StaffSlice } from './StaffSlice'
import dayjs from 'dayjs'
import moment from 'moment'
import { UserDetailModel } from '../../../models/UserDetailModel'

const { Title } = Typography

const dateFormat = 'DD/MM/YYYY'

export function StaffForm(props: any) {
  const dispatch = useDispatch()

  const { openForm } = useAraSelector((state) => state.staff)

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [img, setImg] = useState<any>('')
  // const [fileList, setFileList] = useState<UploadFile[]>([
  //   {
  //     uid: '-1',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  //   }
  // ])
  const [staff, setStaff] = useState<UserDetailModel>({
    id: '',
    username: '',
    email: '',
    fullName: '',
    dateOfBirth: '',
    address: '',
    sex: '',
    urlImage: ''
  })

  const handleChangeUpload = (e: any) => {
    console.log(e)
    setImg(e.file.originFileObj)
  }

  // const onPreview = async (file: any) => {
  //   let src = file.url as string
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader()
  //       reader.readAsDataURL(file.originFileObj as FileType)
  //       reader.onload = () => resolve(reader.result as string)
  //     })
  //   }
  //   const image = new Image()
  //   image.src = src
  //   const imgWindow = window.open(src)
  //   imgWindow?.document.write(image.outerHTML)
  // }

  const handleCloseForm = () => {
    dispatch(
      StaffSlice.actions.handleStaffForm({
        type: 'CLOSE',
        staff: {
          id: '',
          username: '',
          email: '',
          fullName: '',
          dateOfBirth: '',
          address: '',
          sex: '',
          urlImage: ''
        }
      })
    )
  }

  const handleSaveForm = () => {
    switch (openForm.type) {
      case 'ADD':
    }
  }

  useEffect(() => {
    switch (openForm.type) {
      case 'ADD':
        setTitle('Thêm mới nhân viên')
        setStaff(openForm.staff)
        setOpen(true)
        break
      case 'UPDATE':
        setTitle('Sửa nhân viên')
        setStaff(openForm.staff)
        console.log('staff: ' + openForm.staff)
        setOpen(true)
        break
      case 'CLOSE':
        setTitle('')
        setStaff(openForm.staff)
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
          <Title level={4}>Tên nhân viên</Title>
          <Input
            className="h-[50px]"
            value={staff.fullName}
            onChange={(e) =>
              setStaff({
                id: staff.id,
                username: staff.username,
                email: staff.email,
                fullName: e.target.value,
                dateOfBirth: staff.dateOfBirth,
                address: staff.address,
                sex: staff.sex,
                urlImage: staff.urlImage
              })
            }
          />
        </Flex>
        <Flex vertical className="w-1/2 pl-[10px]">
          <Title level={4}>Email</Title>
          <Input
            className="h-[50px]"
            value={staff.email}
            onChange={(e) =>
              setStaff({
                id: staff.id,
                username: staff.username,
                email: e.target.value,
                fullName: staff.email,
                dateOfBirth: staff.dateOfBirth,
                address: staff.address,
                sex: staff.sex,
                urlImage: staff.urlImage
              })
            }
          />
        </Flex>
      </Flex>
      <Flex className="mt-[20px]">
        <Flex vertical className="w-1/2 pr-[10px]">
          <Title level={4}>Giới tính</Title>
          <Select
            className="h-[50px]"
            value={staff.sex}
            onChange={(e) =>
              setStaff({
                id: staff.id,
                username: staff.username,
                email: staff.email,
                fullName: staff.fullName,
                dateOfBirth: staff.dateOfBirth,
                address: staff.address,
                sex: e,
                urlImage: staff.urlImage
              })
            }
            options={[
              { value: 'nam', label: 'Nam' },
              { value: 'nữ', label: 'Nữ' },
              { value: 'khác', label: 'Khác' }
            ]}
          />
        </Flex>
        <Flex vertical className="w-1/2 pl-[10px]">
          <Title level={4}>Ngày sinh</Title>
          <DatePicker
            className="h-[50px]"
            value={dayjs(moment(staff.dateOfBirth).format('DD/MM/YYYY'), dateFormat)}
            onChange={(date: any, dateString: any) =>
              setStaff({
                id: staff.id,
                username: staff.username,
                email: staff.email,
                fullName: staff.fullName,
                dateOfBirth: moment(dateString, 'DD/MM/YYYY').format(),
                address: staff.address,
                sex: staff.sex,
                urlImage: staff.urlImage
              })
            }
            format={dateFormat}
          />
        </Flex>
      </Flex>
      <Flex className="mt-[20px]" vertical>
        <Title level={4}>Địa chỉ</Title>
        <Input.TextArea
          rows={4}
          value={staff.address}
          onChange={(e) =>
            setStaff({
              id: staff.id,
              username: staff.username,
              email: staff.email,
              fullName: staff.fullName,
              dateOfBirth: staff.dateOfBirth,
              address: e.target.value,
              sex: staff.sex,
              urlImage: staff.urlImage
            })
          }
        />
      </Flex>
      <Flex vertical className="mt-[20px]">
        <Title level={4}>Tải ảnh cho nhân viên</Title>
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

export default StaffForm
