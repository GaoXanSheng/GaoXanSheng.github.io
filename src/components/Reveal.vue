<script setup lang="ts">
import { motion } from 'motion-v'

withDefaults(defineProps<{ delay?: number; distance?: number; amount?: number }>(), {
  delay: 0,
  distance: 18,
  amount: 0.2,
})
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: distance }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :viewport="{ once: true, amount }"
    :transition="{ duration: 0.55, delay, ease: 'easeOut' }"
  >
    <slot />
  </motion.div>
</template>
