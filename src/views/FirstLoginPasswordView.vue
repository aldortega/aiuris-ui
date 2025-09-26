<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const { loading, error, isAuthenticated, needsPasswordChange } = storeToRefs(auth)

const router = useRouter()

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const validationError = ref<string | null>(null)

watchEffect(() => {
  if (!isAuthenticated.value) {
    router.replace({ name: 'login' })
  } else if (!needsPasswordChange.value) {
    router.replace({ name: 'home' })
  }
})

async function onSubmit() {
  validationError.value = null

  if (newPassword.value !== confirmPassword.value) {
    validationError.value = 'Las contrasenas no coinciden'
    return
  }

  try {
    await auth.changePassword(currentPassword.value, newPassword.value)
    await router.replace({ name: 'home' })
  } catch (err) {
    console.error('Password update failed', err)
  }
}
</script>

<template>
  <main class="grid p-4 bg-slate-100 min-h-dvh place-items-center">
    <section class="w-full max-w-md border rounded-lg shadow-md border-slate-200 bg-slate-50">
      <div class="p-8 space-y-6">
        <div class="text-center">
          <h1 class="text-xl font-semibold text-slate-800">Actualiza tu contrasena</h1>
          <p class="mt-2 text-sm text-slate-600">
            Por seguridad necesitamos que cambies tu contrasena antes de continuar.
          </p>
        </div>

        <form class="space-y-4" @submit.prevent="onSubmit">
          <div>
            <label for="current-password" class="block mb-2 text-sm font-medium text-gray-900"
              >Contrasena actual</label
            >
            <div class="relative">
              <input
                id="current-password"
                v-model="currentPassword"
                :type="showCurrentPassword ? 'text' : 'password'"
                autocomplete="current-password"
                class="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-aiuris focus:border-aiuris block w-full p-2.5"
                placeholder="********"
                required
              />
              <button
                type="button"
                @click="showCurrentPassword = !showCurrentPassword"
                class="absolute inset-y-0 right-0 flex items-center justify-center cursor-pointer w-9 text-slate-400 hover:text-slate-600"
              >
                <svg
                  v-if="!showCurrentPassword"
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

          <div>
            <label for="new-password" class="block mb-2 text-sm font-medium text-gray-900"
              >Nueva contrasena</label
            >
            <div class="relative">
              <input
                id="new-password"
                v-model="newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                autocomplete="new-password"
                class="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-aiuris focus:border-aiuris block w-full p-2.5"
                placeholder="********"
                required
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute inset-y-0 right-0 flex items-center justify-center cursor-pointer w-9 text-slate-400 hover:text-slate-600"
              >
                <svg
                  v-if="!showNewPassword"
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

          <div>
            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900"
              >Confirmar contrasena</label
            >
            <div class="relative">
              <input
                id="confirm-password"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                class="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-aiuris focus:border-aiuris block w-full p-2.5"
                placeholder="********"
                required
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 flex items-center justify-center cursor-pointer w-9 text-slate-400 hover:text-slate-600"
              >
                <svg
                  v-if="!showConfirmPassword"
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

          <div class="space-y-2">
            <p v-if="validationError" class="text-sm text-red-600">{{ validationError }}</p>
            <p v-else-if="error" class="text-sm text-red-600">{{ error }}</p>
          </div>

          <button
            :disabled="loading"
            class="w-full text-white bg-aiuris hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span v-if="!loading">Guardar y continuar</span>
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
              Guardando...
            </span>
          </button>
        </form>
      </div>
    </section>
  </main>
</template>
