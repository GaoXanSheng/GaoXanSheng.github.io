<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Hit {
  id: string
  href: string
  x: number
  y: number
  w: number
  h: number
}

const canvas = ref<HTMLCanvasElement | null>(null)
const video = ref<HTMLVideoElement | null>(null)

const RAMP = ' .:-=+*#%@'
const MONO = '"Cascadia Code", "JetBrains Mono", Consolas, monospace'

let ctx: CanvasRenderingContext2D | null = null
let sample: HTMLCanvasElement | null = null
let sctx: CanvasRenderingContext2D | null = null
let asciiCanvas: HTMLCanvasElement | null = null
let actx: CanvasRenderingContext2D | null = null

let width = 0
let height = 0
let dpr = 1
let cols = 0
let rows = 0
let cellW = 0
let cellH = 0
let offsetX = 0
let raf = 0
let running = false
let lastDraw = 0
let startAt = 0
let hovered: Hit | null = null
let hasPointer = false

const pointer = { x: -200, y: -200 }
const hits: Hit[] = []

function g() {
  return ctx as CanvasRenderingContext2D
}

function isReduced() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function resize() {
  const node = canvas.value
  if (!node) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = Math.max(320, node.clientWidth)
  height = Math.max(320, node.clientHeight)
  node.width = Math.round(width * dpr)
  node.height = Math.round(height * dpr)
  ctx = node.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)

  cellH = Math.max(10, Math.min(15, height / 64))
  cellW = cellH * 0.62
  rows = Math.floor(height / cellH)
  cols = Math.min(210, Math.floor(width / cellW))
  offsetX = (width - cols * cellW) / 2

  if (!sample) sample = document.createElement('canvas')
  sample.width = cols
  sample.height = rows
  sctx = sample.getContext('2d', { willReadFrequently: true })

  if (!asciiCanvas) asciiCanvas = document.createElement('canvas')
  asciiCanvas.width = Math.round(width * dpr)
  asciiCanvas.height = Math.round(height * dpr)
  actx = asciiCanvas.getContext('2d')
  actx?.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function hslToRgb(h: number, s: number, l: number) {
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))
  return [f(0), f(8), f(4)]
}

function drawChrome(now: number) {
  const reduce = isReduced()
  const intro = reduce ? 1 : Math.min(1, (now - startAt) / 900)
  const pad = width < 760 ? 20 : Math.min(96, width * 0.06)
  const top = width < 760 ? 34 : 46

  g().globalAlpha = intro
  g().fillStyle = 'rgba(246, 241, 233, 0.75)'
  g().font = `500 11px ${MONO}`
  g().textBaseline = 'alphabetic'
  g().fillText('YM', pad, top)

  const gh = 'GITHUB ↗'
  g().font = `500 10px ${MONO}`
  const ghW = g().measureText(gh).width
  hits.push({ id: 'github', href: 'https://github.com/GaoXanSheng', x: width - pad - ghW - 10, y: top - 16, w: ghW + 10, h: 24 })
  g().fillStyle = hovered?.id === 'github' ? '#ff3d6e' : 'rgba(246, 241, 233, 0.45)'
  g().textAlign = 'right'
  g().fillText(gh, width - pad, top)
  g().textAlign = 'left'

  const bottom = height - (width < 760 ? 26 : 38)
  g().strokeStyle = 'rgba(246, 241, 233, 0.16)'
  g().lineWidth = 1
  g().beginPath()
  g().moveTo(pad, bottom - 26)
  g().lineTo(width - pad, bottom - 26)
  g().stroke()

  const icp = '萌ICP备20230436号'
  g().font = `500 9px ${MONO}`
  const icpW = g().measureText(icp).width
  hits.push({ id: 'icp', href: 'https://icp.gov.moe/?keyword=20230436', x: pad - 4, y: bottom - 14, w: icpW + 8, h: 20 })
  g().fillStyle = hovered?.id === 'icp' ? '#ff3d6e' : 'rgba(246, 241, 233, 0.35)'
  g().fillText(icp, pad, bottom)

  g().fillStyle = 'rgba(246, 241, 233, 0.4)'
  g().font = `500 10px ${MONO}`
  g().textAlign = 'right'
  g().fillText('FIN', width - pad, bottom)
  g().textAlign = 'left'
  g().globalAlpha = 1
}

