/**
 * Dashboard 布局组件
 * =============================================================================
 * 管理后台的主布局，包含侧边栏和主内容区
 * 所有 /dashboard/* 路由都使用此布局
 */

import { Sidebar } from '@/components/layout/sidebar'
import { Toaster } from '@/components/ui/sonner'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* 侧边栏 - 桌面端固定显示 */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* 主内容区 */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Toast 通知 */}
      <Toaster position="top-right" />
    </div>
  )
}

