<script setup lang="ts">
import { computed, ref } from 'vue'

const emit = defineEmits<{
  (e: 'submit', value: string): void
}>()

const prompt = ref('')

const isSubmitDisabled = computed(() => !prompt.value.trim())

function handleSubmit() {
  const trimmedPrompt = prompt.value.trim()

  if (!trimmedPrompt) {
    return
  }

  emit('submit', trimmedPrompt)
  prompt.value = ''
}
</script>

<template>
  <form
    class="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900"
    @submit.prevent="handleSubmit"
  >
    <header class="space-y-2">
      <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100">
        Definí el prompt para tu documento
      </h2>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Describí el objetivo, tono y los puntos clave que querés cubrir. Podés agregar referencias a
        los documentos cargados.
      </p>
    </header>

    <textarea
      v-model="prompt"
      rows="6"
      class="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 transition focus:border-aiuris focus:outline-none focus:ring-2 focus:ring-aiuris/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      placeholder="Redactar un contrato de prestacion de servicios con foco en confidencialidad y propiedad intelectual."
    />

    <div
      class="flex flex-col gap-2 rounded-lg bg-slate-50 p-4 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-400"
    >
      <span class="font-semibold text-slate-600 dark:text-slate-200">Sugerencias rapidas</span>
      <ul class="grid gap-2 md:grid-cols-2">
        <li class="rounded-md bg-white px-3 py-2 text-left shadow-sm dark:bg-slate-900">
          Solicitá el tipo de documento y la jurisdiccion.
        </li>
        <li class="rounded-md bg-white px-3 py-2 text-left shadow-sm dark:bg-slate-900">
          Indicá clausulas obligatorias o datos clave.
        </li>
        <li class="rounded-md bg-white px-3 py-2 text-left shadow-sm dark:bg-slate-900">
          Definí el tono (formal, cercano, tecnico, etc.).
        </li>
        <li class="rounded-md bg-white px-3 py-2 text-left shadow-sm dark:bg-slate-900">
          Especificá extensiones o formatos esperados.
        </li>
      </ul>
    </div>

    <div
      class="flex flex-col items-start gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400"
    >
      <button
        type="submit"
        class="flex items-center gap-2 rounded-lg bg-aiuris px-4 py-2 text-sm font-semibold text-white transition hover:bg-aiuris/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiuris focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
        :disabled="isSubmitDisabled"
        :class="{ 'cursor-not-allowed opacity-60': isSubmitDisabled }"
      >
        Generar borrador
      </button>
      <p>Esta accion enviará el prompt al asistente de redaccion.</p>
    </div>
  </form>
</template>
