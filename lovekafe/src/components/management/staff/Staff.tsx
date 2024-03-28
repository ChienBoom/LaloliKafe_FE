import { useEffect, useState } from 'react'
import { StaffTable } from './StaffTable'
import Api from '../../../apis/Api'
import { useDispatch } from 'react-redux'
import { StaffSlice } from './StaffSlice'

export function Staff(props: any) {
  const dispatch = useDispatch()

  const [staffData, setStaffData] = useState([])

  useEffect(() => {
    Api.UserDetail.get().then((res: any) => setStaffData(res.data))
  }, [])

  useEffect(() => {
    dispatch(StaffSlice.actions.getStaffData(staffData))
  }, [staffData])
  return (
    <>
      <StaffTable />
    </>
  )
}

export default Staff
