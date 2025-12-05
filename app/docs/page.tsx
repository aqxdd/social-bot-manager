/**
 * API 文档页面
 * =============================================================================
 * 展示 API 接口文档，方便开发者了解如何使用 API
 */

import { Metadata } from 'next'
import Link from 'next/link'
import { Bot, ArrowLeft, Key, Server, Smartphone, FileText, Send } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = {
  title: 'API 文档 - Social Bot Manager',
  description: '社交媒体机器人管理系统 API 文档',
}

/**
 * API 端点配置
 */
const apiEndpoints = {
  devices: [
    {
      method: 'GET',
      path: '/api/v1/devices',
      description: '获取设备列表',
      params: [
        { name: 'page', type: 'number', description: '页码，默认 1' },
        { name: 'pageSize', type: 'number', description: '每页数量，默认 20' },
        { name: 'status', type: 'string', description: '状态过滤：ONLINE, OFFLINE, BUSY, ERROR' },
        { name: 'deviceType', type: 'string', description: '设备类型：android, ios, desktop, server' },
        { name: 'search', type: 'string', description: '搜索设备名称或 IP' },
      ],
    },
    {
      method: 'POST',
      path: '/api/v1/devices',
      description: '创建新设备',
      body: `{
  "name": "iPhone-Pro-01",
  "deviceType": "ios",
  "description": "生产环境主设备",
  "ipAddress": "192.168.1.101"
}`,
    },
    {
      method: 'GET',
      path: '/api/v1/devices/:id',
      description: '获取设备详情',
    },
    {
      method: 'PATCH',
      path: '/api/v1/devices/:id',
      description: '更新设备信息',
      body: `{
  "name": "新设备名称",
  "description": "更新描述"
}`,
    },
    {
      method: 'DELETE',
      path: '/api/v1/devices/:id',
      description: '删除设备',
    },
  ],
  bots: [
    {
      method: 'GET',
      path: '/api/v1/bots',
      description: '获取机器人账号列表',
      params: [
        { name: 'page', type: 'number', description: '页码' },
        { name: 'pageSize', type: 'number', description: '每页数量' },
        { name: 'platform', type: 'string', description: '平台过滤' },
        { name: 'status', type: 'string', description: '状态过滤' },
      ],
    },
    {
      method: 'POST',
      path: '/api/v1/bots',
      description: '创建机器人账号',
      body: `{
  "name": "Twitter 主账号",
  "platform": "TWITTER",
  "username": "@my_account",
  "deviceId": "device-id"
}`,
    },
  ],
  posts: [
    {
      method: 'GET',
      path: '/api/v1/posts',
      description: '获取帖子列表',
      params: [
        { name: 'status', type: 'string', description: '状态：SCHEDULED, PUBLISHING, PUBLISHED, FAILED' },
        { name: 'socialBotId', type: 'string', description: '按机器人过滤' },
      ],
    },
    {
      method: 'POST',
      path: '/api/v1/posts',
      description: '创建/发布帖子',
      body: `{
  "socialBotId": "bot-id",
  "text": "帖子内容 #标签",
  "mediaUrls": ["https://..."],
  "scheduledAt": "2024-12-06T10:00:00Z"
}`,
    },
  ],
}

/**
 * HTTP 方法颜色
 */
