<script setup lang="ts">
import { ArrowUpRight, History, Play } from '@lucide/vue'
import SectionShell from '@/components/SectionShell.vue'
import Reveal from '@/components/Reveal.vue'
</script>

<template>
  <SectionShell id="old" title="旧版" subtitle="2023 年 Svelte + MDUI">
    <div class="grid gap-4">
      <Reveal>
        <a
          href="/old/"
          class="theme-surface group flex items-start gap-4 rounded-card border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-accent"
        >
          <span
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-elevated text-accent"
          >
            <History :size="19" />
          </span>
          <span class="min-w-0 flex-1">
            <span
              class="flex items-center gap-1.5 font-display text-base font-bold group-hover:text-accent"
            >
              旧版首页
              <ArrowUpRight :size="15" class="transition group-hover:translate-x-0.5" />
            </span>
            <span class="mt-2 block text-sm leading-6 text-muted">
              <code class="rounded bg-elevated px-1.5 py-0.5 text-xs">/old/</code>
              不再更新了。
            </span>
          </span>
        </a>
      </Reveal>

      <Reveal :delay="0.08">
        <a
          href="/old/starwork.html"
          class="theme-surface group flex items-start gap-4 rounded-card border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-accent"
        >
          <span
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-elevated text-accent"
          >
            <Play :size="19" />
          </span>
          <span class="min-w-0 flex-1">
            <span
              class="flex items-center gap-1.5 font-display text-base font-bold group-hover:text-accent"
            >
              StarWork 页面
              <ArrowUpRight :size="15" class="transition group-hover:translate-x-0.5" />
            </span>
            <span class="mt-2 block text-sm leading-6 text-muted">
              <code class="rounded bg-elevated px-1.5 py-0.5 text-xs">/old/starwork.html</code>。
            </span>
          </span>
        </a>
      </Reveal>
    </div>
  </SectionShell>
</template>
