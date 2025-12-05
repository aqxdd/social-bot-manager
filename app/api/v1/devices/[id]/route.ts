/**
 * 单个设备 API 路由
 * =============================================================================
 * 
 * GET    /api/v1/devices/:id  - 获取设备详情
 * PATCH  /api/v1/devices/:id  - 更新设备
 * DELETE /api/v1/devices/:id  - 删除设备
 */

import { NextRequest } from 'next/server'
import { z } from 'zod'
import { 
  successResponse, 
  ApiErrors, 
  withErrorHandler 
} from '@/lib/api/response'
import { requireAuth } from '@/lib/api/middleware'
// import { prisma } from '@/lib/db'

/**
 * 更新设备的验证规则
 */
const updateDeviceSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  ipAddress: z.string().optional().nullable(),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

interface RouteParams {
  params: Promise<{ id: string }>
}

/**
 * GET /api/v1/devices/:id
 * 获取设备详情
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  return withErrorHandler(async () => {
    const { user, error } = await requireAuth()
    if (error) return error
    
    const { id } = await params
    
    // TODO: 从数据库获取
    // const device = await prisma.device.findFirst({
    //   where: { id, userId: user!.id },
    //   include: { socialBots: true },
    // })
    
    // if (!device) {
    //   return ApiErrors.notFound('设备')
    // }
    
    // 模拟数据
    const device = {
      id,
      name: 'iPhone-Pro-01',
      deviceType: 'ios',
      status: 'ONLINE',
      ipAddress: '192.168.1.101',
      lastSeenAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      socialBots: [],
    }
    
    return successResponse(device)
  })
}

/**
 * PATCH /api/v1/devices/:id
 * 更新设备
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  return withErrorHandler(async () => {
    const { user, error } = await requireAuth()
    if (error) return error
    
    const { id } = await params
    const body = await request.json()
    const validation = updateDeviceSchema.safeParse(body)
    
    if (!validation.success) {
      return ApiErrors.validationError(validation.error.flatten())
    }
    
    // TODO: 更新设备
    // const device = await prisma.device.updateMany({
    //   where: { id, userId: user!.id },
    //   data: validation.data,
    // })
    
    // 模拟响应
    const device = {
      id,
      ...validation.data,
      updatedAt: new Date().toISOString(),
    }
    
    return successResponse(device)
  })
}

/**
 * DELETE /api/v1/devices/:id
 * 删除设备
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  return withErrorHandler(async () => {
    const { user, error } = await requireAuth()
    if (error) return error
    
    const { id } = await params
    
    // TODO: 删除设备
    // await prisma.device.deleteMany({
    //   where: { id, userId: user!.id },
    // })
    
    return successResponse({ deleted: true })
  })
}

