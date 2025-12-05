/**
 * 社交机器人 API 路由
 * =============================================================================
 * 提供机器人账号的 CRUD 操作接口
 * 
 * GET    /api/v1/bots     - 获取机器人列表
 * POST   /api/v1/bots     - 创建新机器人
 */

import { NextRequest } from 'next/server'
import { z } from 'zod'
import { 
  successResponse, 
  ApiErrors, 
  withErrorHandler 
} from '@/lib/api/response'
import { 
  requireAuth, 
  parsePagination, 
  parseSorting 
} from '@/lib/api/middleware'

/**
 * 社交平台枚举
 */
const SocialPlatformEnum = z.enum([
  'TWITTER',
  'INSTAGRAM', 
  'FACEBOOK',
  'TIKTOK',
  'LINKEDIN',
  'YOUTUBE',
  'WEIBO',
  'WECHAT',
  'XIAOHONGSHU',
  'DOUYIN',
  'OTHER',
])

/**
 * 创建机器人的验证规则
 */
const createBotSchema = z.object({
  name: z.string().min(1, '名称不能为空').max(100),
  platform: SocialPlatformEnum,
  username: z.string().optional(),
  displayName: z.string().optional(),
  deviceId: z.string().optional(),
})

/**
 * GET /api/v1/bots
 * 获取机器人列表
 */
export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const { user, error } = await requireAuth()
    if (error) return error
    
    const pagination = parsePagination(request)
    const sorting = parseSorting(
      request,
      ['name', 'platform', 'status', 'followers', 'createdAt'],
      'createdAt'
    )
    
    const searchParams = request.nextUrl.searchParams
    const platform = searchParams.get('platform')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    
    // TODO: 从数据库获取
    // 模拟数据
    const mockBots = [
      {
        id: '1',
        name: 'Twitter 主账号',
        platform: 'TWITTER',
        username: '@social_master_01',
        displayName: 'Social Master',
        status: 'ACTIVE',
        followers: 12500,
        following: 890,
        postsCount: 456,
        lastLoginAt: new Date().toISOString(),
        lastPostAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
    ]
    
    return successResponse(mockBots, {
      page: pagination.page,
      pageSize: pagination.pageSize,
      total: mockBots.length,
      totalPages: 1,
    })
  })
}

/**
 * POST /api/v1/bots
 * 创建新机器人
 */
export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    const { user, error } = await requireAuth()
    if (error) return error
    
    const body = await request.json()
    const validation = createBotSchema.safeParse(body)
    
    if (!validation.success) {
      return ApiErrors.validationError(validation.error.flatten())
    }
    
    // TODO: 创建机器人
    const bot = {
      id: crypto.randomUUID(),
      ...validation.data,
      status: 'INACTIVE',
      followers: 0,
      following: 0,
      postsCount: 0,
      createdAt: new Date().toISOString(),
    }
    
    return successResponse(bot, undefined, 201)
  })
}

