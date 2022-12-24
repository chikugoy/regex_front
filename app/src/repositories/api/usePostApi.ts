import axios, {AxiosRequestConfig} from "axios"

export const usePostApi = (path: string, data: any) => {
  return axios.post(
    process.env.REACT_APP_API_URL + path,
    data,
    {
      headers: {
        'Cache-Control': 'no-cache'
      }
    } as AxiosRequestConfig
  )
}