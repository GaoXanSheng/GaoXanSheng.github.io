<script setup lang="ts">
import SectionShell from '@/components/SectionShell.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import Reveal from '@/components/Reveal.vue'
import { projects } from '@/data/projects'
</script>

<template>
  <SectionShell id="projects" title="历史开发记录" subtitle="新的在上面，老的往下翻">
    <Reveal>
      <blockquote class="mb-8 border-l-2 border-line pl-5 text-sm leading-6 text-muted">
        <p>
          你说得对，但是《JavaScript》是由 ECMA
          自主研发的一款经典函数优先编程语言。代码执行在一个被称作「解释器」的交互环境，在这里，
          被老板选中的员工将被授予「计算机」，导引代码之力。你将扮演一位名为「开发者」的神秘角色，
          在自由的编程中邂逅表现各异、来源不明的 Bug 们，和它们一起开发网页，找回拖欠的工资——
          同时，逐步发掘「Web」的真相。
        </p>
      </blockquote>
    </Reveal>

    <div class="grid gap-4 min-[700px]:grid-cols-2">
      <ProjectCard v-for="project in projects" :key="project.url" :project="project" />
    </div>

    <Reveal :delay="0.08">
      <div class="mt-6 rounded-card border border-line bg-surface p-5">
        <h3 class="font-display text-base font-bold">还有些别的</h3>
        <p class="mt-2 text-sm leading-6 text-muted">
          <a
            href="https://github.com/GaoXanSheng?tab=repositories"
            target="_blank"
            rel="noreferrer"
            class="text-accent underline decoration-dotted underline-offset-4"
            >GitHub</a
          >
        </p>
      </div>
    </Reveal>
  </SectionShell>
</template>
