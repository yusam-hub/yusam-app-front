/** Задаем глобальные типы сущностям */
/** Определяем глобальные enum */
export interface ProductInterface {
  id: number
  name: string
  price: number
  preview: string
  description: string
  maxAvailable: number
  categoryId: number[]
  back: ImageBackgroundAppearanceEnum
  photos: Array<{ url: string; appearance: ImageBackgroundAppearanceEnum }>
}

export type ProductPreview = Omit<
  ProductInterface,
  'categoryId' | 'photos' | 'description'
>

export type OrderProduct = ProductPreview & { numItemsToBuy: number }

export interface CategoryInterface {
  id: number
  name: string
  productCount: number
}

export interface ProductFilterInterface {
  categoryId?: string
  priceFrom?: number
  priceTo?: number
  query?: string
}

export interface ShopInfoInterface {
  name: string
  logo: string
}

export enum ApiEndPointEnum {
  InitialData = 'getInitialData',
  ProductInfo = 'getProductInfo',
  FilteredProducts = 'getFilteredProducts',
}

export enum ImageBackgroundAppearanceEnum {
  Rose = 'rose',
  Grey = 'grey',
  Blue = 'blue',
  Beige = 'beige',
  Violet = 'violet',
}

export interface KeyStringValueStringObjectInterface {
  [key: string]: string
}

export interface FormErrorsInterface {
  errorMessage?: string | undefined,
  errorFields: KeyStringValueStringObjectInterface,
}

export enum LocalesEnum {
  EN = 'en',
  RU = 'ru',
}

