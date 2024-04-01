import { createSlice } from "@reduxjs/toolkit"
import { TableModel } from "../../../models/TableModel"

interface InitialState{
    orderTableData : [],
    openForm: {
        type: string,
        table: TableModel
    }
}

const initialState: InitialState = {
    orderTableData: [],
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

export const OrderTableSlice = createSlice({
    name: 'orderTableSlice',
    initialState: initialState,
    reducers: {
        handleTableForm: (state, action) => {
            state.openForm = action.payload
        }
    }
})