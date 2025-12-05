# Social Bot Manager

社交媒体机器人管理系统 - 批量管理多平台社交账号，AI 辅助内容创作，自动化发布。

## 功能特性

- 🖥️ **多设备管理** - 支持 iOS、Android、桌面端等多种设备类型
- 🤖 **社交账号管理** - 统一管理 Twitter、Instagram、微博、小红书等主流平台
- ✨ **AI 内容生成** - 通过提示词自动生成高质量内容
- 📤 **自动发布** - 支持定时发布、批量发布
- 📈 **热点追踪** - 实时收集各平台热点话题
- 🔐 **安全可靠** - 安全的登录状态管理，数据加密存储

## 技术栈

- **前端**: Next.js 16, React 19, TailwindCSS, shadcn/ui
- **后端**: Next.js API Routes, Prisma ORM
- **数据库**: PostgreSQL
- **认证**: Better Auth
- **任务队列**: BullMQ + Redis
- **状态管理**: Zustand, React Query

## 快速开始

### 前置要求

- Node.js 18+
- Docker & Docker Compose (用于本地数据库)
- pnpm/npm/yarn

### 安装步骤

1. **克隆仓库**
```bash
git clone <repository-url>
cd social-bot-manager
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
```bash
# 复制示例配置
cp env.example.txt .env.local

# 编辑 .env.local 填写实际配置
```

4. **启动本地数据库**
```bash
docker-compose up -d
```

5. **初始化数据库**
```bash
# 生成 Prisma 客户端
npx prisma generate

# 推送数据库结构
npx prisma db push
```

6. **启动开发服务器**
```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

## 项目结构

```
social-bot-manager/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 认证相关页面
│   │   ├── login/
│   │   └── register/
│   ├── api/               # API 路由
│   │   ├── auth/          # 认证 API
│   │   └── v1/            # v1 版本 API
│   ├── dashboard/         # 管理后台页面
│   │   ├── devices/       # 设备管理
│   │   ├── bots/          # 机器人管理
│   │   └── ...
│   └── docs/              # API 文档
├── components/            # React 组件
│   ├── layout/           # 布局组件
│   ├── providers/        # Provider 组件
│   └── ui/               # UI 组件 (shadcn/ui)
├── lib/                  # 工具库
│   ├── api/              # API 工具函数
│   ├── auth/             # 认证配置
│   └── db/               # 数据库连接
├── prisma/               # Prisma 配置
│   └── schema.prisma     # 数据库模型
└── docker-compose.yml    # Docker 配置
```

## API 文档

访问 `/docs` 页面查看完整的 API 文档。

### 主要端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/v1/devices | 获取设备列表 |
| POST | /api/v1/devices | 创建新设备 |
| GET | /api/v1/bots | 获取机器人列表 |
| POST | /api/v1/bots | 创建机器人账号 |
| GET | /api/v1/posts | 获取帖子列表 |
| POST | /api/v1/posts | 创建/发布帖子 |

## 部署

### Vercel 部署

1. 将项目推送到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量（使用 Vercel PostgreSQL 或其他云数据库）
4. 部署

### 环境变量

| 变量名 | 描述 | 必需 |
|--------|------|------|
| DATABASE_URL | PostgreSQL 连接字符串 | ✅ |
| BETTER_AUTH_SECRET | 认证密钥 | ✅ |
| BETTER_AUTH_URL | 应用 URL | ✅ |
| REDIS_URL | Redis 连接字符串 | ⚠️ |
| OPENAI_API_KEY | OpenAI API 密钥 | ⚠️ |

## 开发指南

### 添加新功能

1. 在 `prisma/schema.prisma` 中定义数据模型
2. 运行 `npx prisma generate` 更新客户端
3. 在 `app/api/v1/` 中创建 API 路由
4. 在 `app/dashboard/` 中创建管理页面

### 代码规范

- 使用 TypeScript 编写所有代码
- 遵循 ESLint 规则
- 为所有函数和复杂逻辑添加注释
- 使用 Zod 进行数据验证

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
