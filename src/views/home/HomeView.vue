<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import HomeQuickActions from '@/components/home/HomeQuickActions.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useAuthStore } from '@/stores/auth'

type ShortcutId = 'document-generator' | 'documents-history' | 'templates-prompts'

type ShortcutRouteMap = Record<ShortcutId, string>

const auth = useAuthStore()
const { user } = storeToRefs(auth)

const router = useRouter()

const routeNameByShortcut: ShortcutRouteMap = {
  'document-generator': 'document-generator',
  'documents-history': 'documents-history',
  'templates-prompts': 'templates-prompts',
}

function handleShortcutSelect(shortcutId: ShortcutId) {
  const routeName = routeNameByShortcut[shortcutId]

  if (router.hasRoute(routeName)) {
    router.push({ name: routeName })
  }
}
</script>

<template>
  <DashboardLayout>
    <header
      class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-semibold text-slate-800 transition-colors dark:text-slate-100">
          Inicio
        </h1>
        <p v-if="user" class="text-slate-600 transition-colors dark:text-slate-300">
          Bienvenido,
          <span class="text-aiuris font-semibold">{{ user.first_name || user.email }}. <br /></span>
          Accede a las funcionalidades principales de AIURIS
        </p>
      </div>
    </header>

    <article
      class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900"
    >
      <HomeQuickActions @select="handleShortcutSelect" />
    </article>
  </DashboardLayout>
</template>
