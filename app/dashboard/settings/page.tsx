'use client'

/**
 * 系统设置页面
 * =============================================================================
 * 提供系统配置和用户偏好设置
 */

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Sparkles,
  Save,
  Loader2,
} from 'lucide-react'

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // 模拟保存
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="flex flex-col">
      <Header
        title="系统设置"
        description="管理系统配置和个人偏好"
      />

      <div className="flex-1 p-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-5">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">个人信息</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">通知</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">AI 设置</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">外观</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">安全</span>
            </TabsTrigger>
          </TabsList>

          {/* 个人信息设置 */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>个人信息</CardTitle>
                <CardDescription>
                  更新您的个人资料信息
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">用户名</Label>
                    <Input id="name" placeholder="您的名称" defaultValue="Admin" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱地址</Label>
                    <Input id="email" type="email" placeholder="your@email.com" defaultValue="admin@example.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">个人简介</Label>
                  <Textarea
                    id="bio"
                    placeholder="简单介绍一下自己..."
                    className="min-h-[100px]"
                  />
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        保存中...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        保存更改
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 通知设置 */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>通知设置</CardTitle>
                <CardDescription>
                  配置系统通知和提醒
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    { id: 'post-success', label: '发布成功通知', description: '帖子成功发布时收到通知' },
                    { id: 'post-fail', label: '发布失败通知', description: '帖子发布失败时收到通知' },
                    { id: 'login-alert', label: '登录异常提醒', description: '机器人账号需要重新登录时提醒' },
                    { id: 'device-offline', label: '设备离线通知', description: '设备离线时收到通知' },
                    { id: 'hot-topic', label: '热点趋势提醒', description: '发现重要热点话题时提醒' },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label htmlFor={item.id}>{item.label}</Label>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <input
                        type="checkbox"
                        id={item.id}
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    保存更改
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI 设置 */}
          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>AI 配置</CardTitle>
                <CardDescription>
                  配置 AI 内容生成相关设置
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai-provider">AI 服务提供商</Label>
                    <Select defaultValue="openai">
                      <SelectTrigger>
                        <SelectValue placeholder="选择 AI 服务" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
                        <SelectItem value="anthropic">Anthropic (Claude)</SelectItem>
                        <SelectItem value="custom">自定义 API</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-key">API 密钥</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="sk-..."
                    />
                    <p className="text-xs text-muted-foreground">
                      您的 API 密钥会被安全加密存储
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-base">API 基础 URL（可选）</Label>
                    <Input
                      id="api-base"
                      placeholder="https://api.openai.com/v1"
                    />
                    <p className="text-xs text-muted-foreground">
                      如果使用代理或自定义端点，请填写此项
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>默认生成设置</Label>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="temperature" className="text-sm">温度 (创造性)</Label>
                        <Input
                          id="temperature"
                          type="number"
                          min="0"
                          max="2"
                          step="0.1"
                          defaultValue="0.7"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="max-tokens" className="text-sm">最大 Token 数</Label>
                        <Input
                          id="max-tokens"
                          type="number"
                          min="100"
                          max="4000"
                          defaultValue="1000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    保存更改
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 外观设置 */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>外观设置</CardTitle>
                <CardDescription>
                  自定义系统外观和显示
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>主题模式</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: 'light', label: '浅色' },
                        { value: 'dark', label: '深色' },
                        { value: 'system', label: '跟随系统' },
                      ].map((theme) => (
                        <button
                          key={theme.value}
                          className="flex flex-col items-center gap-2 rounded-lg border-2 border-muted p-4 hover:border-primary focus:border-primary"
                        >
                          <div className={`h-12 w-full rounded ${
                            theme.value === 'light' ? 'bg-white border' :
                            theme.value === 'dark' ? 'bg-slate-800' :
                            'bg-gradient-to-r from-white to-slate-800'
                          }`} />
                          <span className="text-sm">{theme.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">界面语言</Label>
                    <Select defaultValue="zh-CN">
                      <SelectTrigger>
                        <SelectValue placeholder="选择语言" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh-CN">简体中文</SelectItem>
                        <SelectItem value="zh-TW">繁體中文</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ja">日本語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">时区</Label>
                    <Select defaultValue="Asia/Shanghai">
                      <SelectTrigger>
                        <SelectValue placeholder="选择时区" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Shanghai">中国标准时间 (UTC+8)</SelectItem>
                        <SelectItem value="Asia/Tokyo">日本标准时间 (UTC+9)</SelectItem>
                        <SelectItem value="America/New_York">美国东部时间 (UTC-5)</SelectItem>
                        <SelectItem value="Europe/London">英国标准时间 (UTC+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    保存更改
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 安全设置 */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>安全设置</CardTitle>
                <CardDescription>
                  管理账户安全和密码
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 修改密码 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">修改密码</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">当前密码</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">新密码</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">确认新密码</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <Button variant="outline">更新密码</Button>
                </div>

                <Separator />

                {/* 登录会话 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">登录会话</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">当前会话</p>
                          <p className="text-sm text-muted-foreground">
                            Windows · Chrome · 北京
                          </p>
                        </div>
                      </div>
                      <Badge variant="default">当前</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="text-destructive">
                    登出所有其他设备
                  </Button>
                </div>

                <Separator />

                {/* 危险操作 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-destructive">危险区域</h3>
                  <div className="rounded-lg border border-destructive/50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">删除账户</p>
                        <p className="text-sm text-muted-foreground">
                          永久删除您的账户和所有数据，此操作不可撤销
                        </p>
                      </div>
                      <Button variant="destructive">删除账户</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

