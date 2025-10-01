<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    content?: string
    isGenerating?: boolean
  }>(),
  {
    content: '',
    isGenerating: false,
  },
)

const emit = defineEmits<{
  (e: 'export', format: 'docx' | 'pdf'): void
}>()

const paragraphs = computed(() => {
  if (!props.content) {
    return [] as string[]
  }

  return props.content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
})

function handleExport(format: 'docx' | 'pdf') {
  emit('export', format)
}
</script>

<template>
  <section
    class="flex h-full flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900"
  >
    <header class="flex items-center justify-between gap-4">
      <div>
        <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100">Resultado generado</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Revisá el borrador y ajustá manualmente antes de exportarlo.
        </p>
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          class="rounded-lg border border-aiuris bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-aiuris transition hover:bg-aiuris hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiuris focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-slate-900 dark:hover:bg-aiuris"
          :disabled="!props.content"
          :class="{ 'cursor-not-allowed opacity-60': !props.content }"
          @click="handleExport('docx')"
        >
          Exportar DOCX
        </button>
        <button
          type="button"
          class="rounded-lg border border-aiuris bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-aiuris transition hover:bg-aiuris hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiuris focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-slate-900 dark:hover:bg-aiuris"
          :disabled="!props.content"
          :class="{ 'cursor-not-allowed opacity-60': !props.content }"
          @click="handleExport('pdf')"
        >
          Exportar PDF
        </button>
      </div>
    </header>

    <div
      class="relative flex-1 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 shadow-inner dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
    >
      <template v-if="props.isGenerating">
        <div
          class="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400"
        >
          Generando contenido...
        </div>
      </template>
      <template v-else-if="paragraphs.length">
        <article
          class="prose prose-sm max-w-none text-slate-700 dark:prose-invert dark:text-slate-100"
        >
          <p v-for="(paragraph, index) in paragraphs" :key="index">
            {{ paragraph }}
          </p>
        </article>
      </template>
      <template v-else>
        <div
          class="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-slate-400 dark:text-slate-500"
        >
          <span class="font-semibold text-slate-500 dark:text-slate-300"
            >Aun no hay un borrador generado.</span
          >
          <p>Completá el prompt y enviá tu solicitud para ver el contenido en esta seccion.</p>
        </div>
      </template>
    </div>
  </section>
</template>
