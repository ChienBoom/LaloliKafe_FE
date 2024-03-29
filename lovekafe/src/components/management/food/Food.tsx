import { useState } from 'react'
import { Form, Input, Upload } from 'antd'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ChDrawer from '../../ChComponent/ChDrawer'
import UploadService from '../../../services/uploadFile/UploadService'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export function Food(props: any) {
  const [form] = Form.useForm()

  const [img, setImg] = useState<any>('')

  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleCloseForm = () => {
    setFileList([])
  }

  const handleChangeUpload = (lstFile: any) => {
    setFileList(lstFile.fileList)
    lstFile.fileList.length > 0 ? setImg(lstFile.fileList[0].originFileObj) : setImg('')
  }

  const handleSave = async (values: any) => {
    const urlDowload = await UploadService(img)
    values.urlImg = urlDowload
    console.log('form', values)
    console.log('urlDowload', urlDowload)
    // console.log('Obj: ', obj)
  }

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as FileType)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  return (
    <ChDrawer
      title="Test Form"
      showFooterAction={true}
      open={true}
      onClose={handleCloseForm}
      closeIcon={true}
      onFtSave={() => form.submit()}
      iconTitle={<PlusOutlined />}
    >
      <Form onFinish={handleSave} layout="vertical" form={form}>
        <div className="grid grid-cols-2 gap-2">
          <Form.Item
            label="Tên khu vực"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên khu vực!' }]}
          >
            <Input className="w-full" size="large" />
          </Form.Item>

          <Form.Item label="Mã khu vực" name="code" rules={[{ required: true, message: 'Vui lòng nhập mã khu vực!' }]}>
            <Input size="large" />
          </Form.Item>
        </div>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Tải ảnh lên" name="urlImg" rules={[{ required: true, message: 'Vui lòng chọn ảnh!' }]}>
          <Upload
            listType="picture-card"
            onChange={handleChangeUpload}
            onPreview={onPreview}
            fileList={fileList}
            maxCount={1}
          >
            {'Upload'}
          </Upload>
        </Form.Item>
      </Form>
    </ChDrawer>
  )
}

export default Food
