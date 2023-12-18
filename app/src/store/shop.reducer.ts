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

/** Запрос на получения контента магазина через асинхронный action: shop_fetchShop */
export const shop_fetchShop = createAsyncThunk('app/fetchShop', async function () {
  return await api.user.getInitialData()
})

/** Запрос на получения информации о товаре через асинхронный action: shop_fetchProductInfo */
export const shop_fetchProductInfo = createAsyncThunk(
  'app/fetchproductInfo',
  async function ({ productId }: { productId: number }) {
    return (await api.products.getProductInfo({ productId }))
  }
)

const shopSlice = createSlice({
  name: 'shop',
  initialState: shopInitialState,
  reducers: {
    setShopProductFilters(state, action: PayloadAction<ProductFilter>) {
      state.filters = action.payload
    },
    setShopFiltersCategory(state, action: PayloadAction<string>) {
      state.filters.categoryId = action.payload
    },
    setShopFiltersQuery(state, action: PayloadAction<string>) {
      state.filters.query = action.payload
    },
    setShopFiltersPriceRange(
      state,
      action: PayloadAction<{ priceFrom?: number; priceTo?: number }>
    ) {
      state.filters.priceFrom = action.payload.priceFrom
      state.filters.priceTo = action.payload.priceTo
    },
  },
  extraReducers: (builder) => {
    /** Добавление обработчика на успешное завершение action: fetchShop */
    builder.addCase(shop_fetchShop.fulfilled, (state, action) => {
      state.shopInfo = action.payload.shopInfo
      state.categories = action.payload.categories
    }),
    builder.addCase(shop_fetchProductInfo.fulfilled, (state, action) => {
      state.productInfo = action.payload
    })
  },
})

const { reducer } = shopSlice
export { reducer as shopReducer }

export const selectShopProductInfo = (state: RootState) => state.shop.productInfo
export const selectShopCategories = (state: RootState) => state.shop.categories
export const selectShopPriceFrom = (state: RootState) => state.shop.filters.priceFrom
export const selectShopLogo = (state: RootState) => state.shop.shopInfo.logo
export const selectShopName = (state: RootState) => state.shop.shopInfo.name
export const selectShopFilters = (state: RootState) => state.shop.filters
export const selectShopPriceTo = (state: RootState) => state.shop.filters.priceTo

export const {
  setShopFiltersPriceRange,
  setShopFiltersCategory,
  setShopProductFilters,
  setShopFiltersQuery,
} = shopSlice.actions
