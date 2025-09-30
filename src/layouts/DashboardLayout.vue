<script setup lang="ts">
import { ref, watch } from 'vue'

import MainHeader from '@/components/MainHeader.vue'
import MainSidebar from '@/components/MainSidebar.vue'

const SIDEBAR_PREFERENCE_KEY = 'aiuris.sidebarOpen'

const isSidebarOpen = ref(true)

if (typeof window !== 'undefined') {
  const stored = window.localStorage.getItem(SIDEBAR_PREFERENCE_KEY)
  if (stored !== null) {
    isSidebarOpen.value = stored === '1'
  }
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

watch(isSidebarOpen, (value) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(SIDEBAR_PREFERENCE_KEY, value ? '1' : '0')
  } catch (error) {
    console.warn('No se pudo persistir la preferencia del sidebar', error)
  }
})
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-slate-100 transition-colors dark:bg-slate-950">
    <MainHeader @toggle-sidebar="toggleSidebar" />

    <div class="flex flex-1 overflow-hidden">
      <aside
        class="flex-shrink-0 overflow-hidden border-slate-200 bg-white transition-[width] duration-200 ease-in-out dark:bg-slate-900"
        :class="isSidebarOpen ? 'w-64' : 'w-0 '"
      >
        <div v-if="isSidebarOpen" class="h-full">
          <MainSidebar />
        </div>
      </aside>

      <main class="flex-1 overflow-y-auto">
        <div class="mx-auto w-full max-w-6xl space-y-6 px-6 py-10 transition-colors">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
