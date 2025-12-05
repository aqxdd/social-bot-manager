/**
 * 首页 - Landing Page
 * =============================================================================
 * 产品展示页面，介绍系统功能和特性
 */

import Link from 'next/link'
import { Bot, Smartphone, Sparkles, Send, TrendingUp, Shield, Zap, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * 功能特性列表
 */
const features = [
  {
    icon: Smartphone,
    title: '多设备管理',
    description: '支持 iOS、Android、桌面端等多种设备类型，集中管理所有运行机器人的设备。',
  },
  {
    icon: Bot,
    title: '社交账号管理',
    description: '统一管理 Twitter、Instagram、微博、小红书等主流社交平台账号。',
  },
  {
    icon: Sparkles,
    title: 'AI 内容生成',
    description: '集成 AI 能力，通过提示词自动生成高质量的社交媒体内容。',
  },
  {
    icon: Send,
    title: '自动发布',
    description: '支持定时发布、批量发布，自动化管理内容发布流程。',
  },
  {
    icon: TrendingUp,
    title: '热点追踪',
    description: '实时收集各平台热点话题，帮助您把握内容创作方向。',
  },
  {
    icon: Shield,
    title: '安全可靠',
    description: '安全的登录状态管理，数据加密存储，保护账号安全。',
  },
]

/**
 * 技术栈展示
 */
const techStack = [
  'Next.js 16',
  'React 19',
  'TypeScript',
  'Prisma',
  'PostgreSQL',
  'TailwindCSS',
  'Better Auth',
  'BullMQ',
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* 背景网格 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* 导航 */}
      <header className="relative z-10 border-b border-white/10">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Bot Manager</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/docs" className="text-sm text-slate-300 hover:text-white transition-colors">
              API 文档
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
                登录
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                开始使用
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero 区域 */}
      <section className="relative z-10 container mx-auto px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
            <Zap className="h-4 w-4" />
            <span>全新一代社交媒体自动化平台</span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              批量管理
            </span>
            <br />
            社交媒体机器人
          </h1>
          
          <p className="mb-10 text-lg text-slate-400 md:text-xl max-w-2xl mx-auto">
            一站式管理多平台社交账号，AI 辅助内容创作，自动化发布，
            实时追踪热点趋势。让社交媒体运营更加高效。
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 h-12 px-8">
                免费开始
                <Bot className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-white/10 h-12 px-8">
                查看文档
                <Globe className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* 仪表板预览 */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
          <div className="rounded-2xl border border-white/10 bg-slate-800/50 backdrop-blur-sm p-2 shadow-2xl shadow-indigo-500/10">
            <div className="rounded-xl bg-slate-900 p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-4 text-sm text-slate-500">Bot Manager Dashboard</span>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: '在线设备', value: '12', color: 'text-green-400' },
                  { label: '机器人账号', value: '48', color: 'text-blue-400' },
                  { label: '待发布内容', value: '156', color: 'text-yellow-400' },
                  { label: '今日发布', value: '89', color: 'text-purple-400' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg bg-slate-800 p-4">
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特性 */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">强大的功能</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            为社交媒体运营而设计，提供完整的自动化解决方案
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-slate-700/50 bg-slate-800/30 backdrop-blur hover:bg-slate-800/50 transition-colors">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                  <feature.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
                <CardDescription className="text-slate-400">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* 技术栈 */}
      <section className="relative z-10 container mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <p className="text-sm text-slate-500 uppercase tracking-wider">技术驱动</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <Card className="border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              准备开始自动化您的社交媒体运营了吗？
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              立即注册，体验 AI 驱动的社交媒体管理平台
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                免费开始使用
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* 页脚 */}
      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-slate-500">
          <p>© 2024 Social Bot Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
