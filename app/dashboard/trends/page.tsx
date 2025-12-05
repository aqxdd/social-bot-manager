'use client'

/**
 * 热点趋势页面
 * =============================================================================
 * 展示各平台的热点话题和趋势数据
 */

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  ExternalLink,
  Sparkles,
  Clock,
} from 'lucide-react'

/**
 * 平台配置
 */
const platforms = [
  { id: 'all', label: '全部' },
  { id: 'TWITTER', label: 'Twitter' },
  { id: 'WEIBO', label: '微博' },
  { id: 'XIAOHONGSHU', label: '小红书' },
  { id: 'DOUYIN', label: '抖音' },
]

/**
 * 趋势类型配置
 */
const trendTypeConfig = {
  rising: { icon: TrendingUp, color: 'text-green-500', label: '上升' },
  stable: { icon: Minus, color: 'text-yellow-500', label: '稳定' },
  falling: { icon: TrendingDown, color: 'text-red-500', label: '下降' },
}

/**
 * 模拟热点数据
 */
const mockTrends = [
  {
    id: '1',
    title: '#AI技术突破',
    description: 'OpenAI发布新一代模型，引发行业热议',
    platform: 'TWITTER',
    hotScore: 985000,
    rank: 1,
    trendType: 'rising' as const,
    url: 'https://twitter.com/...',
    collectedAt: '2024-12-05T10:30:00Z',
  },
  {
    id: '2',
    title: '2024年度盘点',
    description: '各行各业开始进行年度总结盘点',
    platform: 'WEIBO',
    hotScore: 872000,
    rank: 2,
    trendType: 'rising' as const,
    url: 'https://weibo.com/...',
    collectedAt: '2024-12-05T10:25:00Z',
  },
  {
    id: '3',
    title: '冬季穿搭分享',
    description: '今年冬天最流行的穿搭风格',
    platform: 'XIAOHONGSHU',
    hotScore: 658000,
    rank: 3,
    trendType: 'stable' as const,
    url: 'https://xiaohongshu.com/...',
    collectedAt: '2024-12-05T10:20:00Z',
  },
  {
    id: '4',
    title: '#数字营销趋势',
    description: '2025年数字营销发展预测',
    platform: 'TWITTER',
    hotScore: 543000,
    rank: 4,
    trendType: 'rising' as const,
    url: 'https://twitter.com/...',
    collectedAt: '2024-12-05T10:15:00Z',
  },
  {
    id: '5',
    title: '年货节预热',
    description: '各大电商平台年货节活动即将开启',
    platform: 'DOUYIN',
    hotScore: 432000,
    rank: 5,
    trendType: 'stable' as const,
    url: 'https://douyin.com/...',
    collectedAt: '2024-12-05T10:10:00Z',
  },
  {
    id: '6',
    title: '程序员日常',
    description: '程序员生活趣事分享',
    platform: 'WEIBO',
    hotScore: 321000,
    rank: 6,
    trendType: 'falling' as const,
    url: 'https://weibo.com/...',
    collectedAt: '2024-12-05T10:05:00Z',
  },
  {
    id: '7',
    title: '#健康生活方式',
    description: '年轻人开始注重健康养生',
    platform: 'XIAOHONGSHU',
    hotScore: 289000,
    rank: 7,
    trendType: 'rising' as const,
    url: 'https://xiaohongshu.com/...',
    collectedAt: '2024-12-05T10:00:00Z',
  },
  {
    id: '8',
    title: '新能源汽车',
    description: '新能源汽车市场持续火热',
    platform: 'TWITTER',
    hotScore: 256000,
    rank: 8,
    trendType: 'stable' as const,
    url: 'https://twitter.com/...',
    collectedAt: '2024-12-05T09:55:00Z',
  },
]

export default function TrendsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [isRefreshing, setIsRefreshing] = useState(false)

  // 过滤趋势
  const filteredTrends = mockTrends.filter(
    (trend) => selectedPlatform === 'all' || trend.platform === selectedPlatform
  )

  // 格式化热度
  const formatHotScore = (score: number) => {
    if (score >= 1000000) {
      return (score / 1000000).toFixed(1) + 'M'
    }
    if (score >= 1000) {
      return (score / 1000).toFixed(0) + 'K'
    }
    return score.toString()
  }

  // 刷新数据
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  return (
    <div className="flex flex-col">
      <Header
        title="热点趋势"
        description="实时追踪各平台热门话题"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* 平台标签和刷新 */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Tabs value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <TabsList>
              {platforms.map((platform) => (
                <TabsTrigger key={platform.id} value={platform.id}>
                  {platform.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              最后更新: {new Date().toLocaleTimeString('zh-CN')}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              刷新
            </Button>
          </div>
        </div>

        {/* 热点卡片 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTrends.map((trend) => {
            const trendConfig = trendTypeConfig[trend.trendType]
            const TrendIcon = trendConfig.icon
            return (
              <Card key={trend.id} className="group hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                        {trend.rank}
                      </div>
                      <div>
                        <CardTitle className="text-base">{trend.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {platforms.find((p) => p.id === trend.platform)?.label}
                          </Badge>
                          <div className={`flex items-center gap-1 text-xs ${trendConfig.color}`}>
                            <TrendIcon className="h-3 w-3" />
                            {trendConfig.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {trend.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-orange-500" />
                      <span className="font-semibold text-orange-500">
                        {formatHotScore(trend.hotScore)}
                      </span>
                      <span className="text-xs text-muted-foreground">热度</span>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={trend.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1 h-4 w-4" />
                          查看
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Sparkles className="mr-1 h-4 w-4" />
                        生成
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 使用提示 */}
        <Card className="border-dashed">
          <CardContent className="py-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span>点击「生成」按钮可以根据热点话题快速生成相关内容</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

