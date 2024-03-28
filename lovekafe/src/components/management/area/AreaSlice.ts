import { createSlice } from "@reduxjs/toolkit"
import { AreaModel } from "../../../models/AreaModel"

interface InitialState{
    categoryData : [],
    openForm: {
        type: string,
        area: AreaModel
    }
}

const initialState: InitialState = {
    categoryData: [],
    openForm: {
        type: "",
        area:{
            id: "",
            name: "",
            code: "",
            description: ""
        }
    }
}

export const AreaSlice = createSlice({
    name: 'areaSlice',
    initialState: initialState,
    reducers: {
        handleAreaForm: (state, action) => {
            state.openForm = action.payload
        }
    }
})