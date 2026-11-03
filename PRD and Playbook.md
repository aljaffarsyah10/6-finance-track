# PROJECT_PRD_AND_PLAYBOOK.md

# MoneyTrack — Personal Finance Management Platform

MVP First

Web Application

10 Development Phases

Project: MoneyTrack\
Category: Personal Finance Management SaaS\
Platform: Web Application\
Target: Public Users\
Development Model: Solo Developer + AI Coding Assistant\
Architecture: Modular Monolith\
Frontend: Next.js App Router + TypeScript\
Backend: Next.js Route Handlers\
Database: PostgreSQL + Prisma ORM\
Authentication: Auth.js\
UI: Tailwind CSS + shadcn/ui\
State Management: React State + Zustand (selectively)\
Deployment: VPS + Docker + Nginx + PostgreSQL

# PART A — PRODUCT REQUIREMENTS DOCUMENT (PRD)

# 1. Product Information

## 1.1 Product Identity

| Item                 | Description                 |
| -------------------- | --------------------------- |
| Product Name         | MoneyTrack                  |
| Product Type         | Personal Finance Management |
| Platform             | Web Application             |
| Target Users         | Public                      |
| Primary Language     | Indonesian                  |
| Currency             | IDR (Rupiah)                |
| Development          | Solo Developer              |
| Development Approach | MVP First                   |
| Architecture         | Modular Monolith            |
| Deployment           | VPS / Managed Hosting       |

## 1.2 Product Description

MoneyTrack adalah aplikasi personal finance berbasis web yang membantu pengguna mengelola kondisi keuangan pribadi melalui pencatatan pemasukan, pengeluaran, anggaran, dan pemantauan saldo.

Pengguna dapat mencatat transaksi keuangan, mengelompokkan transaksi berdasarkan kategori, membuat anggaran bulanan, serta melihat laporan keuangan melalui dashboard visual.

MoneyTrack dirancang sebagai aplikasi yang sederhana, intuitif, responsif, dan mudah digunakan oleh masyarakat umum.

## 1.3 Tech Stack

### Frontend

| Technology      | Purpose                     |
| --------------- | --------------------------- |
| Next.js         | React framework dan routing |
| TypeScript      | Type safety                 |
| Tailwind CSS    | Styling                     |
| shadcn/ui       | UI components               |
| Lucide React    | Icons                       |
| Recharts        | Data visualization          |
| React Hook Form | Form management             |
| Zod             | Schema validation           |

### Backend

| Technology             | Purpose                |
| ---------------------- | ---------------------- |
| Next.js Route Handlers | REST API               |
| TypeScript             | Backend implementation |
| Auth.js                | Authentication         |
| Prisma ORM             | Database access        |

### Database

| Technology | Purpose             |
| ---------- | ------------------- |
| PostgreSQL | Relational database |

### State Management

- React `useState`: state lokal komponen.
- React Server Components: data yang dapat diambil di server.
- Zustand: state global client seperti preferensi UI apabila diperlukan.
- React Query tidak diwajibkan pada MVP.

### Deployment

| Technology     | Purpose                   |
| -------------- | ------------------------- |
| VPS            | Application hosting       |
| Docker         | Containerization          |
| Docker Compose | Application orchestration |
| Nginx          | Reverse proxy             |
| Let's Encrypt  | HTTPS                     |
| PostgreSQL     | Production database       |

### Development Tools

- VS Code
- Git
- GitHub
- npm
- ESLint
- Prettier (opsional)

# 2. Product Overview

## 2.1 Problem Statement

Banyak orang mengalami kesulitan dalam mengelola keuangan pribadi karena:

1. Tidak mengetahui secara pasti jumlah pengeluaran setiap bulan.
2. Tidak memiliki catatan pemasukan dan pengeluaran yang terorganisir.
3. Sulit mengetahui kategori pengeluaran terbesar.
4. Tidak memiliki batas anggaran yang jelas.
5. Sulit mengevaluasi kondisi keuangan dari bulan ke bulan.
6. Menggunakan spreadsheet manual yang membutuhkan banyak pekerjaan.

## 2.2 Proposed Solution

MoneyTrack menyediakan satu tempat untuk mengelola keuangan pribadi.

Fitur utama:

- Dashboard finansial.
- Pencatatan pemasukan.
- Pencatatan pengeluaran.
- Manajemen kategori transaksi.
- Manajemen akun keuangan.
- Pengelolaan anggaran.
- Laporan keuangan.
- Riwayat transaksi.

## 2.3 How It Works

## MoneyTrack User Journey

1\. Register / Login

Pengguna membuat akun dan masuk ke aplikasi.

2\. Setup Financial Accounts

Pengguna membuat akun seperti Cash dan Bank.

3\. Record Transactions

Pengguna mencatat pemasukan dan pengeluaran.

4\. Analyze Financial Data

Dashboard dan laporan menghitung kondisi keuangan.

5\. Manage Budget

Pengguna menetapkan target pengeluaran bulanan.

## 2.4 Core Value Proposition

MoneyTrack memberikan:

- Financial visibility: mengetahui kondisi keuangan.
- Financial awareness: memahami pola pengeluaran.
- Financial control: mengendalikan anggaran.
- Financial history: melihat perkembangan keuangan.
- Simplicity: pengelolaan keuangan tanpa spreadsheet kompleks.

# 3. Product Goals

## 3.1 MVP Goals

| Goal                             | Success Indicator                                            |
| -------------------------------- | ------------------------------------------------------------ |
| Mempermudah pencatatan transaksi | Pengguna dapat mencatat transaksi dalam kurang dari 30 detik |
| Menampilkan kondisi finansial    | Dashboard menampilkan saldo, pemasukan, pengeluaran          |
| Mengelola kategori               | Pengguna dapat membuat kategori transaksi                    |
| Mengelola anggaran               | Pengguna dapat menetapkan anggaran bulanan                   |
| Menampilkan laporan              | Laporan dapat difilter berdasarkan periode                   |
| Menjaga keamanan data            | Setiap pengguna hanya dapat mengakses data miliknya          |

## 3.2 Product Metrics

Metrik awal yang dapat digunakan:

- Number of registered users.
- Number of transactions per user.
- Monthly active users.
- Percentage of users creating budgets.
- Average transactions recorded per month.
- User retention.

# 4. Target Users

## 4.1 Primary Users

### A. Karyawan

Kebutuhan:

- Mencatat gaji.
- Mencatat pengeluaran harian.
- Memantau saldo.
- Mengontrol pengeluaran bulanan.

### B. Freelancer

Kebutuhan:

- Mencatat pendapatan tidak tetap.
- Memantau pemasukan proyek.
- Mengelola pengeluaran operasional pribadi.

### C. Mahasiswa

Kebutuhan:

- Mengelola uang saku.
- Mengontrol pengeluaran.
- Menentukan batas pengeluaran.

### D. Keluarga / Personal Household

Kebutuhan:

- Memantau pengeluaran rumah tangga.
- Mengelompokkan kebutuhan.
- Mengontrol anggaran bulanan.

## 4.2 User Persona

| Persona    | Primary Need                   |
| ---------- | ------------------------------ |
| Employee   | Monthly expense tracking       |
| Freelancer | Income and expense monitoring  |
| Student    | Budget control                 |
| Household  | Household financial management |

## 4.3 User Assumptions

Asumsi MVP:

1. Satu akun digunakan oleh satu individu.
2. Data keuangan bersifat privat.
3. Tidak ada fitur kolaborasi keluarga.
4. Pengguna menginput transaksi secara manual.
5. Mata uang utama MVP adalah IDR.
6. Pengguna dapat memiliki beberapa akun keuangan.

# 5. Scope & Feature Priorities

## 5.1 P0 — Core MVP

Wajib untuk MVP

| Feature                | Description                         |
| ---------------------- | ----------------------------------- |
| Authentication         | Register, login, logout             |
| Dashboard              | Ringkasan kondisi finansial         |
| Transaction Management | CRUD transaksi                      |
| Income Tracking        | Pencatatan pemasukan                |
| Expense Tracking       | Pencatatan pengeluaran              |
| Category Management    | Manajemen kategori                  |
| Account Management     | Cash, Bank, E-Wallet                |
| Budget Management      | Anggaran bulanan                    |
| Transaction History    | Riwayat transaksi                   |
| Financial Summary      | Ringkasan pemasukan dan pengeluaran |
| Responsive UI          | Desktop, tablet, mobile             |

## 5.2 P1 — Supporting Features

| Feature                | Description                     |
| ---------------------- | ------------------------------- |
| CSV Export             | Export transaksi ke CSV         |
| Date Filtering         | Filter tanggal                  |
| Search Transactions    | Pencarian transaksi             |
| Transaction Pagination | Pagination                      |
| Dark Mode              | Theme switching                 |
| Custom Categories      | Kategori kustom                 |
| Profile Settings       | Pengaturan profil               |
| Budget Progress        | Visualisasi penggunaan anggaran |

## 5.3 P2 — Future Development

| Feature                | Description                   |
| ---------------------- | ----------------------------- |
| Recurring Transactions | Transaksi berulang otomatis   |
| Financial Goals        | Target tabungan               |
| Debt Management        | Pengelolaan utang             |
| Investment Tracking    | Tracking investasi            |
| AI Financial Assistant | Analisis keuangan berbasis AI |
| Bank Integration       | Integrasi rekening bank       |
| Receipt OCR            | Scan nota                     |
| Multi-currency         | Dukungan banyak mata uang     |
| Family Finance         | Pengelolaan keuangan keluarga |
| Mobile Application     | Aplikasi Android / iOS        |

## 5.4 MVP Boundary

MVP tidak mencakup:

- Integrasi API perbankan.
- Sinkronisasi rekening otomatis.
- Pembayaran online.
- Transfer antar pengguna.
- Investment portfolio management.
- AI financial advisor.
- Akuntansi bisnis.
- Multi-user household.
- Automatic recurring transaction execution.

Catatan: MoneyTrack adalah alat pencatatan dan pemantauan keuangan, bukan lembaga keuangan atau aplikasi transaksi perbankan.

# 6. Functional Requirements

## FR-01 — User Registration

Description: Pengguna dapat membuat akun.

Behavior:

- Pengguna memasukkan nama.
- Pengguna memasukkan email.
- Pengguna memasukkan password.
- Sistem memvalidasi data.
- Sistem membuat akun.

Acceptance Criteria:

- Email wajib valid.
- Email harus unik.
- Password memenuhi kebijakan keamanan.
- Password disimpan dalam bentuk hash.
- Pengguna mendapatkan respons sukses atau error yang jelas.

## FR-02 — User Login

Description: Pengguna dapat masuk ke aplikasi.

Behavior:

- Input email dan password.
- Validasi kredensial.
- Buat session.
- Redirect ke dashboard.

Acceptance Criteria:

- Kredensial valid menghasilkan session.
- Kredensial salah menghasilkan error.
- Session terlindungi.
- Pengguna dapat logout.

## FR-03 — Dashboard

Description: Menampilkan ringkasan kondisi finansial.

Komponen:

- Total balance.
- Total income.
- Total expense.
- Current month balance movement.
- Recent transactions.
- Expense breakdown.
- Budget overview.

Acceptance Criteria:

- Data sesuai transaksi pengguna.
- Filter periode bekerja.
- Tidak ada data pengguna lain.
- Empty state tersedia.

## FR-04 — Income Management

Pengguna dapat:

- Membuat pemasukan.
- Mengubah pemasukan.
- Menghapus pemasukan.
- Melihat riwayat pemasukan.

Acceptance Criteria:

- Amount harus lebih besar dari nol.
- Category harus valid.
- Account harus milik pengguna.
- Transaction type harus `INCOME`.

## FR-05 — Expense Management

Pengguna dapat:

- Membuat pengeluaran.
- Mengubah pengeluaran.
- Menghapus pengeluaran.
- Melihat riwayat pengeluaran.

Acceptance Criteria:

- Amount harus lebih besar dari nol.
- Category harus valid.
- Account harus milik pengguna.
- Transaction type harus `EXPENSE`.

## FR-06 — Category Management

Pengguna dapat:

- Melihat kategori.
- Membuat kategori.
- Mengubah kategori.
- Menghapus kategori yang tidak digunakan.

Kategori default:

Income

- Salary
- Business
- Investment
- Gift
- Other Income

Expense

- Food & Beverage
- Transportation
- Shopping
- Bills
- Entertainment
- Health
- Education
- Housing
- Other Expense

Acceptance Criteria:

