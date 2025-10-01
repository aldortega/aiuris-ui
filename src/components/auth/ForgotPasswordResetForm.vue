<script setup lang="ts">
import { ref, watch } from 'vue'
import { Eye, EyeOff, LoaderCircle, Lock } from 'lucide-vue-next'

import { apiFetch } from '@/services/api'

const props = defineProps<{ token: string | null }>()

const newPassword = ref('')
const confirmPassword = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const successMessage = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

watch(
  () => props.token,
  () => {
    successMessage.value = null
    errorMessage.value = null
    newPassword.value = ''
    confirmPassword.value = ''
  },
)

async function submitNewPassword() {
  if (loading.value) return
  errorMessage.value = null
  successMessage.value = null

  if (!props.token) {
    errorMessage.value = 'El enlace de recuperacion no es valido'
    return
  }

  if (newPassword.value.length < 8) {
    errorMessage.value = 'La contrasena debe tener al menos 8 caracteres'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Las contrasenas no coinciden'
    return
  }

  loading.value = true

  try {
    await apiFetch('/v1/auth/reset-password', {
      method: 'post',
      data: { token: props.token, new_password: newPassword.value },
    })

    successMessage.value =
      'Tu contrasena fue actualizada. Ya puedes iniciar sesion con tus nuevas credenciales.'
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (err) {
    const message = err instanceof Error ? err.message : 'No se pudo restablecer la contrasena'
    errorMessage.value = message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <header class="space-y-2 text-center">
      <h1 class="text-xl font-semibold text-slate-800 transition-colors dark:text-slate-100">
        Restablecer contraseña
      </h1>
      <p class="text-sm text-slate-600 transition-colors dark:text-slate-300">
        Crea una nueva contraseña para tu cuenta.
      </p>
    </header>

    <form class="space-y-4" @submit.prevent="submitNewPassword">
      <div>
        <label for="new-password" class="mb-2 block text-sm font-medium text-gray-900 dark:text-slate-200"
          >Nueva contraseña</label
        >
        <div class="relative">
          <Lock class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500 dark:text-slate-400" />
          <input
            id="new-password"
            v-model="newPassword"
            :type="showNewPassword ? 'text' : 'password'"
            autocomplete="new-password"
            class="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 pl-10 pr-10 text-gray-900 transition focus:border-aiuris focus:outline-none focus:ring-2 focus:ring-aiuris dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400"
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
          >Confirmar contrasena</label
        >
        <div class="relative">
          <Lock class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500 dark:text-slate-400" />
          <input
            id="confirm-password"
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            autocomplete="new-password"
            class="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 pl-10 pr-10 text-gray-900 transition focus:border-aiuris focus:outline-none focus:ring-2 focus:ring-aiuris dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400"
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
        <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>
        <p v-else-if="successMessage" class="text-sm text-green-600">{{ successMessage }}</p>
        <p v-else class="text-sm text-slate-500 dark:text-slate-400">
          La nueva contrasena debe tener al menos 8 caracteres.
        </p>
      </div>

      <button
        :disabled="loading"
        class="w-full cursor-pointer rounded-lg bg-aiuris px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <span v-if="!loading">Guardar contrasena</span>
        <span v-else class="inline-flex items-center gap-2">
          <LoaderCircle class="size-4 animate-spin" />
          Guardando...
        </span>
      </button>
    </form>
  </div>
</template>
