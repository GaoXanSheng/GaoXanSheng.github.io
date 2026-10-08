import { computed, ref, watch, type WatchStopHandle } from 'vue'
import {
  CSS_VARS,
  findTheme,
  themeForScheme,
  themes,
  type Theme,
  type ThemeTokens,
} from '@/themes/themes'

export type ThemeChoice = 'system' | string

const STORAGE_KEY = 'yunmouren-theme'
const isBrowser = typeof window !== 'undefined'

function readStored(): ThemeChoice {
  if (!isBrowser) return 'system'
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw || raw === 'system') return 'system'
    return findTheme(raw) ? raw : 'system'
  } catch {
    return 'system'
  }
}

const choice = ref<ThemeChoice>(readStored())
const systemDark = ref(
  isBrowser ? window.matchMedia('(prefers-color-scheme: dark)').matches : false,
)

const activeTheme = computed<Theme>(() =>
  choice.value === 'system'
    ? themeForScheme(systemDark.value)
    : (findTheme(choice.value) ?? themeForScheme(systemDark.value)),
)

const TOKEN_KEYS = Object.keys(CSS_VARS) as (keyof ThemeTokens)[]

function applyTheme(theme: Theme) {
  const root = document.documentElement
  for (const key of TOKEN_KEYS) {
    root.style.setProperty(CSS_VARS[key], theme.tokens[key])
  }
  root.dataset.theme = theme.id
  root.style.colorScheme = theme.scheme
}

let bound = false
let stopWatch: WatchStopHandle | null = null

function bindListeners() {
  if (bound || !isBrowser) return
  bound = true

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      systemDark.value = e.matches
    })

  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) choice.value = readStored()
  })
}

export function initTheme() {
  bindListeners()
  stopWatch?.()
  stopWatch = watch(activeTheme, applyTheme, { immediate: true })
}

export function setTheme(next: ThemeChoice) {
  choice.value = next
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
  }
}

export function useTheme() {
  bindListeners()
  return {
    themes,
    choice: computed(() => choice.value),
    activeTheme,
    setTheme,
    isActive: (id: string) => activeTheme.value.id === id,
  }
}
