import React, { useEffect, useState } from 'react'
import { Button, Switch, Upload } from 'antd'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import UploadService from '../../../services/uploadFile/UploadService'
import moment from 'moment'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export function Food(props: any) {
  const [img, setImg] = useState<any>('')
  const [useImg, setUseImg] = useState(true)
  const [imgObj, setImgObj] = useState({
    url: ''
  })

  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // }
  ])

  const handleChangeUpload = (lstFile: any) => {
    // console.log(e)
    // setImg(e.file.originFileObj)
    setFileList(lstFile.fileList)
    setImg(lstFile.fileList[0].originFileObj)
    console.log('listFile: ', lstFile)
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

  const handleClickClear = () => {
    setFileList([])
  }

  const handleClick = async () => {
    var urlImage = await UploadService(img)
    console.log(urlImage)
    setImgObj({
      url: urlImage ?? '1234'
    })
    handleShowUrl()
  }

  const handleShowUrl = () => {
    console.log(imgObj)
  }

  useEffect(() => {
    console.log(moment(moment.now()).format() + typeof moment(moment.now()).format())
  }, [])

  return (
    <>
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        checked={useImg}
        onChange={(checked) => {
          console.log(checked)
          setFileList([])
          setUseImg(checked)
        }}
      />
      <Upload
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        onChange={handleChangeUpload}
        onPreview={onPreview}
        fileList={fileList}
        maxCount={1}
        disabled={!useImg}
      >
        {'Upload'}
      </Upload>
      <Button onClick={handleClickClear}>Clear</Button>
      <Button onClick={handleClick}>Send</Button>
    </>
  )
}

export default Food
