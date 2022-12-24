import axios, {AxiosRequestConfig} from "axios"

export const useDeleteApi = (path: string, token: any) => {
  return axios.delete(
    process.env.REACT_APP_API_URL + path,
    {
      headers: {
        'Cache-Control': 'no-cache',
        'Authority-Token': token,
      }
    } as AxiosRequestConfig
  )
}