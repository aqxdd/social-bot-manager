/**
 * 帖子发布 API 路由
 * =============================================================================
 * 提供帖子发布管理的接口
 * 
 * GET    /api/v1/posts     - 获取帖子列表
 * POST   /api/v1/posts     - 创建/发布帖子
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
 * 创建帖子的验证规则
 */
const createPostSchema = z.object({
  socialBotId: z.string().min(1, '请选择发布账号'),
  contentId: z.string().optional(),
  text: z.string().optional(),
  mediaUrls: z.array(z.string().url()).optional(),
  scheduledAt: z.string().datetime().optional(),
}).refine(
  (data) => data.contentId || data.text,
  { message: '请提供内容或直接输入文本' }
)

/**
 * GET /api/v1/posts
 * 获取帖子列表
 */
export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const { user, error } = await requireAuth()
    if (error) return error
    
    const pagination = parsePagination(request)
    const sorting = parseSorting(
      request,
      ['status', 'scheduledAt', 'publishedAt', 'createdAt'],
      'createdAt'
    )
    
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const socialBotId = searchParams.get('socialBotId')
    
    // TODO: 从数据库获取
    const mockPosts = [
      {
        id: '1',
        text: '这是一条测试帖子 #测试',
        status: 'PUBLISHED',
        socialBotId: '1',
        socialBot: {
          id: '1',
          name: 'Twitter 主账号',
          platform: 'TWITTER',
          username: '@social_master_01',
        },
        publishedAt: new Date().toISOString(),
        platformPostId: '1234567890',
        platformUrl: 'https://twitter.com/...',
        likes: 42,
        comments: 5,
        shares: 3,
        createdAt: new Date().toISOString(),
      },
    ]
    
    return successResponse(mockPosts, {
      page: pagination.page,
      pageSize: pagination.pageSize,
      total: mockPosts.length,
      totalPages: 1,
    })
  })
}

/**
 * POST /api/v1/posts
 * 创建/发布帖子
 */
export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    const { user, error } = await requireAuth()
    if (error) return error
    
    const body = await request.json()
    const validation = createPostSchema.safeParse(body)
    
    if (!validation.success) {
      return ApiErrors.validationError(validation.error.flatten())
    }
    
    const data = validation.data
    
    // TODO: 创建帖子并添加到发布队列
    const post = {
      id: crypto.randomUUID(),
      ...data,
      status: data.scheduledAt ? 'SCHEDULED' : 'PUBLISHING',
      createdAt: new Date().toISOString(),
    }
    
    return successResponse(post, undefined, 201)
  })
}

