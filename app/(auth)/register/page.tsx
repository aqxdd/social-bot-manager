'use client'

/**
 * 注册页面
 * =============================================================================
 * 新用户注册表单
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Mail, Lock, User, ArrowRight } from 'lucide-react'
import { signUp } from '@/lib/auth/client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * 注册表单验证规则
 */
const registerSchema = z
  .object({
    name: z.string().min(2, '名称至少需要 2 个字符'),
    email: z.string().email('请输入有效的邮箱地址'),
    password: z.string().min(8, '密码至少需要 8 个字符'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  /**
   * 处理注册表单提交
   */
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if (result.error) {
        setError(result.error.message || '注册失败，请稍后重试')
        return
      }

      // 注册成功，跳转到仪表板
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError('注册过程中发生错误，请稍后重试')
      console.error('Register error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-slate-700/50 bg-slate-800/50 backdrop-blur-xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-white">
          创建账户
        </CardTitle>
        <CardDescription className="text-slate-400">
          注册一个新账户开始使用
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* 错误提示 */}
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* 名称输入 */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-200">
              用户名
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="name"
                type="text"
                placeholder="您的名称"
                className="border-slate-600 bg-slate-700/50 pl-10 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500"
                disabled={isLoading}
                {...register('name')}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* 邮箱输入 */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">
              邮箱地址
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="border-slate-600 bg-slate-700/50 pl-10 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500"
                disabled={isLoading}
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* 密码输入 */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-200">
              密码
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="border-slate-600 bg-slate-700/50 pl-10 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500"
                disabled={isLoading}
                {...register('password')}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* 确认密码输入 */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-slate-200">
              确认密码
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="border-slate-600 bg-slate-700/50 pl-10 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500"
                disabled={isLoading}
                {...register('confirmPassword')}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                注册中...
              </>
            ) : (
              <>
                创建账户
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-center text-sm text-slate-400">
            已有账户？{' '}
            <Link
              href="/login"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              立即登录
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

