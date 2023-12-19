import { ApiEndPointEnum, ProductInterface } from 'src/types'
import { makeRequest } from 'src/api/makeRequest'

export interface GetProductInfoRequestInterface {
  productId: number
}

/** Получение информации по конкретному товару */
export const getProductInfo = async ({
  productId,
}: GetProductInfoRequestInterface): Promise<ProductInterface> => {
  return await makeRequest<ProductInterface>({
    endpoint: ApiEndPointEnum.ProductInfo,
    params: {
      id: productId.toString(),
    },
  })
}
