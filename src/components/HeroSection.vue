<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { motion } from 'motion-v'
import { ArrowDown } from '@lucide/vue'
import GithubMark from '@/components/icons/GithubMark.vue'
import desktopBg from '@/assets/images/background.jpg'
import mobileBg from '@/assets/images/m-bg.jpg'
import portrait from '@/assets/images/portrait.jpg'

const scrollY = ref(0)
let frame = 0

function onScroll() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    scrollY.value = window.scrollY
    frame = 0
  })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (frame) cancelAnimationFrame(frame)
})

const travel = computed(() => Math.min(scrollY.value, 420))

const bgStyle = computed(() => ({
  transform: `scale(1.14) translateY(${(travel.value * 0.1).toFixed(2)}px)`,
}))

const contentStyle = computed(() => ({
  transform: `translateY(${(-travel.value * 0.07).toFixed(2)}px)`,
  opacity: String((1 - (travel.value / 420) * 0.5).toFixed(3)),
}))
</script>

<template>
  <section class="relative min-h-[520px] overflow-hidden min-[700px]:min-h-[770px]">
    <img
      :src="mobileBg"
      alt=""
      class="absolute inset-0 h-full w-full object-cover object-top min-[700px]:hidden"
    />
    <img
      :src="desktopBg"
      alt=""
      class="absolute inset-0 hidden h-full w-full object-cover object-center will-change-transform min-[700px]:block"
      :style="bgStyle"
    />
    <div
      class="absolute inset-0"
      style="
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.45) 0%,
          rgba(0, 0, 0, 0.3) 40%,
          var(--t-bg) 100%
        );
      "
    />

    <div
      class="relative z-10 mx-auto flex min-h-[520px] max-w-3xl flex-col items-center justify-center px-6 pt-24 pb-20 text-center min-[700px]:min-h-[770px]"
      :style="contentStyle"
    >
      <motion.img
        :src="portrait"
        alt="GaoXanSheng 的头像"
        class="h-24 w-24 rounded-full border-4 border-white/85 object-cover shadow-xl min-[700px]:h-28 min-[700px]:w-28"
        :initial="{ opacity: 0, scale: 0.86 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
      />
      <motion.h1
        class="mt-6 font-display text-4xl font-bold text-white drop-shadow-md min-[700px]:text-5xl"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.08, ease: 'easeOut' }"
      >
        GaoXanSheng
      </motion.h1>

      <motion.div
        class="mt-8 flex flex-wrap items-center justify-center gap-3"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.16, ease: 'easeOut' }"
      >
        <a
          href="https://github.com/GaoXanSheng"
          target="_blank"
          rel="noreferrer"
          class="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          <GithubMark :size="16" />
          GitHub
        </a>
        <a
          href="#projects"
          class="flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20"
        >
          看项目
          <ArrowDown :size="16" />
        </a>
      </motion.div>
    </div>
  </section>
</template>
