import { Button, Flex, Input, message, Popconfirm, Table, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import Api from '../../../apis/Api'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { AreaSlice } from './AreaSlice'
import AreaForm from './AreaForm'

export function AreaTable(props: any) {
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
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      align: 'center' as const
    },
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
      width: '15%',
      align: 'center' as const
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: '25%',
      align: 'center' as const
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: 'options',
      width: '30%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => (
        <>
          <Tooltip placement="top" title="Xem chi tiết" arrow={true}>
            <Button>
              <EyeOutlined onClick={() => handleClickDetail(record)} />
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

  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [dataShow, setDataShow] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const handleClickDetail = (record: any) => {
    dispatch(
      AreaSlice.actions.handleAreaForm({
        type: 'DETAIL',
        area: record
      })
    )
  }

  const handleAddButton = () => {
    dispatch(
      AreaSlice.actions.handleAreaForm({
        type: 'ADD',
        area: {
          id: '',
          name: '',
          code: '',
          description: ''
        }
      })
    )
  }

  const handleClickUpdate = (record: any) => {
    dispatch(
      AreaSlice.actions.handleAreaForm({
        type: 'UPDATE',
        area: record
      })
    )
  }

  const handleConfirmDelete = (id: any) => {
    Api.Area.delete(id)
      .then((response: any) => {
        message.success('Xóa khu vực thành công!')
        handleReloadData()
      })
      .catch((error: any) => {
        message.error('Xóa khu vực thất bại!')
      })
  }

  const handleReloadData = () => {
    Api.Area.get().then((res: any) => {
      setData(res.data)
      setDataShow(res.data)
    })
  }

  useEffect(() => {
    Api.Area.get().then((res: any) => {
      setData(res.data)
      setDataShow(res.data)
    })
  }, [])

  useEffect(() => {
    if (searchValue.trim() === '') {
      setDataShow(data)
    } else {
      const newData = data.filter(function (item: any) {
        return (
          item.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(searchValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '')) ||
          item.code
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(searchValue.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        )
      })
      setDataShow(newData)
    }
  }, [searchValue])

  return (
    <Flex vertical>
      <Flex className="mt-[20px] bg-white h-[60px]">
        <Flex className="items-center text-blue-500 ml-[20px] font-bold w-3/5">
          <SwapOutlined />
          <div className="text-2xl ml-[10px]">Quản lý khu vực</div>
        </Flex>
        <Flex className="mt-[10px] h-[40px] items-center">
          <Input.Search
            placeholder="Tìm kiếm tên/mã khu vực"
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
      <AreaForm onReloadData={handleReloadData} />
    </Flex>
  )
}

export default AreaTable
