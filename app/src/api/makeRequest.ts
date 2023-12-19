import { ApiEndPointEnum } from 'src/types'

const API_URL = 'https://shop-boilerplate-backend.vercel.app'

interface ArgumentsInterface {
  endpoint: ApiEndPointEnum
  params?: Record<string, string>
  requestOptions?: RequestInit
}

/**
 * Обертка над http запросом, чтобы обеспечить независимость от используемых библиотек 
 * @param endpoint - api endpoint
 * @param params - query параметры запроса в виде объекта
 * @param requestOptions - настройки запроса: method, headers, cashe
 * @returns ответ сервера
 * @example 
  // get запрос
  makeRequest(endpoint: 'productInfo', params: {id: '2'})
  // post запрос
  makeRequest('postProduct', requestOptions: JSON.stringify({method: 'post', body: {id: 2}}))
 */
export const makeRequest = async <T = never>({
  params,
  endpoint,
  requestOptions,
}: ArgumentsInterface): Promise<T> => {
  const url = new URL(API_URL + '/' + endpoint)
  url.search = new URLSearchParams(params).toString()
  console.log('request', url, requestOptions)
  const res = await fetch(url, requestOptions)
  return await res.json() as T
}
