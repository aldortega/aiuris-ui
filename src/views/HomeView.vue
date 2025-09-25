<script setup lang="ts">
import { storeToRefs } from 'pinia'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const { user } = storeToRefs(auth)
</script>

<template>
  <DashboardLayout>
    <header class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-semibold text-slate-800">Inicio</h1>
        <p v-if="user" class="text-slate-600">Bienvenido, {{ user.first_name || user.email }}</p>
      </div>
    </header>

    <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-slate-600">Contenido de la pagina de inicio proximamente.</p>
    </article>
  </DashboardLayout>
</template>
