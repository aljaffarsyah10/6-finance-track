# TECHNICAL PLAN & ARCHITECTURE
## MoneyTrack — Personal Finance Management Platform (MVP)

**Document Version:** 1.0.0  
**Phase:** Phase 2 — Technical Planning & Architecture  
**Architect:** Senior Software Architect  
**Traceability Reference:** `PRD and Playbook.md`  

---

## 1. Architecture Overview

MoneyTrack dibangun menggunakan arsitektur **Modular Monolith** berbasis **Next.js App Router (Full-Stack)**. Seluruh aplikasi (frontend UI, backend route handlers, validasi skema, dan database access layer) dikelola dalam satu repository terpadu (*single cohesive codebase*) tanpa overhead kompleksitas microservices.

### 1.1 Layered Architecture Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Browser / UI                      │
│   (Next.js App Router Pages, React Server/Client Components)│
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON API Fetch
┌──────────────────────────────▼──────────────────────────────┐
│                  Next.js Route Handlers                     │
│                (src/app/api/**/route.ts)                    │
│      - Middleware & Session Verification (Auth.js)          │
│      - Request Validation (Zod Schemas)                     │
│      - HTTP Response Formatting & Status Codes              │
└──────────────────────────────┬──────────────────────────────┘
                               │ Calls
