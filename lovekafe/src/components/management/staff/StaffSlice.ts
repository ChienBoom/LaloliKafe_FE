import { createSlice } from "@reduxjs/toolkit"
import { UserDetailModel } from "../../../models/UserDetailModel"

interface InitialState{
    staffData : [],
    loadingData: boolean,
    openForm: {
        type: string,
        staff: UserDetailModel
    }
}

const initialState: InitialState = {
    staffData: [],
    loadingData: true,
    openForm: {
        type: "",
        staff:{
            id: "",
            username: "",
            email: "",
            fullName: "",
            dateOfBirth: "2024-03-25T08:32:06.391",
            address: "",
            sex: "",
            urlImage: ""
        }
    }
}

export const StaffSlice = createSlice({
    name: 'staffSlice',
    initialState: initialState,
    reducers: {
        handleStaffForm: (state, action) => {
            state.openForm = action.payload
        },
        getStaffData: (state, action) => {
            state.staffData = action.payload
        }
    }
})