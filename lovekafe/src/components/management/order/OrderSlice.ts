import { createSlice } from "@reduxjs/toolkit"
import { TableModel } from "../../../models/TableModel"
import { OrderModel } from "../../../models/OrderModel"

interface InitialState{
    orderData : [],
    openForm: {
        type: string,
        order: OrderModel
    }
}

const initialState: InitialState = {
    orderData: [],
    openForm: {
        type: "",
        order:{
            id: "",
            orderDate: "",
            tableId: ""
        }
    }
}

export const OrderSlice = createSlice({
    name: 'orderSlice',
    initialState: initialState,
    reducers: {
        handleOrderForm: (state, action) => {
            state.openForm = action.payload
        }
    }
})