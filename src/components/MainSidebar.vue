<script setup lang="ts">
import { Home, Settings, FileText, BarChart3, LifeBuoy, UserRound } from 'lucide-vue-next'
import { computed, type Component } from 'vue'
import { useRoute } from 'vue-router'

type RouteLocationNamedRaw = {
  name: string
}

type SidebarItem = {
  label: string
  to?: RouteLocationNamedRaw
  hint?: string
  icon: Component
}

const route = useRoute()

const items = computed<SidebarItem[]>(() => [
  { label: 'Inicio', to: { name: 'home' }, icon: Home },
  { label: 'Mi Perfil', to: { name: 'profile' }, icon: UserRound },
  { label: 'Preferencias', to: { name: 'preferences' }, icon: Settings },
  { label: 'Documentos', to: { name: 'document-generator' }, icon: FileText },
  { label: 'Reportes', hint: 'Proximamente', icon: BarChart3 },
  { label: 'Centro de ayuda', hint: 'Proximamente', icon: LifeBuoy },
])

function isActive(item: SidebarItem) {
  if (!item.to) return false
  return route.name === item.to.name
}
</script>

<template>
  <aside class="h-full w-full border-r border-slate-200 dark:border-slate-800 transition-colors">
    <nav class="h-full overflow-y-auto bg-white p-4 transition-colors dark:bg-slate-950">
      <h2
        class="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
      >
        Navegacion
      </h2>
      <ul class="space-y-1">
        <li v-for="item in items" :key="item.label">
          <RouterLink
            v-if="item.to"
            :to="item.to"
            class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
            :class="
              isActive(item)
                ? 'bg-aiuris text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
            "
          >
            <component
              :is="item.icon"
              class="h-5 w-5"
              :class="isActive(item) ? 'text-white' : 'text-slate-500 dark:text-slate-400'"
            />
            <span class="flex-1">{{ item.label }}</span>
          </RouterLink>
          <div
            v-else
            class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-400 dark:text-slate-600"
            title="Proximamente"
          >
            <component :is="item.icon" class="h-5 w-5 text-slate-300 dark:text-slate-700" />
            <span class="flex-1">{{ item.label }}</span>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>
