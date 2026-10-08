<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Palette } from '@lucide/vue'
import GithubMark from '@/components/icons/GithubMark.vue'

const emit = defineEmits<{ openThemes: [] }>()

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-30 border-b transition-all duration-300"
    :class="
      scrolled
        ? 'border-line bg-surface/85 shadow-lg shadow-black/5 backdrop-blur-md'
        : 'border-transparent'
    "
  >
    <div class="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
      <a
        href="/"
        class="font-display text-sm font-bold transition"
        :class="scrolled ? 'text-text' : 'text-white/95'"
      >
        云某人的小站
      </a>

      <nav class="flex items-center gap-1">
        <a
          href="#projects"
          class="rounded-full px-3 py-1.5 text-sm transition"
          :class="scrolled ? 'text-muted hover:text-text' : 'text-white/80 hover:text-white'"
        >
          项目
        </a>
        <a
          href="/old/"
          class="rounded-full px-3 py-1.5 text-sm transition"
          :class="scrolled ? 'text-muted hover:text-text' : 'text-white/80 hover:text-white'"
        >
          旧版
        </a>
        <a
          href="https://github.com/GaoXanSheng"
          target="_blank"
          rel="noreferrer"
          class="rounded-full p-2 transition"
          :class="scrolled ? 'text-muted hover:text-text' : 'text-white/80 hover:text-white'"
          aria-label="GitHub"
        >
          <GithubMark :size="17" />
        </a>
        <button
          type="button"
          class="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition"
          :class="
            scrolled
              ? 'bg-accent text-accent-fg hover:opacity-90'
              : 'bg-white/15 text-white backdrop-blur-sm hover:bg-white/25'
          "
          @click="emit('openThemes')"
        >
          <Palette :size="15" />
          主题
        </button>
      </nav>
    </div>
  </header>
</template>
