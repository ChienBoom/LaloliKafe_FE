import { ReactNode } from 'react'
import { Button, Drawer, DrawerProps, Flex, Typography } from 'antd'

const { Title } = Typography

type HTMLTypeButton = 'submit' | 'reset' | 'button'

interface Props extends DrawerProps {
  title?: string
  showFooterAction?: boolean
  ftSaveLabel?: string
  ftSaveLoading?: boolean
  ftCancelLabel?: string
  ftSaveHTMLType?: HTMLTypeButton
  onFtSave?: (e: any) => void
  iconTitle?: ReactNode
}

/**
 * AraDrawer Lớp phủ
 * Sử dụng thay cho Modal
 * Sử dụng làm lớp phủ cho các nút Thêm + Sửa
 * */
export default function ChDrawer({
  title = '',
  width = '636px',
  showFooterAction = false,
  closable = false,
  iconTitle,
  onFtSave,
  ftSaveLabel = 'Lưu (Enter)',
  ftCancelLabel = 'Đóng (ESC)',
  ftSaveHTMLType = 'button',
  ftSaveLoading = false,
  ...props
}: Props) {
  return (
    <Drawer
      {...props}
      title={
        <Flex gap="small" wrap="wrap">
          {iconTitle && <Button shape="circle" icon={iconTitle} size={'large'} />}
          <Title className="mb-0" level={2}>
            {title}
          </Title>
        </Flex>
      }
      keyboard
      closable={closable}
      width={width}
      footer={
        showFooterAction ? (
          <Flex className="m-4" gap="small" wrap="wrap" justify="end">
            <Button loading={ftSaveLoading} htmlType={ftSaveHTMLType} onClick={onFtSave}>
              {ftSaveLabel}
            </Button>
            <Button onClick={props.onClose}>{ftCancelLabel}</Button>
          </Flex>
        ) : (
          false
        )
      }
    />
  )
}
