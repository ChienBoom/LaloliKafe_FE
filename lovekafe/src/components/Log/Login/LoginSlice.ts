import { createSlice } from "@reduxjs/toolkit"
import { UserDetailModel } from "../../../models/UserDetailModel"
import moment from "moment"

interface InitialState{
    refreshToken: any
    accessToken: any
    user: UserDetailModel
}

const initialState: InitialState = {
    refreshToken: localStorage.getItem('refreshToken'),
    accessToken: localStorage.getItem('accessToken'),
    user: {
        id: "",
        username: "",
        role: "",
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
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        setUserProfile: (state,action) => {
            state.user = action.payload
        }
    }
})