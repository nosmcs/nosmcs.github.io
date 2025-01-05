<template>
  <div class="min-h-screen bg-background text-white font-orbitron">
    <!-- 導航欄 -->
    <nav class="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <img src="/author-info/favicon/favicon-32x32.png" alt="nos logo" class="w-8 h-8">
          <span class="text-xl font-bold text-primary">nos</span>
        </div>
        <div class="flex space-x-6">
          <router-link to="/" class="hover:text-primary transition-colors">首頁</router-link>
          <router-link to="/works" class="hover:text-primary transition-colors">作品</router-link>
          <router-link to="/about" class="hover:text-primary transition-colors">關於</router-link>
        </div>
      </div>
    </nav>

    <!-- 主要內容 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- 頁腳 -->
    <footer class="bg-background/80 backdrop-blur-md py-6 mt-20">
      <div class="container mx-auto px-4">
        <div class="flex flex-col items-center space-y-4">
          <div class="flex space-x-4">
            <a href="https://discord.gg/Pah6vw36Tw" target="_blank" rel="noopener noreferrer" 
               class="text-white hover:text-primary transition-colors">
              <i class="fab fa-discord text-xl"></i>
            </a>
            <a href="https://www.youtube.com/@n_os_" target="_blank" rel="noopener noreferrer"
               class="text-white hover:text-primary transition-colors">
              <i class="fab fa-youtube text-xl"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
               class="text-white hover:text-primary transition-colors">
              <i class="fab fa-instagram text-xl"></i>
            </a>
          </div>
          <div class="text-sm text-gray-400">
            © 2025 nos. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // 添加頁面切換動畫
  router.beforeEach((to, from, next) => {
    document.body.classList.add('page-transitioning')
    next()
  })

  router.afterEach(() => {
    setTimeout(() => {
      document.body.classList.remove('page-transitioning')
    }, 300)
  })
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.page-transitioning {
  overflow: hidden;
}

@tailwind base;
@tailwind components;
@tailwind utilities;
</style> 