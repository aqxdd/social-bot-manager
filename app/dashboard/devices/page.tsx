'use client'

/**
 * 设备管理页面
 * =============================================================================
 * 展示和管理运行机器人的设备列表
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
import {
  Plus,
  Search,
  MoreHorizontal,
  Smartphone,
  Monitor,
  Server,
  Edit,
  Trash2,
  Power,
  RefreshCw,
} from 'lucide-react'

/**
 * 设备状态配置
 */
const deviceStatusConfig = {
  ONLINE: { label: '在线', color: 'bg-green-500' },
  OFFLINE: { label: '离线', color: 'bg-gray-500' },
  BUSY: { label: '忙碌', color: 'bg-yellow-500' },
  ERROR: { label: '错误', color: 'bg-red-500' },
}

/**
 * 设备类型图标
 */
const deviceTypeIcons = {
  android: Smartphone,
  ios: Smartphone,
  desktop: Monitor,
  server: Server,
}

/**
 * 模拟设备数据
 */
const mockDevices = [
  {
    id: '1',
    name: 'iPhone-Pro-01',
    deviceType: 'ios',
    status: 'ONLINE' as const,
    ipAddress: '192.168.1.101',
    lastSeenAt: '2024-12-05T10:30:00Z',
    botsCount: 5,
  },
  {
    id: '2',
    name: 'Android-Pixel-02',
    deviceType: 'android',
    status: 'ONLINE' as const,
    ipAddress: '192.168.1.102',
    lastSeenAt: '2024-12-05T10:28:00Z',
    botsCount: 3,
  },
  {
    id: '3',
    name: 'Desktop-Win-03',
    deviceType: 'desktop',
    status: 'BUSY' as const,
    ipAddress: '192.168.1.103',
    lastSeenAt: '2024-12-05T10:25:00Z',
    botsCount: 8,
  },
  {
    id: '4',
    name: 'Server-Cloud-04',
    deviceType: 'server',
    status: 'OFFLINE' as const,
    ipAddress: '10.0.0.50',
    lastSeenAt: '2024-12-04T18:00:00Z',
    botsCount: 12,
  },
  {
    id: '5',
    name: 'Android-Samsung-05',
    deviceType: 'android',
    status: 'ERROR' as const,
    ipAddress: '192.168.1.105',
    lastSeenAt: '2024-12-05T08:00:00Z',
    botsCount: 2,
  },
]

export default function DevicesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // 过滤设备
  const filteredDevices = mockDevices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.ipAddress?.includes(searchQuery)
  )

  return (
    <div className="flex flex-col">
      <Header
        title="设备管理"
        description="管理运行机器人的物理和虚拟设备"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* 统计卡片 */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>总设备数</CardDescription>
              <CardTitle className="text-3xl">{mockDevices.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>在线设备</CardDescription>
              <CardTitle className="text-3xl text-green-500">
                {mockDevices.filter((d) => d.status === 'ONLINE').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>忙碌设备</CardDescription>
              <CardTitle className="text-3xl text-yellow-500">
                {mockDevices.filter((d) => d.status === 'BUSY').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>运行机器人</CardDescription>
              <CardTitle className="text-3xl">
                {mockDevices.reduce((sum, d) => sum + d.botsCount, 0)}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* 操作栏 */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索设备名称或 IP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  添加设备
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>添加新设备</DialogTitle>
                  <DialogDescription>
                    添加一个新的设备来运行社交媒体机器人
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="device-name">设备名称</Label>
                    <Input id="device-name" placeholder="例如：iPhone-Pro-01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="device-type">设备类型</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择设备类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ios">iOS 设备</SelectItem>
                        <SelectItem value="android">Android 设备</SelectItem>
                        <SelectItem value="desktop">桌面设备</SelectItem>
                        <SelectItem value="server">服务器</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="device-ip">IP 地址 (可选)</Label>
                    <Input id="device-ip" placeholder="192.168.1.100" />
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

        {/* 设备列表 */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>设备名称</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>IP 地址</TableHead>
                  <TableHead>机器人数</TableHead>
                  <TableHead>最后在线</TableHead>
                  <TableHead className="w-[70px]">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.map((device) => {
                  const StatusConfig = deviceStatusConfig[device.status]
                  const DeviceIcon = deviceTypeIcons[device.deviceType as keyof typeof deviceTypeIcons] || Smartphone
                  return (
                    <TableRow key={device.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                            <DeviceIcon className="h-4 w-4" />
                          </div>
                          <span className="font-medium">{device.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {device.deviceType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${StatusConfig.color}`} />
                          <span>{StatusConfig.label}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {device.ipAddress || '-'}
                      </TableCell>
                      <TableCell>{device.botsCount} 个</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(device.lastSeenAt).toLocaleString('zh-CN')}
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
                              <Edit className="mr-2 h-4 w-4" />
                              编辑
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Power className="mr-2 h-4 w-4" />
                              重启
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
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

