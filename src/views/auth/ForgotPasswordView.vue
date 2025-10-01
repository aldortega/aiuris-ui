<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

import ForgotPasswordRequestForm from '@/components/auth/ForgotPasswordRequestForm.vue'
import ForgotPasswordResetForm from '@/components/auth/ForgotPasswordResetForm.vue'

const route = useRoute()
const router = useRouter()

const mode = computed(() =>
  typeof route.query.token === 'string' && route.query.token.trim().length > 0
    ? 'reset'
    : 'request',
)

const resetToken = computed(() =>
  mode.value === 'reset' && typeof route.query.token === 'string' ? route.query.token : null,
)

function goToLogin() {
  router.push({ name: 'login' })
}
</script>

<template>
  <main
    class="grid min-h-dvh place-items-center bg-slate-100 p-4 transition-colors dark:bg-slate-950"
  >
    <section
      class="w-full max-w-md rounded-lg border border-slate-200 bg-slate-50 shadow-md transition-colors dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="space-y-6 p-8">
        <button
          type="button"
          @click="goToLogin"
          class="inline-flex items-center gap-2 text-sm font-medium text-aiuris transition hover:text-blue-900 dark:text-slate-300 dark:hover:text-blue-700 cursor-pointer"
        >
          <ArrowLeft class="size-4" />
          Volver a iniciar sesion
        </button>

        <ForgotPasswordRequestForm v-if="mode === 'request'" />
        <ForgotPasswordResetForm v-else :token="resetToken" />
      </div>
    </section>
  </main>
</template>
