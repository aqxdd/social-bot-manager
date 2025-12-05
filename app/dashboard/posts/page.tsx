'use client'

/**
 * 发布管理页面
 * =============================================================================
 * 管理已发布和待发布的帖子
 */

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Search,
  MoreHorizontal,
  ExternalLink,
  Trash2,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Heart,
  MessageCircle,
  Share2,
  Eye,
} from 'lucide-react'

/**
 * 帖子状态配置
 */
const postStatusConfig = {
  SCHEDULED: { label: '已排期', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500' },
  PUBLISHING: { label: '发布中', icon: Loader2, color: 'text-yellow-500', bg: 'bg-yellow-500' },
  PUBLISHED: { label: '已发布', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500' },
  FAILED: { label: '失败', icon: XCircle, color: 'text-red-500', bg: 'bg-red-500' },
}

/**
 * 模拟帖子数据
 */
const mockPosts = [
  {
    id: '1',
    text: '🎉 年终大促来袭！全场低至5折，更有神秘礼品等你来拿！#年终大促 #限时优惠',
    status: 'PUBLISHED' as const,
    platform: 'TWITTER',
    botName: '@social_master_01',
    scheduledAt: '2024-12-05T10:00:00Z',
    publishedAt: '2024-12-05T10:00:15Z',
    platformUrl: 'https://twitter.com/...',
    likes: 128,
    comments: 23,
    shares: 15,
    views: 2450,
  },
  {
    id: '2',
    text: '早安！新的一天，新的开始。分享今天的第一杯咖啡 ☕ #早安 #咖啡时光',
    status: 'PUBLISHED' as const,
    platform: 'WEIBO',
    botName: '@weibo_official',
    scheduledAt: '2024-12-05T08:00:00Z',
    publishedAt: '2024-12-05T08:00:12Z',
    platformUrl: 'https://weibo.com/...',
    likes: 356,
    comments: 45,
    shares: 28,
    views: 5600,
  },
  {
    id: '3',
    text: '下午3点直播预告！今天给大家带来冬季穿搭分享，记得准时来看哦～',
    status: 'SCHEDULED' as const,
    platform: 'XIAOHONGSHU',
    botName: '@red_review',
    scheduledAt: '2024-12-05T15:00:00Z',
    publishedAt: null,
    platformUrl: null,
    likes: 0,
    comments: 0,
    shares: 0,
    views: 0,
  },
  {
    id: '4',
    text: '测试发布内容...',
    status: 'FAILED' as const,
    platform: 'INSTAGRAM',
    botName: '@insta_marketing',
    scheduledAt: '2024-12-05T09:00:00Z',
    publishedAt: null,
    platformUrl: null,
    errorMessage: '内容违反平台规定',
    likes: 0,
    comments: 0,
    shares: 0,
    views: 0,
  },
  {
    id: '5',
    text: '正在发布中的内容...',
    status: 'PUBLISHING' as const,
    platform: 'TIKTOK',
    botName: '@tiktok_fun',
    scheduledAt: '2024-12-05T11:30:00Z',
    publishedAt: null,
    platformUrl: null,
    likes: 0,
    comments: 0,
    shares: 0,
    views: 0,
  },
]

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  // 过滤帖子
  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch = post.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'scheduled' && post.status === 'SCHEDULED') ||
      (activeTab === 'published' && post.status === 'PUBLISHED') ||
      (activeTab === 'failed' && post.status === 'FAILED')
    return matchesSearch && matchesTab
  })

  // 格式化数字
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <div className="flex flex-col">
      <Header
        title="发布管理"
        description="管理已发布和待发布的帖子"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* 统计卡片 */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>总帖子数</CardDescription>
              <CardTitle className="text-3xl">{mockPosts.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>已发布</CardDescription>
              <CardTitle className="text-3xl text-green-500">
                {mockPosts.filter((p) => p.status === 'PUBLISHED').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>排期中</CardDescription>
              <CardTitle className="text-3xl text-blue-500">
                {mockPosts.filter((p) => p.status === 'SCHEDULED').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>发布失败</CardDescription>
              <CardTitle className="text-3xl text-red-500">
                {mockPosts.filter((p) => p.status === 'FAILED').length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* 标签页和搜索 */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="scheduled">排期中</TabsTrigger>
              <TabsTrigger value="published">已发布</TabsTrigger>
              <TabsTrigger value="failed">失败</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索帖子..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 帖子列表 */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">内容</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>平台/账号</TableHead>
                  <TableHead>互动数据</TableHead>
                  <TableHead>时间</TableHead>
                  <TableHead className="w-[70px]">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => {
                  const statusConfig = postStatusConfig[post.status]
                  const StatusIcon = statusConfig.icon
                  return (
                    <TableRow key={post.id}>
                      <TableCell>
                        <p className="line-clamp-2 text-sm">{post.text}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon className={`h-4 w-4 ${statusConfig.color} ${post.status === 'PUBLISHING' ? 'animate-spin' : ''}`} />
                          <span className="text-sm">{statusConfig.label}</span>
                        </div>
                        {post.status === 'FAILED' && (
                          <p className="mt-1 text-xs text-destructive">
                            {(post as any).errorMessage}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge variant="outline">{post.platform}</Badge>
                          <p className="mt-1 text-xs text-muted-foreground">{post.botName}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {post.status === 'PUBLISHED' ? (
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {formatNumber(post.likes)}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {formatNumber(post.comments)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Share2 className="h-3 w-3" />
                              {formatNumber(post.shares)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {formatNumber(post.views)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {post.publishedAt ? (
                            <>
                              <p>已发布</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(post.publishedAt).toLocaleString('zh-CN')}
                              </p>
                            </>
                          ) : (
                            <>
                              <p>计划时间</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(post.scheduledAt).toLocaleString('zh-CN')}
                              </p>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>操作</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {post.platformUrl && (
                              <DropdownMenuItem>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                查看原帖
                              </DropdownMenuItem>
                            )}
                            {post.status === 'FAILED' && (
                              <DropdownMenuItem>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                重试发布
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

