'use client'

/**
 * 机器人账号管理页面
 * =============================================================================
 * 展示和管理社交媒体机器人账号
 */

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  LogIn,
  RefreshCw,
  Users,
  UserPlus,
  FileText,
} from 'lucide-react'

/**
 * 平台配置
 */
const platformConfig = {
  TWITTER: { name: 'Twitter', color: 'bg-sky-500', icon: '𝕏' },
  INSTAGRAM: { name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: '📸' },
  FACEBOOK: { name: 'Facebook', color: 'bg-blue-600', icon: 'f' },
  TIKTOK: { name: 'TikTok', color: 'bg-black', icon: '♪' },
  LINKEDIN: { name: 'LinkedIn', color: 'bg-blue-700', icon: 'in' },
  WEIBO: { name: '微博', color: 'bg-red-500', icon: 'W' },
  XIAOHONGSHU: { name: '小红书', color: 'bg-red-400', icon: '📕' },
  DOUYIN: { name: '抖音', color: 'bg-black', icon: '🎵' },
}

/**
 * 状态配置
 */
const statusConfig = {
  ACTIVE: { label: '活跃', variant: 'default' as const },
  INACTIVE: { label: '未激活', variant: 'secondary' as const },
  SUSPENDED: { label: '被封禁', variant: 'destructive' as const },
  LOGIN_REQUIRED: { label: '需要登录', variant: 'outline' as const },
}

/**
 * 模拟机器人数据
 */
const mockBots = [
  {
    id: '1',
    name: 'Twitter 主账号',
    platform: 'TWITTER' as const,
    username: '@social_master_01',
    displayName: 'Social Master',
    avatar: '',
    status: 'ACTIVE' as const,
    followers: 12500,
    following: 890,
    postsCount: 456,
    lastLoginAt: '2024-12-05T10:30:00Z',
    lastPostAt: '2024-12-05T09:15:00Z',
    deviceName: 'iPhone-Pro-01',
  },
  {
    id: '2',
    name: 'Instagram 营销号',
    platform: 'INSTAGRAM' as const,
    username: '@insta_marketing',
    displayName: 'Marketing Hub',
    avatar: '',
    status: 'ACTIVE' as const,
    followers: 8900,
    following: 1200,
    postsCount: 234,
    lastLoginAt: '2024-12-05T10:00:00Z',
    lastPostAt: '2024-12-05T08:30:00Z',
    deviceName: 'Android-Pixel-02',
  },
  {
    id: '3',
    name: '微博官方账号',
    platform: 'WEIBO' as const,
    username: '@weibo_official',
    displayName: '官方发言人',
    avatar: '',
    status: 'LOGIN_REQUIRED' as const,
    followers: 45000,
    following: 350,
    postsCount: 1200,
    lastLoginAt: '2024-12-04T18:00:00Z',
    lastPostAt: '2024-12-04T17:30:00Z',
    deviceName: 'Desktop-Win-03',
  },
  {
    id: '4',
    name: '小红书种草号',
    platform: 'XIAOHONGSHU' as const,
    username: '@red_review',
    displayName: '种草日记',
    avatar: '',
    status: 'ACTIVE' as const,
    followers: 23000,
    following: 560,
    postsCount: 567,
    lastLoginAt: '2024-12-05T09:45:00Z',
    lastPostAt: '2024-12-05T07:00:00Z',
    deviceName: 'iPhone-Pro-01',
  },
  {
    id: '5',
    name: 'TikTok 娱乐号',
    platform: 'TIKTOK' as const,
    username: '@tiktok_fun',
    displayName: 'Fun Creator',
    avatar: '',
    status: 'SUSPENDED' as const,
    followers: 5600,
    following: 230,
    postsCount: 89,
    lastLoginAt: '2024-12-01T12:00:00Z',
    lastPostAt: '2024-12-01T11:00:00Z',
    deviceName: 'Android-Pixel-02',
  },
]

export default function BotsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // 过滤机器人
  const filteredBots = mockBots.filter((bot) => {
    const matchesSearch =
      bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bot.username.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlatform = selectedPlatform === 'all' || bot.platform === selectedPlatform
    return matchesSearch && matchesPlatform
  })

  // 格式化数字
  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + '万'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <div className="flex flex-col">
      <Header
        title="机器人账号"
        description="管理社交媒体机器人账号"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* 统计卡片 */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>总账号数</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockBots.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>活跃账号</CardDescription>
              <UserPlus className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {mockBots.filter((b) => b.status === 'ACTIVE').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>总粉丝数</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(mockBots.reduce((sum, b) => sum + b.followers, 0))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>总发帖数</CardDescription>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(mockBots.reduce((sum, b) => sum + b.postsCount, 0))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 操作栏 */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full max-w-sm sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索账号..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:w-64"
              />
            </div>
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="所有平台" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有平台</SelectItem>
                {Object.entries(platformConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  添加账号
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>添加社交媒体账号</DialogTitle>
                  <DialogDescription>
                    添加一个新的社交媒体账号进行管理
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="bot-name">账号名称</Label>
                    <Input id="bot-name" placeholder="例如：Twitter 主账号" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bot-platform">平台</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择平台" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(platformConfig).map(([key, config]) => (
                          <SelectItem key={key} value={key}>
                            {config.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bot-username">用户名</Label>
                    <Input id="bot-username" placeholder="@username" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bot-device">运行设备</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择设备" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">iPhone-Pro-01</SelectItem>
                        <SelectItem value="2">Android-Pixel-02</SelectItem>
                        <SelectItem value="3">Desktop-Win-03</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>添加</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 账号卡片列表 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBots.map((bot) => {
            const platform = platformConfig[bot.platform]
            const status = statusConfig[bot.status]
            return (
              <Card key={bot.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={bot.avatar} />
                        <AvatarFallback className={platform.color + ' text-white'}>
                          {platform.icon}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{bot.name}</CardTitle>
                        <CardDescription>{bot.username}</CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>操作</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <LogIn className="mr-2 h-4 w-4" />
                          重新登录
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          同步数据
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={status.variant}>{status.label}</Badge>
                    <Badge variant="outline">{platform.name}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-muted p-2">
                      <p className="text-lg font-semibold">{formatNumber(bot.followers)}</p>
                      <p className="text-xs text-muted-foreground">粉丝</p>
                    </div>
                    <div className="rounded-lg bg-muted p-2">
                      <p className="text-lg font-semibold">{formatNumber(bot.following)}</p>
                      <p className="text-xs text-muted-foreground">关注</p>
                    </div>
                    <div className="rounded-lg bg-muted p-2">
                      <p className="text-lg font-semibold">{formatNumber(bot.postsCount)}</p>
                      <p className="text-xs text-muted-foreground">帖子</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <p>设备: {bot.deviceName}</p>
                    <p>最后发帖: {new Date(bot.lastPostAt).toLocaleString('zh-CN')}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

