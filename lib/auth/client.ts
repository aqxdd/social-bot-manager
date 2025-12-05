/**
 * Better-Auth 客户端
 * =============================================================================
 * 这个文件提供前端使用的认证客户端
 * 包含登录、注册、登出等操作的 React hooks
 */

import { createAuthClient } from 'better-auth/react'

/**
 * 创建认证客户端实例
 * 自动处理与服务端的认证通信
 */
export const authClient = createAuthClient({
  // 基础URL（自动从当前域名推断）
  baseURL: process.env.NEXT_PUBLIC_APP_URL || '',
})

/**
 * 导出常用的认证方法和 hooks
 */
export const {
  // 登录相关
  signIn,    // 登录
  signUp,    // 注册
  signOut,   // 登出
  
  // 会话相关
  useSession,  // 获取当前会话的 hook
  getSession,  // 获取当前会话（非 hook）
  
  // 用户相关
  // updateUser,  // 更新用户信息
  // deleteUser,  // 删除用户
  
  // 密码相关
  // forgetPassword,  // 忘记密码
  // resetPassword,   // 重置密码
} = authClient