- Kategori memiliki type.
- Nama kategori unik per pengguna dan type.
- Kategori yang digunakan transaksi tidak boleh dihapus secara sembarangan.

## FR-07 — Account Management

Pengguna dapat membuat beberapa akun:

- Cash.
- Bank.
- E-Wallet.
- Other.

Acceptance Criteria:

- Setiap akun memiliki nama.
- Akun memiliki initial balance.
- Saldo akun dihitung dari initial balance dan transaksi.
- Akun hanya dapat diakses pemiliknya.

## FR-08 — Budget Management

Pengguna dapat membuat anggaran bulanan berdasarkan kategori pengeluaran.

Contoh:

| Category       | Monthly Budget |
| -------------- | -------------- |
| Food           | Rp2.000.000    |
| Transportation | Rp500.000      |
| Entertainment  | Rp300.000      |

Acceptance Criteria:

- Budget memiliki periode bulan dan tahun.
- Budget memiliki kategori expense.
- Pengeluaran terkait kategori mengurangi sisa budget.
- Persentase penggunaan budget ditampilkan.
- Budget tidak boleh negatif.

## FR-09 — Transaction History

Pengguna dapat melihat transaksi dengan:

- Search.
- Date filter.
- Category filter.
- Type filter.
- Account filter.
- Pagination.

Acceptance Criteria:

- Filter dapat dikombinasikan.
- Pagination berjalan benar.
- Hanya transaksi pengguna yang ditampilkan.
- Sorting berdasarkan tanggal terbaru secara default.

## FR-10 — Financial Reports

Sistem menghasilkan laporan:

- Total income.
- Total expense.
- Net cash flow.
- Expense by category.
- Income vs expense.
- Monthly trend.

Acceptance Criteria:

- Data dihitung dari transaksi sebenarnya.
- Periode laporan dapat dipilih.
- Chart menampilkan data sesuai filter.
- Tidak ada data palsu pada production.

## FR-11 — Profile Management

Pengguna dapat mengubah:

- Nama.
- Foto profil (opsional).
- Password.

Acceptance Criteria:

- Perubahan tersimpan.
- Password lama diverifikasi jika mengubah password.
- User tidak dapat mengubah data identitas pengguna lain.

## FR-12 — CSV Export

Pengguna dapat mengunduh data transaksi dalam format CSV.

Acceptance Criteria:

- Data sesuai filter.
- Header kolom tersedia.
- Format angka dan tanggal konsisten.
- Formula injection pada nilai CSV ditangani.

# 7. Non-Functional Requirements

## 7.1 Performance

- Initial page load dioptimalkan.
- Dashboard tidak mengambil seluruh transaksi sekaligus.
- Database query menggunakan filter dan pagination.
- Chart menggunakan data agregat.
- Hindari query N+1.
- Target Core Web Vitals berada pada kategori baik.

## 7.2 Security

- Password hashing menggunakan mekanisme aman Auth.js / password hashing library yang sesuai.
- Validasi input menggunakan Zod.
- Authorization pada setiap operasi data.
- Environment variables tidak di-commit.
- Session harus aman.
- Proteksi terhadap SQL injection melalui Prisma.
- Rate limiting untuk endpoint sensitif.

## 7.3 Reliability

- Database menggunakan backup terjadwal.
- API mengembalikan error terstruktur.
- Transaksi database menggunakan database transaction saat operasi saling bergantung.
- Tidak ada penghitungan saldo yang bergantung pada state frontend.

## 7.4 Maintainability

- TypeScript strict mode.
- Modular folder structure.
- Reusable components.
- Separation of concerns.
- Centralized validation.
- Consistent error handling.

## 7.5 Accessibility

- Semantic HTML.
- Keyboard navigation.
- Form labels.
- Accessible dialog.
- Sufficient color contrast.
- Screen reader-friendly controls.

## 7.6 Compatibility

Target:

- Chrome.
- Firefox.
- Edge.
- Safari.

Responsive:

- Mobile: 320px–767px.
- Tablet: 768px–1023px.
- Desktop: 1024px ke atas.

## 7.7 Privacy

- Data keuangan hanya dapat diakses pemilik.
- Jangan menyimpan data finansial di localStorage sebagai sumber utama.
- Jangan mengirim data transaksi ke layanan analytics pihak ketiga.
- Pengguna dapat meminta penghapusan akun dan data sesuai kebijakan produk.

# 8. Application Structure & Navigation

## 8.1 Application Routes

| Route                | Description              | Access        |
| -------------------- | ------------------------ | ------------- |
| `/`                  | Landing page             | Public        |
| `/login`             | Login                    | Public        |
| `/register`          | Registration             | Public        |
| `/dashboard`         | Dashboard                | Authenticated |
| `/transactions`      | Transaction history      | Authenticated |
| `/transactions/new`  | Create transaction       | Authenticated |
| `/transactions/[id]` | Transaction details/edit | Authenticated |
| `/accounts`          | Financial accounts       | Authenticated |
| `/categories`        | Categories               | Authenticated |
| `/budgets`           | Budget management        | Authenticated |
| `/reports`           | Financial reports        | Authenticated |
| `/settings/profile`  | Profile settings         | Authenticated |

## 8.2 Navigation Structure

MoneyTrack

OVERVIEW

&#x20;Dashboard

&#x20;Transactions

&#x20;Reports

MANAGEMENT

&#x20;Accounts

&#x20;Categories

&#x20;Budgets

PREFERENCES

&#x20;Settings

&#x20;Logout

## 8.3 Reusable Components

Layout

- DashboardLayout
- Sidebar
- MobileNavigation
- Header
- PageHeader

Financial

- BalanceCard
- SummaryCard
- TransactionTable
- TransactionItem
- TransactionForm
- CategoryBadge
- AccountCard
- BudgetCard
- BudgetProgress

Charts

- IncomeExpenseChart
- ExpenseCategoryChart
- MonthlyTrendChart

Common

- DataTable
- ConfirmDialog
- EmptyState
- LoadingSkeleton
- ErrorState
- CurrencyInput
- DatePicker
- SearchInput

# 9. User Flow

## 9.1 Registration Flow

1. Pengguna membuka MoneyTrack.
2. Klik Register.
3. Mengisi nama, email, password.
4. Sistem memvalidasi.
5. Akun dibuat.
6. Pengguna login.
7. Sistem mengarahkan pengguna ke dashboard.

## 9.2 First-time Setup Flow

1. Pengguna masuk ke dashboard.
2. Sistem memeriksa apakah pengguna sudah memiliki akun keuangan.
3. Jika belum, tampilkan onboarding.
4. Pengguna membuat akun Cash atau Bank.
5. Pengguna memasukkan saldo awal.
6. Dashboard menampilkan kondisi keuangan.

## 9.3 Add Transaction Flow

1. Klik Add Transaction.
2. Pilih Income atau Expense.
3. Masukkan nominal.
4. Pilih kategori.
5. Pilih akun.
6. Pilih tanggal.
7. Tambahkan deskripsi.
8. Klik Save.
9. Backend memvalidasi.
10. Data disimpan.
11. Dashboard diperbarui.

## 9.4 Budget Flow

1. Buka halaman Budgets.
2. Klik Create Budget.
3. Pilih kategori.
4. Pilih bulan.
5. Masukkan nominal budget.
6. Simpan.
7. Sistem menghitung penggunaan budget dari transaksi terkait.

## 9.5 Report Flow

1. Buka Reports.
2. Pilih periode.
3. Backend mengambil transaksi sesuai periode.
4. Sistem menghitung pemasukan dan pengeluaran.
5. Grafik dan ringkasan ditampilkan.

# 10. UI/UX Requirements

## 10.1 Design Direction

Style: Modern Personal Finance Dashboard.

Referensi visual:

- Clean dashboard.
- Minimalist fintech.
- Clear financial hierarchy.
- Data-oriented design.

