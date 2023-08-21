import axios from 'axios'

export default function requestAPI<R, T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: T | undefined
) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': body instanceof FormData ? 'multipart/form-data' : 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  const instance = axios.create({ headers })

  instance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('access_token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  return instance.request<R>({
    url: `http://localhost:8000${endpoint}`,
    method: method,
    data: body,
    responseType: 'json'
  })
}
