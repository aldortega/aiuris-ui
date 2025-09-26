import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

export interface ApiErrorPayload {
  detail?: string
  message?: string
  [key: string]: unknown
}

export interface ApiError extends Error {
  status?: number
  payload?: unknown
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

export async function apiFetch<TResponse>(
  path: string,
  config: AxiosRequestConfig = {},
): Promise<TResponse> {
  try {
    const response = await apiClient.request<TResponse>({
      url: path,
      ...config,
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data
      let message: string | undefined

      if (data && typeof data === 'object') {
        const payload = data as ApiErrorPayload
        message = payload.detail || payload.message
      } else if (typeof data === 'string' && data.trim().length > 0) {
        message = data
      }

      if (!message) {
        const statusText = error.response?.statusText
        const status = error.response?.status
        message = statusText || (status ? `Solicitud rechazada (${status})` : error.message)
      }

      const apiError = new Error(message) as ApiError
      apiError.status = error.response?.status
      apiError.payload = data

      throw apiError
    }

    throw error instanceof Error ? error : new Error('Solicitud rechazada')
  }
}
