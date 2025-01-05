<template>
  <div class="container mx-auto px-4 pt-32">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-12">
        <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          關於我
        </span>
      </h1>

      <!-- 個人介紹 -->
      <div class="prose prose-invert mx-auto">
        <div class="bg-white/5 rounded-lg p-6 mb-8">
          <p class="text-lg leading-relaxed mb-4">
            我是一名充滿熱情的網頁開發者，專注於創造獨特的互動體驗。每個項目都是一次新的冒險，
            我致力於將創意轉化為令人印象深刻的數位作品。
          </p>
          <p class="text-lg leading-relaxed">
            我相信技術與藝術的完美結合，能夠創造出令人驚嘆的網頁體驗。通過不斷學習和探索新技術，
            我期待能為網路世界帶來更多創新和驚喜。
          </p>
        </div>

        <!-- 技能卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div class="bg-white/5 rounded-lg p-6">
            <h3 class="text-xl font-semibold text-primary mb-4">前端開發</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <i class="fas fa-check text-primary mr-2"></i>
                <span>Vue.js / React</span>
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-primary mr-2"></i>
                <span>Tailwind CSS</span>
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-primary mr-2"></i>
                <span>JavaScript / TypeScript</span>
              </li>
            </ul>
          </div>

          <div class="bg-white/5 rounded-lg p-6">
            <h3 class="text-xl font-semibold text-primary mb-4">創意技術</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <i class="fas fa-check text-primary mr-2"></i>
                <span>Canvas 動畫</span>
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-primary mr-2"></i>
                <span>WebGL / Three.js</span>
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-primary mr-2"></i>
                <span>Web Audio API</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 聯繫方式 -->
        <div class="text-center">
          <h3 class="text-2xl font-semibold text-primary mb-6">與我聯繫</h3>
          <div class="flex justify-center space-x-6">
            <a href="https://discord.gg/Pah6vw36Tw" target="_blank" rel="noopener noreferrer"
               class="text-white hover:text-primary transition-colors">
              <i class="fab fa-discord text-2xl"></i>
            </a>
            <a href="https://www.youtube.com/@n_os_" target="_blank" rel="noopener noreferrer"
               class="text-white hover:text-primary transition-colors">
              <i class="fab fa-youtube text-2xl"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
               class="text-white hover:text-primary transition-colors">
              <i class="fab fa-instagram text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 