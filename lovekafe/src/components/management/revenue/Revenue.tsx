import { useEffect, useState } from 'react'
import { Button, Flex, Radio, Select, Space } from 'antd'
import RevenueChart from './RevenueChart'
import Api from '../../../apis/Api'
import { error } from 'console'
import { SwapOutlined } from '@ant-design/icons'

export function Revenue(props: any) {
  const options = [
    { value: 'month', label: 'Thống kê theo tháng' },
    { value: 'category', label: 'Thống kê theo danh mục sản phẩm' },
    { value: 'product', label: 'thống kê theo sản phẩm' }
  ]
  const [revenueType, setRevenueType] = useState('month')

  const [labels, setLabels] = useState([])
  const [revenues, setRevenues] = useState([])
  const [label, setLabel] = useState('')
  const [typeChart, setTypeChart] = useState('bar')

  const handleChange = (e: any) => {
    setRevenueType(e)
  }

  useEffect(() => {
    switch (revenueType) {
      case 'month':
        Api.Revenue.getDataTypeMonth()
          .then((res: any) => {
            console.log(res)
            setLabel(res.label)
            setLabels(res.labels)
            setRevenues(res.revenues)
          })
          .catch((error: any) => {
            console.log(error)
          })
        break
      case 'category':
        Api.Revenue.getDataTypeCategory()
          .then((res: any) => {
            console.log(res)
            setLabel(res.label)
            setLabels(res.labels)
            setRevenues(res.revenues)
          })
          .catch((error: any) => {
            console.log(error)
          })
        break
      case 'product':
        Api.Revenue.getDataTypeProduct()
          .then((res: any) => {
            console.log(res)
            setLabel(res.label)
            setLabels(res.labels)
            setRevenues(res.revenues)
          })
          .catch((error: any) => {
            console.log(error)
          })
        break
      default:
        break
    }
  }, [revenueType])

  return (
    <Flex vertical>
      <Flex className="mt-[20px] bg-white h-[60px]">
        <Flex className="items-center text-blue-500 ml-[20px] font-bold w-3/5">
          <SwapOutlined />
          <div className="text-2xl ml-[10px]">Thống kê - Báo cáo doanh thu</div>
        </Flex>
      </Flex>
      <Flex>
        <Flex className="w-1/4 items-center" vertical>
          <Select
            className="w-3/4 text-center mt-[50px]"
            value={revenueType}
            onChange={handleChange}
            options={options}
          />
          <Button className="w-3/4 mt-[20px]">Xuất báo cáo</Button>
          <Radio.Group className="mt-[50px]" onChange={(e: any) => setTypeChart(e.target.value)} value={typeChart}>
            <Space direction="vertical">
              <Radio value={'bar'}>Bar</Radio>
              <Radio value={'bubble'}>Bubble</Radio>
              <Radio value={'doughnut'}>Doughnut</Radio>
              <Radio value={'line'}>Line</Radio>
              <Radio value={'polarArea'}>Polar Area</Radio>
              <Radio value={'radar'}>Radar</Radio>
            </Space>
          </Radio.Group>
        </Flex>
        <Flex className="w-3/4">
          <RevenueChart label={label} labels={labels} revenues={revenues} typeChart={typeChart} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Revenue
