import { UploadOutlined } from '@ant-design/icons'
import { Button, Flex, Input, message, Upload, UploadProps } from 'antd'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { imageDb } from '../../../services/uploadFile/ConfigUpload'
import { v4 } from 'uuid'
import { UploadService } from '../../../services/uploadFile/UploadService'
import { Console } from 'console'

export function Drink(props: any) {
  const [img, setImg] = useState<any>('')
  const [imgUuid, setImgUuid] = useState<any>('')

  const handleChangeUpload = (e: any) => {
    console.log(e)
    setImg(e.target.files[0])
    setImgUuid(v4())
  }

  // const handleChangeUpload = (e: any) => {
  //   if (e.file.status === 'done') {
  //     console.log('File uploaded:', e.file)
  //     setImg(e.file.originFileObj)
  //     setImgUid(e.file.uid)
  //   } else if (e.file.status === 'error') {
  //     console.error('File upload error:', e.file.error)
  //   }
  // }

  const handleClickSend = async () => {
    // if (img) {
    //   const imgRef = ref(imageDb, `files/${imgUuid}`)
    //   uploadBytes(imgRef, img)
    //     .then(async (snapshot) => {
    //       console.log('File uploaded successfully:', snapshot)
    //       console.log(snapshot.metadata.fullPath)
    //       const urlImage = await getDownloadURL(ref(imageDb, snapshot.metadata.fullPath))
    //       console.log('url:', urlImage)
    //     })
    //     .catch((error) => {
    //       console.error('Error uploading file:', error)
    //     })
    // } else {
    //   console.error('No file selected.')
    // }
    const urlImg = await UploadService(img)
    console.log('urlImg: ' + urlImg)
  }
  return (
    <>
      {/* <Upload name="file" onChange={handleChangeUpload}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Button onClick={handleClickSend}>Send</Button> */}

      {/* <input type="file" className="" onChange={handleChangeUpload} /> */}
      <Flex vertical>
        <Input className="w-2/5" type="file" onChange={handleChangeUpload} />
        <Button className="w-[60px]" onClick={handleClickSend}>
          Send
        </Button>
      </Flex>
    </>
  )
}

export default Drink
