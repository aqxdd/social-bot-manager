/**
 * Better-Auth 认证配置
 * =============================================================================
 * 这个文件配置用户认证系统，支持：
 * - 邮箱密码登录
 * - OAuth 第三方登录（可扩展）
 * - 会话管理
 */

import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '@/lib/db'

/**
 * Better-Auth 实例配置
 */
export const auth = betterAuth({
  // 数据库适配器 - 使用 Prisma
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  
  // 邮箱密码认证
  emailAndPassword: {
    enabled: true,
    // 密码最小长度
    minPasswordLength: 8,
    // 发送验证邮件（可选，后续实现）
    // sendResetPassword: async ({ user, url }) => {
    //   // 发送密码重置邮件
    // },
  },
  
  // 会话配置
  session: {
    // 会话过期时间（7天）
    expiresIn: 60 * 60 * 24 * 7,
    // 刷新阈值（1天内刷新）
    updateAge: 60 * 60 * 24,
    // Cookie 配置
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5分钟缓存
    },
  },
  
  // 用户配置
  user: {
    // 额外字段（与 Prisma schema 对应）
    additionalFields: {
      // 可以在这里添加自定义用户字段
    },
  },
  
  // 高级配置
  advanced: {
    // 其他高级配置可以在这里添加
  },
  
  // 可选：OAuth 提供商配置
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID!,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  //   },
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //   },
  // },
})

// 导出类型供其他模块使用
export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user

