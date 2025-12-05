/**
 * Better-Auth API 路由处理器
 * =============================================================================
 * 这个文件处理所有 /api/auth/* 的认证请求
 * 包括登录、注册、会话管理等
 */

import { auth } from '@/lib/auth/auth'
import { toNextJsHandler } from 'better-auth/next-js'

/**
 * 将 better-auth 的处理器转换为 Next.js App Router 兼容的格式
 * 处理 GET 和 POST 请求
 */
export const { GET, POST } = toNextJsHandler(auth)

