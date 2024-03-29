import { createSlice } from "@reduxjs/toolkit"
import { ProductModel } from "../../../models/ProductModel"

interface InitialState{
    productData : [],
    loadingData: boolean,
    openForm: {
        type: string,
        product: ProductModel
    }
}

const initialState: InitialState = {
    productData: [],
    loadingData: true,
    openForm: {
        type: "",
        product:{
            id: "",
            name: "",
            code: "",
            categoryId: "",
            category:{
                id: "",
                name: "",
                code: "",
                description: "",
                urlImage: "",
            },
            price: 40.000,
            description: "",
            urlImage: ""
        }
    }
}

export const ProductSlice = createSlice({
    name: 'productSlice',
    initialState: initialState,
    reducers: {
        handleProductForm: (state, action) => {
            state.openForm = action.payload
        },
        getProductData: (state, action) => {
            state.productData = action.payload
        }
    }
})