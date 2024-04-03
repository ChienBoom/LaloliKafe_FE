import { createSlice } from "@reduxjs/toolkit"
import { OrderDetailModel } from "../../../models/OrderDetailModel"
import { TableModel } from "../../../models/TableModel"

interface InitialState{
    orderData : [],
    table: TableModel,
    openForm: {
        type: string
        option: string
        orderId: string
        orderDetail: OrderDetailModel
        lstOrderDetail: []
    }
}

const initialState: InitialState = {
    orderData: [],
    table: {
        id: "",
        name: "",
        code: "",
        areaId: "",
        description: "",
        isActive: false
    },
    openForm: {
        type: "",
        option:"",
        orderId:"",
        orderDetail: {
            id: "",
            orderId: "",
            productId: "",
            quantity: 1,
            description: ""
        },
        lstOrderDetail:[]
    }
}

export const OrderSlice = createSlice({
    name: 'orderSlice',
    initialState: initialState,
    reducers: {
        setTable: (state, action) => {
            state.table = action.payload
        },
        handleOrderForm: (state, action) => {
            state.openForm = action.payload
        },
    }
})