[Personal finance dashboard with cash flow, spending plans and savings goals](https://images.openai.com/static-rsc-4/uumbogLcQ1iO1Q09YvPpZmHHs7vm6a4-YUwd3D4e2Ou3joFf6RsaqinjsRUrNZcDQ437o5q5MqhJc_I7XDD4GNw4POdM5rnNvoE8mjyM9Omt9zB3NXMayc0-nnEKXWcZmCEXsE7lCD3vSUmxjwU4xbBi9GYf_PQhPC9BFrJjzJtwjOSr1tin8eppT26RoHUD?purpose=inline)

Light dashboard direction

[Vault — Finance Dashboard UI (1) | Images :: Behance](https://images.openai.com/static-rsc-4/VqyWd3kWHMG3a9rB3uIqblimoFyKzRzK9iwljJsxeEiaZvWTMe4j_rUAa5_3uBGTNL0UjeTO1IW2qMXfAIOpi0hGODUVZycDwqAN7nKham1caJGz4_5WjrB9kZM2AwpnlAgkixmHpmQ4yXC2etahnV-UqsxeEBXZiP2cBGV8Al0?purpose=inline)

Dark dashboard direction

## 10.2 Color Palette

| Token      | Suggested Color | Usage              |
| ---------- | --------------- | ------------------ |
| Primary    | Emerald         | Primary actions    |
| Background | Slate 50        | Page background    |
| Surface    | White           | Cards              |
| Income     | Green           | Income indicators  |
| Expense    | Red             | Expense indicators |
| Warning    | Amber           | Budget warnings    |
| Text       | Slate 900       | Main text          |
| Muted      | Slate 500       | Secondary text     |

## 10.3 Typography

- Font: Inter.
- Heading: Semibold.
- Body: Regular.
- Financial values: Semibold / Bold.

## 10.4 Layout

Desktop:

- Sidebar.
- Top header.
- Main content.
- Dashboard cards.
- Charts.
- Transaction list.

Mobile:

- Collapsible navigation or bottom navigation.
- Single-column cards.
- Scrollable tables or card-based transactions.
- Full-width forms.

## 10.5 UI States

Setiap fitur harus memiliki:

| State        | Behavior                         |
| ------------ | -------------------------------- |
| Loading      | Skeleton atau spinner            |
| Empty        | Pesan dan CTA                    |
| Error        | Pesan error yang mudah dipahami  |
| Success      | Toast notification               |
| Disabled     | Visual disabled state            |
| Confirmation | Dialog untuk tindakan destruktif |

## 10.6 Dashboard Layout

[Smart Financial Dashboard UI by Atiqur Rahman ✪‌ for ILmix Studio LLC on Dribbble](https://images.openai.com/static-rsc-4/hLZGSxwtROQClRfma-RF8u0N2SF0jx0OYEMqMPfk9Aq8hB0xgrLo4zO6a3Z_zlkeQZuSO1Yop1mNcYX8X2ZYUGqMCz2qqGQiypN23AYZWZ2AHcVG9kkdsXaftiDLxLUFyMpT9zY6XCM-uPGZOTlGC5C5QwVvOSYnpfKyejf6nOI?purpose=inline)

[dribbble.com](https://dribbble.com/shots/27075685-Smart-Financial-Dashboard-UI?utm_source=chatgpt.com)

Komponen:

1. Welcome Header.
2. Total Balance.
3. Income Summary.
4. Expense Summary.
5. Cash Flow Chart.
6. Expense Category Chart.
7. Recent Transactions.
8. Budget Overview.

## 10.7 Transaction Page

[SavePoint - Professional Personal Finance Software | Privacy-First Financial Management](https://images.openai.com/static-rsc-4/8P_UhOAE5yWRR54vki84-JJ4W7jXxKhbKft8_yNvMJsnirrlqlXXvvV5C3zEcmZ_aZJ5S3Eiv_7Bn16iRfQms7Sm7c_E2b9xqvJKU-287qc5sNcX9P313S3V17A0FQuBkTSeysNT1XAzbRiyw-pAnXOtaiDSPHxxTpZpgXYf9yY?purpose=inline)

[savepointfinance.com](https://savepointfinance.com/?utm_source=chatgpt.com)

Fitur:

- Search.
- Date filter.
- Type filter.
- Category filter.
- Add transaction.
- Edit transaction.
- Delete transaction.

## 10.8 Budget Page

[Next.js Finance Dashboard App | thefrontkit](https://images.openai.com/static-rsc-4/Z_pbc1GuVCEwg9i5Scxu4HwxyCQFkKz_vGndhLg5Q-_nVVmXa6hITcm74mXYXSkgd8lhUk9v7XjQc8qyB8vzBCUa1M2ZSyuAp9a_UD3I5WsRLXI-liwUcLnrigYGWUGg5wbaQiM-Sg4_lSJAUR9CrxkXKttHf5SGdk4u6Oz8vx4?purpose=inline)

[thefrontkit.com](https://thefrontkit.com/apps/finance-dashboard-kit?utm_source=chatgpt.com)

Fitur:

- Monthly budget summary.
- Category budget cards.
- Spent amount.
- Remaining amount.
- Progress percentage.

# 11. Error Handling

| Error                  | Cause                                  | System Response                    |
| ---------------------- | -------------------------------------- | ---------------------------------- |
| Invalid email          | Format email salah                     | Validation message                 |
| Duplicate email        | Email sudah digunakan                  | Informasikan email sudah terdaftar |
| Invalid credentials    | Login salah                            | Generic authentication error       |
| Unauthorized           | Session tidak valid                    | Redirect login                     |
| Forbidden              | Mengakses data pengguna lain           | Return 403 atau 404                |
| Transaction validation | Nominal tidak valid                    | Form error                         |
| Category not found     | Category sudah dihapus                 | Validation error                   |
| Account not found      | Account tidak valid                    | Validation error                   |
| Database unavailable   | Database down                          | 503 response                       |
| Network failure        | Koneksi terputus                       | Retry option                       |
| Budget conflict        | Budget duplikat untuk kategori/periode | Conflict message                   |
| Internal error         | Kesalahan server                       | Generic error + server logging     |

## 11.1 Standard API Error

Format respons:

```
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid transaction data",
    "details": {
      "amount": "Amount must be greater than zero"
    }
  }
}
```

## 11.2 Standard API Success

```
{
  "success": true,
  "data": {},
  "message": "Transaction created successfully"
}
```

# 12. Technical Architecture

## 12.1 Architecture Decision

MoneyTrack menggunakan Modular Monolith.

Alasan:

- Project dikembangkan oleh satu developer.
- Domain aplikasi relatif sederhana.
- Tidak membutuhkan microservices.
- Next.js dapat menangani frontend dan backend.
- PostgreSQL mendukung relasi data keuangan.
- Prisma mempermudah query dan migration.

## 12.2 Architecture Diagram

Presentation Layer

Next.js App Router · React · Tailwind · shadcn/ui

Application Layer

Route Handlers · Request Validation · Use Cases

Business Logic Layer

Transaction Service · Budget Service · Report Service

Data Access Layer

Prisma ORM · Repository Functions

Infrastructure Layer

PostgreSQL · Auth.js · Logging · Deployment

## 12.3 Layer Responsibilities

### Presentation Layer

Tanggung jawab:

- Render halaman.
- Menampilkan komponen.
- Menangani input pengguna.
- Menampilkan loading/error states.

Tidak boleh:

- Menghitung saldo finansial sebagai sumber kebenaran.
- Menangani query database secara langsung.
- Menentukan authorization.

### Application Layer

Tanggung jawab:

- Menangani HTTP request.
- Memvalidasi request.
- Memanggil business services.
- Menentukan HTTP response.

### Business Logic Layer

Tanggung jawab:

- Menghitung saldo.
- Menghitung cash flow.
- Menghitung budget usage.
- Memvalidasi aturan transaksi.
- Menghasilkan financial reports.

### Data Access Layer

Tanggung jawab:

- Query database.
- Create, update, delete.
- Database transactions.
- Data filtering.

### Infrastructure Layer

Tanggung jawab:

- Database connection.
- Authentication.
- Logging.
- Configuration.
- External integration.

## 12.4 Recommended Folder Structure

```
moneytrack/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   └── page.tsx
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   ├── transactions/
│   │   │   ├── accounts/
│   │   │   ├── categories/
│   │   │   ├── budgets/
│   │   │   ├── reports/
│   │   │   └── settings/
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── transactions/
│   │   │   ├── accounts/
│   │   │   ├── categories/
│   │   │   ├── budgets/
│   │   │   ├── dashboard/
│   │   │   └── reports/
│   │   │
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── common/
│   │   └── charts/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── transactions/
│   │   ├── accounts/
│   │   ├── categories/
│   │   ├── budgets/
│   │   ├── dashboard/
│   │   └── reports/
│   │
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── prisma.ts
│   │   ├── utils.ts
│   │   └── validations/
│   │
│   ├── services/
│   │   ├── transaction.service.ts
│   │   ├── account.service.ts
│   │   ├── budget.service.ts
│   │   ├── dashboard.service.ts
│   │   └── report.service.ts
│   │
│   ├── repositories/
│   │   ├── transaction.repository.ts
│   │   ├── account.repository.ts
│   │   ├── category.repository.ts
│   │   └── budget.repository.ts
│   │
│   ├── stores/
│   │   └── ui.store.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── middleware.ts
│
├── tests/
│
├── .env.example
├── .gitignore
├── components.json
├── next.config.ts
├── package.json
├── tsconfig.json
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## 12.5 Data Flow

Contoh create transaction:

```
User
 |
 v
TransactionForm
 |
 v
POST /api/transactions
 |
 v
Zod Validation
 |
 v
Authentication Check
 |
 v
Transaction Service
 |
 v
Transaction Repository
 |
 v
Prisma
 |
 v
PostgreSQL
 |
 v
API Response
 |
 v
Frontend Refresh
```

## 12.6 API Architecture

Menggunakan REST API melalui Next.js Route Handlers.

Base path:

```
/api
```

### Authentication

```
POST /api/auth/register
GET  /api/auth/session
```

Auth.js menangani login session dan logout melalui mekanisme yang didukung konfigurasi Auth.js.

### Transactions

```
GET    /api/transactions
POST   /api/transactions
GET    /api/transactions/:id
PATCH  /api/transactions/:id
DELETE /api/transactions/:id
```

### Accounts

```
GET    /api/accounts
POST   /api/accounts
PATCH  /api/accounts/:id
DELETE /api/accounts/:id
```

### Categories

```
GET    /api/categories
POST   /api/categories
PATCH  /api/categories/:id
DELETE /api/categories/:id
```

### Budgets

```
GET    /api/budgets
POST   /api/budgets
PATCH  /api/budgets/:id
DELETE /api/budgets/:id
```

### Dashboard

```
GET /api/dashboard/summary
GET /api/dashboard/recent-transactions
GET /api/dashboard/expense-breakdown
```

### Reports

```
GET /api/reports/cashflow
GET /api/reports/expenses
GET /api/reports/income-expense
```

## 12.7 Financial Calculation Rules

Ini merupakan bagian kritis.

### Balance Calculation

Saldo akun:

\\[ Balance = InitialBalance + Income - Expense \\]

Contoh:

- Initial Balance: Rp1.000.000
- Income: Rp3.000.000
- Expense: Rp1.500.000

Saldo:

\\[ 1.000.000+3.000.000-1.500.000 =2.500.000 \\]

### Net Cash Flow

\\[ NetCashFlow = TotalIncome - TotalExpense \\]

### Budget Remaining

\\[ RemainingBudget = BudgetAmount - TotalExpense \\]

### Budget Usage

\\[ Usage = \frac{TotalExpense}{BudgetAmount}\times100 \\]

Jika budget nol, persentase tidak boleh menyebabkan pembagian dengan nol.

### Important Rules

1. Seluruh nominal uang disimpan menggunakan integer dalam satuan terkecil mata uang (untuk IDR, rupiah).
2. Jangan menggunakan floating-point untuk perhitungan nominal.
3. Transaksi yang dihapus atau diubah harus tercermin pada saldo dan laporan.
4. Semua perhitungan harus menggunakan data database.
5. Pengeluaran dan pemasukan tidak boleh tercampur.
6. Transaksi harus selalu terikat pada user dan account yang valid.
7. Transaksi masa depan boleh dicatat tetapi tidak boleh dimasukkan ke ringkasan historis sebelum tanggalnya tiba.
8. Transfer antar akun belum termasuk MVP. Jangan merepresentasikannya sebagai income dan expense karena akan mendistorsi laporan.

# 13. Data Model

## 13.1 Entity Relationship

[Designing a database schema for a budget tracker with Automigrate | Andrey Bogoyavlenskiy](https://images.openai.com/static-rsc-4/xTFjNnaO7mEsAhMmYPHRCIXeMdEBNvNhieiPXNiiZZTBg34cEPGt3fOg3lf4aBsm5rF55IpRWwPhrXQ7SDuI1HI3x9J0MiCf4jUTOWYuejTIaDkHjMNIoTb1I8GJUZ068pSv3UfMFl-e8imODk0meZu6AITakBtpdeOF50u9hrg?purpose=inline)

[bogoyavlensky.com](https://bogoyavlensky.com/blog/db-schema-for-budget-tracker-with-automigrate/?utm_source=chatgpt.com)

Relasi:

```
User
 ├── Account
 ├── Category
 ├── Transaction
 └── Budget

Account
 └── Transaction

Category
 ├── Transaction
 └── Budget
```

## 13.2 User

```
interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 13.3 Account

```
type AccountType =
  | "CASH"
  | "BANK"
  | "E_WALLET"
  | "OTHER";

interface Account {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  initialBalance: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## 13.4 Category

```
type TransactionType =
  | "INCOME"
  | "EXPENSE";

interface Category {
  id: string;
  userId: string;
  name: string;
  type: TransactionType;
  icon?: string;
  color?: string;
  createdAt: Date;
}
```

## 13.5 Transaction

```
interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  categoryId: string;

  type: TransactionType;
  amount: number;

  description?: string;
  transactionDate: Date;

  createdAt: Date;
  updatedAt: Date;
}
```

## 13.6 Budget

```
interface Budget {
  id: string;
  userId: string;
  categoryId: string;

  amount: number;
  month: number;
  year: number;

  createdAt: Date;
  updatedAt: Date;
}
```

## 13.7 Prisma Schema (Initial Design)

```
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
  account         Account         @relation(fields: [accountId], references: [id])
  category        Category        @relation(fields: [categoryId], references: [id])

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
  category   Category @relation(fields: [categoryId], references: [id])

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@unique([userId, categoryId, month, year])
  @@index([userId, year, month])
}
```

Implementation notes:

- Prisma `BigInt` harus dikonversi menjadi string ketika dikirim melalui JSON.
- Frontend menggunakan integer rupiah atau string angka sesuai kebutuhan batas nominal.
- Database perlu validasi tambahan bahwa amount positif dan bulan berada dalam rentang 1–12.
- Semua query harus memfilter `userId`.
- Untuk kategori dan akun, validasi ownership dilakukan sebelum transaksi disimpan.
- Foreign key untuk `accountId` dan `categoryId` harus menjamin konsistensi data.

# 14. Security & Privacy

## 14.1 Authentication

Gunakan Auth.js.

Mekanisme:

- Email dan password.
- Session management.
- Secure cookies.
- Password hashing.
- Logout.

Untuk implementasi Credentials Provider, gunakan password hashing yang sesuai, misalnya Argon2id melalui library yang kompatibel dengan runtime deployment.

## 14.2 Authorization

Setiap endpoint wajib memverifikasi:

1. User telah login.
2. User memiliki resource yang diminta.
3. Resource tidak berasal dari user lain.

Contoh:

```
const transaction = await prisma.transaction.findFirst({
  where: {
    id: transactionId,
    userId: session.user.id,
  },
});
```

Jangan menggunakan query hanya berdasarkan ID.

## 14.3 Input Validation

Gunakan Zod.

```
import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]),
  amount: z.number().int().positive(),
  accountId: z.string().min(1),
  categoryId: z.string().min(1),
  description: z.string().max(500).optional(),
  transactionDate: z.string().datetime(),
});
```

## 14.4 API Security

- Authentication check.
- Authorization check.
- Request validation.
- Rate limiting untuk login dan registration.
- Secure cookies.
- CSRF protection sesuai mekanisme autentikasi.
- Jangan expose stack trace kepada client.
- Jangan expose password hash.

## 14.5 Environment Variables

```
DATABASE_URL="postgresql://..."
AUTH_SECRET="..."
AUTH_URL="http://localhost:3000"
```

File `.env` tidak boleh di-commit.

# 15. Success Criteria

MVP dinyatakan selesai apabila:

| ID    | Criteria                             |
| ----- | ------------------------------------ |
| SC-01 | User dapat register                  |
| SC-02 | User dapat login dan logout          |
| SC-03 | User dapat membuat account           |
| SC-04 | User dapat membuat income            |
| SC-05 | User dapat membuat expense           |
| SC-06 | User dapat edit dan delete transaksi |
| SC-07 | Dashboard menampilkan data aktual    |
| SC-08 | Kategori dapat dikelola              |
| SC-09 | Budget dapat dibuat                  |
| SC-10 | Budget progress dihitung benar       |
| SC-11 | Transaction history dapat difilter   |
| SC-12 | Financial report dapat ditampilkan   |
| SC-13 | Data antar pengguna terisolasi       |
| SC-14 | Aplikasi responsive                  |
| SC-15 | Production build berhasil            |
| SC-16 | Deployment HTTPS berhasil            |

# 16. Risks & Technical Constraints

| Risk                          | Impact   | Mitigation                             |
| ----------------------------- | -------- | -------------------------------------- |
| Salah hitung saldo            | High     | Unit tests untuk financial calculation |
| Data pengguna bocor           | Critical | Ownership checks pada setiap query     |
| Database gagal                | High     | Backup dan monitoring                  |
| Query lambat                  | Medium   | Indexing dan pagination                |
| UI terlalu kompleks           | Medium   | Fokus MVP                              |
| Auth.js configuration berubah | Medium   | Verifikasi dokumentasi versi           |
| Prisma migration gagal        | High     | Migration testing                      |
| Nominal tidak akurat          | High     | Integer/BigInt                         |
| Deployment bermasalah         | High     | Staging sebelum production             |
| Data transaksi hilang         | Critical | Backup dan restore test                |

# PART B — SEQUENTIAL DEVELOPMENT PLAYBOOK

# PHASE 1 — Environment & Project Bootstrap

Foundation

## 1. Phase Objective

Menyiapkan environment development dan membuat project Next.js yang dapat dijalankan.

Belum ada business logic MoneyTrack.

## 2. Scope of Work

- Install Node.js.
- Setup npm.
- Setup Next.js.
- Setup TypeScript.
- Setup Tailwind CSS.
- Setup shadcn/ui.
- Setup Git.
- Setup dependencies dasar.
- Setup environment configuration.

## 3. Detailed Implementation Steps

### Step 1 — Verify Environment

Pastikan Node.js dan npm terpasang.

```
node --version
npm --version
git --version
```

Gunakan Node.js LTS yang kompatibel dengan versi Next.js yang dipilih.

### Step 2 — Create Project

```
npx create-next-app@latest moneytrack
```

Pilih:

| Option        | Value |
| ------------- | ----- |
| TypeScript    | Yes   |
| ESLint        | Yes   |
| Tailwind CSS  | Yes   |
| src directory | Yes   |
| App Router    | Yes   |
| Import alias  | @/\*  |

Jika tersedia, pilih konfigurasi Turbopack default.

### Step 3 — Enter Project

```
cd moneytrack
```

### Step 4 — Install Dependencies

```
npm install lucide-react recharts
npm install react-hook-form zod @hookform/resolvers
npm install zustand
```

Zustand disiapkan, tetapi hanya digunakan apabila ada kebutuhan state global yang nyata.

### Step 5 — Setup shadcn/ui

```
npx shadcn@latest init
```

Tambahkan komponen dasar:

```
npx shadcn@latest add button card input
npx shadcn@latest add dialog dropdown-menu
npx shadcn@latest add form select
npx shadcn@latest add table tabs
npx shadcn@latest add skeleton
npx shadcn@latest add sonner
```

### Step 6 — Setup Git

```
git init
git add .
git commit -m "phase 1: project bootstrap"
```

### Step 7 — Run Development Server

```
npm run dev
```

Buka:

```
http://localhost:3000
```

### Step 8 — Verify Build

```
npm run lint
npx tsc --noEmit
npm run build
```

## 4. Required Commands

```
node --version
npm --version
git --version

npx create-next-app@latest moneytrack

cd moneytrack

npm install lucide-react recharts
npm install react-hook-form zod @hookform/resolvers
npm install zustand

npx shadcn@latest init

npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

## 5. AI Coding Assistant Prompt

# PHASE 1 — MONEYTRACK PROJECT BOOTSTRAP

Kamu bertindak sebagai Senior Fullstack Developer.

Project: MoneyTrack

Dokumen utama:\
PROJECT_PRD_AND_PLAYBOOK.md

Tech stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- npm

Development approach:\
Solo developer, MVP first, clean architecture pragmatis.

## Aturan Kerja

1. Baca PRD terlebih dahulu.
2. Periksa environment dan kondisi repository.
3. Jangan mengerjakan phase berikutnya.
4. Jangan membuat business logic.
5. Jangan menambahkan dependency yang tidak dibutuhkan.
6. Jangan menimpa file yang sudah ada tanpa alasan.
7. Gunakan struktur Next.js App Router.
8. Pastikan TypeScript strict mode aktif.
9. Verifikasi command testing dan build.
10. Laporkan semua perubahan.

## Tasks

1. Verifikasi project environment.
2. Setup Next.js jika belum tersedia.
3. Setup TypeScript.
4. Setup Tailwind CSS.
5. Setup shadcn/ui.
6. Setup Lucide React dan Recharts.
7. Setup React Hook Form dan Zod.
8. Setup Zustand sebagai dependency opsional.
9. Pastikan struktur project dapat dikembangkan.
10. Pastikan aplikasi berjalan.

## Expected Deliverables

- Next.js project.
- TypeScript configuration.
- Tailwind configuration.
- shadcn/ui configuration.
- package.json.
- Struktur folder awal.
- Git repository.
- Aplikasi berjalan di localhost.

## Restrictions

Jangan implementasikan:

- Authentication.
- Dashboard.
- Database.
- Transaction.
- Budget.
- API business logic.

## Verification

Jalankan:

npm run lint\
npx tsc --noEmit\
npm run build

## Final Report

Laporkan:

- Environment.
- Dependency.
- File created.
- File modified.
- Testing results.
- Build results.
- Known issues.
- Git status.

Jangan melanjutkan ke Phase 2.

## 6. Expected Deliverables

- Next.js application.
- Tailwind CSS.
- shadcn/ui.
- TypeScript.
- Git repository.
- Initial folder structure.

## 7. Acceptance Criteria

- Next.js dapat dijalankan.
- TypeScript aktif.
- Tailwind CSS berfungsi.
- shadcn/ui terpasang.
- Dependencies tersedia.
- Git aktif.
- Lint berhasil.
- Type check berhasil.
- Production build berhasil.

## 8. Testing Requirements

```
npm run lint
npx tsc --noEmit
npm run build
```

## 9. Git Checkpoint

```
git add .
git commit -m "phase 1: project bootstrap"
```

# PHASE 2 — Technical Planning & Architecture

Architecture

## 1. Phase Objective

Menghasilkan technical plan final sebelum implementasi fitur.

Dokumen utama:

`TECHNICAL_PLAN.md`

## 2. Scope of Work

- Architecture.
- Folder structure.
- Database design.
- Authentication design.
- API architecture.
- Financial calculation rules.
- Dependency planning.
- Security planning.
- Technical risks.

## 3. Detailed Implementation Steps

### Step 1 — Read PRD

Analisis:

- Product scope.
- Functional requirements.
- Data model.
- User flows.
- MVP boundaries.

### Step 2 — Define Architecture

Tetapkan:

```
Next.js
   |
   ├── App Router
   ├── Route Handlers
   ├── Business Services
   ├── Repositories
   └── Prisma
          |
          PostgreSQL
```

### Step 3 — Setup Database Technology

Gunakan PostgreSQL.

Pilih Prisma ORM untuk database access.

Dependencies:

```
npm install prisma @prisma/client
npm install @prisma/adapter-pg pg
npm install -D @types/pg
```

Catatan: gunakan konfigurasi Prisma yang kompatibel dengan versi yang dipilih. Validasi kebutuhan driver adapter dan generator melalui dokumentasi Prisma versi tersebut.

### Step 4 — Authentication Planning

Gunakan Auth.js.

Tentukan:

- Credentials authentication.
- Session strategy.
- Password hashing.
- Protected routes.
- Ownership checks.

### Step 5 — Define API Contracts

Dokumentasikan seluruh endpoint.

### Step 6 — Define Business Rules

Dokumentasikan:

- Balance calculation.
- Income.
- Expense.
- Budget.
- Reports.
- Date filtering.

### Step 7 — Dependency Audit

Jangan menambahkan library hanya karena populer.

### Step 8 — Generate Technical Plan

Hasilkan `TECHNICAL_PLAN.md`.

## 4. Required Commands

```
npm install prisma @prisma/client
npm install @prisma/adapter-pg pg
npm install -D @types/pg
```

Jika belum memerlukan database pada tahap implementasi awal, installation dapat dilakukan pada Phase 6. Namun keputusan arsitektur database tetap harus ditetapkan sekarang.

## 5. AI Coding Assistant Prompt

# PHASE 2 — TECHNICAL PLANNING & ARCHITECTURE

Kamu bertindak sebagai Senior Software Architect.

Project: MoneyTrack

Dokumen utama:\
PROJECT_PRD_AND_PLAYBOOK.md

## Objective

Buat dokumen TECHNICAL_PLAN.md berdasarkan PRD MoneyTrack.

## Tasks

1. Analisis seluruh functional requirements.
2. Tentukan modular monolith architecture.
3. Tentukan frontend architecture.
4. Tentukan backend architecture.
5. Tentukan database architecture.
6. Tentukan PostgreSQL schema.
7. Tentukan Prisma ORM configuration.
8. Tentukan authentication menggunakan Auth.js.
9. Tentukan API endpoint contracts.
10. Tentukan folder structure final.
11. Tentukan data flow.
12. Tentukan financial calculation rules.
13. Tentukan authorization rules.
14. Tentukan error handling strategy.
15. Tentukan deployment architecture.
16. Identifikasi technical risks.

## Important Rules

- Jangan membuat microservices.
- Jangan menggunakan Rust.
- Jangan menggunakan Tauri.
- Jangan membuat desktop application.
- Jangan mengimplementasikan fitur utama.
- Jangan mengubah scope MVP.
- Jangan menambahkan dependency tanpa alasan.
- Gunakan PostgreSQL.
- Gunakan Next.js Route Handlers.

## Expected Deliverable

Buat TECHNICAL_PLAN.md yang berisi:

1. Architecture overview.
2. Technology decisions.
3. Folder structure.
4. Database schema.
5. API design.
6. Authentication design.
7. Authorization design.
8. Financial business rules.
9. Error handling.
10. Security.
11. Deployment.
12. Technical risks.

## Verification

Pastikan technical plan konsisten dengan PRD.

Jangan mengarang fitur tambahan.

Laporkan seluruh keputusan teknis.

Jangan implementasikan fitur utama dan jangan lanjut ke Phase 3.

## 6. Expected Deliverables

```
TECHNICAL_PLAN.md
```

Berisi architecture, database, API, dependencies, dan technical decisions.

## 7. Acceptance Criteria

- Architecture terdokumentasi.
- Folder structure final tersedia.
- Database design konsisten.
- API contracts terdokumentasi.
- Authentication strategy jelas.
- Authorization strategy jelas.
- Financial calculations terdokumentasi.
- Dependencies memiliki alasan.
- Deployment architecture jelas.

## 8. Testing Requirements

Belum ada functional testing.

Lakukan:

- Technical review.
- Architecture consistency review.
- PRD traceability review.

## 9. Git Checkpoint

```
git add TECHNICAL_PLAN.md
git commit -m "phase 2: technical architecture"
```

# PHASE 3 — UI/UX Planning & Design System

Design

## 1. Phase Objective

Membuat panduan desain MoneyTrack sebelum implementasi UI.

Output:

`UI_UX_GUIDE.md`

## 2. Scope of Work

- Design direction.
- Color palette.
- Typography.
- Spacing.
- Navigation.
- Dashboard wireframe.
- Transaction UI.
- Budget UI.
- Report UI.
- Responsive behavior.
- Design components.

## 3. Detailed Implementation Steps

### Step 1 — Define Design Direction

Pilih:

- Modern fintech.
- Minimalist.
- Clean dashboard.
- Data visualization oriented.

### Step 2 — Define Design Tokens

Contoh:

```
:root {
  --primary: 160 84% 39%;
  --background: 210 40% 98%;
  --foreground: 222 47% 11%;
  --success: 142 71% 45%;
  --destructive: 0 84% 60%;
  --warning: 38 92% 50%;
}
```

Token harus disesuaikan dengan konfigurasi Tailwind dan theme shadcn/ui yang digunakan.

### Step 3 — Define Typography

- Inter.
- Heading hierarchy.
- Body.
- Financial number formatting.

### Step 4 — Design Dashboard

Buat wireframe:

- Summary cards.
- Chart.
- Recent transactions.
- Budget overview.

### Step 5 — Design Transaction UI

Buat:

- Transaction table.
- Create form.
- Edit form.
- Delete confirmation.

### Step 6 — Design Budget UI

Buat:

- Budget cards.
- Progress bars.
- Budget form.

### Step 7 — Design Responsive Layout

Tentukan mobile, tablet, dan desktop.

### Step 8 — Document Components

Hasilkan `UI_UX_GUIDE.md`.

## 4. Required Commands

Tidak ada dependency tambahan yang wajib.

Opsional:

```
npm install @fontsource-variable/inter
```

Jika menggunakan `next/font/google`, tidak perlu menginstal package font tambahan.

## 5. AI Coding Assistant Prompt

# PHASE 3 — UI/UX PLANNING & DESIGN SYSTEM

Kamu bertindak sebagai Senior UI/UX Designer dan Frontend Architect.

Project: MoneyTrack

Dokumen utama:\
PROJECT_PRD_AND_PLAYBOOK.md

Technical reference:\
TECHNICAL_PLAN.md

## Objective

Buat UI_UX_GUIDE.md.

## Tasks

1. Tentukan design direction MoneyTrack.
2. Tentukan color palette.
3. Tentukan typography.
4. Tentukan spacing system.
5. Tentukan border radius.
6. Tentukan shadow system.
7. Tentukan icon system.
8. Tentukan navigation.
9. Rancang dashboard.
10. Rancang transaction page.
11. Rancang account page.
12. Rancang category page.
13. Rancang budget page.
14. Rancang report page.
15. Rancang settings page.
16. Tentukan responsive behavior.
17. Tentukan loading, empty, error, dan success states.
18. Dokumentasikan reusable components.

## Design Direction

Modern personal finance dashboard.

Prioritas:

- Clean.
- Minimalist.
- Readable.
- Professional.
- Responsive.
- Data-oriented.

## Restrictions

Jangan implementasikan business logic.

Jangan membuat database.

Jangan mengubah technical architecture.

Jangan menambahkan fitur P2.

## Expected Deliverable

UI_UX_GUIDE.md.

Dokumen harus dapat digunakan sebagai pedoman implementasi frontend.

Jangan lanjut ke Phase 4.

## 6. Expected Deliverables

```
UI_UX_GUIDE.md
```

## 7. Acceptance Criteria

- Color tokens tersedia.
- Typography ditentukan.
- Navigation ditentukan.
- Dashboard wireframe tersedia.
- Transaction UI terdokumentasi.
- Budget UI terdokumentasi.
- Report UI terdokumentasi.
- Responsive behavior ditentukan.
- Component inventory tersedia.

## 8. Testing Requirements

Design review:

- Consistency.
- Readability.
- Mobile usability.
- Accessibility.
- Visual hierarchy.

## 9. Git Checkpoint

```
git add UI_UX_GUIDE.md
git commit -m "phase 3: ui ux planning"
```

# PHASE 4 — Frontend Foundation & Application Shell

Frontend Foundation

## 1. Phase Objective

Mengimplementasikan fondasi frontend dan layout aplikasi.

Belum mengimplementasikan financial business logic.

## 2. Scope of Work

- Folder structure.
- Global styles.
- Design tokens.
- Application layout.
- Sidebar.
- Header.
- Mobile navigation.
- Public landing page.
- Login/register page shell.
- Dashboard page shell.
- Reusable UI components.

## 3. Detailed Implementation Steps

### Step 1 — Read Design Guide

Pastikan seluruh implementasi mengikuti `UI_UX_GUIDE.md`.

### Step 2 — Create Folder Structure

Buat folder:

```
src/
├── app/
├── components/
├── features/
├── lib/
├── services/
├── repositories/
├── stores/
└── types/
```

### Step 3 — Setup Global Styles

Implementasikan:

- Colors.
- Typography.
- Spacing.
- Border radius.
- Theme tokens.

### Step 4 — Implement Application Shell

Buat:

- DashboardLayout.
- Sidebar.
- Header.
- MobileNavigation.

### Step 5 — Implement Basic Pages

Buat page shell:

```
/dashboard
/transactions
/accounts
/categories
/budgets
/reports
/settings/profile
```

### Step 6 — Reusable Components

Buat:

- PageHeader.
- SummaryCard.
- EmptyState.
- LoadingSkeleton.
- ErrorState.
- ConfirmDialog.

### Step 7 — Responsive Layout

Pastikan layout dapat digunakan di berbagai ukuran layar.

## 4. Required Commands

```
npx shadcn@latest add sheet
npx shadcn@latest add avatar
npx shadcn@latest add separator
npx shadcn@latest add tooltip
```

## 5. AI Coding Assistant Prompt

# PHASE 4 — FRONTEND FOUNDATION & APPLICATION SHELL

Kamu bertindak sebagai Senior Frontend Developer.

Project: MoneyTrack

Dokumen:

- PROJECT_PRD_AND_PLAYBOOK.md
- TECHNICAL_PLAN.md
- UI_UX_GUIDE.md

## Objective

Implementasikan frontend foundation dan application shell.

## Tasks

1. Buat folder structure final.
2. Implementasikan global styles.
3. Implementasikan design tokens.
4. Implementasikan typography.
5. Implementasikan dashboard layout.
6. Implementasikan sidebar.
7. Implementasikan header.
8. Implementasikan mobile navigation.
9. Implementasikan landing page shell.
10. Implementasikan login page shell.
11. Implementasikan register page shell.
12. Implementasikan dashboard page shell.
13. Implementasikan seluruh route dasar.
14. Implementasikan reusable UI components.
15. Implementasikan responsive behavior.

## Restrictions

- Jangan implementasikan authentication backend.
- Jangan implementasikan database.
- Jangan implementasikan transaksi sebenarnya.
- Jangan implementasikan financial calculation.
- Jangan menambahkan fitur di luar PRD.
- Jangan menggunakan mock data sebagai data production.

## Expected Deliverables

Frontend foundation yang konsisten dengan UI_UX_GUIDE.md.

## Verification

npm run lint\
npx tsc --noEmit\
npm run build

Periksa seluruh route.

Laporkan file yang dibuat dan diubah.

Jangan lanjut ke Phase 5.

## 6. Expected Deliverables

- Application shell.
- Sidebar.
- Header.
- Navigation.
- Page routes.
- Global design system.
- Reusable UI components.

## 7. Acceptance Criteria

- Semua route utama tersedia.
- Layout konsisten.
- Responsive.
- Navigation bekerja.
- Reusable components tersedia.
- Tidak ada business logic.
- Tidak ada TypeScript error.
- Build berhasil.

## 8. Testing Requirements

```
npm run lint
npx tsc --noEmit
npm run build
```

Lakukan visual inspection pada:

- Desktop.
- Tablet.
- Mobile.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 4: frontend foundation"
```

# PHASE 5 — Core Frontend Feature Development

Frontend Features

## 1. Phase Objective

Mengembangkan seluruh UI inti MoneyTrack dengan mock data sementara.

## 2. Scope of Work

- Dashboard UI.
- Transaction UI.
- Transaction form.
- Account management UI.
- Category management UI.
- Budget management UI.
- Report UI.
- Form validation.
- Client-side state.
- Loading and error states.

## 3. Detailed Implementation Steps

### Step 1 — Dashboard

Implementasikan:

- Total balance.
- Income summary.
- Expense summary.
- Monthly chart.
- Category breakdown.
- Recent transactions.
- Budget overview.

### Step 2 — Transaction Management

Implementasikan:

- Transaction table.
- Add transaction dialog.
- Edit transaction dialog.
- Delete confirmation.
- Search.
- Filter.
- Pagination UI.

### Step 3 — Transaction Form

Field:

```
Type
Amount
Category
Account
Date
Description
```

Gunakan React Hook Form + Zod.

### Step 4 — Account Management

Implementasikan:

- Account list.
- Create account.
- Edit account.
- Account detail card.

### Step 5 — Category Management

Implementasikan:

- Category list.
- Create category.
- Edit category.
- Delete confirmation.

### Step 6 — Budget Management

Implementasikan:

- Budget list.
- Create budget.
- Edit budget.
- Progress visualization.

### Step 7 — Reports

Implementasikan:

- Date filter.
- Income expense chart.
- Category chart.
- Monthly trend.

### Step 8 — Mock Data

Gunakan mock data terpisah:

```
src/features/
├── dashboard/
│   └── mocks/
├── transactions/
│   └── mocks/
├── accounts/
│   └── mocks/
├── budgets/
│   └── mocks/
```

Mock data hanya untuk visualisasi dan pengembangan frontend.

Tambahkan komentar bahwa mock service harus diganti pada Phase 7.

### Step 9 — State Management

Gunakan:

- React state untuk form.
- React state untuk filter sederhana.
- Zustand hanya untuk state global UI yang diperlukan.

Jangan menyimpan data transaksi permanen di Zustand.

## 4. Required Commands

```
npm install date-fns
npm install @hookform/resolvers
```

Dependency kedua mungkin sudah terpasang di Phase 1; jangan menginstalnya ulang jika tersedia.

## 5. AI Coding Assistant Prompt

# PHASE 5 — CORE FRONTEND FEATURES

Kamu bertindak sebagai Senior Frontend Engineer.

Project: MoneyTrack

Dokumen:

- PROJECT_PRD_AND_PLAYBOOK.md
- TECHNICAL_PLAN.md
- UI_UX_GUIDE.md

## Objective

Implementasikan seluruh core frontend features menggunakan mock data sementara.

## Tasks

1. Implementasikan dashboard.
2. Implementasikan summary cards.
3. Implementasikan financial charts.
4. Implementasikan transaction list.
5. Implementasikan transaction CRUD UI.
6. Implementasikan transaction form.
7. Implementasikan client-side validation.
8. Implementasikan account management UI.
9. Implementasikan category management UI.
10. Implementasikan budget management UI.
11. Implementasikan report UI.
12. Implementasikan search dan filters.
13. Implementasikan pagination UI.
14. Implementasikan loading state.
15. Implementasikan empty state.
16. Implementasikan error state.
17. Implementasikan success feedback.
18. Implementasikan responsive behavior.

## Mock Data Rules

Mock data hanya boleh digunakan untuk pengembangan UI.

Pisahkan mock service dari komponen UI.

Jangan membuat mock data seolah-olah merupakan production data.

## Restrictions

- Jangan membuat database.
- Jangan membuat API backend.
- Jangan mengimplementasikan authentication backend.
- Jangan mengimplementasikan business logic production.
- Jangan melanjutkan ke Phase 6.

## Expected Deliverables

Seluruh core UI MoneyTrack siap diintegrasikan dengan backend.

## Verification

npm run lint\
npx tsc --noEmit\
npm run build

Lakukan visual inspection.

Laporkan mock data yang digunakan dan lokasi file-nya.

Jangan lanjut ke Phase 6.

## 6. Expected Deliverables

- Dashboard UI.
- Transaction UI.
- Account UI.
- Category UI.
- Budget UI.
- Report UI.
- Forms.
- Mock services.
- Reusable feature components.

## 7. Acceptance Criteria

- Dashboard tampil lengkap.
- Transaction CRUD UI tersedia.
- Form validation berjalan.
- Account UI tersedia.
- Category UI tersedia.
- Budget UI tersedia.
- Report UI tersedia.
- Loading state tersedia.
- Empty state tersedia.
- Error state tersedia.
- Responsive.

## 8. Testing Requirements

- Form validation testing.
- Component interaction testing.
- Responsive testing.
- Type checking.
- Lint.
- Production build.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 5: core frontend features"
```

# PHASE 6 — Backend & Core Business Logic

Critical Backend Phase

## 1. Phase Objective

Membangun backend dan financial business logic MoneyTrack.

## 2. Scope of Work

- PostgreSQL.
- Prisma.
- Database migration.
- Authentication.
- Authorization.
- Transaction APIs.
- Account APIs.
- Category APIs.
- Budget APIs.
- Dashboard APIs.
- Report APIs.
- Business calculations.
- Error handling.

## 3. Detailed Implementation Steps

### Step 1 — Setup PostgreSQL

Development dapat menggunakan Docker Compose.

```
docker run --name moneytrack-db \
  -e POSTGRES_USER=moneytrack \
  -e POSTGRES_PASSWORD=moneytrack_dev \
  -e POSTGRES_DB=moneytrack \
  -p 5432:5432 \
  -d postgres:17
```

Untuk penggunaan lokal, password di atas hanya contoh development dan tidak boleh digunakan pada production.

### Step 2 — Setup Environment

`.env`:

```
DATABASE_URL="postgresql://moneytrack:moneytrack_dev@localhost:5432/moneytrack"
AUTH_SECRET="replace-with-generated-secret"
AUTH_URL="http://localhost:3000"
```

Generate secret:

```
openssl rand -base64 32
```

### Step 3 — Initialize Prisma

```
npx prisma init
```

Sesuaikan `schema.prisma` berdasarkan `TECHNICAL_PLAN.md`.

### Step 4 — Create Database Migration

```
npx prisma migrate dev --name init
npx prisma generate
```

### Step 5 — Authentication

Implementasikan:

- User registration.
- Password hashing.
- Login.
- Session.
- Logout.
- Protected routes.

Gunakan konfigurasi Auth.js yang sesuai versi terinstal.

### Step 6 — Account Service

Implementasikan:

```
createAccount()
getAccounts()
updateAccount()
deleteAccount()
calculateAccountBalance()
```

### Step 7 — Category Service

Implementasikan:

```
createCategory()
getCategories()
updateCategory()
deleteCategory()
```

### Step 8 — Transaction Service

Implementasikan:

```
createTransaction()
getTransactions()
getTransactionById()
updateTransaction()
deleteTransaction()
```

Validasi:

- Ownership.
- Amount.
- Category type.
- Account.
- Transaction date.

### Step 9 — Budget Service

Implementasikan:

```
createBudget()
getBudgets()
updateBudget()
deleteBudget()
calculateBudgetUsage()
```

### Step 10 — Dashboard Service

Implementasikan:

```
getFinancialSummary()
getRecentTransactions()
getExpenseBreakdown()
getMonthlyCashFlow()
```

### Step 11 — Reports

Implementasikan:

```
getIncomeExpenseReport()
getExpenseCategoryReport()
getMonthlyTrendReport()
```

### Step 12 — Error Handling

Implementasikan:

- Standard API response.
- Validation errors.
- Unauthorized.
- Forbidden.
- Not found.
- Internal server errors.

### Step 13 — Seed Data

Buat seed script untuk:

- Development user.
- Default categories.
- Example accounts.
- Example transactions.

Seed harus khusus development dan tidak boleh otomatis membuat data contoh pada production.

### Step 14 — Financial Consistency

Pastikan:

- Saldo dihitung dari initial balance dan transaksi.
- Edit transaksi mengubah hasil perhitungan.
- Delete transaksi mengubah hasil perhitungan.
- Budget dihitung dari expense.
- Query hanya berdasarkan user yang login.

## 4. Required Commands

```
npm install prisma @prisma/client
npm install @prisma/adapter-pg pg
npm install -D @types/pg
npm install next-auth
```

Untuk password hashing, pilih Argon2id jika kompatibel dengan runtime deployment.

```
npx prisma init
npx prisma migrate dev --name init
npx prisma generate
npx prisma studio
```

Jangan menginstal dependency yang sudah ada.

## 5. AI Coding Assistant Prompt

# PHASE 6 — BACKEND & CORE BUSINESS LOGIC

Kamu bertindak sebagai Senior Backend Engineer.

Project: MoneyTrack

Dokumen:

- PROJECT_PRD_AND_PLAYBOOK.md
- TECHNICAL_PLAN.md

## Objective

Implementasikan backend production-ready untuk MVP MoneyTrack.

## Tasks

1. Setup PostgreSQL.
2. Setup Prisma.
3. Implementasikan database schema.
4. Buat migration.
5. Implementasikan Auth.js.
6. Implementasikan registration.
7. Implementasikan login dan logout.
8. Implementasikan session validation.
9. Implementasikan authorization.
10. Implementasikan account service.
11. Implementasikan category service.
12. Implementasikan transaction service.
13. Implementasikan budget service.
14. Implementasikan dashboard service.
15. Implementasikan report service.
16. Implementasikan seluruh API routes.
17. Implementasikan Zod validation.
18. Implementasikan error handling.
19. Implementasikan database ownership checks.
20. Implementasikan development seed.
21. Tambahkan logging yang aman.

## Critical Financial Rules

- Gunakan integer atau BigInt untuk nominal.
- Jangan menggunakan floating point untuk perhitungan uang.
- Pastikan transaction ownership.
- Pastikan account ownership.
- Pastikan category ownership.
- Pastikan category type sesuai transaction type.
- Hitung saldo dari initial balance dan transaksi.
- Pastikan edit dan delete transaksi memengaruhi perhitungan.
- Budget hanya menghitung pengeluaran yang sesuai.
- Hindari data leakage antar pengguna.

## Security Requirements

Setiap endpoint wajib melakukan authentication dan authorization yang sesuai.

Jangan mengandalkan middleware saja untuk melindungi data.

Setiap query harus memastikan kepemilikan resource.

Jangan expose password hash atau secret.

## Restrictions

- Jangan mengimplementasikan frontend baru.
- Jangan mengubah desain.
- Jangan menambahkan fitur P2.
- Jangan menggunakan mock data sebagai pengganti backend.
- Jangan membuat microservices.

## Expected Deliverables

Backend MoneyTrack dengan database dan API yang berfungsi.

## Verification

Jalankan:

- Prisma validation.
- Migration.
- Type check.
- Lint.
- Unit tests untuk financial calculations.
- Build.

Jangan mengklaim test berhasil jika belum dijalankan.

Laporkan API endpoints, schema, dependency, dan testing results.

Jangan lanjut ke Phase 7.

## 6. Expected Deliverables

- PostgreSQL configuration.
- Prisma schema.
- Database migrations.
- Auth.js.
- Authentication.
- API routes.
- Business services.
- Repositories.
- Financial calculation functions.
- Seed scripts.
- Error handling.

## 7. Acceptance Criteria

- Database berjalan.
- Migration berhasil.
- Register berhasil.
- Login berhasil.
- Logout berhasil.
- Protected routes bekerja.
- Ownership validation berjalan.
- Transaction CRUD berhasil.
- Account CRUD berhasil.
- Category CRUD berhasil.
- Budget CRUD berhasil.
- Dashboard API bekerja.
- Report API bekerja.
- Financial calculations benar.
- Data isolation terjamin.

## 8. Testing Requirements

Unit tests wajib untuk:

1. Balance calculation.
2. Income calculation.
3. Expense calculation.
4. Budget usage.
5. Budget remaining.
6. Transaction validation.
7. Ownership validation.

Integration tests:

- Register.
- Login.
- Create transaction.
- Update transaction.
- Delete transaction.
- Create budget.
- Retrieve dashboard.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 6: backend implementation"
```

# PHASE 7 — Frontend & Backend Integration

Integration

## 1. Phase Objective

Mengintegrasikan seluruh frontend dengan backend production.

Mock data harus diganti dengan data aktual.

## 2. Scope of Work

- API service integration.
- Authentication integration.
- Session handling.
- Dashboard data.
- Transaction CRUD.
- Account CRUD.
- Category CRUD.
- Budget CRUD.
- Reports.
- Error mapping.
- Loading state.
- Data synchronization.

## 3. Detailed Implementation Steps

### Step 1 — API Client

Gunakan native fetch.

Buat:

```
src/lib/api/
├── client.ts
└── errors.ts
```

Tidak wajib menggunakan Axios karena native fetch sudah cukup untuk kebutuhan MVP.

### Step 2 — Authentication Integration

Hubungkan:

- Login form.
- Register form.
- Session.
- Protected routes.
- Logout button.

### Step 3 — Dashboard Integration

Ambil data:

```
GET /api/dashboard/summary
GET /api/dashboard/recent-transactions
GET /api/dashboard/expense-breakdown
```

### Step 4 — Transaction Integration

Implementasikan:

- Fetch transactions.
- Create.
- Edit.
- Delete.
- Search.
- Filtering.
- Pagination.

### Step 5 — Account Integration

Hubungkan seluruh operasi account ke backend.

### Step 6 — Category Integration

Hubungkan category management.

### Step 7 — Budget Integration

Hubungkan budget management.

### Step 8 — Reports Integration

Hubungkan:

- Cash flow.
- Expense category.
- Monthly trend.

### Step 9 — Remove Mock Data

Hapus mock services dari production execution path.

Pastikan tidak ada fallback diam-diam ke data palsu ketika API gagal.

### Step 10 — Error Mapping

Contoh:

```
try {
  await createTransaction(payload);
} catch (error) {
  // Map API error to user-friendly message.
}
```

### Step 11 — Refresh Strategy

Setelah create, update, atau delete:

- Revalidate data.
- Refresh dashboard.
- Update transaction list.
- Refresh budget progress.

Gunakan mekanisme refresh Next.js yang sesuai dengan pendekatan data fetching yang dipilih.

## 4. Required Commands

```
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

## 5. AI Coding Assistant Prompt

# PHASE 7 — FRONTEND & BACKEND INTEGRATION

Kamu bertindak sebagai Senior Fullstack Developer.

Project: MoneyTrack

Dokumen:

- PROJECT_PRD_AND_PLAYBOOK.md
- TECHNICAL_PLAN.md
- UI_UX_GUIDE.md

## Objective

Integrasikan seluruh core frontend dengan backend MoneyTrack.

## Tasks

1. Buat API client.
2. Integrasikan authentication.
3. Integrasikan login.
4. Integrasikan registration.
5. Integrasikan session handling.
6. Integrasikan dashboard.
7. Integrasikan transaction CRUD.
8. Integrasikan account CRUD.
9. Integrasikan category CRUD.
10. Integrasikan budget CRUD.
11. Integrasikan financial reports.
12. Implementasikan data fetching.
13. Implementasikan error mapping.
14. Implementasikan loading states.
15. Implementasikan success notifications.
16. Implementasikan data refresh.
17. Hapus mock service dari production execution path.

## Important Rules

- Gunakan API backend sebenarnya.
- Jangan menggunakan mock data sebagai fallback.
- Jangan menyimpan data finansial permanen hanya di client state.
- Jangan mengubah financial calculation rules.
- Jangan menambahkan fitur P2.
- Jangan mengubah database schema tanpa alasan dan dokumentasi.

## Integration Requirements

Pastikan seluruh data yang ditampilkan berasal dari backend.

Pastikan seluruh operasi CRUD berjalan.

Pastikan error API ditampilkan secara benar.

Pastikan session expired ditangani.

Pastikan user hanya dapat mengakses datanya sendiri.

## Expected Deliverables

MoneyTrack frontend dan backend terintegrasi end-to-end.

## Verification

Uji:

- Register.
- Login.
- Dashboard.
- Create transaction.
- Update transaction.
- Delete transaction.
- Account management.
- Category management.
- Budget management.
- Reports.

Jalankan lint, type check, dan production build.

Jangan lanjut ke Phase 8.

## 6. Expected Deliverables

- API client.
- Authentication integration.
- Dashboard integration.
- Transaction integration.
- Account integration.
- Category integration.
- Budget integration.
- Report integration.
- Error handling.
- No production mock data.

## 7. Acceptance Criteria

- Login frontend terhubung.
- Register frontend terhubung.
- Dashboard menampilkan data aktual.
- Transaction CRUD berjalan.
- Account CRUD berjalan.
- Category CRUD berjalan.
- Budget CRUD berjalan.
- Reports berjalan.
- Loading state berfungsi.
- Error handling berfungsi.
- Mock services tidak digunakan pada production flow.

## 8. Testing Requirements

End-to-end testing manual atau otomatis untuk seluruh core flows.

Periksa juga:

- Session expiration.
- Invalid request.
- Network failure.
- Empty database.
- Multiple users.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 7: frontend backend integration"
```

# PHASE 8 — Additional Features & Product Completion

Product Completion

## 1. Phase Objective

Menyelesaikan fitur P1 dan meningkatkan kualitas pengalaman pengguna.

## 2. Scope of Work

- CSV export.
- Transaction search.
- Advanced filters.
- Profile settings.
- Dark mode.
- Budget improvements.
- Pagination improvements.
- Accessibility.
- SEO.

## 3. Detailed Implementation Steps

### Step 1 — CSV Export

Implementasikan export transaksi.

Kolom:

```
Date
Type
Category
Account
Description
Amount
```

Pastikan:

- Filter diterapkan.
- Encoding UTF-8.
- CSV injection dimitigasi.
- Data hanya milik pengguna.

### Step 2 — Advanced Search

Tambahkan:

- Search description.
- Filter tanggal.
- Filter kategori.
- Filter account.
- Filter type.

### Step 3 — Pagination

Implementasikan pagination backend.

Jangan mengambil seluruh transaksi dalam satu request.

### Step 4 — Profile Settings

Implementasikan:

- Update name.
- Change password.
- Account preferences.

### Step 5 — Dark Mode

Gunakan theme support shadcn/ui.

### Step 6 — Budget Improvements

Tambahkan:

- Progress indicators.
- Warning threshold.
- Over-budget state.
- Budget remaining.

### Step 7 — Accessibility

Pastikan:

- Label form.
- Keyboard navigation.
- Dialog accessibility.
- Contrast.
- Focus states.

### Step 8 — SEO

Implementasikan metadata pada halaman publik.

Dashboard harus diberi aturan indexing yang sesuai.

## 4. Required Commands

Jika diperlukan:

```
npx shadcn@latest add calendar
npx shadcn@latest add progress
```

Jangan instal ulang komponen yang sudah tersedia.

## 5. AI Coding Assistant Prompt

# PHASE 8 — ADDITIONAL FEATURES & PRODUCT COMPLETION

Kamu bertindak sebagai Senior Fullstack Product Engineer.

Project: MoneyTrack

Dokumen:

- PROJECT_PRD_AND_PLAYBOOK.md
- TECHNICAL_PLAN.md
- UI_UX_GUIDE.md

## Objective

Selesaikan fitur P1 dan polish seluruh produk.

## Tasks

1. Implementasikan CSV export.
2. Implementasikan advanced transaction search.
3. Implementasikan advanced filters.
4. Sempurnakan pagination.
5. Implementasikan profile settings.
6. Implementasikan password change.
7. Implementasikan dark mode.
8. Sempurnakan budget progress.
9. Tambahkan budget warning.
10. Tingkatkan accessibility.
11. Tingkatkan responsive behavior.
12. Implementasikan SEO untuk halaman publik.
13. Perbaiki UX berdasarkan hasil pengujian.

## Restrictions

- Jangan implementasikan fitur P2.
- Jangan membuat AI assistant.
- Jangan membuat bank integration.
- Jangan membuat recurring transaction.
- Jangan mengubah scope MVP.
- Jangan melakukan redesign total tanpa alasan.

## Security

CSV export hanya boleh mengambil data pengguna yang sedang login.

Tangani CSV formula injection.

Pastikan profile update memiliki authorization.

## Expected Deliverables

Seluruh fitur P1 yang disepakati selesai.

## Verification

Uji seluruh fitur P1.

Jalankan:\
npm run lint\
npx tsc --noEmit\
npm run build

Jangan lanjut ke Phase 9.

## 6. Expected Deliverables

- CSV export.
- Advanced search.
- Advanced filtering.
- Profile settings.
- Dark mode.
- Improved budget UX.
- Accessibility improvements.
- SEO metadata.

## 7. Acceptance Criteria

- CSV export berjalan.
- Search bekerja.
- Filter bekerja.
- Pagination bekerja.
- Profile dapat diubah.
- Password dapat diperbarui.
- Dark mode berjalan.
- Budget warning tampil.
- Accessibility diperbaiki.
- Responsive behavior baik.

## 8. Testing Requirements

- CSV export validation.
- Search testing.
- Filter combination testing.
- Profile update testing.
- Password update testing.
- Accessibility review.
- Responsive review.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 8: additional features"
```

# PHASE 9 — Testing, Security & Optimization

Quality Assurance

## 1. Phase Objective

Memastikan MoneyTrack stabil, aman, dan siap dideploy.

Output:

`TEST_REPORT.md`

## 2. Scope of Work

- Unit testing.
- Integration testing.
- E2E testing.
- Security audit.
- Performance optimization.
- Responsive testing.
- Build verification.
- Bug fixing.

## 3. Detailed Implementation Steps

### Step 1 — Setup Testing Tools

Gunakan Vitest untuk unit/integration testing.

Gunakan Playwright untuk E2E testing.

```
npm install -D vitest @vitejs/plugin-react jsdom
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event
npm install -D @playwright/test
```

Sesuaikan konfigurasi Vitest agar kompatibel dengan proyek Next.js dan TypeScript.

### Step 2 — Unit Testing

Test:

- Balance calculation.
- Income calculation.
- Expense calculation.
- Budget calculation.
- Date filtering.
- Currency formatting.
- Validation.

### Step 3 — Integration Testing

Test:

- Authentication.
- Transaction CRUD.
- Account CRUD.
- Category CRUD.
- Budget CRUD.
- Reports.

Gunakan database testing terpisah, jangan database production.

### Step 4 — E2E Testing

Test flow:

```
Register
  |
Login
  |
Create Account
  |
Create Transaction
  |
View Dashboard
  |
Create Budget
  |
View Report
  |
Logout
```

### Step 5 — Security Testing

Periksa:

- Unauthorized access.
- IDOR.
- Cross-user data access.
- Input validation.
- Session security.
- Rate limiting.
- Secret exposure.
- SQL injection.
- CSV injection.
- CSRF protections.

### Step 6 — Performance Testing

Periksa:

- Dashboard queries.
- Transaction pagination.
- Database indexes.
- Chart rendering.
- Bundle size.
- Loading behavior.

### Step 7 — Responsive Testing

Periksa:

- 320px.
- 375px.
- 768px.
- 1024px.
- 1440px.

### Step 8 — Production Build

```
npm run lint
npx tsc --noEmit
npm run build
```

### Step 9 — Generate Test Report

Buat:

`TEST_REPORT.md`

Isi:

- Test summary.
- Test environment.
- Test cases.
- Passed tests.
- Failed tests.
- Security findings.
- Performance findings.
- Known issues.
- Release recommendation.

## 4. Required Commands

```
npx vitest run
npx playwright test

npm run lint
npx tsc --noEmit
npm run build
```

Tambahkan scripts yang diperlukan pada `package.json`, misalnya:

```
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

## 5. AI Coding Assistant Prompt

# PHASE 9 — TESTING, SECURITY & OPTIMIZATION

Kamu bertindak sebagai Senior QA Engineer dan Security Engineer.

Project: MoneyTrack

Dokumen:

- PROJECT_PRD_AND_PLAYBOOK.md
- TECHNICAL_PLAN.md
- UI_UX_GUIDE.md

## Objective

Melakukan testing menyeluruh terhadap MVP MoneyTrack.

## Tasks

1. Audit seluruh functional requirements.
2. Setup Vitest.
3. Setup Playwright.
4. Implementasikan unit tests.
5. Implementasikan integration tests.
6. Implementasikan E2E tests.
7. Test financial calculations.
8. Test authentication.
9. Test authorization.
10. Test data isolation.
11. Test transaction CRUD.
12. Test budget calculations.
13. Test reports.
14. Audit API security.
15. Audit input validation.
16. Audit session security.
17. Audit database queries.
18. Test responsive UI.
19. Optimize performance.
20. Perbaiki bug yang ditemukan.
21. Generate TEST_REPORT.md.

## Important Rules

- Jangan menambahkan fitur baru.
- Jangan mengubah scope MVP.
- Jangan mengklaim test berhasil tanpa menjalankannya.
- Jangan menghapus test yang gagal hanya agar build terlihat berhasil.
- Dokumentasikan known issues.
- Gunakan test database terpisah.
- Jangan menggunakan data production untuk testing.

## Expected Deliverable

TEST_REPORT.md.

## Verification

Jalankan:\
npm run lint\
npx tsc --noEmit\
npm run build\
npm test\
npm run test

Laporkan hasil aktual setiap command.

## Release Gate

Jangan merekomendasikan production release jika terdapat critical security issue atau kegagalan core financial calculation.

Jangan lanjut ke Phase 10.

## 6. Expected Deliverables

```
TEST_REPORT.md
```

Beserta:

- Unit tests.
- Integration tests.
- E2E tests.
- Security audit.
- Bug fixes.
- Performance improvements.

## 7. Acceptance Criteria

- Unit tests berhasil.
- Integration tests berhasil.
- E2E tests berhasil.
- Financial calculations benar.
- Authentication aman.
- Authorization aman.
- User data isolation benar.
- Tidak ada critical security findings.
- Responsive testing selesai.
- Build berhasil.
- Test report tersedia.

## 8. Testing Requirements

Jalankan seluruh test suite.

Buat laporan berdasarkan hasil aktual, bukan asumsi.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 9: testing and optimization"
```

# PHASE 10 — Production Deployment & Release

Production Release

## 1. Phase Objective

Melakukan deployment MoneyTrack ke production.

Output:

- `DEPLOYMENT_GUIDE.md`
- `RELEASE_NOTES.md`

## 2. Scope of Work

- Production environment.
- Environment variables.
- Docker.
- PostgreSQL deployment.
- Reverse proxy.
- HTTPS.
- Domain.
- DNS.
- Database migration.
- Backup.
- Monitoring.
- Production smoke test.

## 3. Detailed Implementation Steps

### Step 1 — Prepare Production Environment

Rekomendasi awal:

| Resource      | Suggested  |
| ------------- | ---------- |
| CPU           | 2 vCPU     |
| RAM           | 4 GB       |
| Storage       | 40 GB SSD  |
| OS            | Ubuntu LTS |
| Database      | PostgreSQL |
| Reverse Proxy | Nginx      |

Ini merupakan baseline awal, bukan spesifikasi minimum mutlak. Sesuaikan dengan jumlah pengguna, workload, dan kapasitas database.

### Step 2 — Setup Production Environment Variables

```
NODE_ENV=production

DATABASE_URL=postgresql://...

AUTH_SECRET=...

AUTH_URL=https://moneytrack.example.com
```

Jangan menyimpan secret dalam Docker image atau Git repository.

### Step 3 — Create Dockerfile

```
FROM node:22-alpine AS base

WORKDIR /app

FROM base AS deps

COPY package*.json ./

RUN npm ci

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npx prisma generate
RUN npm run build

FROM base AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

Pastikan `next.config.ts` mengaktifkan:

```
const nextConfig = {
  output: "standalone",
};

export default nextConfig;
```

Pastikan Prisma runtime dan migration deployment telah dikonfigurasi dengan benar. Jangan mengandalkan Prisma CLI yang tidak tersedia dalam image runtime untuk menjalankan migration.

### Step 4 — Docker Compose

Contoh:

```
services:
  app:
    build: .
    restart: unless-stopped
    environment:
      NODE_ENV: production
      DATABASE_URL: ${DATABASE_URL}
      AUTH_SECRET: ${AUTH_SECRET}
      AUTH_URL: ${AUTH_URL}
    ports:
      - "127.0.0.1:3000:3000"
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:17
    restart: unless-stopped
    environment:
      POSTGRES_USER: moneytrack
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: moneytrack
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U moneytrack -d moneytrack"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

Untuk production, jangan expose PostgreSQL ke public internet.

Tambahkan `.dockerignore`:

```
node_modules
.next
.git
.env
.env.*
!.env.example
```

### Step 5 — Build Docker Image

```
docker compose build
```

### Step 6 — Deploy Database

Pastikan PostgreSQL siap.

Jalankan migration dengan deployment procedure yang telah diuji.

```
npx prisma migrate deploy
```

Perintah ini harus dijalankan dari environment yang memiliki Prisma CLI, schema, dan koneksi production database.

### Step 7 — Start Application

```
docker compose up -d
```

### Step 8 — Configure Nginx

Contoh:

```
server {
    listen 80;
    server_name moneytrack.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;

        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Step 9 — Setup HTTPS

Gunakan Certbot.

```
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx
```

```
sudo certbot --nginx -d moneytrack.example.com
```

### Step 10 — Setup Backup

Contoh backup manual:

```
docker exec moneytrack-db \
  pg_dump -U moneytrack moneytrack \
  > moneytrack_backup.sql
```

Pada deployment Docker Compose di atas, nama container database dapat berbeda. Sesuaikan command dengan nama container aktual.

Jadwalkan backup otomatis dan simpan salinan di lokasi terpisah dari VPS.

Lakukan restore test secara berkala.

### Step 11 — Monitoring

Monitor:

- Application health.
- Database availability.
- CPU.
- RAM.
- Disk.
- Error logs.
- Backup status.

### Step 12 — Production Smoke Test

Test:

1. Landing page.
2. Register.
3. Login.
4. Create account.
5. Create transaction.
6. Dashboard.
7. Budget.
8. Report.
9. Logout.

### Step 13 — Documentation

Buat:

`DEPLOYMENT_GUIDE.md`

dan:

`RELEASE_NOTES.md`

## 4. Required Commands

```
docker --version
docker compose version

docker compose build
docker compose up -d

docker compose ps
docker compose logs -f app

npx prisma migrate deploy
```

Untuk Nginx:

```
sudo nginx -t
sudo systemctl reload nginx
```

## 5. AI Coding Assistant Prompt

# PHASE 10 — PRODUCTION DEPLOYMENT & RELEASE

Kamu bertindak sebagai Senior DevOps Engineer.

Project: MoneyTrack

Dokumen:

- PROJECT_PRD_AND_PLAYBOOK.md
- TECHNICAL_PLAN.md
- TEST_REPORT.md

## Objective

Siapkan MoneyTrack untuk production deployment.

## Tasks

1. Audit production configuration.
2. Setup production environment variables.
3. Review Dockerfile.
4. Setup Docker Compose.
5. Review PostgreSQL deployment.
6. Setup production migration.
7. Setup Nginx reverse proxy.
8. Setup HTTPS.
9. Setup domain configuration.
10. Setup backup strategy.
11. Setup monitoring.
12. Setup application logging.
13. Setup production health checks.
14. Jalankan production build.
15. Jalankan deployment smoke tests.
16. Dokumentasikan deployment.
17. Buat release notes.

## Important Rules

- Jangan mengubah business logic tanpa alasan.
- Jangan memasukkan secret ke repository.
- Jangan expose database ke public internet.
- Jangan menggunakan development credentials.
- Jangan menghapus data production.
- Jangan menjalankan destructive migration tanpa backup.
- Jangan mengklaim deployment berhasil tanpa verifikasi.
- Jangan membuat konfigurasi desktop application.

## Expected Deliverables

1. DEPLOYMENT_GUIDE.md
2. RELEASE_NOTES.md
3. Dockerfile.
4. Docker Compose configuration.
5. Nginx configuration.
6. Production environment documentation.

## Verification

Verifikasi:

- Docker build.
- Database connectivity.
- Prisma migration.
- Application startup.
- HTTPS.
- Authentication.
- Transaction CRUD.
- Dashboard.
- Budget.
- Reports.
- Backup procedure.

## Final Report

Laporkan:

- Deployment architecture.
- Production configuration.
- Environment variables.
- Domain.
- HTTPS.
- Database status.
- Smoke test results.
- Backup strategy.
- Monitoring.
- Known issues.
- Release status.

Jangan mengklaim production release berhasil jika belum benar-benar diverifikasi.

## 6. Expected Deliverables

```
DEPLOYMENT_GUIDE.md
RELEASE_NOTES.md
Dockerfile
docker-compose.yml
```

## 7. Acceptance Criteria

- Production build berhasil.
- Docker image berhasil dibuat.
- PostgreSQL berjalan.
- Migration berhasil.
- Aplikasi berjalan.
- Domain terhubung.
- HTTPS aktif.
- Environment variables aman.
- Database backup tersedia.
- Restore procedure terdokumentasi.
- Smoke test berhasil.
- Deployment guide tersedia.
- Release notes tersedia.

## 8. Testing Requirements

Production smoke test.

Security verification.

Backup verification.

Database connectivity.

HTTPS verification.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 10: production deployment"
```

# PART C — GLOBAL AI CODING RULES

Aturan ini berlaku untuk seluruh phase.

## 1. Development Rules

1. Selalu baca PRD.
2. Baca technical plan sebelum implementasi.
3. Kerjakan hanya phase yang diminta.
4. Jangan melanjutkan phase otomatis.
5. Jangan mengubah architecture tanpa alasan.
6. Jangan menghapus pekerjaan sebelumnya.
7. Jangan menambahkan fitur di luar scope.
8. Jangan mengarang hasil testing.
9. Jangan membuat abstraksi berlebihan.
10. Prioritaskan maintainability.

## 2. Code Quality

- TypeScript strict mode.
- Reusable components.
- Consistent naming.
- Small functions.
- Separation of concerns.
- Avoid duplicated logic.
- No unnecessary dependencies.

## 3. Financial Data Rules

1. Nominal disimpan sebagai integer/BigInt.
2. Tidak menggunakan floating-point untuk perhitungan uang.
3. Semua transaksi harus memiliki user ownership.
4. Semua operasi finansial harus divalidasi backend.
5. Saldo harus berasal dari data aktual.
6. Dashboard tidak boleh menggunakan mock data production.
7. Setiap perubahan transaksi harus tercermin pada laporan.

## 4. Security Rules

- Validate every input.
- Verify authentication.
- Verify ownership.
- Protect sensitive data.
- Never expose secrets.
- Do not trust frontend validation alone.
- Protect sensitive endpoints from abuse.

## 5. Mock Data Rules

Mock data hanya boleh digunakan:

- Phase 5.
- Untuk unit testing.
- Untuk storybook atau UI development jika kelak digunakan.

Mulai Phase 7, mock data tidak boleh menggantikan API production.

## 6. Required Phase Report

Setiap AI Coding Assistant wajib memberikan laporan:

```
PHASE REPORT

Phase:
Status:

1. Summary
2. Files Created
3. Files Modified
4. Dependencies Added
5. Implementation Details
6. Tests Executed
7. Test Results
8. Build Results
9. Known Issues
10. Git Status
11. Acceptance Criteria Status
12. Recommendation
```

# PART D — GIT & EXECUTION RULES

## 1. Git Workflow

Gunakan satu branch utama `main` untuk MVP sederhana.

Jika ingin mengisolasi pekerjaan, gunakan branch fitur:

```
git checkout -b feature/transaction-management
```

Setelah selesai:

```
git checkout main
git merge feature/transaction-management
```

## 2. Git Checkpoint

Setiap phase wajib memiliki checkpoint.

| Phase | Commit Message                          |
| ----- | --------------------------------------- |
| 1     | `phase 1: project bootstrap`            |
| 2     | `phase 2: technical architecture`       |
| 3     | `phase 3: ui ux planning`               |
| 4     | `phase 4: frontend foundation`          |
| 5     | `phase 5: core frontend features`       |
| 6     | `phase 6: backend implementation`       |
| 7     | `phase 7: frontend backend integration` |
| 8     | `phase 8: additional features`          |
| 9     | `phase 9: testing and optimization`     |
| 10    | `phase 10: production deployment`       |

## 3. Checkpoint Procedure

Setelah setiap phase:

```
git status
git diff --check
git diff
```

Jalankan testing yang diwajibkan.

Kemudian:

```
git add .
git commit -m "phase X: description"
```

## 4. Important Rules

Jangan commit apabila:

- Testing wajib belum dijalankan.
- Build gagal.
- Ada perubahan yang belum direview.
- Ada file secret yang ikut ter-stage.
- Ada bug critical yang belum ditangani.

## 5. Recovery Strategy

Jika phase gagal:

1. Jangan melanjutkan phase berikutnya.
2. Identifikasi penyebab.
3. Perbaiki.
4. Jalankan ulang testing.
5. Verifikasi hasil.
6. Buat checkpoint.

Jika perlu kembali ke checkpoint:

```
git log --oneline
```

Gunakan revert untuk membatalkan perubahan yang sudah di-commit dengan aman.

# PART E — COMMAND CHEAT SHEET

## 1. Development

```
npm run dev
```

## 2. Lint

```
npm run lint
```

## 3. Type Check

```
npx tsc --noEmit
```

## 4. Build

```
npm run build
```

## 5. Database

```
npx prisma generate
npx prisma migrate dev
npx prisma migrate deploy
npx prisma studio
```

## 6. Testing

```
npm test
npm run test:e2e
```

## 7. Docker

```
docker compose build
docker compose up -d
docker compose down
docker compose ps
docker compose logs -f
```

## 8. Git

```
git status
git diff
git add .
git commit -m "phase X: description"
git log --oneline
```

## 9. Environment

```
cp .env.example .env
```

Pada Windows PowerShell:

```
Copy-Item .env.example .env
```

# PART F — FINAL CHECKLIST & DOCUMENTATION

## 1. Project Documentation

Dokumen yang harus tersedia:

```
moneytrack/
│
├── PROJECT_PRD_AND_PLAYBOOK.md
├── TECHNICAL_PLAN.md
├── UI_UX_GUIDE.md
├── TEST_REPORT.md
├── DEPLOYMENT_GUIDE.md
├── RELEASE_NOTES.md
│
├── README.md
├── .env.example
├── Dockerfile
├── docker-compose.yml
│
└── src/
```

## 2. Final Product Checklist

### Authentication

- Registration.
- Login.
- Logout.
- Session management.
- Protected routes.
- Authorization.

### Dashboard

- Total balance.
- Income summary.
- Expense summary.
- Cash flow.
- Recent transactions.
- Expense breakdown.

### Transactions

- Create income.
- Create expense.
- Edit transaction.
- Delete transaction.
- Search.
- Filter.
- Pagination.

### Accounts

- Create account.
- Edit account.
- Delete account.
- Calculate balance.

### Categories

- Create category.
- Edit category.
- Delete category.
- Default categories.

### Budgets

- Create budget.
- Edit budget.
- Delete budget.
- Budget progress.
- Remaining budget.

### Reports

- Income report.
- Expense report.
- Monthly trend.
- Category breakdown.

### Additional

- CSV export.
- Profile settings.
- Dark mode.
- Responsive.
- Accessibility.

### Security

- User data isolation.
- Input validation.
- Authentication protection.
- Authorization protection.
- Environment secrets.
- Rate limiting.

### Production

- Build successful.
- Database deployed.
- HTTPS active.
- Domain configured.
- Backup configured.
- Monitoring available.
- Smoke test successful.

## 3. Definition of Done

MoneyTrack dinyatakan selesai apabila:

1. Seluruh P0 selesai.
2. Seluruh acceptance criteria terpenuhi.
3. Fitur P1 yang ditetapkan selesai.
4. Seluruh core user flows berfungsi.
5. Financial calculation telah diverifikasi.
6. Tidak terdapat critical security issue.
7. Production build berhasil.
8. Database production aktif.
9. HTTPS aktif.
10. Backup dan restore procedure tersedia.
11. Dokumentasi lengkap.
12. Git checkpoint seluruh phase tersedia.

# RECOMMENDED EXECUTION ORDER

Berikut urutan pengerjaan yang harus diikuti.

## MoneyTrack Development Roadmap

1. Phase 1 — Bootstrap

   Setup Next.js, dependencies, TypeScript, Git.

   Foundation

2. Phase 2 — Architecture

   Generate TECHNICAL_PLAN.md.

3. Phase 3 — UI/UX

   Generate UI_UX_GUIDE.md.

4. Phase 4 — Frontend Foundation

   Layout, routing, design system.

5. Phase 5 — Core Frontend

   Dashboard, transaction, account, budget, reports.

6. Phase 6 — Backend

   PostgreSQL, Prisma, Auth.js, API, business logic.

   Critical

7. Phase 7 — Integration

   Frontend dan backend end-to-end.

8. Phase 8 — Product Completion

   CSV, filtering, profile, dark mode, accessibility.

9. Phase 9 — QA

   Testing, security, performance, TEST_REPORT.md.

10. Phase 10 — Release

    Docker, VPS, Nginx, HTTPS, production.

    Production

## Rekomendasi Eksekusi

Untuk menghindari AI Coding Assistant mengerjakan terlalu banyak sekaligus, gunakan workflow berikut:

1. Simpan dokumen ini di root repository dengan nama `PROJECT_PRD_AND_PLAYBOOK.md`.
2. Jalankan prompt Phase 1 di VS Code.
3. Tunggu AI menyelesaikan implementasi dan memberikan phase report.
4. Periksa hasil implementasi secara manual.
5. Jalankan acceptance criteria.
6. Buat Git checkpoint.
7. Baru jalankan prompt Phase 2.
8. Ulangi hingga Phase 10.

Jangan meminta AI mengerjakan 10 phase sekaligus. Setiap phase harus menjadi satu sesi pengerjaan yang terkontrol.

Catatan arsitektur penting: MoneyTrack menggunakan PostgreSQL sejak awal karena data transaksi, akun, kategori, dan anggaran memiliki relasi serta membutuhkan konsistensi. Saldo dihitung dari initial balance dan transaksi, bukan disimpan sebagai angka yang diperbarui secara terpisah setiap kali transaksi berubah. Pendekatan ini mengurangi risiko inkonsistensi saldo.

Dengan struktur ini, MoneyTrack memiliki fondasi MVP yang realistis untuk solo developer, dapat dikembangkan bertahap, dan memiliki jalur pengembangan menuju SaaS personal finance yang lebih lengkap.
