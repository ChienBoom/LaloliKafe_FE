import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { imageDb } from "./ConfigUpload"
import { v4 } from "uuid"

export async function UploadService(file: any){
    if (file) {
        // const imgRef = ref(imageDb, `files/${v4()}`)
        const imgRef = ref(imageDb, `test/${v4()}`)
        try{

            const snapshot =  await uploadBytes(imgRef, file).then(snapshot => snapshot)
            const urlImage = await getDownloadURL(ref(imageDb, snapshot.metadata.fullPath))
            return urlImage
        }
        catch(e){
            console.log("error: ",e)
        }
        
      } else {
        console.error('No file selected.')
        return null
      }
      
}

export default UploadService