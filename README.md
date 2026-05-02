# 1142_vercel_ltlin_14

**淡江大學 1142 Web 程式設計** 課程作業專案  
**Author:** LiangTing Lin (ltlin) — 913410014  
**Live Demo:** https://1142-vercel-ltlin-14.vercel.app

---

## 專案簡介

本專案以 **Next.js 16 App Router** 為核心，逐步展示從前端狀態管理到後端資料庫操作的完整 Web 開發流程，涵蓋 Server Actions、Prisma ORM、Supabase 整合及外部 API 呼叫等主題。

---

## Tech Stack

| 層次 | 技術 |
|------|------|
| Framework | Next.js 16 (App Router, Server Components, Server Actions) |
| Language | TypeScript 5 |
| UI | React 19 |
| Styling | Tailwind CSS 4 + styled-components 6 |
| ORM | Prisma 7 (`@prisma/adapter-pg`) |
| Database | PostgreSQL (Supabase) |
| BaaS | Supabase (Database + REST API) |
| Icons | react-icons + lucide-react |
| Notifications | react-toastify |
| Deployment | Vercel |

---

## 功能頁面

| 路由 | 功能說明 |
|------|----------|
| `/` | 首頁 |
| `/counter_14` | useState 計數器，正/負/零顯示不同顏色框線 |
| `/grocery_14` | Grocery List — localStorage 持久化，含新增/刪除/完成切換 |
| `/grocery_db_14` | Grocery List — PostgreSQL 持久化，透過 Server Actions 操作 |
| `/user_db_14` | 使用者 CRUD — Server Actions 建立/刪除使用者，表單驗證 |
| `/tours_14` | 串接外部 API (course-api.com)，顯示旅遊卡片列表 |
| `/tours_14/[id]` | 單一旅遊詳細頁 |
| `/supabase_14` | 讀取 Supabase Users 與 Posts 資料表（Server Component） |
| `/mid_14` | 期中考商品分類首頁（從 DB 讀取 category_14） |
| `/mid_14/[category]` | 依分類顯示商品列表（shop_14），支援刪除 |
| `/mid_14/static` | 靜態版商品分類頁 |
| `/mid_14/static/[category]` | 靜態版分類商品頁 |
| `/quiz1_14` | Quiz 1 入口頁 |
| `/quiz1_14/blog_14` | Blog — 本地 JSON 資料，前端狀態管理 |
| `/quiz1_14/blog_db_14` | Blog — PostgreSQL，Server Actions 新增/刪除 |
| `/exam/midterm` | 期中考版商品分類頁 |
| `/exam/midterm/[category]` | 期中考版分類商品頁 |
| `/seed_14` | 資料庫 Seeding 介面（shop + blog 資料） |
| `/actions_14` | Server Actions 示範頁 |
| `/demo/*` | 以上所有頁面的示範複本 |

### API Routes

| 路由 | 說明 |
|------|------|
| `GET /api/seed` | 寫入商品 Seed 資料 |
| `GET /api/test-db` | 測試 DB 連線，回傳範例資料 |

---

## 資料庫 Schema

```prisma
model User {
  id    Int     @id @default(autoincrement())
  name  String?
  email String  @unique
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int?
}

model GroceryItem {
  id        String  @id
  name      String
  completed Boolean @default(false)
}

model category_14 {
  cid              Int       @id
  cname            String?
  size             String?
  image_url        String?
  remote_image_url String?
  link_url         String?
  shop             shop_14[]
}

model shop_14 {
  pid            Int          @id
  pname          String?
  cat_id         Int?
  price          Int?
  img_url        String?
  remote_img_url String?
  category       category_14? @relation(fields: [cat_id], references: [cid])
}

model blog_14 {
  id       Int     @id @default(autoincrement())
  img      String?
  category String?
  title    String?
  descrip  String?
}
```

---

## 環境變數

建立 `.env` 檔（參考 `.env.example`）：

```env
# PostgreSQL / Supabase 連線字串
DATABASE_URL="postgresql://postgres.[project]:[password]@[region].pooler.supabase.com:5432/postgres"
DIRECT_URL="postgresql://postgres.[project]:[password]@[region].supabase.com:5432/postgres"

# Supabase 公開金鑰（瀏覽器可見）
NEXT_PUBLIC_SUPABASE_URL="https://[project].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."

# Supabase 私密金鑰（僅 Server Side）
SUPABASE_SECRET_KEY="sb_secret_..."
```

---

## 本地開發

```bash
# 安裝套件
npm install

# 同步資料庫 schema
npx prisma db push

# 啟動開發伺服器
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)

### 資料庫 Seeding

啟動後前往 `/seed_14`，點擊按鈕分別寫入商品（category_14 + shop_14）及部落格（blog_14）測試資料。

---

## 部署

本專案部署於 **Vercel**，設定 `DATABASE_URL`、`DIRECT_URL`、`NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`、`SUPABASE_SECRET_KEY` 等環境變數後即可自動部署。

```bash
# 建置確認
npm run build
```

---

## 專案結構

```
src/
├── app/
│   ├── _assets/          # 共用 styled-components Wrapper
│   ├── actions_14/       # Server Actions 示範
│   ├── counter_14/       # useState 計數器
│   ├── grocery_14/       # Grocery (localStorage)
│   ├── grocery_db_14/    # Grocery (Prisma DB)
│   ├── user_db_14/       # User CRUD
│   ├── tours_14/         # 外部 API 旅遊列表
│   ├── supabase_14/      # Supabase 整合
│   ├── mid_14/           # 期中考商店
│   ├── quiz1_14/         # Blog 示範
│   ├── exam/midterm/     # 期中考版商店
│   ├── seed_14/          # DB Seeding 介面
│   ├── demo/             # 所有頁面示範複本
│   └── api/              # API Routes
├── actions/              # 共用 Server Actions
├── components/           # 共用 React Components
└── lib/
    ├── prisma.ts         # Prisma Client (singleton)
    └── supabase.ts       # Supabase Client
prisma/
└── schema.prisma         # DB Schema
public/
└── images/midterm/       # 靜態圖片資源
```
