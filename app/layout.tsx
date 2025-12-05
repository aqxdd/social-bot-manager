/**
 * 根布局组件
 * =============================================================================
 * 应用的最顶层布局，包含全局样式和 Provider
 */

import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/components/providers/query-provider'

// 使用 Inter 作为主字体，更现代的设计
const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})

// 使用 JetBrains Mono 作为代码字体
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Social Bot Manager - 社交媒体机器人管理系统',
  description: '批量管理社交媒体机器人，AI 辅助内容创作，自动化发布，实时追踪热点趋势。',
  keywords: ['社交媒体', '机器人', '自动化', 'AI', '内容管理'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
