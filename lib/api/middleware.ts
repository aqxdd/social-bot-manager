/**
 * API 中间件
 * =============================================================================
 * 提供 API 认证、权限检查等中间件功能
 */

import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth/auth'
import { headers } from 'next/headers'
import { ApiErrors } from './response'

/**
 * 获取当前会话（服务端）
 */
export async function getServerSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}

/**
 * 验证用户登录状态
 * 返回用户信息或 null
 */
export async function requireAuth() {
  const session = await getServerSession()
  
  if (!session?.user) {
    return { user: null, error: ApiErrors.unauthorized() }
  }
  
  return { user: session.user, error: null }
}

/**
 * 验证 API Key
 * 用于外部 API 调用
 */
export async function validateApiKey(request: NextRequest) {
  const apiKey = request.headers.get('X-API-Key') || 
                 request.headers.get('Authorization')?.replace('Bearer ', '')
  
  if (!apiKey) {
    return { valid: false, error: ApiErrors.invalidApiKey() }
  }
  
  // TODO: 从数据库验证 API Key
  // const keyRecord = await prisma.apiKey.findUnique({
  //   where: { key: hashApiKey(apiKey) },
  //   include: { user: true }
  // })
  
  // if (!keyRecord || !keyRecord.isActive) {
  //   return { valid: false, error: ApiErrors.invalidApiKey() }
  // }
  
  // if (keyRecord.expiresAt && keyRecord.expiresAt < new Date()) {
  //   return { valid: false, error: ApiErrors.invalidApiKey() }
  // }
  
  // 临时返回有效（开发阶段）
  return { valid: true, error: null, userId: null }
}

/**
 * 解析分页参数
 */
export function parsePagination(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get('pageSize') || '20')))
  
  return {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
    take: pageSize,
  }
}

/**
 * 解析排序参数
 */
export function parseSorting(
  request: NextRequest,
  allowedFields: string[],
  defaultField = 'createdAt',
  defaultOrder: 'asc' | 'desc' = 'desc'
) {
  const searchParams = request.nextUrl.searchParams
  
  let sortBy = searchParams.get('sortBy') || defaultField
  const sortOrder = (searchParams.get('sortOrder') || defaultOrder) as 'asc' | 'desc'
  
  // 验证排序字段
  if (!allowedFields.includes(sortBy)) {
    sortBy = defaultField
  }
  
  return {
    orderBy: {
      [sortBy]: sortOrder,
    },
  }
}

