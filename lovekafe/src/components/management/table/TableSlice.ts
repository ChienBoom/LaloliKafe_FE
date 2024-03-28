import { createSlice } from "@reduxjs/toolkit"
import { TableModel } from "../../../models/TableModel"

interface InitialState{
    categoryData : [],
    openForm: {
        type: string,
        table: TableModel
    }
}

const initialState: InitialState = {
    categoryData: [],
    openForm: {
        type: "",
        table:{
            id: "",
            name: "",
            code: "",
            areaId: "",
            area: {
                id: '',
                name: '',
                code: '',
                description: ''
              },
            description: ""
        }
    }
}

export const TableSlice = createSlice({
    name: 'tableSlice',
    initialState: initialState,
    reducers: {
        handleTableForm: (state, action) => {
            state.openForm = action.payload
        }
    }
})