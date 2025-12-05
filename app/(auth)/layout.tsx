/**
 * 认证页面布局
 * =============================================================================
 * 登录和注册页面使用的布局
 * 简洁的居中布局，带有品牌标识
 */

import { Bot } from 'lucide-react'
import Link from 'next/link'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/80" />

      {/* 头部 Logo */}
      <header className="relative z-10 flex h-16 items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">Bot Manager</span>
        </Link>
      </header>

      {/* 主内容 */}
      <main className="relative z-10 flex flex-1 items-center justify-center p-6">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="relative z-10 py-6 text-center text-sm text-slate-400">
        <p>© 2024 Social Bot Manager. All rights reserved.</p>
      </footer>
    </div>
  )
}

