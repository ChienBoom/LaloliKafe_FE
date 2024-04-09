import { createSlice } from "@reduxjs/toolkit"

interface InitialState{
    accessToken: any
}

const initialState: InitialState = {
    accessToken: localStorage.getItem('accessToken')
}

export const LoginSlice = createSlice({
    name: 'loginSlice',
    initialState: initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        }
    }
})