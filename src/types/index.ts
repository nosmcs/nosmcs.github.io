// 工作經驗類型
export interface Experience {
  year: string
  title: string
  description: string
  details?: string
  skills: string[]
  showDetails?: boolean
}

// 專案類型
export interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  highlights: string[]
  demo?: string
  github?: string
  delay?: number
}

// 部落格文章類型
export interface BlogPost {
  id: number
  title: string
  excerpt: string
  cover: string
  date: string
  category: string
  tags: string[]
  readTime: number
  views: number
  link: string
  delay?: number
}

// 共用的格式化函數類型
export type FormatFunction = {
  date: (date: string) => string
  number: (num: number) => string
}

// 共用的動畫延遲類型
export type AnimationDelay = 0 | 100 | 200 