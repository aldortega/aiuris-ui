<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

import { ACCESS_TOKEN_KEY, useAuthStore } from '@/stores/auth'

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(
  typeof window !== 'undefined' && Boolean(window.localStorage.getItem(ACCESS_TOKEN_KEY)),
)

const router = useRouter()
const route = useRoute()

const auth = useAuthStore()
const { loading, error, isAuthenticated, needsPasswordChange } = storeToRefs(auth)

onMounted(() => {
  if (isAuthenticated.value) {
    if (needsPasswordChange.value) {
      router.replace({ name: 'first-login-password' })
    } else {
      router.replace({ name: 'home' })
    }
  }
})

async function onSubmit() {
  try {
    await auth.login(username.value, password.value, rememberMe.value)

    if (needsPasswordChange.value) {
      await router.replace({ name: 'first-login-password' })
      return
    }

    const redirectTo = typeof route.query.redirect === 'string' ? route.query.redirect : null

    if (redirectTo) {
      await router.replace(redirectTo)
    } else {
      await router.replace({ name: 'home' })
    }
  } catch (err) {
    console.error('Login failed', err)
  }
}
</script>

<template>
  <main class="grid p-4 bg-slate-100 min-h-dvh place-items-center">
    <section class="w-full max-w-md border rounded-lg shadow-md border-slate-200 bg-slate-50">
      <div class="p-8">
        <div class="flex items-center justify-center">
          <img src="@/assets/logo6.png" alt="Logo" class="w-35 h-35" />
        </div>

        <p class="mt-1 text-center text-md text-slate-500">Bienvenido de nuevo</p>

        <form class="mt-6 space-y-4 md:space-y-6" @submit.prevent="onSubmit">
          <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Usuario</label>
            <input
              id="username"
              type="text"
              v-model="username"
              class="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-aiuris focus:border-aiuris block w-full p-2.5"
              placeholder="nombre_usuario"
              autocomplete="username"
              required
            />
          </div>

          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Contrasena</label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="********"
                autocomplete="current-password"
                class="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-aiuris focus:border-aiuris block w-full p-2.5"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center justify-center cursor-pointer w-9 text-slate-400 hover:text-slate-600"
              >
                <svg
                  v-if="!showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M3 3l18 18M10.58 10.58a2 2 0 0 0 2.84 2.84M9.88 5.09A9.96 9.96 0 0 1 12 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 0 1-4.132 5.225M6.1 6.1A9.956 9.956 0 0 0 2.458 12c1.274 4.057 5.065 7 9.542 7 1.032 0 2.027-.156 2.96-.445"
                  />
                </svg>
              </button>
            </div>
          </div>

          <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

          <div class="flex items-center justify-between">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  v-model="rememberMe"
                  aria-describedby="remember"
                  class="w-4 h-4 border border-gray-300 rounded-sm cursor-pointer bg-gray-50"
                />
              </div>
              <div class="ml-2 text-sm">
                <label for="remember" class="text-gray-500 cursor-pointer">Recordarme</label>
              </div>
            </div>
            <a href="#" class="text-sm font-medium cursor-pointer text-aiuris hover:text-blue-900"
              >Olvidaste tu contrasena?</a
            >
          </div>
          <button
            :disabled="loading"
            class="w-full text-white bg-aiuris hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span v-if="!loading">Iniciar Sesion</span>
            <span v-else class="inline-flex items-center gap-2">
              <svg class="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                  class="opacity-25"
                />
                <path
                  d="M4 12a8 8 0 0 1 8-8"
                  stroke="currentColor"
                  stroke-width="4"
                  stroke-linecap="round"
                  class="opacity-75"
                />
              </svg>
              Cargando...
            </span>
          </button>
        </form>
      </div>
    </section>
  </main>
</template>
