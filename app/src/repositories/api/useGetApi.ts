import {useCallback} from 'react'
import axios from "axios"
import useSWR from 'swr'

export const useGetApi = <T>(path?: string | null): IResponseData => {
  const { data, error, mutate } = useSWR<any>(path ? process.env.REACT_APP_API_URL + path : null, axios)
  const reload = useCallback(() => mutate(), [mutate])
  return {
    data: (data?.data?.data || []) as T,
    is_loading: !error && !data,
    is_error: !!error,
    error,
    reload,
  } as IResponseData
}