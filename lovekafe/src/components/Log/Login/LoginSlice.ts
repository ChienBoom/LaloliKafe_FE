import { createSlice } from "@reduxjs/toolkit"
import { UserDetailModel } from "../../../models/UserDetailModel"

interface InitialState{
    accessToken: any
    user: UserDetailModel
}

const initialState: InitialState = {
    accessToken: localStorage.getItem('accessToken'),
    user: {
        id: "",
        username: "",
        email: "",
        fullName: "",
        dateOfBirth: "",
        address: "",
        sex: "",
        urlImage: "",
    }
}

export const LoginSlice = createSlice({
    name: 'loginSlice',
    initialState: initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        setUserProfile: (state,action) => {
            state.user = action.payload
        }
    }
})