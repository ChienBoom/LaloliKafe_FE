import { DatePicker, Flex, Input, message, Select, Typography, Upload, UploadFile } from 'antd'
import { useDispatch } from 'react-redux'
import { useAraSelector } from '../../../store/ConfigStore'
import ChDrawer from '../../ChComponent/ChDrawer'
import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { StaffSlice } from './StaffSlice'
import dayjs from 'dayjs'
import moment from 'moment'
import { UserDetailModel } from '../../../models/UserDetailModel'
import UploadService from '../../../services/uploadFile/UploadService'
import { error, log } from 'console'
import Api from '../../../apis/Api'

const { Title } = Typography

const dateFormat = 'DD/MM/YYYY'

export function StaffForm(props: any) {
  const dispatch = useDispatch()

  const { openForm } = useAraSelector((state) => state.staff)
  const { onReloadData } = props

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [img, setImg] = useState<any>('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const [staff, setStaff] = useState<UserDetailModel>({
    id: '',
    username: '',
    role: 'User',
    email: '',
    fullName: '',
    dateOfBirth: '',
    address: '',
    sex: '',
    urlImage: ''
  })

  const handleChangeUpload = (lstFile: any) => {
    setFileList(lstFile.fileList)
    lstFile.fileList.length > 0 ? setImg(lstFile.fileList[0].originFileObj) : setImg('')
  }

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
    setFileList([])
    setImg('')
  }

  const handleSaveForm = async () => {
    var urlImg = await UploadService(img)
    console.log('staff: ', staff)
    console.log('url: ', urlImg)
    switch (openForm.type) {
      case 'ADD':
        Api.UserDetail.post({
          username: staff.email,
          role: staff.role,
          email: staff.email,
          fullName: staff.fullName,
          dateOfBirth: staff.dateOfBirth,
          address: staff.address,
          sex: staff.sex,
          urlImage: urlImg ?? staff.urlImage
        })
          .then((res: any) => {
            onReloadData()
            message.success('Thêm mới nhân viên thành công')
          })
          .catch((error: any) => {
            message.error('Thêm mới nhân viên thất bại')
            console.log(error)
          })
        break
      case 'UPDATE':
        Api.UserDetail.put(staff.id, {
          id: staff.id,
          username: staff.email,
          role: staff.role,
          email: staff.email,
          fullName: staff.fullName,
          dateOfBirth: staff.dateOfBirth,
          address: staff.address,
          sex: staff.sex,
          urlImage: urlImg ?? staff.urlImage
        })
          .then((res: any) => {
            onReloadData()
            message.success('Cập nhật thông tin nhân viên thành công')
            handleCloseForm()
          })
          .catch((error: any) => {
            message.error('Cập nhật thông tin nhân viên thất bại')
            console.log(error)
          })
        break
      default:
        break
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
                role: staff.role,
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
                role: staff.role,
                email: e.target.value,
                fullName: staff.fullName,
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
                role: staff.role,
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
                role: staff.role,
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
              role: staff.role,
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
        <Upload listType="picture-card" onChange={handleChangeUpload} maxCount={1}>
          {'Upload'}
        </Upload>
      </Flex>
    </ChDrawer>
  )
}

export default StaffForm
