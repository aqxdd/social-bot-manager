'use client'

/**
 * 侧边栏导航组件
 * =============================================================================
 * 管理后台的主导航侧边栏，包含：
 * - Logo 和品牌标识
 * - 主导航菜单
 * - 用户信息和快捷操作
 */

import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Smartphone,
  Bot,
  FileText,
  Send,
  TrendingUp,
  Settings,
  Key,
  BookOpen,
  LogOut,
  ChevronLeft,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'

/**
 * 导航菜单项配置
 */
const navigationItems = [
  {
    title: '概览',
    items: [
      {
        name: '仪表板',
        href: '/dashboard',
        icon: LayoutDashboard,
        description: '查看系统整体状态',
      },
    ],
  },
  {
    title: '设备管理',
    items: [
      {
        name: '设备列表',
        href: '/dashboard/devices',
        icon: Smartphone,
        description: '管理运行设备',
      },
      {
        name: '机器人账号',
        href: '/dashboard/bots',
        icon: Bot,
        description: '管理社交媒体账号',
      },
    ],
  },
  {
    title: '内容管理',
    items: [
      {
        name: '内容库',
        href: '/dashboard/contents',
        icon: FileText,
        description: '管理待发布内容',
      },
      {
        name: 'AI 生成',
        href: '/dashboard/ai-generate',
        icon: Sparkles,
        description: 'AI 辅助内容创作',
      },
      {
        name: '发布管理',
        href: '/dashboard/posts',
        icon: Send,
        description: '管理已发布和待发布帖子',
      },
    ],
  },
  {
    title: '数据分析',
    items: [
      {
        name: '热点趋势',
        href: '/dashboard/trends',
        icon: TrendingUp,
        description: '查看热点数据',
      },
    ],
  },
  {
    title: '系统',
    items: [
      {
        name: '设置',
        href: '/dashboard/settings',
        icon: Settings,
        description: '系统配置',
      },
      {
        name: 'API 密钥',
        href: '/dashboard/api-keys',
        icon: Key,
        description: '管理 API 访问',
      },
      {
        name: 'API 文档',
        href: '/docs',
        icon: BookOpen,
        description: '查看 API 文档',
      },
    ],
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Logo 和品牌 */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Bot Manager</span>
          </Link>
        )}
        {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn('h-8 w-8', collapsed && 'hidden')}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 overflow-y-auto p-3">
        {navigationItems.map((section) => (
          <div key={section.title} className="mb-4">
            {!collapsed && (
              <h3 className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                      )}
                      title={collapsed ? item.name : undefined}
                    >
                      <item.icon className={cn('h-4 w-4 shrink-0', isActive && 'text-primary')} />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* 用户信息 */}
      <div className="border-t border-border p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 px-3',
                collapsed && 'justify-center px-0'
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="用户头像" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  U
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">用户</p>
                  <p className="text-xs text-muted-foreground">user@example.com</p>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>我的账户</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                设置
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}

