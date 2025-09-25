<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { Menu, Search } from 'lucide-vue-next'

const auth = useAuthStore()
const router = useRouter()
const { user } = storeToRefs(auth)

const emit = defineEmits<{
  (e: 'toggle-sidebar'): void
}>()

const isMenuOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const displayName = computed(() => {
  if (!user.value) return 'Usuario'
  const first = user.value.first_name?.trim()
  const last = user.value.last_name?.trim()
  const name = [first, last].filter(Boolean).join(' ')
  if (name) {
    return name
  }
  return user.value.email || user.value.username || 'Usuario'
})

const secondaryText = computed(() => {
  if (!user.value) return ''
  return user.value.email || user.value.username || ''
})

const avatarInitials = computed(() => {
  if (!user.value) return 'U'
  const parts = [user.value.first_name, user.value.last_name]
    .map((part) => (part ? part.trim().charAt(0).toUpperCase() : ''))
    .filter(Boolean)
    .join('')
  if (parts) {
    return parts.slice(0, 2)
  }
  const fallback = user.value.username || user.value.email
  return fallback ? fallback.charAt(0).toUpperCase() : 'U'
})

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function handleDocumentClick(event: MouseEvent) {
  if (!isMenuOpen.value || !menuRef.value) return
  const target = event.target as Node | null
  if (target && !menuRef.value.contains(target)) {
    closeMenu()
  }
}

async function handleLogout() {
  closeMenu()
  await auth.logout()
  await router.replace({ name: 'login' })
}

function goToProfile() {
  closeMenu()
  router.push({ name: 'profile' })
}

function goToPreferences() {
  closeMenu()
  router.push({ name: 'preferences' })
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('click', handleDocumentClick)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('click', handleDocumentClick)
  }
})

watch(
  () => router.currentRoute.value.fullPath,
  () => closeMenu(),
)
</script>

<template>
  <nav class="w-full bg-white shadow-sm z-50">
    <div class="flex items-center justify-between px-4 py-2">
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100 cursor-pointer"
          aria-label="Alternar sidebar"
          @click.stop="emit('toggle-sidebar')"
        >
          <Menu class="h-5 w-5" />
        </button>
        <div class="text-xl font-bold text-aiuris">
          <a href="/" class="cursor-pointer">AIURIS</a>
        </div>
      </div>

      <div class="flex flex-1 justify-center px-4">
        <div class="flex w-full max-w-md">
          <input
            type="text"
            placeholder="Buscar documentos"
            class="w-full rounded-l-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            class="flex cursor-pointer items-center justify-center rounded-r-md bg-aiuris px-4 text-white hover:bg-blue-800"
          >
            <Search class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div ref="menuRef" class="flex items-center gap-3">
        <div class="hidden text-right md:flex md:flex-col">
          <span class="text-sm font-semibold text-slate-700">{{ displayName }}</span>
          <span v-if="secondaryText" class="text-xs text-slate-500">{{ secondaryText }}</span>
        </div>

        <div class="relative">
          <button
            type="button"
            class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-gray-200 bg-gradient-to-br from-aiuris to-blue-900 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-aiuris"
            @click.stop="toggleMenu"
            aria-haspopup="menu"
            :aria-expanded="isMenuOpen ? 'true' : 'false'"
          >
            {{ avatarInitials }}
          </button>

          <div
            v-if="isMenuOpen"
            class="absolute right-0 z-10 mt-2 w-48 rounded-md border border-slate-200 bg-white py-1 shadow-lg"
            role="menu"
            aria-label="Opciones de usuario"
          >
            <button
              type="button"
              class="block w-full cursor-pointer px-4 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
              role="menuitem"
              @click="goToProfile"
            >
              Mi Perfil
            </button>
            <button
              type="button"
              class="block w-full cursor-pointer px-4 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
              role="menuitem"
              @click="goToPreferences"
            >
              Preferencias
            </button>
            <div class="my-1 border-t border-slate-200"></div>
            <button
              type="button"
              class="block w-full cursor-pointer px-4 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
              role="menuitem"
              @click="handleLogout"
            >
              Cerrar sesion
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
