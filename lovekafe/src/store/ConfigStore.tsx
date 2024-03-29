import { configureStore } from '@reduxjs/toolkit'
import { CategorySlice } from '../components/management/category/CategorySlice'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AreaSlice } from '../components/management/area/AreaSlice'
import { TableSlice } from '../components/management/table/TableSlice'
import { StaffSlice } from '../components/management/staff/StaffSlice'
import { ProductSlice } from '../components/management/product/ProductSlice'

export const store = configureStore({
  reducer: {
    category: CategorySlice.reducer,
    area: AreaSlice.reducer,
    table: TableSlice.reducer,
    staff: StaffSlice.reducer,
    product: ProductSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AraDispatch = typeof store.dispatch

export const useAraDispatch = () => useDispatch<AraDispatch>()

export const useAraSelector: TypedUseSelectorHook<RootState> = useSelector
