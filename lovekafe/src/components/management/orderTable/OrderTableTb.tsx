import { LoginOutlined, SwapOutlined } from '@ant-design/icons'
import { Button, Flex, Input, Table, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import Api from '../../../apis/Api'
import { useNavigate } from 'react-router-dom'

export function OrderTableTb(props: any) {
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
      title: 'Khu vực',
      dataIndex: 'area',
      key: 'area',
      width: '20%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => <>{text.name}</>
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: 'options',
      width: '20%',
      align: 'center' as const,
      render: (text: any, record: any, index: any) => (
        <>
          <Tooltip placement="top" title="Order" arrow={true}>
            <Button onClick={() => handleClickOrder(record)}>
              <LoginOutlined />
            </Button>
          </Tooltip>
        </>
      )
    }
  ]

  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [dataShow, setDataShow] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const handleClickOrder = (record: any) => {
    navigate('/management/orderTable/' + record.id)
  }

  useEffect(() => {
    Api.Table.get()
      .then((res: any) => {
        setData(res.data)
        setDataShow(res.data)
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
        <Flex className="items-center text-blue-500 ml-[20px] font-bold w-4/5">
          <SwapOutlined />
          <div className="text-2xl ml-[10px]">Bàn Order</div>
        </Flex>
        <Flex className="mt-[10px] h-[40px] items-center">
          <Input.Search
            placeholder="Tìm kiếm tên/mã bàn"
            allowClear
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Flex>
      </Flex>
      <Table columns={columns} dataSource={dataShow} rowKey="id" pagination={false} />
    </Flex>
  )
}

export default OrderTableTb
