<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { Eye, EyeOff, LoaderCircle, User, Lock } from 'lucide-vue-next'

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
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900">
              Usuario
            </label>
            <div class="relative">
              <User class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

              <input
                id="username"
                type="text"
                v-model="username"
                class="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-aiuris focus:border-aiuris block w-full p-2.5 pl-10"
                placeholder="aldo912"
                autocomplete="username"
                required
              />
            </div>
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">
              Contraseña
            </label>

            <div class="relative">
              <Lock class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />

              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="•••••••••"
                autocomplete="current-password"
                class="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-aiuris focus:border-aiuris block w-full p-2.5 pl-10 pr-10"
                required
              />

              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center justify-center cursor-pointer w-9 text-slate-400 hover:text-slate-600"
              >
                <Eye v-if="!showPassword" class="size-4" />
                <EyeOff v-else class="size-4" />
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
              <LoaderCircle class="size-4 animate-spin" />
              Cargando...
            </span>
          </button>
        </form>
      </div>
    </section>
  </main>
</template>
