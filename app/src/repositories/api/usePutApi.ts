import {useCallback} from 'react'
import axios, {AxiosRequestConfig} from "axios"
import useSWR from 'swr'

export const usePutApi = (path: string, data: any) => {
  return axios.put(
    process.env.REACT_APP_API_URL + path,
    data,
    {
      headers: {
        'Cache-Control': 'no-cache'
      }
    } as AxiosRequestConfig
  )

}