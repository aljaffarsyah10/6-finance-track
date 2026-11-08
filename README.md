# 💎 MoneyTrack — Executive Wealth & Personal Finance Platform

<div align="center">

![MoneyTrack Hero Banner](public/screenshots/dashboard.png)

[![Next.js](https://img.shields.io/badge/Next.js-16.4.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-7.10-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-v5_Beta-purple?style=for-the-badge&logo=auth0)](https://authjs.dev/)
[![Vitest](https://img.shields.io/badge/Tests-32%2F32_Passed-success?style=for-the-badge&logo=vitest)](https://vitest.dev/)

<p align="center">
  <b>Aplikasi Manajemen Keuangan Pribadi & Multi-Akun Kelas Eksekutif</b><br/>
  Dibangun dengan presisi aritmatika integer Rupiah tanpa floating-point error, keamanan multi-tenant tingkat tinggi, dan desain ultra-premium berkelas internasional.
</p>

</div>

---

## 🌟 Highlight & Keunggulan Utama

- **🛡️ Multi-Tenant Vault Isolation**: Arsitektur isolasi data 100% ketat. Setiap akun, kategori, transaksi, dan anggaran terikat pada `userId` terverifikasi via session JWT NextAuth, mencegah kebocoran data antar pengguna.
- **💰 Aritmatika Integer Rupiah Mutlak (No Floating-Point)**: Seluruh perhitungan moneter disimpan dan diproses dalam format integer (`BigInt` / Rupiah bulat) untuk menjamin akurasi finansial 100% tanpa distorsi floating-point IEEE-754.
- **✨ Luxury Executive Design System**: Antarmuka modern yang memadukan palet warna **Deep Navy (`#14213D`)**, **Warm Cream (`#FAF7F2`)**, dan **Vibrant Coral (`#FF6B5B`)**, dilengkapi *multi-layer ambient gradient mesh*, *pinned sidebar* tetap (tidak ikut tergeser saat di-scroll), dan *specular glassmorphic cards*.
- **💳 Executive Smart Cards (Accounts)**: Tampilan visual kartu perbankan premium lengkap dengan simulasi chip EMV emas, gradient metalik, nomor rekening terproteksi (*masked*), dan telemetry saldo real-time.
- **📊 Real-time Financial Telemetry & Charts**: Visualisasi grafik interaktif tren arus kas bulanan menggunakan *SVG Linear Gradient Fill* (Area & Bar chart) berbasis Recharts.
- **🎯 Dynamic Budget Threshold Engine**: Monitoring real-time batas pengeluaran per kategori dengan indikator visual dinamis (Aman, Peringatan >80%, dan Bahaya >100%).
- **⚡ Next.js 16 Turbopack & React 19 Ready**: Performa kilat dengan server-side rendering, caching optimal, dan waktu muat halaman instan.

---

## 📸 Galeri Antarmuka (UI Showcase)

### 1. Dashboard Utama (Executive Financial Overview)
Ringkasan kekayaan bersih, saldo antar akun, tren arus kas 6 bulan terakhir, dan transaksi terkini dalam satu layar kendali terpadu.

![Executive Dashboard](public/screenshots/dashboard.png)

---

### 2. Manajemen Rekening & Dompet (Executive Smart Cards)
Kartu debit/kredit dan dompet digital yang dirancang layaknya kartu perbankan eksekutif dengan chip EMV dan palet metalik.

![Executive Smart Cards](public/screenshots/accounts.png)

---

### 3. Buku Kas & Riwayat Transaksi (Transactions Vault)
Pencatatan pemasukan dan pengeluaran dengan filter cerdas (pencarian teks, rentang tanggal, jenis akun, dan kategori), pagination responsif, serta fitur **Ekspor CSV**.

![Transactions Vault](public/screenshots/transactions.png)

---

### 4. Alokasi Anggaran Bulanan (Budgeting Intelligence)
Perencanaan anggaran bulanan dengan progress bar interaktif, perhitungan sisa dana otomatis, serta peringatan ambang batas.

![Monthly Budgets](public/screenshots/budgets.png)

---

### 5. Laporan Keuangan Tahunan (Financial Analytics & Reports)
Analisis mendalam arus kas tahunan, komparasi pendapatan vs pengeluaran, serta breakdown persentase pengeluaran per kategori.

![Financial Reports](public/screenshots/reports.png)

---

### 6. Autentikasi Modern (Secure Login & Register)
Pintu masuk terenkripsi dengan proteksi BCrypt dan NextAuth.js JWT session token.

| Halaman Masuk (Login) | Halaman Pendaftaran (Register) |
| :---: | :---: |
| ![Login Page](public/screenshots/login.png) | ![Register Page](public/screenshots/register.png) |

---

## 🏗️ Arsitektur & Teknologi

| Layer | Teknologi & Library | Deskripsi |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.4.4 (App Router) | Fullstack React framework dengan Turbopack |
| **Language** | TypeScript 5.x | Strict type safety di seluruh layer frontend & backend |
| **Database** | PostgreSQL 16+ | Database relasional ACID-compliant |
| **ORM & Driver** | Prisma 7.10 + `@prisma/adapter-pg` | High-performance type-safe ORM dengan driver adapter pooling |
| **Authentication** | NextAuth.js v5 (Auth.js) | Session management berbasis JWT token dengan proteksi CSRF |
| **Styling & UI** | Tailwind CSS + Lucide Icons + Base UI | Desain custom modern dengan glassmorphism & ambient mesh |
| **Data Visualization** | Recharts (ResponsiveContainer) | Grafik interaktif Bar & Area chart dengan custom SVG gradients |
| **Form & Validation** | React Hook Form + Zod | Validasi skema input ketat di sisi klien dan server |
| **Testing** | Vitest + Testing Library | 32 skenario pengujian unit & integrasi otomatis (100% Passed) |

---

## 🚀 Panduan Memulai (Quick Start)

### 1. Prasyarat Sistem
- **Node.js**: versi `20.x` atau lebih baru
- **PostgreSQL**: versi `16+` (lokal atau cloud seperti Neon/Supabase)
- **NPM** atau **PNPM**

### 2. Kloning Repositori & Instalasi Dependensi
```bash
git clone https://github.com/your-username/moneytrack.git
cd moneytrack
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` ke `.env`:
```bash
cp .env.example .env
```

Sesuaikan variabel berikut di dalam `.env`:
```env
# Koneksi PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/moneytrack?schema=public"

# Kunci Rahasia Autentikasi (NextAuth v5)
AUTH_SECRET="your-super-secret-random-32-character-key"
AUTH_URL="http://localhost:3000"

# URL Aplikasi
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### 4. Migrasi Database & Seeding Data Awal
Jalankan migrasi skema Prisma ke database PostgreSQL Anda:
```bash
# Push skema database
npx prisma db push

# Jalankan seeder akun & kategori default
npm run db:seed
```

> **Akun Demo Bawaan:**
> - Email: `demo@moneytrack.local`
> - Kata Sandi: `password123`

### 5. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka peramban di [http://localhost:3000](http://localhost:3000).

---

## 🧪 Pengujian Otomatis (Automated Tests)

MoneyTrack dilengkapi dengan rangkaian pengujian komprehensif menggunakan **Vitest** untuk memvalidasi:
- Keamanan isolasi multi-tenant data pengguna.
- Perhitungan akurasi saldo moneter dan aggregasi laporan.
- Format mata uang Rupiah (`BigInt` / integer IDR).
- Skema validasi transaksi dan anggaran (Zod schemas).

Untuk menjalankan pengujian:
```bash
# Menjalankan seluruh test suite
npm test

# Menjalankan type-check TypeScript
npx tsc --noEmit
```

```
✓ tests/financial-calculator.test.ts (22 tests)
✓ tests/security/security-audit.test.ts (7 tests)
✓ tests/integration/services.test.ts (3 tests)

Test Files  3 passed (3)
     Tests  32 passed (32)
  Duration  419ms
```

---

## 📁 Struktur Direktori

```plaintext
6-MoneyTrack/
├── prisma/
│   ├── schema.prisma          # Skema database relasional Prisma
│   └── seed.ts                # Seeder data pengguna demo & kategori default
├── public/
│   └── screenshots/           # Screenshot HD dokumentasi aplikasi
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # Route Group autentikasi (Login, Register)
│   │   ├── (dashboard)/       # Route Group aplikasi terproteksi
│   │   │   ├── dashboard/     # Halaman Dashboard Utama
│   │   │   ├── accounts/      # Halaman Manajemen Akun & Smart Cards
│   │   │   ├── transactions/  # Halaman Catatan Transaksi & Filter
│   │   │   ├── categories/    # Halaman Manajemen Kategori Keuangan
│   │   │   ├── budgets/       # Halaman Perencanaan Anggaran
│   │   │   └── reports/       # Halaman Laporan & Analitik Tahunan
│   │   └── api/               # REST API Routes (Auth, Transactions, Budgets, Reports)
│   ├── components/            # Komponen UI Reusable
│   │   ├── layout/            # Sidebar Pinned, Navbar Glassmorphic, User Menu
│   │   └── ui/                # Base UI & Tailwind Design Primitives
│   ├── features/              # Modul domain terisolasi (Budgets, Reports, Transactions)
│   └── lib/                   # Utility fungsi, formatters, konfigurasi Prisma & Auth
└── tests/                     # Vitest Unit & Integration Test Suites
```

---

## 🔒 Standar Keamanan & Kepatuhan

1. **Proteksi Sandi Terenkripsi**: Password pengguna di-hash menggunakan algoritma **BCrypt** dengan salt factor yang aman sebelum disimpan ke database.
2. **Kueri Terparameterisasi**: Semua interaksi basis data diproteksi dari SQL Injection melalui Prisma Client ORM engine.
3. **Penyaringan Input Klien & Server**: Setiap form divalidasi ganda menggunakan skema **Zod** untuk mencegah payload berbahaya atau inkonsistensi tipe data.
4. **Isolasi Sesi JWT**: Pengguna hanya dapat mengakses, mengubah, atau menghapus data keuangan milik mereka sendiri. Upaya manipulasi ID entitas lain akan ditolak secara otomatis oleh server (*Tenant Guard*).

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah lisensi **MIT**. Bebas digunakan, dimodifikasi, dan dikembangkan untuk keperluan personal maupun komersial.
