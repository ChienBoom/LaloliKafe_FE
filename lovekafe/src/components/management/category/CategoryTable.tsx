import { Button, Flex, Image, Input, message, Popconfirm, Table, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  RetweetOutlined,
  SwapOutlined
} from '@ant-design/icons'
import { CategoryForm } from './CategoryForm'
import { useDispatch } from 'react-redux'
import { CategorySlice } from './CategorySlice'
import Api from '../../../apis/Api'
import { useNavigate } from 'react-router-dom'

export function CategoryTable(props: any) {
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
      width: '10%',
      align: 'center' as const
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
      align: 'center' as const
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'urlImage',
      key: 'urlImage',
      width: '20%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => <Image width={30} height={30} src={record.urlImage} />
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: 'options',
      width: '20%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => (
        <>
          <Tooltip placement="top" title="Sản phẩm" arrow={true}>
            <Button onClick={() => navigate('/management/category/' + record.id)}>
              <RetweetOutlined />
            </Button>
          </Tooltip>

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
  const navigate = useNavigate()

  // const { loadingData, categoryData } = useAraSelector((state) => state.category)

  const [data, setData] = useState([])
  const [dataShow, setDataShow] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const handleClickDetail = (record: any) => {
    dispatch(
      CategorySlice.actions.handleCategoryForm({
        type: 'DETAIL',
        category: record
      })
    )
  }

  const handleAddButton = () => {
    dispatch(
      CategorySlice.actions.handleCategoryForm({
        type: 'ADD',
        category: {
          id: '',
          name: '',
          code: '',
          description: '',
          urlImage: ''
        }
      })
    )
  }

  const handleClickUpdate = (record: any) => {
    dispatch(
      CategorySlice.actions.handleCategoryForm({
        type: 'UPDATE',
        category: record
      })
    )
  }

  const handleConfirmDelete = (id: any) => {
    Api.Category.delete(id)
      .then((response: any) => {
        message.success('Xóa danh mục thành công!')
        handleReloadData()
      })
      .catch((error: any) => {
        message.error('Xóa danh mục thất bại!')
      })
  }

  const handleReloadData = () => {
    Api.Category.get().then((res: any) => {
      setData(res.data)
      setDataShow(res.data)
    })
  }

  useEffect(() => {
    Api.Category.get().then((res: any) => {
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
          <div className="text-2xl ml-[10px]">Quản lý danh mục sản phẩm</div>
        </Flex>
        <Flex className="mt-[10px] h-[40px] items-center">
          <Input.Search
            placeholder="Tìm kiếm tên/mã danh mục"
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
      <Table
        columns={columns}
        dataSource={dataShow}
        rowKey="id"
        pagination={false}
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: () => {
        //       navigate('/management/category/' + record.id)
        //     }
        //   }
        // }}
      />
      <CategoryForm onReloadData={handleReloadData} />
    </Flex>
  )
}
