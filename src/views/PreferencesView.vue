<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue'
</script>

<template>
  <DashboardLayout>
    <header class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <h1 class="text-3xl font-semibold text-slate-800 transition-colors dark:text-slate-100">Preferencias</h1>
      <p class="mt-2 text-sm text-slate-600 transition-colors dark:text-slate-300">Configura las opciones de tu cuenta y de la aplicacion.</p>
    </header>

    <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <p class="text-sm text-slate-600 transition-colors dark:text-slate-300">
        Las preferencias podran configurarse aqui mas adelante.
      </p>
    </article>
  </DashboardLayout>
</template>
