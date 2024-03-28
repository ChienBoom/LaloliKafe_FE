import { Flex, Input, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { useAraSelector } from '../../../store/ConfigStore'
import ChDrawer from '../../ChComponent/ChDrawer'
import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { TableSlice } from './TableSlice'
import { TableModel } from '../../../models/TableModel'

const { Title } = Typography

export function TableForm(props: any) {
  const dispatch = useDispatch()

  const { openForm } = useAraSelector((state) => state.table)

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [table, setTable] = useState<TableModel>({
    id: '',
    name: '',
    code: '',
    areaId: '',
    area: {
      id: '',
      name: '',
      code: '',
      description: ''
    },
    description: ''
  })

  const handleCloseForm = () => {
    dispatch(
      TableSlice.actions.handleTableForm({
        type: 'CLOSE',
        table: {
          id: '',
          name: '',
          code: '',
          areaId: '',
          area: {
            id: '',
            name: '',
            code: '',
            description: ''
          },
          description: ''
        }
      })
    )
  }

  useEffect(() => {
    switch (openForm.type) {
      case 'ADD':
        setTitle('Thêm mới bàn')
        setTable(openForm.table)
        setOpen(true)
        break
      case 'UPDATE':
        setTitle('Sửa bàn')
        setTable(openForm.table)
        console.log('table: ' + openForm.table)
        setOpen(true)
        break
      case 'CLOSE':
        setTitle('')
        setTable(openForm.table)
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
      closeIcon={true}
      iconTitle={<PlusOutlined />}
    >
      <Flex>
        <Flex vertical className="w-1/2 pr-[10px]">
          <Title level={4}>Tên bàn</Title>
          <Input
            className="h-[50px]"
            value={table.name}
            onChange={(e) =>
              setTable({
                id: table.id,
                name: e.target.value,
                code: table.code,
                areaId: table.areaId,
                description: table.description
              })
            }
          />
        </Flex>
        <Flex vertical className="w-1/2 pl-[10px]">
          <Title level={4}>Mã bàn</Title>
          <Input
            className="h-[50px]"
            value={table.code}
            onChange={(e) =>
              setTable({
                id: table.id,
                name: table.name,
                code: e.target.value,
                areaId: table.areaId,
                description: table.description
              })
            }
          />
        </Flex>
      </Flex>
      <Flex vertical className="mt-[10px]">
        <Title level={4}>Mô tả</Title>
        <Input.TextArea
          rows={4}
          value={table.description}
          onChange={(e) =>
            setTable({
              id: table.id,
              name: table.name,
              code: table.code,
              areaId: table.areaId,
              description: e.target.value
            })
          }
        />
      </Flex>
    </ChDrawer>
  )
}

export default TableForm
