/**
 * API 响应工具函数
 * =============================================================================
 * 提供统一的 API 响应格式和错误处理
 */

import { NextResponse } from 'next/server'

/**
 * API 响应格式
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: unknown
  }
  meta?: {
    page?: number
    pageSize?: number
    total?: number
    totalPages?: number
  }
}

/**
 * 成功响应
 * @param data 响应数据
 * @param meta 分页等元信息
 */
export function successResponse<T>(
  data: T,
  meta?: ApiResponse['meta'],
  status = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      meta,
    },
    { status }
  )
}

/**
 * 错误响应
 * @param code 错误代码
 * @param message 错误消息
 * @param status HTTP 状态码
 * @param details 错误详情
 */
export function errorResponse(
  code: string,
  message: string,
  status = 400,
  details?: unknown
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details,
      },
    },
    { status }
  )
}

/**
 * 常见错误响应
 */
export const ApiErrors = {
  // 认证错误
  unauthorized: () => 
    errorResponse('UNAUTHORIZED', '未授权访问，请先登录', 401),
  
  forbidden: () => 
    errorResponse('FORBIDDEN', '没有权限执行此操作', 403),
  
  // 资源错误
  notFound: (resource = '资源') => 
    errorResponse('NOT_FOUND', `${resource}不存在`, 404),
  
  // 请求错误
  badRequest: (message = '请求参数错误') => 
    errorResponse('BAD_REQUEST', message, 400),
  
  validationError: (details: unknown) => 
    errorResponse('VALIDATION_ERROR', '数据验证失败', 400, details),
  
  // 服务器错误
  internal: (message = '服务器内部错误') => 
    errorResponse('INTERNAL_ERROR', message, 500),
  
  // API 限制
  rateLimited: () => 
    errorResponse('RATE_LIMITED', 'API 请求次数超限，请稍后重试', 429),
  
  // API Key 错误
  invalidApiKey: () => 
    errorResponse('INVALID_API_KEY', 'API 密钥无效或已过期', 401),
}

/**
 * 包装异步处理函数，统一错误处理
 */
export function withErrorHandler<T>(
  handler: () => Promise<NextResponse<ApiResponse<T>>>
): Promise<NextResponse<ApiResponse<T>>> {
  return handler().catch((error) => {
    console.error('API Error:', error)
    return ApiErrors.internal(
      process.env.NODE_ENV === 'development' ? error.message : undefined
    ) as NextResponse<ApiResponse<T>>
  })
}

