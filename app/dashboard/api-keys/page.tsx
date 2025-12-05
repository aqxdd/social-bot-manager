'use client'

/**
 * API 密钥管理页面
 * =============================================================================
 * 管理对外 API 访问的密钥
 */

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Plus,
  MoreHorizontal,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Key,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

/**
 * 模拟 API 密钥数据
 */
const mockApiKeys = [
  {
    id: '1',
    name: '生产环境密钥',
    prefix: 'sbm_live_',
    key: 'sbm_live_xxxxxxxxxxxxxxxxxxxxx',
    scopes: ['devices:read', 'devices:write', 'bots:read', 'bots:write', 'posts:write'],
    isActive: true,
    lastUsedAt: '2024-12-05T10:30:00Z',
    createdAt: '2024-11-01T00:00:00Z',
    expiresAt: null,
  },
  {
    id: '2',
    name: '测试环境密钥',
    prefix: 'sbm_test_',
    key: 'sbm_test_xxxxxxxxxxxxxxxxxxxxx',
    scopes: ['devices:read', 'bots:read', 'posts:read'],
    isActive: true,
    lastUsedAt: '2024-12-04T15:20:00Z',
    createdAt: '2024-10-15T00:00:00Z',
    expiresAt: '2025-01-15T00:00:00Z',
  },
  {
    id: '3',
    name: '已过期密钥',
    prefix: 'sbm_old_',
    key: 'sbm_old_xxxxxxxxxxxxxxxxxxxxx',
    scopes: ['devices:read'],
    isActive: false,
    lastUsedAt: '2024-09-01T10:00:00Z',
    createdAt: '2024-06-01T00:00:00Z',
    expiresAt: '2024-09-01T00:00:00Z',
  },
]

/**
 * 可用权限范围
 */
const availableScopes = [
  { id: 'devices:read', label: '读取设备', description: '获取设备列表和详情' },
  { id: 'devices:write', label: '管理设备', description: '创建、更新、删除设备' },
  { id: 'bots:read', label: '读取机器人', description: '获取机器人列表和详情' },
  { id: 'bots:write', label: '管理机器人', description: '创建、更新、删除机器人' },
  { id: 'posts:read', label: '读取帖子', description: '获取帖子列表和详情' },
  { id: 'posts:write', label: '发布帖子', description: '创建和发布帖子' },
  { id: 'contents:read', label: '读取内容', description: '获取内容库数据' },
  { id: 'contents:write', label: '管理内容', description: '创建、更新、删除内容' },
]

export default function ApiKeysPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [showKey, setShowKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // 复制密钥
  const handleCopy = async (key: string) => {
    await navigator.clipboard.writeText(key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col">
      <Header
        title="API 密钥"
        description="管理用于访问 API 的密钥"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* 说明卡片 */}
        <Card className="border-blue-500/50 bg-blue-500/5">
          <CardContent className="flex items-start gap-3 py-4">
            <Key className="mt-0.5 h-5 w-5 text-blue-500" />
            <div className="text-sm">
              <p className="font-medium text-foreground">API 密钥用途</p>
              <p className="text-muted-foreground">
                API 密钥用于在程序中访问 Social Bot Manager API。
                请妥善保管您的密钥，不要将其暴露在公开的代码仓库或客户端代码中。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 操作栏 */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            共 {mockApiKeys.length} 个密钥，
            {mockApiKeys.filter((k) => k.isActive).length} 个活跃
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                创建密钥
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>创建 API 密钥</DialogTitle>
                <DialogDescription>
                  创建一个新的 API 密钥用于程序访问
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="key-name">密钥名称</Label>
                  <Input id="key-name" placeholder="例如：生产环境密钥" />
                </div>
                <div className="space-y-2">
                  <Label>权限范围</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableScopes.map((scope) => (
                      <label
                        key={scope.id}
                        className="flex items-start gap-2 rounded-lg border p-3 cursor-pointer hover:bg-muted/50"
                      >
                        <input type="checkbox" className="mt-1" />
                        <div>
                          <p className="text-sm font-medium">{scope.label}</p>
                          <p className="text-xs text-muted-foreground">{scope.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="key-expiry">过期时间（可选）</Label>
                  <Input id="key-expiry" type="date" />
                  <p className="text-xs text-muted-foreground">
                    留空则密钥永不过期
                  </p>
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

        {/* 密钥列表 */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>名称</TableHead>
                  <TableHead>密钥</TableHead>
                  <TableHead>权限</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>最后使用</TableHead>
                  <TableHead className="w-[70px]">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockApiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{apiKey.name}</p>
                        <p className="text-xs text-muted-foreground">
                          创建于 {new Date(apiKey.createdAt).toLocaleDateString('zh-CN')}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="rounded bg-muted px-2 py-1 text-sm font-mono">
                          {showKey === apiKey.id
                            ? apiKey.key
                            : `${apiKey.prefix}${'•'.repeat(20)}`}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                        >
                          {showKey === apiKey.id ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleCopy(apiKey.key)}
                        >
                          {copied ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {apiKey.scopes.slice(0, 2).map((scope) => (
                          <Badge key={scope} variant="outline" className="text-xs">
                            {scope.split(':')[0]}
                          </Badge>
                        ))}
                        {apiKey.scopes.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{apiKey.scopes.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {apiKey.isActive ? (
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          活跃
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          已禁用
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {apiKey.lastUsedAt
                        ? new Date(apiKey.lastUsedAt).toLocaleString('zh-CN')
                        : '从未使用'}
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
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            复制密钥
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {apiKey.isActive ? '禁用' : '启用'}密钥
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