┌──────────────────────────────▼──────────────────────────────┐
│                       Service Layer                         │
│                    (src/services/*.ts)                      │
│      - Core Business Logic & Financial Calculations         │
│      - Authorization & Ownership Verification               │
│      - Data Transformation & Decimal / BigInt Serialization │
└──────────────────────────────┬──────────────────────────────┘
                               │ Calls
┌──────────────────────────────▼──────────────────────────────┐
│                     Repository Layer                        │
│                   (src/repositories/*.ts)                   │
│      - Database Query Isolation (Prisma ORM)                │
│      - Strict Multi-tenancy Scoping (userId filter)         │
│      - Database Transactions ($transaction)                 │
└──────────────────────────────┬──────────────────────────────┘
                               │ Prisma Client
┌──────────────────────────────▼──────────────────────────────┐
│                    PostgreSQL Database                      │
│          (Relational Tables, Foreign Keys, Indexes)         │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Architectural Principles
1. **MVP First & Simplicity**: Mengutamakan fungsi inti pencatatan, anggaran, dan analisis keuangan tanpa dependensi eksternal yang tidak diperlukan.
2. **Strict Multi-Tenant Isolation**: Setiap transaksi dan entitas data terikat langsung ke `userId`. Tidak ada query baca/tulis yang diizinkan tanpa memfilter `userId` milik pengguna terautentikasi.
3. **Financial Precision Guarantee**: Menggunakan representasi bilangan bulat (`BigInt` / `Int` IDR) untuk mencegah bug floating-point precision yang umum terjadi pada sistem keuangan.
4. **Separation of Concerns**: Logika bisnis finansial tidak ditaruh di dalam komponen UI atau langsung di dalam Route Handler, melainkan dienkapsulasi pada *Service Layer*.

---

## 2. Technology Decisions

| Domain | Technology Selected | Version / Type | Justification |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js | 16.x (App Router) | Framework React modern dengan hybrid rendering (RSC + Client Components), built-in routing, API route handlers, dan performa tinggi. |
| **Language** | TypeScript | 5.x (Strict Mode) | Menjamin type-safety menyeluruh dari skema database hingga komponen UI untuk meminimalkan runtime error. |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS dengan ukuran bundle minimal, integrasi tema CSS variables modern. |
| **UI Components** | shadcn/ui | Base / Nova | Komponen headless yang dapat dikustomisasi secara penuh, accessible, dan terisolasi di dalam repository tanpa vendor lock-in. |
| **Icons** | Lucide React | Latest | Kumpulan icon ringan, konsisten, dan mudah di-tree-shake. |
| **Charts** | Recharts | 3.x | Visualisasi data keuangan (cashflow bar charts, expense breakdown pie charts) yang fleksibel dan reaktif. |
| **Form Handling** | React Hook Form | 7.x | Manajemen form performan tanpa re-render berlebih, integrasi native dengan schema validation. |
| **Validation** | Zod | 4.x / Latest | Runtime schema validation untuk client-side form validation dan server-side API request payloads. |
| **Database** | PostgreSQL | 15+ / 16+ | Database relasional ACID-compliant yang terpercaya untuk transaksi keuangan, indexing, dan integritas data foreign key. |
| **ORM** | Prisma ORM | Latest | Type-safe database client, declarative schema modeling, dan automated migration management. |
| **Authentication** | Auth.js (NextAuth) | v5 (Beta / Latest) | Standar autentikasi Next.js dengan JWT session strategy, secure HTTP-only cookies, dan credentials provider. |
| **Password Hashing**| Argon2id / bcryptjs | Latest | Algoritma hashing adaptif dan aman terhadap serangan brute-force. |
| **State Management**| React State + Zustand | Zustand 5.x | State lokal untuk interaksi form/tabel; Zustand disiapkan hanya untuk kebutuhan global client state jika diperlukan. |
| **Deployment** | Docker & Docker Compose | Multi-stage build | Menjamin portabilitas lingkungan antara staging dan production VPS dengan reverse proxy Nginx. |

---

## 3. Final Folder Structure

Sesuai dengan Bagian 12.4 dari PRD, struktur project diatur secara modular dan terstruktur:

```
moneytrack/
├── .env.example
├── .gitignore
├── components.json
├── docker-compose.yml
├── Dockerfile
├── next.config.ts
├── package.json
├── PRD and Playbook.md
├── README.md
├── TECHNICAL_PLAN.md
├── tsconfig.json
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   ├── favicon.ico
│   └── icons/
└── src/
    ├── app/
    │   ├── (auth)/
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   └── register/
    │   │       └── page.tsx
    │   ├── (dashboard)/
    │   │   ├── layout.tsx
    │   │   ├── dashboard/
    │   │   │   └── page.tsx
    │   │   ├── transactions/
    │   │   │   └── page.tsx
    │   │   ├── accounts/
    │   │   │   └── page.tsx
    │   │   ├── categories/
    │   │   │   └── page.tsx
    │   │   ├── budgets/
    │   │   │   └── page.tsx
    │   │   ├── reports/
    │   │   │   └── page.tsx
    │   │   └── settings/
    │   │       └── page.tsx
    │   ├── (marketing)/
    │   │   └── page.tsx
    │   ├── api/
    │   │   ├── auth/
    │   │   │   ├── [...nextauth]/route.ts
    │   │   │   └── register/route.ts
    │   │   ├── accounts/
    │   │   │   ├── route.ts
    │   │   │   └── [id]/route.ts
    │   │   ├── categories/
    │   │   │   ├── route.ts
    │   │   │   └── [id]/route.ts
    │   │   ├── transactions/
    │   │   │   ├── route.ts
    │   │   │   └── [id]/route.ts
    │   │   ├── budgets/
    │   │   │   ├── route.ts
    │   │   │   └── [id]/route.ts
    │   │   ├── dashboard/
    │   │   │   ├── summary/route.ts
    │   │   │   ├── recent-transactions/route.ts
    │   │   │   └── expense-breakdown/route.ts
    │   │   └── reports/
    │   │       ├── cashflow/route.ts
    │   │       ├── expenses/route.ts
    │   │       └── income-expense/route.ts
    │   ├── globals.css
    │   └── layout.tsx
    ├── components/
    │   ├── charts/
    │   ├── common/
    │   ├── layout/
    │   └── ui/
    ├── features/
    │   ├── accounts/
    │   ├── auth/
    │   ├── budgets/
    │   ├── categories/
    │   ├── dashboard/
    │   ├── reports/
    │   └── transactions/
    ├── lib/
    │   ├── auth.ts
    │   ├── prisma.ts
    │   ├── utils.ts
    │   └── validations/
    │       ├── account.schema.ts
    │       ├── auth.schema.ts
    │       ├── budget.schema.ts
    │       ├── category.schema.ts
    │       └── transaction.schema.ts
    ├── repositories/
    │   ├── account.repository.ts
    │   ├── budget.repository.ts
    │   ├── category.repository.ts
    │   └── transaction.repository.ts
    ├── services/
    │   ├── account.service.ts
    │   ├── budget.service.ts
    │   ├── dashboard.service.ts
    │   ├── report.service.ts
    │   └── transaction.service.ts
    ├── stores/
    │   └── ui.store.ts
    ├── types/
    │   └── index.ts
    └── middleware.ts
```

---

## 4. Database Architecture & Schema (Prisma ORM)

### 4.1 Prisma Schema Definition

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum AccountType {
  CASH
  BANK
  E_WALLET
  OTHER
}

enum TransactionType {
  INCOME
  EXPENSE
}

model User {
  id           String        @id @default(cuid())
  name         String
  email        String        @unique
  passwordHash String
  accounts     Account[]
  categories   Category[]
  transactions Transaction[]
  budgets      Budget[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model Account {
  id             String        @id @default(cuid())
  userId         String
  name           String
  type           AccountType
  initialBalance BigInt        @default(0)
  user           User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  transactions   Transaction[]
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt

  @@index([userId])
}

model Category {
  id           String          @id @default(cuid())
  userId       String
  name         String
  type         TransactionType
  icon         String?
  color        String?
  user         User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  transactions Transaction[]
  budgets      Budget[]
  createdAt    DateTime        @default(now())

  @@unique([userId, name, type])
  @@index([userId])
}

model Transaction {
  id              String          @id @default(cuid())
  userId          String
  accountId       String
  categoryId      String
  type            TransactionType
  amount          BigInt
  description     String?
  transactionDate DateTime

  user            User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  account         Account         @relation(fields: [accountId], references: [id], onDelete: Restrict)
  category        Category        @relation(fields: [categoryId], references: [id], onDelete: Restrict)

  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt

  @@index([userId, transactionDate])
  @@index([accountId])
  @@index([categoryId])
}

model Budget {
  id         String   @id @default(cuid())
  userId     String
  categoryId String
  amount     BigInt
  month      Int
  year       Int

  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@unique([userId, categoryId, month, year])
  @@index([userId, year, month])
}
```

### 4.2 Database Design Decisions & Guardrails
1. **Integer/BigInt Currency Storage**: Kolom `amount` dan `initialBalance` bertipe `BigInt` (satuan Rupiah utuh tanpa desimal).
2. **BigInt Serialization**: Karena JSON native tidak mendukung tipe `BigInt`, seluruh response API mengonversi `BigInt` menjadi `string` atau numeric integer yang aman (`Number(val)` dengan verifikasi batas `Number.MAX_SAFE_INTEGER`).
3. **Foreign Key Integrity**:
   - `User` cascade delete ke seluruh child entities.
   - `Account` dan `Category` menggunakan relasi `Restrict` pada `Transaction` untuk mencegah penghapusan akun/kategori yang memiliki riwayat transaksi aktif tanpa persetujuan eksplisit.
4. **Optimized Compound Indexes**:
   - `[userId, transactionDate]` mempercepat query laporan bulanan dan filter rentang tanggal.
   - `[userId, categoryId, month, year]` memastikan keunikan anggaran per kategori per periode.

---

## 5. API Design & Endpoint Contracts

Seluruh response API mengadopsi format konsisten (*Unified JSON Envelope*).

```typescript
// Sukses
{
  "success": true,
  "data": T,
  "message"?: string
}

// Gagal
{
  "success": false,
  "error": {
    "code": string,
    "message": string,
    "details"?: unknown
  }
}
```

### 5.1 Authentication Endpoints
* **`POST /api/auth/register`**
  * *Request Body*: `{ name: string, email: string, password: string }`
  * *Response 201*: `{ success: true, data: { id: string, name: string, email: string } }`
  * *Errors*: `400 Bad Request` (Zod validation), `409 Conflict` (Email sudah terdaftar).
* **`GET /api/auth/session`**
  * *Response 200*: Current session info via Auth.js.

### 5.2 Accounts Endpoints
* **`GET /api/accounts`**
  * Mengambil daftar seluruh akun finansial milik user beserta saldo terkini yang dihitung dinamis.
  * *Response 200*: `{ success: true, data: Array<{ id, name, type, initialBalance: string, currentBalance: string, createdAt }> }`
* **`POST /api/accounts`**
  * *Request Body*: `{ name: string, type: AccountType, initialBalance: number }`
  * *Response 201*: `{ success: true, data: Account }`
* **`PATCH /api/accounts/:id`**
  * *Request Body*: `{ name?: string, type?: AccountType, initialBalance?: number }`
  * *Response 200*: `{ success: true, data: Account }`
* **`DELETE /api/accounts/:id`**
  * *Response 200*: `{ success: true, message: "Akun berhasil dihapus" }`
  * *Error 400*: Jika akun masih memiliki transaksi terikat.

### 5.3 Categories Endpoints
* **`GET /api/categories`**
  * *Query Params*: `?type=INCOME|EXPENSE` (opsional)
  * *Response 200*: `{ success: true, data: Array<Category> }`
* **`POST /api/categories`**
  * *Request Body*: `{ name: string, type: TransactionType, icon?: string, color?: string }`
  * *Response 201*: `{ success: true, data: Category }`
* **`PATCH /api/categories/:id`**
  * *Request Body*: `{ name?: string, icon?: string, color?: string }`
  * *Response 200*: `{ success: true, data: Category }`
* **`DELETE /api/categories/:id`**
  * *Response 200*: `{ success: true, message: "Kategori berhasil dihapus" }`

### 5.4 Transactions Endpoints
* **`GET /api/transactions`**
  * *Query Params*: `?startDate=&endDate=&accountId=&categoryId=&type=&page=1&limit=20`
  * *Response 200*: `{ success: true, data: { transactions: Array<Transaction>, pagination: { total, page, totalPages } } }`
* **`POST /api/transactions`**
  * *Request Body*: `{ accountId: string, categoryId: string, type: TransactionType, amount: number, transactionDate: string (ISO), description?: string }`
  * *Validation*: Verifikasi bahwa `accountId` dan `categoryId` adalah milik user aktif dan tipe kategori cocok dengan tipe transaksi.
  * *Response 201*: `{ success: true, data: Transaction }`
* **`GET /api/transactions/:id`**
  * *Response 200*: `{ success: true, data: Transaction }`
* **`PATCH /api/transactions/:id`**
  * *Request Body*: Partial update untuk field transaksi.
  * *Response 200*: `{ success: true, data: Transaction }`
* **`DELETE /api/transactions/:id`**
  * *Response 200*: `{ success: true, message: "Transaksi berhasil dihapus" }`

### 5.5 Budgets Endpoints
* **`GET /api/budgets`**
  * *Query Params*: `?month=number&year=number`
  * *Response 200*: `{ success: true, data: Array<{ id, categoryId, categoryName, amount: string, spent: string, remaining: string, percentage: number }> }`
* **`POST /api/budgets`**
  * *Request Body*: `{ categoryId: string, amount: number, month: number, year: number }`
  * *Response 201*: `{ success: true, data: Budget }`
* **`PATCH /api/budgets/:id`**
  * *Request Body*: `{ amount: number }`
  * *Response 200*: `{ success: true, data: Budget }`
* **`DELETE /api/budgets/:id`**
  * *Response 200*: `{ success: true, message: "Anggaran berhasil dihapus" }`

### 5.6 Dashboard Endpoints
* **`GET /api/dashboard/summary`**
  * *Response 200*: `{ success: true, data: { totalBalance: string, monthlyIncome: string, monthlyExpense: string, netCashFlow: string } }`
* **`GET /api/dashboard/recent-transactions`**
  * *Response 200*: `{ success: true, data: Array<Transaction> }` (5-10 transaksi terakhir)
* **`GET /api/dashboard/expense-breakdown`**
  * *Query Params*: `?month=&year=`
  * *Response 200*: `{ success: true, data: Array<{ categoryName: string, amount: string, percentage: number, color?: string }> }`

### 5.7 Reports Endpoints
* **`GET /api/reports/cashflow`**
  * *Query Params*: `?year=`
  * *Response 200*: Tren bulanan (Jan-Des): income, expense, net cashflow.
* **`GET /api/reports/expenses`**
  * *Query Params*: `?startDate=&endDate=`
  * *Response 200*: Pengeluaran terperinci per kategori dan persentase.
* **`GET /api/reports/income-expense`**
  * *Query Params*: `?startDate=&endDate=`
  * *Response 200*: Perbandingan total income vs total expense dalam periode terpilih.

---

## 6. Authentication Design

1. **Library**: Auth.js (NextAuth.js v5).
2. **Strategy**: JSON Web Token (JWT) Session.
   - Token disimpan di HTTP-only, SameSite Secure Cookie.
   - Sesi di-decode di Route Handler dan Middleware Next.js untuk mendapatkan `userId`.
3. **Password Hashing**: Menggunakan `argon2` atau `bcryptjs` dengan *salt rounds* 10–12.
4. **Middleware Protection**:
   - `src/middleware.ts` memeriksa token sesi pada semua rute `/(dashboard)/*` dan `/api/*` (kecuali `/api/auth/*` dan rute publik).
   - Pengguna unauthenticated diarahkan secara otomatis ke `/login`.

---

## 7. Authorization & Data Isolation Design

Setiap operasi data wajib mematuhi aturan isolasi tenant:
1. **Zero Trust ID Query**: Tidak diperbolehkan melakukan pencarian resource hanya dengan `where: { id }`.
2. **Mandatory User Scoping**: Setiap query wajib menyertakan `userId: session.user.id`:
   ```typescript
   // Validasi Ownership
   const transaction = await prisma.transaction.findFirst({
     where: {
       id: transactionId,
       userId: session.user.id,
     },
   });
   if (!transaction) {
     throw new NotFoundError("Transaksi tidak ditemukan atau bukan milik Anda.");
   }
   ```
3. **Cross-Entity Ownership Validation**:
   Sebelum membuat transaksi baru, service wajib memverifikasi bahwa `accountId` dan `categoryId` adalah milik `session.user.id` yang sama, guna mencegah injeksi referensi data antar pengguna.

---

## 8. Financial Business Rules & Calculation Engine

### 8.1 Formulir Perhitungan Finansial
1. **Perhitungan Saldo Akun (Account Balance)**:
   $$\text{CurrentBalance} = \text{InitialBalance} + \sum \text{Income} - \sum \text{Expense}$$
2. **Net Cash Flow Periode**:
   $$\text{NetCashFlow} = \sum \text{Income}_{\text{periode}} - \sum \text{Expense}_{\text{periode}}$$
3. **Sisa Anggaran (Budget Remaining)**:
   $$\text{RemainingBudget} = \text{BudgetAmount} - \sum \text{Expense}_{\text{kategori, bulan, tahun}}$$
4. **Persentase Pemakaian Anggaran (Budget Usage %)**:
   $$\text{UsagePercentage} = \begin{cases} 
   0\% & \text{jika } \text{BudgetAmount} \le 0 \\
   \min\left(\frac{\text{TotalExpense}}{\text{BudgetAmount}} \times 100, 999\right) & \text{jika } \text{BudgetAmount} > 0
   \end{cases}$$
   *Safety guard*: Pembagian dengan nol dicegah secara eksplisit.

### 8.2 Batasan Nominal & Integritas
* Seluruh input nominal di-parse menjadi integer positif IDR (`z.number().int().positive()`).
* Transaksi bernilai 0 tidak diizinkan.
* Transaksi tanggal masa depan dicatat dengan tanggal transaksi aktual, namun summary dashboard bulan berjalan hanya menyertakan transaksi yang tanggalnya $\le$ waktu saat ini atau dalam rentang bulan yang dipilih.
* Transfer antar-akun sengaja **di luar cakupan MVP** untuk menghindari distorsi ganda pada laporan income/expense.

---

## 9. Error Handling Strategy

1. **Standardized HTTP Status Codes**:
   * `200 OK`: Permintaan berhasil.
   * `201 Created`: Resource baru berhasil dibuat.
   * `400 Bad Request`: Validasi skema Zod gagal / format request tidak valid.
   * `401 Unauthorized`: Belum terautentikasi / sesi habis.
   * `403 Forbidden`: Tidak memiliki hak akses ke resource.
   * `404 Not Found`: Resource tidak ditemukan.
   * `409 Conflict`: Data duplikat (misal unique constraint violation).
   * `500 Internal Server Error`: Kesalahan server tidak terduga.
2. **Error Boundary & Feedback**:
   * Di sisi server: Logging error terpusat tanpa mengekspos stack trace atau query internal ke response client.
   * Di sisi client: Notifikasi toast reaktif menggunakan `sonner` dan inline feedback form error dari React Hook Form.

---

## 10. Security & Privacy

1. **Input Sanitization**: Seluruh payload HTTP divalidasi ketat menggunakan skema Zod sebelum diproses oleh service.
2. **SQL Injection Protection**: Seluruh interaksi database menggunakan parameterised query bawaan Prisma ORM.
3. **Data Protection**:
   * Kolom `passwordHash` tidak pernah diikutsertakan dalam `select` query response JSON.
   * Cookies dikonfigurasi dengan flag `HttpOnly`, `SameSite=Lax`, dan `Secure` (di production HTTPS).
4. **Rate Limiting**: Rate limiting berbasis IP/in-memory atau reverse proxy disiapkan untuk endpoint sensitif (`/api/auth/register`, `/api/auth/callback/credentials`).

---

## 11. Deployment Architecture

1. **Containerization**:
   * `Dockerfile` multi-stage build untuk mengompilasi Next.js menjadi standalone binary yang ringkas.
   * `docker-compose.yml` mengorkestrasi dua container utama:
     * `moneytrack-web`: Node.js Next.js application container.
     * `moneytrack-db`: PostgreSQL 16 container dengan volume persisten data.
2. **Reverse Proxy & HTTPS**:
   * Nginx di host VPS bertindak sebagai reverse proxy yang mengarahkan trafik port 80/443 ke container web.
   * Sertifikat SSL dikelola secara otomatis menggunakan Let's Encrypt / Certbot.
3. **Environment Management**:
   * Variabel lingkungan produksi diinjeksi via `.env` rahasia di server (tidak di-commit ke Git).

---

## 12. Technical Risks & Mitigation Strategies

| Risiko Teknis | Tingkat Dampak | Strategi Mitigasi |
| :--- | :--- | :--- |
| **Inakurasi Saldo / Floating Point** | High | Menggunakan `BigInt` / integer absolut rupiah di database dan Zod integer validator. Unit test khusus perhitungan matematika keuangan. |
| **Kebocoran Data Antar Pengguna** | Critical | Wajib menyertakan `userId: session.user.id` pada setiap query Prisma tanpa pengecualian. Cross-validation foreign key pada service layer. |
| **Performa Query Laporan Lambat** | Medium | Index gabungan `[userId, transactionDate]` dan `[userId, year, month]` pada database. Penggunaan agregasi database (`_sum`, `groupBy`). |
| **Prisma Migration Desync** | High | Menggunakan migration terkelola (`prisma migrate deploy`) pada CI/CD atau script deployment VPS, dilarang mengubah skema secara manual. |
| **Perubahan API Auth.js** | Medium | Mengisolasi modul autentikasi pada `src/lib/auth.ts` dengan interface adaptor yang terstandarisasi. |

---

*Akhir Dokumen — TECHNICAL_PLAN.md*
