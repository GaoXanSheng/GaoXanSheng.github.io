<script setup lang="ts">
import Reveal from '@/components/Reveal.vue'

defineProps<{ id?: string; title: string; subtitle?: string }>()
</script>

<template>
  <section :id="id" class="mx-auto max-w-3xl px-6 py-16 min-[700px]:py-24">
    <Reveal>
      <h2 class="section-title font-display text-2xl font-bold min-[700px]:text-3xl">
        {{ title }}
      </h2>
      <p v-if="subtitle" class="mt-2 text-sm text-muted">{{ subtitle }}</p>
    </Reveal>
    <div class="mt-8">
      <slot />
    </div>
  </section>
</template>
