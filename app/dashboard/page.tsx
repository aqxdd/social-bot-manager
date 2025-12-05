/**
 * Dashboard 首页 - 仪表板
 * =============================================================================
 * 展示系统整体状态和关键指标
 */

import { Header } from '@/components/layout/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Smartphone,
  Bot,
  FileText,
  Send,
  TrendingUp,
  Activity,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'

/**
 * 统计卡片数据
 */
const statsCards = [
  {
    title: '在线设备',
    value: '12',
    change: '+2',
    changeType: 'positive' as const,
    icon: Smartphone,
    description: '当前活跃的设备数量',
  },
  {
    title: '机器人账号',
    value: '48',
    change: '+5',
    changeType: 'positive' as const,
    icon: Bot,
    description: '已配置的社交账号',
  },
  {
    title: '待发布内容',
    value: '156',
    change: '-12',
    changeType: 'neutral' as const,
    icon: FileText,
    description: '排队中的内容',
  },
  {
    title: '今日发布',
    value: '89',
    change: '+23%',
    changeType: 'positive' as const,
    icon: Send,
    description: '今天已发布的帖子',
  },
]

/**
 * 最近活动数据
 */
const recentActivities = [
  {
    id: 1,
    type: 'success',
    message: '机器人 @social_bot_01 成功发布帖子',
    platform: 'Twitter',
    time: '2 分钟前',
  },
  {
    id: 2,
    type: 'success',
    message: '设备 iPhone-Pro-01 上线',
    platform: 'System',
    time: '5 分钟前',
  },
  {
    id: 3,
    type: 'warning',
    message: '机器人 @insta_bot_03 需要重新登录',
    platform: 'Instagram',
    time: '15 分钟前',
  },
  {
    id: 4,
    type: 'error',
    message: '帖子发布失败：内容被平台拒绝',
    platform: 'TikTok',
    time: '30 分钟前',
  },
  {
    id: 5,
    type: 'success',
    message: 'AI 生成了 5 条新内容',
    platform: 'System',
    time: '1 小时前',
  },
]

/**
 * 热门趋势数据
 */
const trendingTopics = [
  { rank: 1, title: '#AI技术突破', platform: 'Twitter', hotScore: 98500 },
  { rank: 2, title: '2024年终盘点', platform: 'Weibo', hotScore: 87200 },
  { rank: 3, title: '#数字营销', platform: 'LinkedIn', hotScore: 65800 },
  { rank: 4, title: '年货节预热', platform: 'Xiaohongshu', hotScore: 54300 },
  { rank: 5, title: '#程序员日常', platform: 'Twitter', hotScore: 43100 },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <Header
        title="仪表板"
        description="查看系统整体运行状态和关键指标"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* 统计卡片 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <Badge
                    variant={stat.changeType === 'positive' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 主要内容区 */}
        <div className="grid gap-6 lg:grid-cols-7">
          {/* 最近活动 */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                最近活动
              </CardTitle>
              <CardDescription>系统最新的操作和事件</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 rounded-lg border border-border p-3"
                  >
                    {activity.type === 'success' && (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    )}
                    {activity.type === 'warning' && (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
                    )}
                    {activity.type === 'error' && (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    )}
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">{activity.message}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {activity.platform}
                        </Badge>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 热门趋势 */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                热门趋势
              </CardTitle>
              <CardDescription>各平台当前热点话题</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div
                    key={topic.rank}
                    className="flex items-center gap-3 rounded-lg border border-border p-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {topic.rank}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{topic.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {topic.platform}
                        </Badge>
                        <span>热度: {(topic.hotScore / 1000).toFixed(1)}K</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 快速操作提示 */}
        <Card className="border-dashed">
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <p className="text-muted-foreground">
                💡 提示：你可以通过左侧菜单快速访问各项功能
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

