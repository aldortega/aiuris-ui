<script setup lang="ts">
import { ref } from 'vue'
import { Mail, LoaderCircle } from 'lucide-vue-next'

import { apiFetch } from '@/services/api'

const email = ref('')
const loading = ref(false)
const successMessage = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

async function submitEmail() {
  if (loading.value) return
  errorMessage.value = null
  successMessage.value = null

  if (!email.value.trim()) {
    errorMessage.value = 'Ingresa un correo electronico valido'
    return
  }

  loading.value = true

  try {
    await apiFetch('/v1/auth/request-reset', {
      method: 'post',
      data: { email: email.value.trim() },
    })

    successMessage.value =
      'Si el correo existe en nuestro sistema, enviamos un enlace para restablecer tu contrasena.'
    email.value = ''
  } catch (err) {
    const message = err instanceof Error ? err.message : 'No se pudo procesar la solicitud'
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
        Recuperar contrasena
      </h1>
      <p class="text-sm text-slate-600 transition-colors dark:text-slate-300">
        Ingresa tu correo electronico y te enviaremos un enlace para restablecer tu contrasena.
      </p>
    </header>

    <form class="space-y-4" @submit.prevent="submitEmail">
      <div>
        <label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-slate-200"
          >Correo electronico</label
        >
        <div class="relative">
          <Mail class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500 dark:text-slate-400" />
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            class="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 pl-10 text-gray-900 transition focus:border-aiuris focus:outline-none focus:ring-2 focus:ring-aiuris dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400"
            placeholder="correo@ejemplo.com"
            required
          />
        </div>
      </div>

      <div class="space-y-2">
        <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>
        <p v-else-if="successMessage" class="text-sm text-green-600">{{ successMessage }}</p>
        <p v-else class="text-sm text-slate-500 dark:text-slate-400">
          Revisa tambien tu carpeta de spam si no ves el correo en unos minutos.
        </p>
      </div>

      <button
        :disabled="loading"
        class="w-full cursor-pointer rounded-lg bg-aiuris px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <span v-if="!loading">Enviar instrucciones</span>
        <span v-else class="inline-flex items-center gap-2">
          <LoaderCircle class="size-4 animate-spin" />
          Enviando...
        </span>
      </button>
    </form>
  </div>
</template>
