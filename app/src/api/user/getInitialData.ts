import { ApiEndPointEnum, CategoryInterface } from 'src/types'
import { makeRequest } from 'src/api/makeRequest'

interface GetUserResponseInterface {
  categories: CategoryInterface[]
  shopInfo: {
    name: string
    logo: string
  }
}

/** Получение данных магазина и рекомендованных пользователю товаров */
export const getInitialData = async (): Promise<GetUserResponseInterface> => {
  return await makeRequest<GetUserResponseInterface>({
    endpoint: ApiEndPointEnum.InitialData,
  })
}
