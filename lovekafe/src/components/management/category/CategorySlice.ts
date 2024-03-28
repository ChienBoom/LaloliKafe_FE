import { createSlice } from "@reduxjs/toolkit"
import { CategoryModel } from "../../../models/CategoryModel"

interface InitialState{
    categoryData : [],
    loadingData: boolean,
    openForm: {
        type: string,
        category: CategoryModel
    }
}

const initialState: InitialState = {
    categoryData: [],
    loadingData: true,
    openForm: {
        type: "",
        category:{
            id: "",
            name: "",
            code: "",
            description: "",
            urlImage: ""
        }
    }
}

export const CategorySlice = createSlice({
    name: 'categorySlice',
    initialState: initialState,
    reducers: {
        handleCategoryForm: (state, action) => {
            state.openForm = action.payload
        },
        getCategoryData: (state, action) => {
            state.categoryData = action.payload
            state.loadingData = false
        }
    }
})