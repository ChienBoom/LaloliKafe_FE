import { Button, Flex, Image, Input, Popconfirm, Table, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons'
import StaffForm from './StaffForm'
import { useDispatch } from 'react-redux'
import { StaffSlice } from './StaffSlice'
import { useAraSelector } from '../../../store/ConfigStore'
import moment from 'moment'
import Api from '../../../apis/Api'

export function StaffTable(props: any) {
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
      title: 'Tên đầy đủ',
      dataIndex: 'fullName',
      key: 'fullName',
      width: '20%',
      align: 'center' as const
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: '20%',
      align: 'center' as const
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '10%',
      align: 'center' as const
    },
    {
      title: 'Giới tính',
      dataIndex: 'sex',
      key: 'sex',
      width: '10%',
      align: 'center' as const
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'urlImage',
      key: 'urlImage',
      width: '10%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => (
        <Image
          width={20}
          height={20}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
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
          <Tooltip placement="top" title="Xem chi tiết" arrow={true}>
            <Button onClick={() => handleClickDetail(record)}>
              <EyeOutlined />
            </Button>
          </Tooltip>

          <Tooltip placement="top" title="Sửa" arrow={true}>
            <Button onClick={() => handleClickUpdate(record)}>
              <EditOutlined />
            </Button>
          </Tooltip>

          <Popconfirm
            title="Xóa bản ghi này"
            description="Bạn chắc chắn?"
            onConfirm={() => console.log('Ok')}
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

  // const { staffData } = useAraSelector((state) => state.staff)

  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [dataShow, setDataShow] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const handleClickDetail = (record: any) => {
    dispatch(
      StaffSlice.actions.handleStaffForm({
        type: 'DETAIL',
        staff: record
      })
    )
  }

  const handleAddButton = () => {
    dispatch(
      StaffSlice.actions.handleStaffForm({
        type: 'ADD',
        staff: {
          id: '',
          username: '',
          email: '',
          fullName: '',
          dateOfBirth: moment(moment.now()).format(),
          address: '',
          sex: '',
          urlImage: ''
        }
      })
    )
  }

  const handleClickUpdate = (record: any) => {
    dispatch(
      StaffSlice.actions.handleStaffForm({
        type: 'UPDATE',
        staff: record
      })
    )
  }

  useEffect(() => {
    Api.UserDetail.get({ role: 'User' }).then((res: any) => {
      setData(res.data)
      setDataShow(res.data)
    })
  }, [])

  useEffect(() => {
    if (searchValue.trim() === '') {
      setDataShow(data)
    } else {
      const newData = data.filter(function (item: any) {
        return item.fullName
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(searchValue.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      })
      setDataShow(newData)
    }
  }, [searchValue])

  return (
    <Flex vertical>
      <Flex className="mt-[20px] bg-white h-[60px]">
        <Flex className="items-center text-blue-500 ml-[20px] font-bold w-3/5">
          <SwapOutlined />
          <div className="text-2xl ml-[10px]">Quản lý nhân viên</div>
        </Flex>
        <Flex className="mt-[10px] h-[40px] items-center">
          <Input.Search
            placeholder="Tìm kiếm tên nhân viên"
            allowClear
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button className="absolute right-20" onClick={handleAddButton}>
            Thêm mới
            <PlusOutlined />
          </Button>
        </Flex>
      </Flex>
      <Table columns={columns} dataSource={dataShow} rowKey="id" pagination={false} />
      <StaffForm />
    </Flex>
  )
}
