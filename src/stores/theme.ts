import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const THEME_STORAGE_KEY = 'aiuris.theme'
type ThemeMode = 'light' | 'dark'

function updateDOM(value: ThemeMode) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('dark', value === 'dark')
  root.dataset.theme = value
  root.style.colorScheme = value
}

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>('light')

  function setTheme(value: ThemeMode) {
    mode.value = value
    updateDOM(value)
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, value)
      } catch (error) {
        console.warn('No se pudo persistir la preferencia de tema', error)
      }
    }
  }

  function toggle() {
    setTheme(mode.value === 'dark' ? 'light' : 'dark')
  }

  function initialize() {
    let initial: ThemeMode = 'light'

    if (typeof window !== 'undefined') {
      try {
        const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
        if (stored === 'light' || stored === 'dark') {
          initial = stored
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          initial = 'dark'
        }
      } catch (error) {
        console.warn('No se pudo leer la preferencia de tema', error)
      }
    }

    mode.value = initial
    updateDOM(initial)
  }

  const isDark = computed(() => mode.value === 'dark')

  return {
    mode,
    isDark,
    setTheme,
    toggle,
    initialize,
  }
})
