import type { FormatFunction } from '../types'

export const format: FormatFunction = {
  // 格式化日期
  date: (date: string) => {
    return new Date(date).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  },

  // 格式化數字
  number: (num: number) => {
    return new Intl.NumberFormat('zh-TW').format(num)
  }
} 