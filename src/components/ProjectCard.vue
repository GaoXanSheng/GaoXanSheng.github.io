<script setup lang="ts">
import { motion } from 'motion-v'
import { ArrowUpRight } from '@lucide/vue'
import type { Project } from '@/data/projects'

defineProps<{ project: Project }>()
</script>

<template>
  <motion.a
    :href="project.url"
    target="_blank"
    rel="noreferrer"
    class="theme-surface group flex flex-col rounded-card border border-line bg-surface p-5 hover:border-accent"
    :initial="{ opacity: 0, y: 18 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :while-hover="{ y: -4 }"
    :viewport="{ once: true, amount: 0.15 }"
    :transition="{ duration: 0.35, ease: 'easeOut' }"
  >
    <div class="flex items-start justify-between gap-3">
      <h3 class="font-display text-base leading-6 font-bold group-hover:text-accent">
        {{ project.title }}
      </h3>
      <ArrowUpRight
        :size="16"
        class="mt-0.5 shrink-0 text-muted transition group-hover:text-accent"
      />
    </div>

    <p class="mt-1.5 text-xs text-accent">{{ project.meta }}</p>

    <p class="mt-3 text-sm leading-6 text-muted">{{ project.desc }}</p>
  </motion.a>
</template>
