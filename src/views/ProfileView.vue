<script setup lang="ts">
import { storeToRefs } from 'pinia'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useAuthStore } from '@/stores/auth'

const { user } = storeToRefs(useAuthStore())
</script>

<template>
  <DashboardLayout>
    <header class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 class="text-3xl font-semibold text-slate-800">Mi Perfil</h1>
      <p class="mt-2 text-sm text-slate-600">Informacion basica del usuario autenticado.</p>
    </header>

    <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <template v-if="user">
        <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt class="text-xs font-semibold uppercase text-slate-500">Nombre</dt>
            <dd class="text-sm text-slate-700">{{ user.first_name || 'No disponible' }}</dd>
          </div>
          <div>
            <dt class="text-xs font-semibold uppercase text-slate-500">Apellido</dt>
            <dd class="text-sm text-slate-700">{{ user.last_name || 'No disponible' }}</dd>
          </div>
          <div>
            <dt class="text-xs font-semibold uppercase text-slate-500">Correo</dt>
            <dd class="text-sm text-slate-700">{{ user.email }}</dd>
          </div>
          <div>
            <dt class="text-xs font-semibold uppercase text-slate-500">Usuario</dt>
            <dd class="text-sm text-slate-700">{{ user.username }}</dd>
          </div>
        </dl>
      </template>
      <p v-else class="text-sm text-slate-600">No hay informacion de usuario disponible.</p>
    </div>
  </DashboardLayout>
</template>
