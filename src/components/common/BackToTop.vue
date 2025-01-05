<template>
  <button v-show="showButton"
          @click="scrollToTop"
          class="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary/20 backdrop-blur-sm
                 hover:bg-primary/30 transition-all duration-300 transform hover:scale-110
                 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                 focus:ring-offset-background group"
          aria-label="返回頂部">
    <i class="fas fa-arrow-up text-primary text-xl
              group-hover:animate-bounce"></i>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)

const checkScroll = () => {
  showButton.value = window.scrollY > window.innerHeight / 2
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script> 