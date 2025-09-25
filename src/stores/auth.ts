import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { apiFetch, apiClient } from '@/services/api'

export const ACCESS_TOKEN_KEY = 'aiuris.accessToken'

export interface LoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

export interface AuthenticatedUser {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
  is_active: boolean
  is_verified: boolean
  created_at: string | null
  updated_at: string
  roles: string[]
  permissions: string[]
}

function applyAuthHeader(token: string | null) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete apiClient.defaults.headers.common.Authorization
  }
}

function readStoredAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(ACCESS_TOKEN_KEY) ?? window.sessionStorage.getItem(ACCESS_TOKEN_KEY)
  } catch (error) {
    console.warn('No se pudo acceder al almacenamiento del navegador', error)
    return null
  }
}

function persistAccessToken(token: string, remember: boolean) {
  if (typeof window === 'undefined') return
  const primaryStorage = remember ? window.localStorage : window.sessionStorage
  const secondaryStorage = remember ? window.sessionStorage : window.localStorage

  try {
    primaryStorage.setItem(ACCESS_TOKEN_KEY, token)
    secondaryStorage.removeItem(ACCESS_TOKEN_KEY)
  } catch (error) {
    console.warn('No se pudo persistir el token de acceso', error)
  }
}

function clearStoredAccessToken() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  } catch (error) {
    console.warn('No se pudo limpiar el token de acceso almacenado', error)
  }
}

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(readStoredAccessToken())
  const user = ref<AuthenticatedUser | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  if (accessToken.value) {
    applyAuthHeader(accessToken.value)
  }

  async function login(email: string, password: string, rememberMe = false) {
    loading.value = true
    error.value = null

    try {
      const data = await apiFetch<LoginResponse>('/v1/auth/login', {
        method: 'post',
        data: { email, password, remember_me: rememberMe },
      })

      accessToken.value = data.access_token
      applyAuthHeader(accessToken.value)

      persistAccessToken(data.access_token, rememberMe)

      await fetchCurrentUser()
      return data
    } catch (err) {
      accessToken.value = null
      applyAuthHeader(null)

      clearStoredAccessToken()

      const message = err instanceof Error ? err.message : 'No se pudo iniciar sesion'
      error.value = message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchCurrentUser() {
    if (!accessToken.value) {
      user.value = null
      return null
    }

    const data = await apiFetch<AuthenticatedUser>('/v1/auth/me')
    user.value = data
    return data
  }

  async function restoreSession() {
    if (!accessToken.value) {
      const stored = readStoredAccessToken()
      if (stored) {
        accessToken.value = stored
        applyAuthHeader(stored)
      }
    }

    if (accessToken.value) {
      try {
        await fetchCurrentUser()
      } catch (err) {
        console.log(err)
        await logout()
      }
    }
  }

  async function logout() {
    try {
      if (accessToken.value) {
        await apiFetch('/v1/auth/logout', {
          method: 'post',
        })
      }
    } catch (err) {
      console.log(err)
      //console.log asi no me molesta cada ratooo
    } finally {
      accessToken.value = null
      user.value = null
      applyAuthHeader(null)

      clearStoredAccessToken()
    }
  }

  return {
    accessToken,
    user,
    loading,
    error,
    isAuthenticated: computed(() => Boolean(accessToken.value)),
    login,
    logout,
    fetchCurrentUser,
    restoreSession,
  }
})
