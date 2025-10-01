<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

import GeneratedOutputPanel from '@/components/documentGenerator/GeneratedOutputPanel.vue'
import DocumentUploadPanel from '@/components/documentGenerator/DocumentUploadPanel.vue'
import PromptComposer from '@/components/documentGenerator/PromptComposer.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const generatedContent = ref('')
const isGenerating = ref(false)
const exportNotice = ref<string | null>(null)

let generationTimeout: ReturnType<typeof setTimeout> | undefined
let noticeTimeout: ReturnType<typeof setTimeout> | undefined

function handlePromptSubmit(promptValue: string) {
  isGenerating.value = true
  generatedContent.value = ''

  if (generationTimeout) {
    clearTimeout(generationTimeout)
  }

  generationTimeout = setTimeout(() => {
    const mockParagraphs = [
      `Resumen del prompt: ${promptValue}`,
      'La redaccion detallada del documento se mostrara aca una vez que la integracion con el motor de IA este disponible.',
      'Mientras tanto, puedes ajustar tu prompt o preparar notas adicionales que quieras incluir.',
    ]

    generatedContent.value = mockParagraphs.join('\n\n')
    isGenerating.value = false
  }, 900)
}

function handleExport(format: 'docx' | 'pdf') {
  if (noticeTimeout) {
    clearTimeout(noticeTimeout)
  }

  exportNotice.value = `La exportacion a ${format.toUpperCase()} estara disponible pronto.`

  noticeTimeout = setTimeout(() => {
    exportNotice.value = null
  }, 3500)
}

onBeforeUnmount(() => {
  if (generationTimeout) {
    clearTimeout(generationTimeout)
  }

  if (noticeTimeout) {
    clearTimeout(noticeTimeout)
  }
})
</script>

<template>
  <DashboardLayout>
    <header
      class="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900"
    >
      <h1 class="text-3xl font-semibold text-slate-800 dark:text-slate-100">
        Generador de documentos
      </h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Utilizá esta seccion para preparar borradores en base a tus archivos y las instrucciones que
        definas.
      </p>
    </header>

    <section class="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <div class="flex flex-col gap-6">
        <DocumentUploadPanel />
        <PromptComposer @submit="handlePromptSubmit" />
      </div>

      <GeneratedOutputPanel
        :content="generatedContent"
        :is-generating="isGenerating"
        @export="handleExport"
      />
    </section>

    <transition name="fade">
      <p
        v-if="exportNotice"
        class="rounded-lg border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
      >
        {{ exportNotice }}
      </p>
    </transition>
  </DashboardLayout>
</template>
