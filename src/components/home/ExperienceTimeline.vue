<template>
  <div class="relative">
    <!-- 時間軸線 -->
    <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-primary/50"></div>

    <!-- 經驗項目 -->
    <div class="space-y-16">
      <div v-for="(exp, index) in experienceList" 
           :key="exp.year"
           class="relative"
           :class="index % 2 === 0 ? 'text-right pr-12 md:pr-24' : 'text-left pl-12 md:pl-24'"
           :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'">
        
        <!-- 時間點 -->
        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4">
          <div class="absolute inset-0 bg-primary rounded-full animate-ping opacity-25"></div>
          <div class="relative w-4 h-4 bg-primary rounded-full"></div>
        </div>

        <!-- 內容 -->
        <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300
                    transform hover:scale-[1.02] cursor-pointer"
             @click="toggleDetails(index)">
          <div class="text-xl font-bold text-primary mb-2">{{ exp.year }}</div>
          <h3 class="text-xl font-semibold mb-3">{{ exp.title }}</h3>
          <p class="text-gray-400 mb-4" v-if="exp.showDetails || !exp.details">{{ exp.description }}</p>
          <p class="text-gray-400 mb-4" v-if="exp.showDetails && exp.details">{{ exp.details }}</p>
          
          <!-- 技能標籤 -->
          <div class="flex flex-wrap gap-2" :class="index % 2 === 0 ? 'justify-end' : 'justify-start'">
            <span v-for="skill in exp.skills" 
                  :key="skill"
                  class="px-3 py-1 bg-primary/20 rounded-full text-sm text-primary">
              {{ skill }}
            </span>
          </div>

          <!-- 展開/收起按鈕 -->
          <button v-if="exp.details"
                  class="mt-4 text-sm text-primary/80 hover:text-primary transition-colors"
                  @click.stop="toggleDetails(index)">
            {{ exp.showDetails ? '收起' : '展開更多' }}
            <i class="fas" :class="exp.showDetails ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Experience } from '../../types'
import { experiences } from '../../constants'

const experienceList = ref<Experience[]>(experiences)

const toggleDetails = (index: number): void => {
  experienceList.value[index].showDetails = !experienceList.value[index].showDetails
}
</script>

<style scoped>
.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style> 