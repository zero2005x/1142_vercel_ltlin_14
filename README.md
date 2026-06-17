# 1142_vercel_ltlin_14

**淡江大學 1142 Web 程式設計** 課程作業專案
**Author:** LiangTing Lin (ltlin) — 913410014
**Live Demo:** https://1142-vercel-ltlin-14.vercel.app

---

## 專案簡介

本專案以 **Next.js 16 App Router** 為核心，從前端狀態管理逐步推進到具備金流的完整電商系統，循序漸進涵蓋：

- React 狀態管理（`useState`、`localStorage`）
- Server Actions + Prisma ORM 的 CRUD
- Supabase 整合與外部 API 串接
- 期中考商品分類系統
- Quiz 1 部落格（本地 JSON / 資料庫兩版本）
- Quiz 2 部落格管理後台（Blog CRUD + 管理介面）
- 期末完整電商 `store_14`：Clerk 登入 / 購物車 / 收藏 / 評論 / 訂單 / Stripe 結帳 / 管理後台
- 全站深色模式（`next-themes`）

---

## Tech Stack

| 層次 | 技術 |
|------|------|
| Framework | Next.js 16 (App Router, Server Components, Server Actions, Webpack) |
| Language | TypeScript 5 |
| UI | React 19.2 |
| Styling | Tailwind CSS 4 + styled-components 6 + shadcn/ui |
| Theme | next-themes（system / light / dark） |
| Auth | Clerk (`@clerk/nextjs` v7) |
| ORM | Prisma 7 (`@prisma/adapter-pg`，client 輸出至 `src/generated/prisma`) |
| Database | PostgreSQL（本機 + Supabase） |
| BaaS | Supabase (Database + REST API) |
| Payment | Stripe Checkout（透過 REST API） |
| Validation | Zod 4 |
| Icons | react-icons + lucide-react + @radix-ui/react-icons |
| Notifications | react-toastify + sonner |
| Carousel | embla-carousel-react |
| Seeding | @faker-js/faker + tsx |
| Deployment | Vercel |

---

## 功能頁面

### 基礎練習

| 路由 | 功能說明 |
|------|----------|
| `/` | 首頁 |
| `/counter_14` | `useState` 計數器，正/負/零顯示不同顏色框線 |
| `/grocery_14` | Grocery List — `localStorage` 持久化 |
| `/grocery_db_14` | Grocery List — PostgreSQL + Server Actions |
| `/user_db_14` | 使用者 CRUD（含表單驗證） |
| `/tours_14` | 串接外部 API (course-api.com) |
| `/tours_14/[id]` | 單一旅遊詳細頁 |
| `/supabase_14` | 讀取 Supabase Users / Posts 資料表 |
| `/actions_14` | Server Actions 示範頁 |
| `/seed_14` | 資料庫 Seeding 介面（shop + blog） |

### 期中考

| 路由 | 功能說明 |
|------|----------|
| `/mid_14` | 商品分類首頁（從 DB 讀取 `category_14`） |
| `/mid_14/[category]` | 依分類顯示商品，支援刪除 |
| `/mid_14/static` | 靜態版分類頁 |
| `/mid_14/static/[category]` | 靜態版分類商品頁 |
| `/exam/midterm` | 期中考版商品分類頁 |
| `/exam/midterm/[category]` | 期中考版分類商品頁 |

### Quiz 1 — Blog

| 路由 | 功能說明 |
|------|----------|
| `/quiz1_14` | Quiz 1 入口頁 |
| `/quiz1_14/blog_14` | Blog — 本地 JSON 資料 |
| `/quiz1_14/blog_db_14` | Blog — PostgreSQL + Server Actions |

### Quiz 2 — Blog 管理後台

以 `Blog2_14` 模型為基礎的部落格管理系統。

| 路由 | 功能說明 |
|------|----------|
| `/quiz2_14` | 精選文章首頁（Featured Blogs） |
| `/quiz2_14/admin_14` | 管理後台 |
| `/quiz2_14/admin_14/blogs_14` | 文章列表 |
| `/quiz2_14/admin_14/blogs_14/create` | 新增文章 |
| `/quiz2_14/admin_14/blogs_14/[id]/edit` | 編輯文章 |

### 期末電商 `store_14`

