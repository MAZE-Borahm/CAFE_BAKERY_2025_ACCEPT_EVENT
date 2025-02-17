import { LOCAL } from '@/constants/local'
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: 'https://expo-recommend.data-fetch.net',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    // accept: 'application/json,',
  },
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem(LOCAL.TOKEN)

    if (token) config.headers['Authorization'] = `Bearer ${token}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
