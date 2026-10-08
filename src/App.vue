<script setup lang="ts">
import { ref } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import SiteEpigraph from '@/components/SiteEpigraph.vue'
import ReflectionSection from '@/components/ReflectionSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import OldSiteSection from '@/components/OldSiteSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import ThemePanel from '@/components/ThemePanel.vue'
import ClickEffect from '@/components/ClickEffect.vue'

const themePanelOpen = ref(false)
</script>

<template>
  <div class="orb orb-a" aria-hidden="true" />
  <div class="orb orb-b" aria-hidden="true" />

  <SiteHeader @open-themes="themePanelOpen = true" />

  <main class="relative z-10">
    <HeroSection />
    <SiteEpigraph />
    <ReflectionSection />
    <ProjectsSection />
    <OldSiteSection />
  </main>

  <SiteFooter @open-themes="themePanelOpen = true" />

  <ThemePanel :open="themePanelOpen" @close="themePanelOpen = false" />

  <ClickEffect />
</template>
