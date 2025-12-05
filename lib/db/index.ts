/**
 * 数据库连接模块
 * =============================================================================
 * 这个文件负责创建和管理 Prisma 数据库连接
 * 支持本地 Docker PostgreSQL 和 Vercel 云数据库
 */

import { PrismaClient } from '../../generated/prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// 声明全局变量类型，用于开发环境的单例模式
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

/**
 * 创建 Prisma 客户端实例
 */
function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL
  
  if (!connectionString) {
    throw new Error('DATABASE_URL 环境变量未设置')
  }
  
  // 创建 PostgreSQL 连接池
  const pool = new Pool({
    connectionString,
    // Serverless 环境优化
    max: 1, // 限制最大连接数
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 10000,
  })
  
  // 使用 Prisma PostgreSQL 适配器
  const adapter = new PrismaPg(pool)
  
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  })
}

/**
 * 获取 Prisma 客户端实例
 * - 开发环境：使用全局单例，避免热重载时创建多个连接
 * - 生产环境：直接创建新实例
 */
export const prisma = globalThis.prisma ?? createPrismaClient()

// 开发环境保存到全局变量
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

// 重新导出类型
export { PrismaClient }
export type {
  User,
  Session,
  Account,
  Verification,
  Device,
  SocialBot,
  Content,
  Post,
  HotTopic,
  ApiKey,
  TaskRecord,
  SystemConfig,
} from '../../generated/prisma/client'

// 导出枚举
export {
  DeviceStatus,
  SocialPlatform,
  BotStatus,
  ContentType,
  ContentStatus,
  PostStatus,
  TaskType,
  TaskStatus,
} from '../../generated/prisma/client'