function drawFrame(now: number) {
  if (!ctx || !sctx || !actx || !asciiCanvas || !video.value) return
  if (video.value.readyState < 2) return

  const vw = video.value.videoWidth || 1920
  const vh = video.value.videoHeight || 1200
  const scale = Math.max((cols * cellW) / vw, (rows * cellH) / vh)
  const sw = (cols * cellW) / scale
  const sh = (rows * cellH) / scale
  const sx = (vw - sw) / 2
  const sy = (vh - sh) / 2

  sctx.drawImage(video.value, sx, sy, sw, sh, 0, 0, cols, rows)
  const data = sctx.getImageData(0, 0, cols, rows).data

  actx.clearRect(0, 0, width, height)
  actx.font = `500 ${cellH}px ${MONO}`
  actx.textBaseline = 'top'

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const i = (y * cols + x) * 4
      const r = data[i]!
      const gg = data[i + 1]!
      const b = data[i + 2]!
      const lum = (0.2126 * r + 0.7152 * gg + 0.0722 * b) / 255
      if (lum < 0.02) continue

      const level = Math.min(RAMP.length - 1, Math.floor(Math.pow(lum, 0.45) * RAMP.length))
      const char = RAMP[level]
      if (!char || char === ' ') continue

      const hue = (150 + (x / cols) * 180 + lum * 60) % 360
      const sat = 0.95
      const light = 0.5 + Math.min(0.26, lum * 0.5)
      const [cr, cg, cb] = hslToRgb(hue, sat, light).map((v) => v * 255) as [
        number,
        number,
        number,
      ]

      actx.fillStyle = `rgb(${cr | 0},${cg | 0},${cb | 0})`
      actx.fillText(char, offsetX + x * cellW, y * cellH)
    }
  }

  hits.length = 0

  g().clearRect(0, 0, width, height)
  g().drawImage(asciiCanvas, 0, 0, width, height)

  g().globalCompositeOperation = 'lighter'
  g().globalAlpha = 0.42
  g().filter = 'blur(7px)'
  g().drawImage(asciiCanvas, 0, 0, width, height)
  g().filter = 'none'
  g().globalAlpha = 1
  g().globalCompositeOperation = 'source-over'

  if (hasPointer) {
    const x = pointer.x
    const y = pointer.y
    const halo = g().createRadialGradient(x, y, 0, x, y, 180)
    halo.addColorStop(0, 'rgba(255, 61, 110, 0.18)')
    halo.addColorStop(0.45, 'rgba(126, 200, 242, 0.06)')
    halo.addColorStop(1, 'rgba(10, 10, 14, 0)')
    g().globalCompositeOperation = 'lighter'
    g().fillStyle = halo
    g().fillRect(x - 180, y - 180, 360, 360)
    g().globalCompositeOperation = 'source-over'

    g().strokeStyle = hovered ? '#ff3d6e' : 'rgba(246, 241, 233, 0.7)'
    g().lineWidth = 1
    g().beginPath()
    g().arc(x, y, hovered ? 15 : 7, 0, Math.PI * 2)
    g().stroke()
  }

  drawChrome(now)
}

function loop(now: number) {
  if (!running) return
  if (now - lastDraw >= 33) {
    lastDraw = now
    drawFrame(now)
  }
  raf = requestAnimationFrame(loop)
}

function hitAt(x: number, y: number) {
  for (let i = hits.length - 1; i >= 0; i -= 1) {
    const hit = hits[i]!
    if (x >= hit.x && x <= hit.x + hit.w && y >= hit.y && y <= hit.y + hit.h) return hit
  }
  return null
}

function updateHover() {
  const next = hitAt(pointer.x, pointer.y)
  hovered = next
  if (canvas.value) canvas.value.style.cursor = next ? 'pointer' : 'none'
}

function onPointerMove(event: PointerEvent) {
  const node = canvas.value
  if (!node) return
  const rect = node.getBoundingClientRect()
  pointer.x = event.clientX - rect.left
  pointer.y = event.clientY - rect.top
  hasPointer = event.pointerType !== 'touch'
  updateHover()
}

function onPointerDown(event: PointerEvent) {
  const node = canvas.value
  if (!node) return
  const rect = node.getBoundingClientRect()
  pointer.x = event.clientX - rect.left
  pointer.y = event.clientY - rect.top
  updateHover()
  if (!hovered) return
  window.open(hovered.href, '_blank', 'noopener')
}

function onPointerLeave() {
  hasPointer = false
  hovered = null
  if (canvas.value) canvas.value.style.cursor = 'none'
}

function start() {
  if (!video.value || running) return
  video.value.muted = true
  running = true
  startAt = performance.now()
  void video.value.play().catch(() => {})
  raf = requestAnimationFrame(loop)
}

function stop() {
  running = false
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}

function onVisibility() {
  if (document.hidden) stop()
  else start()
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointerleave', onPointerLeave)
  document.addEventListener('visibilitychange', onVisibility)
  start()
})

onBeforeUnmount(() => {
  stop()
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerdown', onPointerDown)
  window.removeEventListener('pointerleave', onPointerLeave)
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <div class="relative h-[100svh] w-full overflow-hidden bg-[#050507]">
    <video
      ref="video"
      src="/media/silhouette.mp4"
      class="pointer-events-none absolute h-px w-px opacity-0"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      aria-hidden="true"
    />
    <canvas ref="canvas" class="ascii-canvas h-full w-full" />
    <div class="scanlines" aria-hidden="true" />
    <div class="vignette" aria-hidden="true" />

    <nav class="sr-only">
      <a href="https://github.com/GaoXanSheng">GitHub</a>
      <a href="https://icp.gov.moe/?keyword=20230436">萌ICP备20230436号</a>
    </nav>
  </div>
</template>

<style scoped>
.ascii-canvas {
  display: block;
  cursor: none;
  touch-action: none;
}

.scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 0) 2px,
    rgba(0, 0, 0, 0.16) 3px,
    rgba(0, 0, 0, 0) 4px
  );
  mix-blend-mode: multiply;
}

.vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse at 50% 50%,
    transparent 42%,
    rgba(3, 3, 6, 0.55) 78%,
    rgba(3, 3, 6, 0.92) 100%
  );
}
</style>
