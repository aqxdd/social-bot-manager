'use client'

/**
 * React Query Provider
 * =============================================================================
 * 为整个应用提供 React Query 的上下文
 * 用于管理服务端状态、缓存和数据获取
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

interface QueryProviderProps {
  children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  // 使用 useState 确保每个请求都有独立的 QueryClient 实例
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 数据过期时间（5分钟）
            staleTime: 60 * 1000 * 5,
            // 重试次数
            retry: 1,
            // 窗口聚焦时不自动重新获取
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

