<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div v-for="project in projectList" 
         :key="project.title"
         class="group perspective"
         data-aos="fade-up"
         :data-aos-delay="project.delay">
      
      <!-- 3D 卡片 -->
      <div class="relative h-[400px] transform-gpu transition-all duration-500 
                  [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <!-- 卡片正面 -->
        <div class="absolute inset-0 [backface-visibility:hidden]">
          <div class="relative h-full overflow-hidden rounded-xl bg-white/5 p-6
                      transform transition-transform duration-500 hover:scale-[1.02]">
            <!-- 項目圖片 -->
            <div class="relative h-48 mb-6 overflow-hidden rounded-lg">
              <img :src="project.image" 
                   :alt="project.title"
                   class="h-full w-full object-cover transition-transform duration-500
                          group-hover:scale-110"
                   loading="lazy">
              <!-- 技術標籤 -->
              <div class="absolute bottom-2 left-2 flex flex-wrap gap-2">
                <span v-for="tech in project.technologies" 
                      :key="tech"
                      class="px-2 py-1 text-xs bg-background/80 backdrop-blur-sm rounded-full">
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold mb-3">{{ project.title }}</h3>
            <p class="text-gray-400">{{ project.description }}</p>
          </div>
        </div>

        <!-- 卡片背面 -->
        <div class="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div class="h-full rounded-xl bg-white/5 p-6">
            <h4 class="text-lg font-semibold mb-4">項目亮點</h4>
            <ul class="space-y-2 text-gray-400 mb-6">
              <li v-for="(highlight, index) in project.highlights" 
                  :key="index"
                  class="flex items-start">
                <i class="fas fa-check-circle text-primary mt-1 mr-2"></i>
                <span>{{ highlight }}</span>
              </li>
            </ul>

            <div class="absolute bottom-6 left-6 right-6">
              <div class="flex justify-between items-center">
                <!-- Demo 連結 -->
                <a v-if="project.demo" 
                   :href="project.demo"
                   target="_blank"
                   class="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
                  <i class="fas fa-external-link-alt mr-2"></i>
                  Live Demo
                </a>
                <!-- GitHub 連結 -->
                <a v-if="project.github" 
                   :href="project.github"
                   target="_blank"
                   class="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
                  <i class="fab fa-github mr-2"></i>
                  Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '../../types'
import { projects } from '../../constants'

const projectList = ref<Project[]>(projects)
</script>

<style scoped>
.perspective {
  perspective: 2000px;
}

.transform-gpu {
  transform: translate3d(0, 0, 0);
}
</style> 