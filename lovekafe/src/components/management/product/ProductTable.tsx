import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons'
import { Button, Flex, Image, Input, Popconfirm, Table, Tooltip } from 'antd'
import ProductForm from './ProductForm'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Api from '../../../apis/Api'
import { ProductSlice } from './ProductSlice'

export function ProductTable(props: any) {
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
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: '10%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => <>{text} VND</>
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: '20%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => <>{text.name}</>
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'urlImage',
      key: 'urlImage',
      width: '10%',
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
          <Tooltip placement="top" title="Xem chi tiết" arrow={true}>
            <Button>
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
  const { categoryId } = props

  const [data, setData] = useState([])
  const [dataShow, setDataShow] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const handleAddButton = () => {
    dispatch(
      ProductSlice.actions.handleProductForm({
        type: 'ADD',
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
  }

  const handleClickUpdate = (record: any) => {
    console.log(record)
    dispatch(
      ProductSlice.actions.handleProductForm({
        type: 'UPDATE',
        product: record
      })
    )
  }

  const handleConfirmDelete = (id: any) => {}

  const handleReloadData = () => {}

  useEffect(() => {
    Api.Product.get({ categoryId: categoryId })
      .then((response: any) => {
        setData(response.data)
        setDataShow(response.data)
      })
      .catch((error: any) => {
        console.log(error)
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
          <div className="text-2xl ml-[10px]">Quản lý sản phẩm</div>
        </Flex>
        <Flex className="mt-[10px] h-[40px] items-center">
          <Input.Search
            placeholder="Tìm kiếm tên/mã bàn"
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
      <ProductForm onReloadData={handleReloadData} />
    </Flex>
  )
}

export default ProductTable