| 路由 | 功能說明 |
|------|----------|
| `/store_14` | 商店首頁（Hero + Featured Products） |
| `/store_14/about_14` | 關於頁 |
| `/store_14/products_14` | 商品列表（含搜尋、Grid/List 切換） |
| `/store_14/products_14/[id]` | 商品詳細頁（加入購物車、收藏、評論） |
| `/store_14/cart_14` | 購物車 |
| `/store_14/checkout_14` | 結帳 → 導向 Stripe Checkout |
| `/store_14/favorites_14` | 我的收藏（需登入） |
| `/store_14/orders_14` | 我的訂單（需登入） |
| `/store_14/reviews_14` | 我的評論（需登入） |
| `/store_14/admin_14` | 管理後台首頁（僅 admin） |
| `/store_14/admin_14/products_14` | 商品管理：列表 / 編輯 / 刪除 |
| `/store_14/admin_14/sales_14` | 已付款訂單統計 |

> Demo 版：所有 `/demo/*` 路徑為相對應頁面的示範複本。

### API Routes

| 路由 | 說明 |
|------|------|
| `GET /api/seed` | 寫入商品 Seed 資料 |
| `GET /api/test-db` | 測試 DB 連線 |
| `POST /api/store_14/payment` | 建立 Stripe Checkout Session 並回傳付款 URL |
| `GET /api/store_14/confirm` | Stripe 付款完成後的回呼，標記訂單為已付款 |

---

## 認證與權限（Clerk）

- **登入 / 註冊**：透過 Clerk Modal 觸發，登入後 Navbar 右上角顯示使用者大頭貼（`useUser().imageUrl`）。
- **管理員判定**：環境變數 `ADMIN_USER_ID` 紀錄管理員的 Clerk `userId`。
- **兩層保護**：
  1. **Middleware**（[src/proxy.ts](src/proxy.ts)）：
     - 公開路由：`/`、`/store_14`、`/store_14/products_14(.*)`、`/store_14/about_14`、`/api/store_14/confirm`
     - `/store_14/admin_14(.*)` 非管理員 → 重導至 `/store_14`
     - 其餘路由 → `auth.protect()` 強制登入
     - 阻擋帶有 `x-middleware-subrequest` 標頭的請求（回傳 403）
  2. **Server Action 守門**：每個 admin action 開頭呼叫 `getAdminUser()`，比對 `userId === ADMIN_USER_ID`，不符即丟錯。

---

## 金流（Stripe Checkout）

1. 使用者於 `/store_14/checkout_14` 觸發結帳。
2. `POST /api/store_14/payment` 以購物車內容建立 Stripe Checkout Session，回傳付款 URL。
3. 使用者於 Stripe 完成付款後，導回 `GET /api/store_14/confirm`。
4. 回呼驗證付款狀態，將對應 `Order.isPaid` 標記為 `true`。

> App 的對外網址依序取自 `NEXT_PUBLIC_APP_URL` → `VERCEL_URL` → 請求 origin。

---

## 資料庫 Schema（節錄）

完整內容請參考 [prisma/schema.prisma](prisma/schema.prisma)。

```prisma
// 基礎練習
model User        { id Int @id @default(autoincrement()) ... }
model Post        { id Int @id @default(autoincrement()) ... }
model GroceryItem { id String @id @default(cuid()) ... }

// 期中考 / Quiz
model Blog_14     { id Int @id ... }                      // Quiz 1 Blog
model Blog2_14    { id String @id @default(uuid()) ... }  // Quiz 2 Blog（含 featured）
model Category_14 { cid Int @id ... }
model Shop_14     { pid Int @id ... }

// 期末電商
model Product {
  id          String   @id @default(uuid())
  name        String
  company     String
  description String
  featured    Boolean
  image       String
  price       Int
  clerkId     String
  favorites   Favorite[]
  reviews     Review[]
  cartItems   CartItem[]
}
model Favorite { ... }
model Review   { rating Int; comment String; authorName String; ... }
model Cart     { numItemsInCart Int; cartTotal Int; tax / shipping / taxRate / orderTotal ... }
model CartItem { amount Int; cart Cart; product Product }
model Order    { products Int; orderTotal Int; email String; isPaid Boolean }
```

Prisma client 透過 `generator client { output = "../src/generated/prisma" }` 輸出，imports 統一使用：

```ts
import { PrismaClient, Prisma } from '@/generated/prisma/client';
```

資料庫連線封裝於 [src/lib/prisma.ts](src/lib/prisma.ts)，使用 `@prisma/adapter-pg`；缺少 `DATABASE_URL` 時回傳 `null` 與 `prismaError`，避免建置階段失敗。

