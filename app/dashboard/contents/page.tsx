'use client'

/**
 * 内容库页面
 * =============================================================================
 * 管理待发布的内容素材
 */

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Send,
  Image,
  FileText,
  Video,
  Sparkles,
  Filter,
} from 'lucide-react'

/**
 * 内容类型配置
 */
const contentTypeConfig = {
  TEXT: { label: '文本', icon: FileText, color: 'bg-blue-500' },
  IMAGE: { label: '图片', icon: Image, color: 'bg-green-500' },
  VIDEO: { label: '视频', icon: Video, color: 'bg-purple-500' },
}

/**
 * 内容状态配置
 */
const contentStatusConfig = {
  DRAFT: { label: '草稿', variant: 'secondary' as const },
  READY: { label: '就绪', variant: 'default' as const },
  PUBLISHED: { label: '已发布', variant: 'outline' as const },
  ARCHIVED: { label: '已归档', variant: 'outline' as const },
}

/**
 * 模拟内容数据
 */
const mockContents = [
  {
    id: '1',
    title: '年终总结帖子',
    text: '2024年即将结束，让我们一起回顾这一年的精彩瞬间...',
    type: 'TEXT' as const,
    status: 'READY' as const,
    aiGenerated: false,
    tags: ['年终', '总结'],
    createdAt: '2024-12-05T10:00:00Z',
  },
  {
    id: '2',
    title: 'AI 技术分享',
    text: '人工智能正在改变我们的生活方式，今天来聊聊最新的AI技术发展趋势...',
    type: 'TEXT' as const,
    status: 'DRAFT' as const,
    aiGenerated: true,
    tags: ['AI', '技术'],
    createdAt: '2024-12-04T15:30:00Z',
  },
  {
    id: '3',
    title: '产品宣传图',
    text: '新品上市，限时优惠！',
    type: 'IMAGE' as const,
    status: 'READY' as const,
    aiGenerated: false,
    tags: ['产品', '营销'],
    createdAt: '2024-12-03T09:00:00Z',
  },
  {
    id: '4',
    title: '使用教程视频',
    text: '5分钟学会使用我们的产品...',
    type: 'VIDEO' as const,
    status: 'PUBLISHED' as const,
    aiGenerated: false,
    tags: ['教程', '产品'],
    createdAt: '2024-12-02T14:00:00Z',
  },
]

export default function ContentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredContents = mockContents.filter(
    (content) =>
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.text.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col">
      <Header
        title="内容库"
        description="管理待发布的内容素材"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* 统计 */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>全部内容</CardDescription>
              <CardTitle className="text-3xl">{mockContents.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>草稿</CardDescription>
              <CardTitle className="text-3xl">
                {mockContents.filter((c) => c.status === 'DRAFT').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>就绪</CardDescription>
              <CardTitle className="text-3xl text-green-500">
                {mockContents.filter((c) => c.status === 'READY').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>AI 生成</CardDescription>
              <CardTitle className="text-3xl text-purple-500">
                {mockContents.filter((c) => c.aiGenerated).length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* 操作栏 */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                创建内容
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>创建新内容</DialogTitle>
                <DialogDescription>
                  创建待发布的内容素材
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="content-title">标题</Label>
                  <Input id="content-title" placeholder="内容标题" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content-type">内容类型</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TEXT">文本</SelectItem>
                      <SelectItem value="IMAGE">图片</SelectItem>
                      <SelectItem value="VIDEO">视频</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content-text">内容</Label>
                  <Textarea
                    id="content-text"
                    placeholder="输入内容文本..."
                    className="min-h-[150px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content-tags">标签（逗号分隔）</Label>
                  <Input id="content-tags" placeholder="标签1, 标签2" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  创建
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* 内容卡片 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredContents.map((content) => {
            const typeConfig = contentTypeConfig[content.type]
            const statusConfig = contentStatusConfig[content.status]
            const TypeIcon = typeConfig.icon
            return (
              <Card key={content.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded ${typeConfig.color}`}>
                        <TypeIcon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{content.title}</CardTitle>
                        {content.aiGenerated && (
                          <div className="flex items-center gap-1 text-xs text-purple-500">
                            <Sparkles className="h-3 w-3" />
                            AI 生成
                          </div>
                        )}
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
                          <Send className="mr-2 h-4 w-4" />
                          发布
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {content.text}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {content.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

