/**
 * 设备 API 路由
 * =============================================================================
 * 提供设备的 CRUD 操作接口
 * 
 * GET    /api/v1/devices     - 获取设备列表
 * POST   /api/v1/devices     - 创建新设备
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
// import { prisma } from '@/lib/db'

/**
 * 创建设备的验证规则
 */
const createDeviceSchema = z.object({
  name: z.string().min(1, '设备名称不能为空').max(100),
  deviceType: z.enum(['android', 'ios', 'desktop', 'server']),
  description: z.string().optional(),
  ipAddress: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

/**
 * GET /api/v1/devices
 * 获取设备列表
 */
export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    // 验证登录状态
    const { user, error } = await requireAuth()
    if (error) return error
    
    // 解析分页和排序
    const pagination = parsePagination(request)
    const sorting = parseSorting(
      request, 
      ['name', 'deviceType', 'status', 'createdAt', 'lastSeenAt'],
      'createdAt'
    )
    
    // 解析过滤条件
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const deviceType = searchParams.get('deviceType')
    const search = searchParams.get('search')
    
    // TODO: 从数据库获取数据
    // const where = {
    //   userId: user!.id,
    //   ...(status && { status }),
    //   ...(deviceType && { deviceType }),
    //   ...(search && {
    //     OR: [
    //       { name: { contains: search, mode: 'insensitive' } },
    //       { ipAddress: { contains: search } },
    //     ],
    //   }),
    // }
    // 
    // const [devices, total] = await Promise.all([
    //   prisma.device.findMany({
    //     where,
    //     skip: pagination.skip,
    //     take: pagination.take,
    //     orderBy: sorting.orderBy,
    //   }),
    //   prisma.device.count({ where }),
    // ])
    
    // 模拟数据（开发阶段）
    const mockDevices = [
      {
        id: '1',
        name: 'iPhone-Pro-01',
        deviceType: 'ios',
        status: 'ONLINE',
        ipAddress: '192.168.1.101',
        lastSeenAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Android-Pixel-02',
        deviceType: 'android',
        status: 'ONLINE',
        ipAddress: '192.168.1.102',
        lastSeenAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
    ]
    
    return successResponse(mockDevices, {
      page: pagination.page,
      pageSize: pagination.pageSize,
      total: mockDevices.length,
      totalPages: Math.ceil(mockDevices.length / pagination.pageSize),
    })
  })
}

/**
 * POST /api/v1/devices
 * 创建新设备
 */
export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    // 验证登录状态
    const { user, error } = await requireAuth()
    if (error) return error
    
    // 解析和验证请求体
    const body = await request.json()
    const validation = createDeviceSchema.safeParse(body)
    
    if (!validation.success) {
      return ApiErrors.validationError(validation.error.flatten())
    }
    
    const data = validation.data
    
    // TODO: 创建设备
    // const device = await prisma.device.create({
    //   data: {
    //     ...data,
    //     userId: user!.id,
    //     status: 'OFFLINE',
    //   },
    // })
    
    // 模拟响应（开发阶段）
    const device = {
      id: crypto.randomUUID(),
      ...data,
      status: 'OFFLINE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    return successResponse(device, undefined, 201)
  })
}

