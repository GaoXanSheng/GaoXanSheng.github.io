<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Particle {
  angle: number
  distance: number
  size: number
}

interface Burst {
  id: number
  x: number
  y: number
  particles: Particle[]
}

const bursts = ref<Burst[]>([])
const COUNT = 10
const LIFE = 620

let nextId = 0
const timers = new Set<number>()

function spawn(x: number, y: number) {
  const id = nextId++
  const particles: Particle[] = Array.from({ length: COUNT }, (_, i) => ({
    angle: (360 / COUNT) * i + Math.random() * 18,
    distance: 26 + Math.random() * 24,
    size: 4 + Math.random() * 4,
  }))

  bursts.value.push({ id, x, y, particles })

  const timer = window.setTimeout(() => {
    bursts.value = bursts.value.filter((b) => b.id !== id)
    timers.delete(timer)
  }, LIFE)

  timers.add(timer)
}

function onPointerDown(e: PointerEvent) {
  spawn(e.clientX, e.clientY)
}

onMounted(() => window.addEventListener('pointerdown', onPointerDown))

onBeforeUnmount(() => {
  window.removeEventListener('pointerdown', onPointerDown)
  timers.forEach((t) => clearTimeout(t))
  timers.clear()
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden="true">
    <span
      v-for="burst in bursts"
      :key="burst.id"
      class="burst"
      :style="{ left: `${burst.x}px`, top: `${burst.y}px` }"
    >
      <span class="ring" />
      <span
        v-for="(p, i) in burst.particles"
        :key="i"
        class="dot"
        :style="{
          '--angle': `${p.angle}deg`,
          '--distance': `${p.distance}px`,
          '--size': `${p.size}px`,
        }"
      />
    </span>
  </div>
</template>

<style scoped>
.burst {
  position: absolute;
  width: 0;
  height: 0;
}

.ring {
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  margin: -9px 0 0 -9px;
  border: 2px solid var(--t-accent);
  border-radius: 9999px;
  animation: ring 0.52s ease-out forwards;
}

.dot {
  position: absolute;
  left: 0;
  top: 0;
  width: var(--size);
  height: var(--size);
  margin: calc(var(--size) / -2) 0 0 calc(var(--size) / -2);
  border-radius: 9999px;
  background: var(--t-accent);
  animation: fly 0.58s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
}

@keyframes ring {
  from {
    opacity: 0.8;
    transform: scale(0.4);
  }
  to {
    opacity: 0;
    transform: scale(2.8);
  }
}

@keyframes fly {
  from {
    opacity: 1;
    transform: rotate(var(--angle)) translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: rotate(var(--angle)) translateX(var(--distance)) scale(0.3);
  }
}
</style>
