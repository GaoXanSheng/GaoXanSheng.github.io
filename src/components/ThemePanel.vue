<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { motion } from 'motion-v'
import { Check, Monitor, X } from '@lucide/vue'
import { useTheme } from '@/composables/useTheme'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { themes, choice, setTheme } = useTheme()

function itemProps(delay: number) {
  return {
    initial: { opacity: 0, x: 18 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.34, delay, ease: 'easeOut' },
  }
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
      @click="emit('close')"
    />
  </Transition>

  <Transition name="slide">
    <aside
      v-if="open"
      class="theme-surface fixed top-0 right-0 z-50 flex h-full w-[min(92vw,22rem)] flex-col border-l border-line bg-surface shadow-2xl"
      role="dialog"
      aria-modal="true"
      aria-label="切换主题"
    >
      <header class="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <h2 class="font-display text-base font-bold">主题</h2>
          <p class="mt-0.5 text-xs text-muted">换成你顺眼的那套</p>
        </div>
        <button
          type="button"
          class="rounded-full p-2 text-muted transition hover:bg-elevated hover:text-text"
          aria-label="关闭主题面板"
          @click="emit('close')"
        >
          <X :size="18" />
        </button>
      </header>

      <div class="flex-1 overflow-y-auto px-3 py-3">
        <motion.button
          v-bind="itemProps(0.04)"
          type="button"
          class="mb-2 flex w-full items-center gap-3 rounded-card border px-3 py-3 text-left transition"
          :class="
            choice === 'system'
              ? 'border-accent bg-elevated'
              : 'border-line hover:bg-elevated'
          "
          @click="setTheme('system')"
        >
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-elevated text-muted">
            <Monitor :size="16" />
          </span>
          <span class="min-w-0 flex-1">
            <span class="block text-sm font-semibold">跟随系统</span>
            <span class="block text-xs leading-snug text-muted"
              >深色用深蓝夜色，浅色用 Material</span
            >
          </span>
          <Check v-if="choice === 'system'" :size="16" class="shrink-0 text-accent" />
        </motion.button>

        <motion.button
          v-for="(theme, i) in themes"
          :key="theme.id"
          v-bind="itemProps(0.08 + i * 0.035)"
          type="button"
          class="mb-2 flex w-full items-center gap-3 rounded-card border px-3 py-3 text-left transition"
          :class="
            choice === theme.id ? 'border-accent bg-elevated' : 'border-line hover:bg-elevated'
          "
          @click="setTheme(theme.id)"
        >
          <span class="flex shrink-0 gap-1">
            <span
              v-for="(color, j) in theme.swatch"
              :key="j"
              class="h-6 w-3 rounded-full border border-black/10"
              :style="{ backgroundColor: color }"
            />
          </span>
          <span class="min-w-0 flex-1">
            <span class="block text-sm font-semibold">
              {{ theme.name }}
              <span v-if="theme.scheme === 'dark'" class="ml-1 text-xs font-normal text-muted">深色</span>
            </span>
            <span class="block text-xs leading-snug text-muted">{{ theme.description }}</span>
          </span>
          <Check v-if="choice === theme.id" :size="16" class="shrink-0 text-accent" />
        </motion.button>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.24s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
