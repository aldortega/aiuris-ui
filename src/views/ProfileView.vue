<script setup lang="ts">
import { storeToRefs } from 'pinia'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useAuthStore } from '@/stores/auth'

const { user } = storeToRefs(useAuthStore())
</script>

<template>
  <DashboardLayout>
    <header class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <h1 class="text-3xl font-semibold text-slate-800 transition-colors dark:text-slate-100">Mi Perfil</h1>
      <p class="mt-2 text-sm text-slate-600 transition-colors dark:text-slate-300">Informacion basica del usuario autenticado.</p>
    </header>

    <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <template v-if="user">
        <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt class="text-xs font-semibold uppercase text-slate-500 transition-colors dark:text-slate-400">Nombre</dt>
            <dd class="text-sm text-slate-700 transition-colors dark:text-slate-200">{{ user.first_name || 'No disponible' }}</dd>
          </div>
          <div>
            <dt class="text-xs font-semibold uppercase text-slate-500 transition-colors dark:text-slate-400">Apellido</dt>
            <dd class="text-sm text-slate-700 transition-colors dark:text-slate-200">{{ user.last_name || 'No disponible' }}</dd>
          </div>
          <div>
            <dt class="text-xs font-semibold uppercase text-slate-500 transition-colors dark:text-slate-400">Correo</dt>
            <dd class="text-sm text-slate-700 transition-colors dark:text-slate-200">{{ user.email }}</dd>
          </div>
          <div>
            <dt class="text-xs font-semibold uppercase text-slate-500 transition-colors dark:text-slate-400">Usuario</dt>
            <dd class="text-sm text-slate-700 transition-colors dark:text-slate-200">{{ user.username }}</dd>
          </div>
        </dl>
      </template>
      <p v-else class="text-sm text-slate-600 transition-colors dark:text-slate-300">No hay informacion de usuario disponible.</p>
    </div>
  </DashboardLayout>
</template>
