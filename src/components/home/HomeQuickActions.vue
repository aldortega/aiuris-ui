<script setup lang="ts">
import { computed, type Component } from 'vue'
import { FilePlus2, History, Sparkles } from 'lucide-vue-next'

type ShortcutId = 'document-generator' | 'documents-history' | 'templates-prompts'

type ShortcutCard = {
  id: ShortcutId
  title: string
  description: string
  icon: Component
}

const emit = defineEmits<{
  (e: 'select', value: ShortcutId): void
}>()

const shortcuts = computed<ShortcutCard[]>(() => [
  {
    id: 'document-generator',///rutas a definir mas adelante
    title: 'Generador de documentos',
    description: 'Crea documentos legales personalizados asistido por IA en pocos pasos.',
    icon: FilePlus2,
  },
  {
    id: 'documents-history',
    title: 'Historial de documentos',
    description: 'Revisa y gestiona los documentos creados recientemente.',
    icon: History,
  },
  {
    id: 'templates-prompts',
    title: 'Plantillas y prompts',
    description: 'Accede a recursos predefinidos para acelerar tu trabajo diario.',
    icon: Sparkles,
  },
])

function handleSelect(shortcut: ShortcutCard) {
  emit('select', shortcut.id)
}
</script>

<template>
  <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    <button
      v-for="shortcut in shortcuts"
      :key="shortcut.id"
      type="button"
      class="group flex h-full flex-col items-start gap-4 cursor-pointer rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-aiuris hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiuris focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-800 dark:bg-slate-900 dark:hover:border-aiuris dark:hover:shadow-slate-900/20 dark:focus-visible:ring-offset-slate-900"
      @click="handleSelect(shortcut)"
    >
      <span
        class="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-aiuris transition group-hover:bg-aiuris/10 group-hover:text-aiuris dark:bg-slate-800"
      >
        <component :is="shortcut.icon" class="h-6 w-6" />
      </span>
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-slate-800 transition-colors dark:text-slate-100">
          {{ shortcut.title }}
        </h3>
        <p class="text-sm text-slate-600 transition-colors dark:text-slate-300">
          {{ shortcut.description }}
        </p>
      </div>
    </button>
  </section>
</template>