const methodColors = {
  GET: 'bg-green-500',
  POST: 'bg-blue-500',
  PATCH: 'bg-yellow-500',
  DELETE: 'bg-red-500',
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 头部 */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              返回控制台
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-white">Bot Manager API</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* 标题区 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">API 文档</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Social Bot Manager 提供完整的 RESTful API，让您可以通过编程方式管理设备、机器人账号和内容发布。
          </p>
        </div>

        {/* 快速开始 */}
        <Card className="mb-8 border-slate-700/50 bg-slate-800/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Key className="h-5 w-5" />
              快速开始
            </CardTitle>
            <CardDescription className="text-slate-400">
              使用 API 前需要获取 API 密钥
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-slate-900 p-4 font-mono text-sm">
              <p className="text-slate-400"># 在请求头中添加 API 密钥</p>
              <p className="text-green-400">curl -X GET https://your-domain.com/api/v1/devices \</p>
              <p className="text-green-400 pl-4">-H &quot;X-API-Key: your-api-key&quot;</p>
            </div>
            <div className="rounded-lg bg-slate-900 p-4 font-mono text-sm">
              <p className="text-slate-400"># 或使用 Bearer Token</p>
              <p className="text-green-400">curl -X GET https://your-domain.com/api/v1/devices \</p>
              <p className="text-green-400 pl-4">-H &quot;Authorization: Bearer your-api-key&quot;</p>
            </div>
          </CardContent>
        </Card>

        {/* 响应格式 */}
        <Card className="mb-8 border-slate-700/50 bg-slate-800/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Server className="h-5 w-5" />
              响应格式
            </CardTitle>
            <CardDescription className="text-slate-400">
              所有 API 响应都遵循统一的 JSON 格式
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium text-slate-300">成功响应</p>
              <pre className="rounded-lg bg-slate-900 p-4 text-sm text-green-400 overflow-x-auto">
{`{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 100,
    "totalPages": 5
  }
}`}
              </pre>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-slate-300">错误响应</p>
              <pre className="rounded-lg bg-slate-900 p-4 text-sm text-red-400 overflow-x-auto">
{`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "数据验证失败",
    "details": { ... }
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* API 端点 */}
        <Tabs defaultValue="devices" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
            <TabsTrigger value="devices" className="data-[state=active]:bg-indigo-500">
              <Smartphone className="mr-2 h-4 w-4" />
              设备管理
            </TabsTrigger>
            <TabsTrigger value="bots" className="data-[state=active]:bg-indigo-500">
              <Bot className="mr-2 h-4 w-4" />
              机器人
            </TabsTrigger>
            <TabsTrigger value="posts" className="data-[state=active]:bg-indigo-500">
              <Send className="mr-2 h-4 w-4" />
              帖子发布
            </TabsTrigger>
          </TabsList>

          {/* 设备 API */}
          <TabsContent value="devices" className="space-y-4">
            {apiEndpoints.devices.map((endpoint, index) => (
              <Card key={index} className="border-slate-700/50 bg-slate-800/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge className={`${methodColors[endpoint.method as keyof typeof methodColors]} text-white`}>
                      {endpoint.method}
                    </Badge>
                    <code className="text-slate-300">{endpoint.path}</code>
                  </div>
                  <CardDescription className="text-slate-400">
                    {endpoint.description}
                  </CardDescription>
                </CardHeader>
                {(endpoint.params || endpoint.body) && (
                  <CardContent className="space-y-4">
                    {endpoint.params && (
                      <div>
                        <p className="mb-2 text-sm font-medium text-slate-300">查询参数</p>
                        <div className="rounded-lg bg-slate-900 p-3">
                          {endpoint.params.map((param, i) => (
                            <div key={i} className="flex gap-4 py-1 text-sm">
                              <code className="text-indigo-400">{param.name}</code>
                              <span className="text-slate-500">{param.type}</span>
                              <span className="text-slate-400">{param.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {endpoint.body && (
                      <div>
                        <p className="mb-2 text-sm font-medium text-slate-300">请求体</p>
                        <pre className="rounded-lg bg-slate-900 p-4 text-sm text-slate-300 overflow-x-auto">
                          {endpoint.body}
                        </pre>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>

          {/* 机器人 API */}
          <TabsContent value="bots" className="space-y-4">
            {apiEndpoints.bots.map((endpoint, index) => (
              <Card key={index} className="border-slate-700/50 bg-slate-800/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge className={`${methodColors[endpoint.method as keyof typeof methodColors]} text-white`}>
                      {endpoint.method}
                    </Badge>
                    <code className="text-slate-300">{endpoint.path}</code>
                  </div>
                  <CardDescription className="text-slate-400">
                    {endpoint.description}
                  </CardDescription>
                </CardHeader>
                {(endpoint.params || endpoint.body) && (
                  <CardContent className="space-y-4">
                    {endpoint.params && (
                      <div>
                        <p className="mb-2 text-sm font-medium text-slate-300">查询参数</p>
                        <div className="rounded-lg bg-slate-900 p-3">
                          {endpoint.params.map((param, i) => (
                            <div key={i} className="flex gap-4 py-1 text-sm">
                              <code className="text-indigo-400">{param.name}</code>
                              <span className="text-slate-500">{param.type}</span>
                              <span className="text-slate-400">{param.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {endpoint.body && (
                      <div>
                        <p className="mb-2 text-sm font-medium text-slate-300">请求体</p>
                        <pre className="rounded-lg bg-slate-900 p-4 text-sm text-slate-300 overflow-x-auto">
                          {endpoint.body}
                        </pre>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>

          {/* 帖子 API */}
          <TabsContent value="posts" className="space-y-4">
            {apiEndpoints.posts.map((endpoint, index) => (
              <Card key={index} className="border-slate-700/50 bg-slate-800/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge className={`${methodColors[endpoint.method as keyof typeof methodColors]} text-white`}>
                      {endpoint.method}
                    </Badge>
                    <code className="text-slate-300">{endpoint.path}</code>
                  </div>
                  <CardDescription className="text-slate-400">
                    {endpoint.description}
                  </CardDescription>
                </CardHeader>
                {(endpoint.params || endpoint.body) && (
                  <CardContent className="space-y-4">
                    {endpoint.params && (
                      <div>
                        <p className="mb-2 text-sm font-medium text-slate-300">查询参数</p>
                        <div className="rounded-lg bg-slate-900 p-3">
                          {endpoint.params.map((param, i) => (
                            <div key={i} className="flex gap-4 py-1 text-sm">
                              <code className="text-indigo-400">{param.name}</code>
                              <span className="text-slate-500">{param.type}</span>
                              <span className="text-slate-400">{param.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {endpoint.body && (
                      <div>
                        <p className="mb-2 text-sm font-medium text-slate-300">请求体</p>
                        <pre className="rounded-lg bg-slate-900 p-4 text-sm text-slate-300 overflow-x-auto">
                          {endpoint.body}
                        </pre>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* 支持的平台 */}
        <Card className="mt-8 border-slate-700/50 bg-slate-800/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">支持的社交平台</CardTitle>
            <CardDescription className="text-slate-400">
              以下平台代码可用于 platform 字段
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { code: 'TWITTER', name: 'Twitter/X' },
                { code: 'INSTAGRAM', name: 'Instagram' },
                { code: 'FACEBOOK', name: 'Facebook' },
                { code: 'TIKTOK', name: 'TikTok' },
                { code: 'LINKEDIN', name: 'LinkedIn' },
                { code: 'YOUTUBE', name: 'YouTube' },
                { code: 'WEIBO', name: '微博' },
                { code: 'WECHAT', name: '微信' },
                { code: 'XIAOHONGSHU', name: '小红书' },
                { code: 'DOUYIN', name: '抖音' },
              ].map((platform) => (
                <div key={platform.code} className="flex items-center gap-2 rounded-lg bg-slate-900 p-3">
                  <code className="text-indigo-400">{platform.code}</code>
                  <span className="text-slate-400">-</span>
                  <span className="text-slate-300">{platform.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

