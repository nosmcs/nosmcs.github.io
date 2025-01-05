<template>
  <div class="fixed top-0 left-0 w-full h-1 z-50">
    <div ref="progressBar" 
         class="h-full bg-gradient-to-r from-primary to-secondary transform origin-left"
         :style="{ transform: `scaleX(${progress})` }">
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)
const progressBar = ref(null)

const updateProgress = () => {
  const winScroll = window.scrollY
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  progress.value = height > 0 ? winScroll / height : 0
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<style scoped>
.bg-gradient-to-r {
  transition: transform 0.1s ease-out;
}
</style> 