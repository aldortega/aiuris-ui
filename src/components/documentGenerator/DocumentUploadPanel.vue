<script setup lang="ts">
import { computed, ref } from 'vue'

const files = ref<File[]>([])
const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const hasFiles = computed(() => files.value.length > 0)
const fileNames = computed(() => files.value.map((file) => file.name))

function handleBrowseClick() {
  fileInput.value?.click()
}

function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement | null

  if (!input?.files) {
    return
  }

  files.value = Array.from(input.files)
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
  isDragging.value = true
}

function handleDragLeave() {
  isDragging.value = false
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false

  if (!event.dataTransfer?.files?.length) {
    return
  }

  files.value = Array.from(event.dataTransfer.files)
}
</script>

<template>
  <section
    class="flex flex-col gap-4 rounded-xl border border-dashed border-slate-300 bg-white p-6 text-slate-700 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
  >
    <header class="space-y-2">
      <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100">
        Cargá tus documentos base
      </h2>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Arrastrá archivos acá o seleccioná archivos desde tu dispositivo para usarlos como
        referencia.
      </p>
    </header>

    <div
      class="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition-colors hover:border-aiuris/60 hover:bg-aiuris/5 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-aiuris/60"
      :class="{
        'border-aiuris bg-aiuris/10 dark:border-aiuris dark:bg-aiuris/10': isDragging,
      }"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <div class="flex flex-col items-center gap-1">
        <span class="text-sm font-medium text-slate-600 dark:text-slate-300">
          Arrastrá y soltá archivos acá
        </span>
        <span class="text-xs text-slate-400 dark:text-slate-500"
          >PDF, DOCX, TXT (maximo 10 MB por archivo)</span
        >
      </div>

      <button
        type="button"
        class="rounded-lg border border-aiuris bg-white px-4 py-2 text-sm font-semibold text-aiuris transition hover:bg-aiuris hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aiuris focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-slate-900 dark:hover:bg-aiuris"
        @click="handleBrowseClick"
      >
        Seleccionar archivos
      </button>
      <input ref="fileInput" class="hidden" type="file" multiple @change="handleFileSelect" />
    </div>

    <ul v-if="hasFiles" class="space-y-2 text-left text-sm">
      <li
        v-for="fileName in fileNames"
        :key="fileName"
        class="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <span
          class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-aiuris/10 text-xs font-semibold text-aiuris"
        >
          {{ fileName.split('.')?.pop()?.toUpperCase() || 'DOC' }}
        </span>
        <span class="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
          {{ fileName }}
        </span>
      </li>
    </ul>

    <p v-else class="text-xs text-slate-400 dark:text-slate-500">
      Aun no seleccionaste archivos. Aca vas a ver un resumen de los documentos listos para usar.
    </p>
  </section>
</template>
