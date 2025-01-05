<template>
  <div class="relative min-h-screen">
    <ScrollProgress />
    <BackToTop />

    <!-- 背景動畫 -->
    <div class="fixed inset-0 bg-background overflow-hidden">
      <div ref="gradientBg" class="absolute inset-0 opacity-30"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,235,255,0.1),transparent_50%)]"></div>
      <!-- 視差背景 -->
      <div ref="parallaxBg" class="absolute inset-0 opacity-10">
        <div v-for="n in 50" :key="n" 
             class="absolute w-1 h-1 bg-primary rounded-full transform hover:scale-150 transition-transform"
             :style="{ 
               left: Math.random() * 100 + '%', 
               top: Math.random() * 100 + '%',
               animationDelay: Math.random() * 2 + 's'
             }"
             :class="n % 2 === 0 ? 'animate-float-slow' : 'animate-float-slower'">
        </div>
      </div>
    </div>

    <!-- 主要內容 -->
    <div class="relative">
      <!-- Hero 區塊 -->
      <section class="min-h-[90vh] flex items-center justify-center px-4">
        <div class="container mx-auto text-center">
          <div class="space-y-6" data-aos="fade-up">
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-glow">
              <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                創意網頁開發
              </span>
            </h1>
            <p class="text-xl md:text-2xl text-gray-300 mb-8">打造令人驚嘆的數位體驗</p>
            <div class="flex flex-wrap justify-center gap-4">
              <a href="#works" 
                 class="btn btn-primary group"
                 @click="smoothScroll('#works')">
                查看作品
                <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
              </a>
              <a href="#contact" 
                 class="btn btn-outline group"
                 @click="smoothScroll('#contact')">
                聯絡我
                <i class="fas fa-envelope ml-2 group-hover:animate-bounce"></i>
              </a>
            </div>
          </div>
          
          <!-- 技術標籤 -->
          <div class="mt-16 flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
            <div v-for="tech in technologies" :key="tech"
                 class="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 backdrop-blur-sm
                        hover:bg-white/10 hover:scale-110 transition-all duration-300
                        cursor-pointer"
                 @click="handleTechClick(tech)">
              {{ tech }}
            </div>
          </div>

          <!-- 向下滾動提示 -->
          <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <i class="fas fa-chevron-down text-primary text-2xl"></i>
          </div>
        </div>
      </section>

      <!-- 工作經驗 -->
      <section class="py-20 px-4" data-aos="fade-up">
        <div class="container mx-auto max-w-4xl">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
            <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              工作經驗
            </span>
          </h2>
          <ExperienceTimeline />
        </div>
      </section>

      <!-- 精選作品 -->
      <section id="works" class="py-20 px-4 bg-black/30" data-aos="fade-up">
        <div class="container mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
            <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              精選作品
            </span>
          </h2>
          <ProjectShowcase />
        </div>
      </section>

      <!-- 部落格區塊 -->
      <section class="py-20 px-4" data-aos="fade-up">
        <div class="container mx-auto max-w-6xl">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
            <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              最新文章
            </span>
          </h2>
          <BlogSection />
        </div>
      </section>

      <!-- 聯絡區塊 -->
      <section id="contact" class="py-20 px-4 bg-black/30" data-aos="fade-up">
        <div class="container mx-auto max-w-4xl">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
            <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              與我聯繫
            </span>
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white/5 rounded-xl p-8" data-aos="fade-right">
              <h3 class="text-xl font-semibold mb-4">社群媒體</h3>
              <SocialLinks />
            </div>
            
            <div class="bg-white/5 rounded-xl p-8" data-aos="fade-left">
              <h3 class="text-xl font-semibold mb-4">合作提案</h3>
              <p class="text-gray-400 mb-6">
                如果您有任何合作想法或專案需求，歡迎與我聯繫。我很樂意討論如何為您的項目帶來獨特的解決方案。
              </p>
              <a href="mailto:contact@example.com" 
                 class="inline-flex items-center btn btn-primary">
                <i class="fas fa-envelope mr-2"></i>
                發送郵件
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AOS from 'aos'
import 'aos/dist/aos.css'

import ExperienceTimeline from '../components/home/ExperienceTimeline.vue'
import ProjectShowcase from '../components/home/ProjectShowcase.vue'
import BlogSection from '../components/home/BlogSection.vue'
import SocialLinks from '../components/home/SocialLinks.vue'
import ScrollProgress from '../components/common/ScrollProgress.vue'
import BackToTop from '../components/common/BackToTop.vue'

gsap.registerPlugin(ScrollTrigger)

const gradientBg = ref(null)
const parallaxBg = ref(null)

// 技術標籤
const technologies = [
  'Vue.js', 'React', 'TypeScript', 'Tailwind CSS', 'Three.js', 
  'WebGL', 'Canvas', 'GSAP', 'Web Audio API'
]

// 平滑滾動
const smoothScroll = (target) => {
  const element = document.querySelector(target)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

// 技術標籤點擊處理
const handleTechClick = (tech) => {
  // 這裡可以添加技術標籤的點擊效果，比如顯示相關作品或技術說明
  console.log(`Clicked: ${tech}`)
}

onMounted(() => {
  // 初始化 AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 50,
    easing: 'ease-out-cubic'
  })

  // 背景動畫
  const colors = ['#00ebff', '#ff00e5', '#00ff9d']
  const tl = gsap.timeline({ repeat: -1 })
  
  colors.forEach((color, index) => {
    const duration = 3
    const position = index * duration
    
    tl.to(gradientBg.value, {
      background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, ${color} 0%, transparent 50%)`,
      duration: duration,
      ease: 'none'
    }, position)
  })

  // 視差效果
  if (parallaxBg.value) {
    gsap.to(parallaxBg.value.children, {
      y: -100,
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: parallaxBg.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    })
  }

  // 頁面載入動畫
  gsap.from('.animate-glow', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out'
  })

  // 添加滾動監聽
  const sections = document.querySelectorAll('section')
  sections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      onEnter: () => {
        section.classList.add('active')
      }
    })
  })
})
</script>

<style scoped>
.btn {
  @apply inline-flex items-center px-6 py-3 rounded-full font-semibold 
         transition-all duration-300 transform hover:scale-105;
}

.btn-primary {
  @apply bg-primary text-background hover:bg-opacity-90;
}

.btn-outline {
  @apply border-2 border-primary text-primary hover:bg-primary hover:text-background;
}

/* 視差背景動畫 */
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(10px, -10px); }
}

@keyframes float-slower {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-15px, 15px); }
}

.animate-float-slow {
  animation: float-slow 4s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 6s ease-in-out infinite;
}

/* 區塊過渡效果 */
section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

section.active {
  opacity: 1;
  transform: translateY(0);
}

/* 滾動提示動畫 */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style> 