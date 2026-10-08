<script setup lang="ts">
import { Palette } from '@lucide/vue'
import GithubMark from '@/components/icons/GithubMark.vue'
import Reveal from '@/components/Reveal.vue'

const emit = defineEmits<{ openThemes: [] }>()
</script>

<template>
  <footer class="border-t border-line bg-surface">
    <Reveal :distance="12">
      <div
        class="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-10 text-sm text-muted min-[700px]:flex-row min-[700px]:justify-between"
      >
        <div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <a
            href="https://icp.gov.moe/?keyword=20230436"
            target="_blank"
            rel="noreferrer"
            class="transition hover:text-accent"
          >
            萌ICP备20230436号
          </a>
          <a
            href="https://github.com/GaoXanSheng"
            target="_blank"
            rel="noreferrer"
            class="flex items-center gap-1.5 transition hover:text-accent"
          >
            <GithubMark :size="15" />
            GitHub
          </a>
          <a href="/old/" class="transition hover:text-accent">旧版</a>
          <a
            href="https://www.mdui.org/"
            target="_blank"
            rel="noreferrer"
            class="transition hover:text-accent"
          >
            MDUI（旧站）
          </a>
        </div>

        <button
          type="button"
          class="flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 transition hover:border-accent hover:text-accent"
          @click="emit('openThemes')"
        >
          <Palette :size="14" />
          换个主题
        </button>
      </div>
    </Reveal>
  </footer>
</template>
