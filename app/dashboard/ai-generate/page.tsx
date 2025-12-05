'use client'

/**
 * AI 内容生成页面
 * =============================================================================
 * 使用 AI 辅助生成社交媒体内容
 */

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Sparkles,
  Wand2,
  Copy,
  Save,
  RefreshCw,
  Loader2,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react'

/**
 * 预设提示词模板
 */
const promptTemplates = [
  { id: 'marketing', label: '营销推广', prompt: '为以下产品写一段吸引人的社交媒体营销文案：' },
  { id: 'news', label: '新闻报道', prompt: '用新闻报道的风格，简洁地介绍以下内容：' },
  { id: 'storytelling', label: '故事叙述', prompt: '用讲故事的方式，生动地描述以下场景：' },
  { id: 'humor', label: '幽默风趣', prompt: '用幽默风趣的语气，写一段关于以下主题的帖子：' },
  { id: 'professional', label: '专业严谨', prompt: '用专业严谨的语气，分析以下话题：' },
]

/**
 * 平台风格配置
 */
const platformStyles = [
  { id: 'twitter', label: 'Twitter', maxLength: 280 },
  { id: 'instagram', label: 'Instagram', maxLength: 2200 },
  { id: 'weibo', label: '微博', maxLength: 2000 },
  { id: 'xiaohongshu', label: '小红书', maxLength: 1000 },
  { id: 'linkedin', label: 'LinkedIn', maxLength: 3000 },
]

export default function AIGeneratePage() {
  const [prompt, setPrompt] = useState('')
  const [topic, setTopic] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('twitter')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  /**
   * 生成内容
   */
  const handleGenerate = async () => {
    if (!topic.trim()) return

    setIsGenerating(true)
    setGeneratedContent('')

    // 模拟 AI 生成（实际项目中调用 AI API）
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 模拟生成的内容
    const mockGenerated = `🚀 ${topic}

这是 AI 根据您的提示生成的示例内容。在实际使用中，这里会显示由 AI 模型（如 GPT-4）生成的真实内容。

✨ 特点：
• 根据平台特性优化长度
• 自动添加相关话题标签
• 符合社交媒体传播规律

#AI生成 #社交媒体 #内容创作`

    setGeneratedContent(mockGenerated)
    setIsGenerating(false)
  }

  /**
   * 复制内容
   */
  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  /**
   * 应用模板
   */
  const applyTemplate = (template: typeof promptTemplates[0]) => {
    setPrompt(template.prompt)
  }

  return (
    <div className="flex flex-col">
      <Header
        title="AI 内容生成"
        description="使用 AI 辅助创作社交媒体内容"
      />

      <div className="flex-1 p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* 输入区域 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  生成设置
                </CardTitle>
                <CardDescription>
                  配置 AI 生成参数
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 平台选择 */}
                <div className="space-y-2">
                  <Label>目标平台</Label>
                  <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {platformStyles.map((platform) => (
                        <SelectItem key={platform.id} value={platform.id}>
                          {platform.label} (最多 {platform.maxLength} 字符)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 提示词模板 */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    快速模板
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {promptTemplates.map((template) => (
                      <Button
                        key={template.id}
                        variant="outline"
                        size="sm"
                        onClick={() => applyTemplate(template)}
                      >
                        {template.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* 自定义提示词 */}
                <div className="space-y-2">
                  <Label htmlFor="prompt">提示词</Label>
                  <Textarea
                    id="prompt"
                    placeholder="输入提示词，告诉 AI 你想要什么风格的内容..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                {/* 主题/内容 */}
                <div className="space-y-2">
                  <Label htmlFor="topic">主题内容</Label>
                  <Textarea
                    id="topic"
                    placeholder="输入你想要生成内容的主题或关键信息..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                {/* 生成按钮 */}
                <Button
                  className="w-full"
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic.trim()}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      正在生成...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      生成内容
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 输出区域 */}
          <div className="space-y-6">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      生成结果
                    </CardTitle>
                    <CardDescription>
                      AI 生成的内容将显示在这里
                    </CardDescription>
                  </div>
                  {generatedContent && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                      >
                        <RefreshCw className="mr-1 h-4 w-4" />
                        重新生成
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {generatedContent ? (
                  <>
                    <div className="rounded-lg border bg-muted/50 p-4">
                      <pre className="whitespace-pre-wrap font-sans text-sm">
                        {generatedContent}
                      </pre>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">
                          {generatedContent.length} 字符
                        </Badge>
                        <Badge variant="secondary">
                          {platformStyles.find((p) => p.id === selectedPlatform)?.label}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopy}>
                          {copied ? (
                            <>
                              <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                              已复制
                            </>
                          ) : (
                            <>
                              <Copy className="mr-1 h-4 w-4" />
                              复制
                            </>
                          )}
                        </Button>
                        <Button size="sm">
                          <Save className="mr-1 h-4 w-4" />
                          保存到内容库
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-64 flex-col items-center justify-center text-center text-muted-foreground">
                    <Sparkles className="mb-4 h-12 w-12 opacity-20" />
                    <p>输入主题并点击生成</p>
                    <p className="text-sm">AI 将根据您的设置创作内容</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 使用提示 */}
        <Card className="mt-6 border-dashed">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="mt-0.5 h-5 w-5 text-yellow-500" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">使用提示</p>
                <ul className="mt-1 list-inside list-disc space-y-1">
                  <li>提供详细的主题描述可以获得更好的生成结果</li>
                  <li>使用快速模板可以快速设置不同风格的提示词</li>
                  <li>生成的内容可以直接保存到内容库供后续发布使用</li>
                  <li>不满意的结果可以点击重新生成获取新的内容</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

