import {
  Category,
  ImageBackgroundAppereance,
  Product,
  ProductFilter,
  ShopInfo
} from 'src/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as api from 'src/api'
import { RootState } from '.'

export interface ShopState {
  productInfo: Product
  categories: Category[]
  shopInfo: ShopInfo
  filters: ProductFilter
}

export const shopInitialState: ShopState = {
  filters: { categoryId: '0' },
  categories: [],
  shopInfo: {
    logo: '',
    name: '',
  },
  productInfo: {
    id: -1,
    price: 0,
    name: '',
    preview: '',
    back: ImageBackgroundAppereance.Grey,
    photos: [],
    categoryId: [],
    description: '',
    maxAvailable: 0,
  },
}


export const fetchShop = createAsyncThunk('app/fetchShop', async function () {
  return await api.user.getInitialData()
})


export const fetchProductInfo = createAsyncThunk(
  'app/fetchproductInfo',
  async function ({ productId }: { productId: number }) {
    return (await api.products.getProductInfo({ productId }))
  }
)

const shopSlice = createSlice({
  name: 'shop',
  initialState: shopInitialState,
  reducers: {
    setProductFilters(state, action: PayloadAction<ProductFilter>) {
      state.filters = action.payload
    },
    setFiltersCategory(state, action: PayloadAction<string>) {
      state.filters.categoryId = action.payload
    },
    setFiltersQuery(state, action: PayloadAction<string>) {
      state.filters.query = action.payload
    },
    setFiltersPriceRange(
      state,
      action: PayloadAction<{ priceFrom?: number; priceTo?: number }>
    ) {
      state.filters.priceFrom = action.payload.priceFrom
      state.filters.priceTo = action.payload.priceTo
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShop.fulfilled, (state, action) => {
      state.shopInfo = action.payload.shopInfo
      state.categories = action.payload.categories
    }),
    builder.addCase(fetchProductInfo.fulfilled, (state, action) => {
      state.productInfo = action.payload
    })
  },
})

const { reducer } = shopSlice
export { reducer as shopReducer }

export const selectProductInfo = (state: RootState) => state.shop.productInfo
export const selectCategories = (state: RootState) => state.shop.categories
export const selectPriceFrom = (state: RootState) => state.shop.filters.priceFrom
export const selectShopLogo = (state: RootState) => state.shop.shopInfo.logo
export const selectShopName = (state: RootState) => state.shop.shopInfo.name
export const selectFilters = (state: RootState) => state.shop.filters
export const selectPriceTo = (state: RootState) => state.shop.filters.priceTo

export const {
  setFiltersPriceRange,
  setFiltersCategory,
  setProductFilters,
  setFiltersQuery,
} = shopSlice.actions
