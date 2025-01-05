<template>
  <div class="container mx-auto px-4 pt-32">
    <h1 class="text-4xl font-bold text-center mb-12">
      <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        精選作品
      </span>
    </h1>

    <!-- 作品網格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="work in works" :key="work.id"
           class="group relative overflow-hidden rounded-lg bg-white/5 p-4 transition-all hover:scale-105">
        <img :src="work.preview" :alt="work.title" class="w-full h-48 object-cover rounded-lg">
        <div class="mt-4">
          <h3 class="text-xl font-semibold text-primary">{{ work.title }}</h3>
          <p class="text-gray-400">{{ work.description }}</p>
          <div class="mt-4 flex gap-2">
            <span v-for="tech in work.technologies" :key="tech"
                  class="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
              {{ tech }}
            </span>
          </div>
        </div>
        <a :href="work.link" target="_blank" rel="noopener noreferrer"
           class="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity">
          <span class="btn btn-primary">查看作品</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const works = ref([
  {
    id: 1,
    title: '色彩漩渦',
    description: '互動式音樂視覺體驗',
    preview: 'fun/color-vortex/preview.jpg',
    link: 'fun/color-vortex/index.html',
    technologies: ['Canvas', 'Web Audio API', 'GSAP']
  },
  {
    id: 2,
    title: '數字時鐘',
    description: '現代風格的數字時鐘設計',
    preview: '/fun/clock/assets/preview.jpg',
    link: '/fun/clock/index.html',
    technologies: ['JavaScript', 'CSS Animation']
  },
  {
    id: 3,
    title: '新年倒數',
    description: '2025新年倒數計時器',
    preview: '/fun/2025/assets/preview.jpg',
    link: '/fun/2025/index.html',
    technologies: ['Vue.js', 'GSAP', 'Tailwind CSS']
  }
])
</script> 