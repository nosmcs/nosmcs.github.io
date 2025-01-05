<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <article v-for="post in postList" 
             :key="post.id"
             class="group bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 
                    transition-all duration-300 transform hover:scale-[1.02]"
             data-aos="fade-up"
             :data-aos-delay="post.delay">
      <!-- 文章封面 -->
      <div class="relative aspect-video overflow-hidden">
        <img :src="post.cover" 
             :alt="post.title"
             class="w-full h-full object-cover transition-transform duration-500
                    group-hover:scale-110"
             loading="lazy">
        <!-- 分類標籤 -->
        <div class="absolute top-4 left-4">
          <span class="px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full text-sm">
            {{ post.category }}
          </span>
        </div>
        <!-- 閱讀時間 -->
        <div class="absolute bottom-4 right-4">
          <span class="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs">
            {{ post.readTime }} 分鐘閱讀
          </span>
        </div>
      </div>

      <!-- 文章內容 -->
      <div class="p-6">
        <div class="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <span class="flex items-center">
            <i class="far fa-calendar-alt mr-2"></i>
            {{ format.date(post.date) }}
          </span>
          <span class="flex items-center">
            <i class="far fa-eye mr-2"></i>
            {{ format.number(post.views) }} 次閱讀
          </span>
        </div>

        <h3 class="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {{ post.title }}
        </h3>
        
        <p class="text-gray-400 mb-6 line-clamp-3">{{ post.excerpt }}</p>

        <!-- 標籤 -->
        <div class="flex flex-wrap gap-2 mb-6">
          <span v-for="tag in post.tags" 
                :key="tag"
                class="px-2 py-1 bg-primary/20 rounded-full text-xs text-primary">
            #{{ tag }}
          </span>
        </div>

        <!-- 閱讀更多按鈕 -->
        <a :href="post.link"
           class="inline-flex items-center text-primary hover:text-primary/80 transition-colors group/link">
          閱讀更多
          <i class="fas fa-arrow-right ml-2 transform group-hover/link:translate-x-1 transition-transform"></i>
        </a>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { BlogPost } from '../../types'
import { blogPosts } from '../../constants'
import { format } from '../../utils/format'

const postList = ref<BlogPost[]>(blogPosts)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 