---

## 環境變數

建立 `.env`：

```env
# PostgreSQL / Supabase
DATABASE_URL="postgresql://postgres.[project]:[password]@[region].pooler.supabase.com:5432/postgres"
DIRECT_URL="postgresql://postgres.[project]:[password]@[region].supabase.com:5432/postgres"

# Supabase 公開金鑰
NEXT_PUBLIC_SUPABASE_URL="https://[project].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
SUPABASE_SECRET_KEY="sb_secret_..."

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
ADMIN_USER_ID="user_xxx"          # 管理員的 Clerk userId

# Stripe
STRIPE_SECRET_KEY="sk_test_..."

# App 對外網址（用於 Stripe 回呼，可選；未設定時退回 VERCEL_URL / 請求 origin）
NEXT_PUBLIC_APP_URL="https://1142-vercel-ltlin-14.vercel.app"
```

---

## 本地開發

```bash
# 安裝套件（postinstall 會自動執行 prisma generate）
npm install

# 同步資料庫 schema
npx prisma db push

# 啟動開發伺服器（Webpack 模式）
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)

### 可用指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器（`next dev --webpack`） |
| `npm run build` | `prisma generate` + `next build --webpack` |
| `npm run start` | 啟動正式伺服器 |
| `npm run lint` | ESLint 檢查 |
| `npm run typecheck` | `tsc --noEmit` 型別檢查 |

### 資料庫 Seeding

- `npx prisma db seed`：執行 [prisma/seed.ts](prisma/seed.ts) 寫入電商商品種子資料
- `/seed_14`：UI 介面寫入期中考 shop + blog 測試資料
- `GET /api/seed`：以 API 寫入商品 Seed 資料
- 也可使用 [scripts/](scripts/) 下的腳本（例：`npx tsx scripts/seed-orders.ts` 寫入測試訂單）

---

## 部署

部署於 **Vercel**，需設定以下環境變數：

`DATABASE_URL`、`DIRECT_URL`、`NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`、`SUPABASE_SECRET_KEY`、`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`、`CLERK_SECRET_KEY`、`ADMIN_USER_ID`、`STRIPE_SECRET_KEY`、`NEXT_PUBLIC_APP_URL`

```bash
npm run build   # 本地建置驗證
```

---

## 專案結構

```
src/
├── app/
│   ├── _assets/             # 共用 styled-components Wrapper / 字型 / 資料
│   ├── actions_14/          # Server Actions 示範
│   ├── counter_14/          # useState 計數器
│   ├── grocery_14/          # Grocery (localStorage)
│   ├── grocery_db_14/       # Grocery (Prisma)
│   ├── user_db_14/          # User CRUD
│   ├── tours_14/            # 外部 API
│   ├── supabase_14/         # Supabase 整合
│   ├── mid_14/              # 期中考商店
│   ├── exam/midterm/        # 期中考版商店
│   ├── quiz1_14/            # Quiz 1 Blog（本地 JSON / DB）
│   ├── quiz2_14/            # Quiz 2 Blog 管理後台
│   ├── seed_14/             # DB Seeding UI
│   ├── store_14/            # 期末電商
│   │   ├── _components/     # Navbar / Product / Cart / Form 元件
│   │   ├── _utils/          # action.ts / types.ts / format.ts
│   │   ├── about_14/
│   │   ├── products_14/
│   │   ├── cart_14/
│   │   ├── checkout_14/     # Stripe 結帳導向
│   │   ├── favorites_14/
│   │   ├── orders_14/
│   │   ├── reviews_14/
│   │   └── admin_14/        # 管理後台（products_14 / sales_14）
│   ├── demo/                # 全頁面 demo 複本
│   └── api/                 # seed / test-db / store_14 (payment, confirm)
├── actions/                 # 共用 Server Actions
├── components/              # 共用 React Components + shadcn/ui
├── generated/prisma/        # Prisma Client 產出
├── lib/
│   ├── prisma.ts            # Prisma Client singleton (PrismaPg adapter)
│   └── supabase/
└── proxy.ts                 # Clerk middleware（公開 / admin 路由設定）
prisma/
├── schema.prisma
├── seed.ts                  # 電商商品 seed
└── store/
    ├── products.json
    └── store.sql
scripts/                     # 一次性腳本（seed-orders 等）
public/
├── images/midterm/          # 期中考靜態圖
└── store/                   # 電商商品圖
```
