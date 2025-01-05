import type { Experience, Project, BlogPost } from '../types'

// 工作經驗數據
export const experiences: Experience[] = [
  {
    year: '2023',
    title: '資深前端工程師',
    description: '負責大型企業級應用的前端架構設計與開發',
    details: '主導團隊採用最新的前端技術棧，包括 Vue 3、TypeScript 和 Tailwind CSS。優化了應用性能，提升了 50% 的加載速度。同時指導初級開發者，提高團隊整體技術水平。',
    skills: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Performance Optimization'],
    showDetails: false
  },
  {
    year: '2022',
    title: '前端技術顧問',
    description: '為多個創業團隊提供技術諮詢和解決方案',
    details: '協助客戶進行技術選型，制定前端開發規範，並為團隊提供技術培訓。成功幫助三個項目在預算內按時上線。',
    skills: ['Technical Architecture', 'Team Training', 'Project Management'],
    showDetails: false
  },
  {
    year: '2021',
    title: '全端開發工程師',
    description: '負責電商平台的全棧開發與維護',
    details: '使用 Next.js 和 Node.js 開發高性能的電商平台，實現了完整的支付流程和庫存管理系統。成功處理高併發場景，支持每日百萬級訪問量。',
    skills: ['Next.js', 'Node.js', 'MongoDB', 'Redis'],
    showDetails: false
  }
]

// 專案展示數據
export const projects: Project[] = [
  {
    title: '智能客服系統',
    description: '基於 AI 的智能客服平台，提供 24/7 自動化客戶支援服務',
    image: '/images/projects/chatbot.jpg',
    technologies: ['Vue 3', 'OpenAI API', 'WebSocket'],
    highlights: [
      '整合 GPT-4 API 實現智能對話',
      '支援多語言即時翻譯',
      '客服效率提升 300%',
      '使用者滿意度達 95%'
    ],
    demo: 'https://demo.example.com/chatbot',
    github: 'https://github.com/username/chatbot',
    delay: 0
  },
  {
    title: '3D 產品展示平台',
    description: '互動式 3D 產品展示和定制平台，支援實時渲染和材質更換',
    image: '/images/projects/3d-showcase.jpg',
    technologies: ['Three.js', 'React', 'WebGL'],
    highlights: [
      '實時 3D 渲染和光影效果',
      '支援手勢操作和 VR 預覽',
      '產品銷售轉化率提升 50%',
      '加載時間優化至 2 秒內'
    ],
    demo: 'https://demo.example.com/3d-showcase',
    github: 'https://github.com/username/3d-showcase',
    delay: 100
  },
  {
    title: '音樂創作平台',
    description: '線上音樂創作和協作平台，支援實時合作和音軌混音',
    image: '/images/projects/music-platform.jpg',
    technologies: ['Web Audio API', 'Vue.js', 'WebRTC'],
    highlights: [
      '專業級音頻處理引擎',
      '多人實時協作功能',
      '支援 MIDI 設備連接',
      '作品發布一鍵分享'
    ],
    demo: 'https://demo.example.com/music-platform',
    github: 'https://github.com/username/music-platform',
    delay: 200
  }
]

// 部落格文章數據
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '現代前端開發工具鏈：提升開發效率的最佳實踐',
    excerpt: '探討現代前端開發中常用的工具和技術，包括打包工具、代碼檢查、自動化測試等，幫助開發者建立高效的開發流程。',
    cover: '/images/blog/modern-frontend.jpg',
    date: '2024-01-15',
    category: '前端開發',
    tags: ['Webpack', 'Vite', 'ESLint', 'Jest'],
    readTime: 8,
    views: 1234,
    link: '/blog/modern-frontend-toolchain',
    delay: 0
  },
  {
    id: 2,
    title: 'Web 動畫優化：實現流暢的用戶體驗',
    excerpt: '深入探討 Web 動畫的性能優化技巧，從 CSS 動畫到 JavaScript 動畫，以及如何避免常見的性能陷阱。',
    cover: '/images/blog/web-animation.jpg',
    date: '2024-01-10',
    category: '性能優化',
    tags: ['Animation', 'Performance', 'GSAP', 'CSS'],
    readTime: 6,
    views: 2345,
    link: '/blog/web-animation-optimization',
    delay: 100
  },
  {
    id: 3,
    title: '構建可擴展的前端架構：從單體到微前端',
    excerpt: '分享前端架構的演進過程，探討如何根據項目規模選擇合適的架構方案，以及微前端的實踐經驗。',
    cover: '/images/blog/frontend-architecture.jpg',
    date: '2024-01-05',
    category: '架構設計',
    tags: ['Architecture', 'Micro-Frontend', 'Monorepo'],
    readTime: 10,
    views: 3456,
    link: '/blog/scalable-frontend-architecture',
    delay: 200
  }
] 