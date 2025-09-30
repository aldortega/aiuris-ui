<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { Eye, EyeOff, LoaderCircle } from 'lucide-vue-next'

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
    validationError.value = 'Las contraseñas no coinciden'
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
  <main class="grid min-h-dvh place-items-center bg-slate-100 p-4 transition-colors dark:bg-slate-950">
    <section class="w-full max-w-md rounded-lg border border-slate-200 bg-slate-50 shadow-md transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div class="space-y-6 p-8">
        <div class="text-center">
          <h1 class="text-xl font-semibold text-slate-800 transition-colors dark:text-slate-100">Actualiza tu contraseña</h1>
          <p class="mt-2 text-sm text-slate-600 transition-colors dark:text-slate-300">
            Por seguridad necesitamos que cambies tu contraseña antes de continuar.
          </p>
        </div>

        <form class="space-y-4" @submit.prevent="onSubmit">
          <div>
            <label for="current-password" class="mb-2 block text-sm font-medium text-gray-900 dark:text-slate-200"
              >Contraseña actual</label
            >
            <div class="relative">
              <input
                id="current-password"
                v-model="currentPassword"
                :type="showCurrentPassword ? 'text' : 'password'"
                autocomplete="current-password"
                class="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-gray-900 transition focus:border-aiuris focus:outline-none focus:ring-2 focus:ring-aiuris dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                @click="showCurrentPassword = !showCurrentPassword"
                class="absolute inset-y-0 right-0 flex w-9 cursor-pointer items-center justify-center text-slate-400 transition hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <Eye v-if="!showCurrentPassword" class="size-4" />
                <EyeOff v-else class="size-4" />
              </button>
            </div>
          </div>

          <div>
            <label for="new-password" class="mb-2 block text-sm font-medium text-gray-900 dark:text-slate-200"
              >Nueva contraseña</label
            >
            <div class="relative">
              <input
                id="new-password"
                v-model="newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                autocomplete="new-password"
                class="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-gray-900 transition focus:border-aiuris focus:outline-none focus:ring-2 focus:ring-aiuris dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute inset-y-0 right-0 flex w-9 cursor-pointer items-center justify-center text-slate-400 transition hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <Eye v-if="!showNewPassword" class="size-4" />
                <EyeOff v-else class="size-4" />
              </button>
            </div>
          </div>

          <div>
            <label for="confirm-password" class="mb-2 block text-sm font-medium text-gray-900 dark:text-slate-200"
              >Confirmar contraseña</label
            >
            <div class="relative">
              <input
                id="confirm-password"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                class="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-gray-900 transition focus:border-aiuris focus:outline-none focus:ring-2 focus:ring-aiuris dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 flex w-9 cursor-pointer items-center justify-center text-slate-400 transition hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <Eye v-if="!showConfirmPassword" class="size-4" />
                <EyeOff v-else class="size-4" />
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <p v-if="validationError" class="text-sm text-red-600">{{ validationError }}</p>
            <p v-else-if="error" class="text-sm text-red-600">{{ error }}</p>
          </div>

          <button
            :disabled="loading"
            class="w-full cursor-pointer rounded-lg bg-aiuris px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <span v-if="!loading">Guardar y continuar</span>
            <span v-else class="inline-flex items-center gap-2">
              <LoaderCircle class="size-4 animate-spin" />
              Guardando...
            </span>
          </button>
        </form>
      </div>
    </section>
  </main>
</template>
