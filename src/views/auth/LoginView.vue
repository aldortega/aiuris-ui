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
  <main
    class="grid min-h-dvh place-items-center bg-slate-100 p-4 transition-colors dark:bg-slate-950"
  >
    <section
      class="w-full max-w-md rounded-lg border border-slate-200 bg-slate-50 shadow-md transition-colors dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="p-8">
        <div class="flex items-center justify-center">
          <img src="@/assets/logo6.png" alt="Logo" class="h-35 w-35" />
        </div>

        <p class="mt-1 text-center text-md text-slate-500 transition-colors dark:text-slate-400">
          Bienvenido de nuevo
        </p>

        <form class="mt-6 space-y-4 md:space-y-6" @submit.prevent="onSubmit">
          <div>
            <label
              for="username"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-slate-200"
            >
              Usuario
            </label>
            <div class="relative">
              <User
                class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-slate-400"
              />

              <input
                id="username"
                type="text"
                v-model="username"
                class="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 pl-10 text-gray-900 transition focus:border-aiuris focus:outline-none focus:ring-2 focus:ring-aiuris dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400"
                placeholder="aldo912"
                autocomplete="username"
                required
              />
            </div>
          </div>
          <div>
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-slate-200"
            >
              Contraseña
            </label>

            <div class="relative">
              <Lock
                class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500 dark:text-slate-400"
              />

              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="current-password"
                class="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 pl-10 pr-10 text-gray-900 transition focus:border-aiuris focus:outline-none focus:ring-2 focus:ring-aiuris dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400"
                required
              />

              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex w-9 cursor-pointer items-center justify-center text-slate-400 transition hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <Eye v-if="!showPassword" class="size-4" />
                <EyeOff v-else class="size-4" />
              </button>
            </div>
          </div>

          <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

          <div class="flex items-center justify-between">
            <div class="flex items-start">
              <div class="flex h-5 items-center">
                <input
                  id="remember"
                  type="checkbox"
                  v-model="rememberMe"
                  aria-describedby="remember"
                  class="h-4 w-4 cursor-pointer rounded-sm border border-gray-300 bg-gray-50 text-aiuris transition focus:ring-aiuris dark:border-slate-700 dark:bg-slate-900"
                />
              </div>
              <div class="ml-2 text-sm">
                <label
                  for="remember"
                  class="cursor-pointer text-gray-500 transition dark:text-slate-300"
                  >Recordarme</label
                >
              </div>
            </div>
            <RouterLink
              :to="{ name: 'forgot-password' }"
              class="text-sm font-medium text-aiuris transition hover:text-blue-900 dark:text-slate-300 dark:hover:text-blue-700"
            >
              Olvidaste tu contrasena?
            </RouterLink>

          </div>
          <button
            :disabled="loading"
            class="w-full cursor-pointer rounded-lg bg-aiuris px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
