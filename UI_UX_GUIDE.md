# UI/UX DESIGN SYSTEM & INTERFACE SPECIFICATION
## MoneyTrack — Personal Finance Management Platform (MVP)

**Document Version:** 1.0.0  
**Phase:** Phase 3 — UI/UX Planning & Design System  
**Roles:** Senior UI/UX Designer & Frontend Architect  
**Traceability References:** `PRD and Playbook.md`, `TECHNICAL_PLAN.md`  

---

## 1. Design Direction & Philosophy

MoneyTrack mengadopsi prinsip desain **Modern Minimalist Fintech Dashboard**. Aplikasi didesain untuk memberikan rasa ketenangan (*financial peace of mind*), kejelasan data (*clarity over decoration*), dan kecepatan interaksi harian (*frictionless daily tracking*).

### 1.1 Core Design Pillars
1. **Clarity & High Legibility**: Data finansial (angka saldo, riwayat transaksi) harus langsung dapat dipahami tanpa distraksi visual.
2. **Visual Hierarchy & Semantic Colors**: Warna memiliki makna fungsional yang ketat (Hijau = Pemasukan/Aman, Merah = Pengeluaran/Defisit, Kuning/Amber = Peringatan Anggaran).
3. **Data-Oriented & Responsive**: Antarmuka dioptimalkan untuk visualisasi angka dan grafik di berbagai ukuran layar (mobile-first interaction untuk pencatatan cepat di HP, desktop-first analytics untuk review laporan).
4. **Accessible & Familiar**: Mengikuti standar WCAG 2.1 AA dengan kontras warna teruji, navigasi keyboard, dan semantik HTML lengkap.

---

## 2. Design Tokens & Color Palette

Tema MoneyTrack mendukung **Light Mode** dan **Dark Mode** secara konsisten melalui CSS variables bawaan Tailwind CSS dan shadcn/ui.

### 2.1 Semantic Color System

| Token | Light Mode Value (OKLCH/Hex) | Dark Mode Value | Semantic Role |
| :--- | :--- | :--- | :--- |
| **`primary`** | `#059669` (Emerald 600) | `#10b981` (Emerald 500) | Warna brand utama, tombol aksi utama (CTA), active state. |
| **`primary-foreground`** | `#ffffff` | `#022c22` | Kontras teks di atas elemen primary. |
| **`background`** | `#f8fafc` (Slate 50) | `#020617` (Slate 950) | Latar belakang kanvas aplikasi. |
| **`foreground`** | `#0f172a` (Slate 900) | `#f8fafc` (Slate 50) | Teks utama aplikasi. |
| **`card` / `surface`**| `#ffffff` | `#0f172a` (Slate 900) | Latar kartu komponen, dialog modal, panel sidebar. |
| **`card-foreground`** | `#0f172a` | `#f8fafc` | Teks di dalam kartu. |
| **`muted`** | `#f1f5f9` (Slate 100) | `#1e293b` (Slate 800) | Latar elemen sekunder, tag tidak aktif, table header. |
| **`muted-foreground`**| `#64748b` (Slate 500) | `#94a3b8` (Slate 400) | Teks sekunder, label pembantu, placeholder, timestamp. |
| **`border`** | `#e2e8f0` (Slate 200) | `#1e293b` (Slate 800) | Garis pemisah komponen, border kartu dan tabel. |
| **`income`** | `#16a34a` (Green 600) | `#22c55e` (Green 500) | Nominal pemasukan (+), saldo surplus, target tercapai. |
| **`expense`** | `#dc2626` (Red 600) | `#ef4444` (Red 500) | Nominal pengeluaran (-), indikator budget habis/over. |
| **`warning`** | `#d97706` (Amber 600) | `#f59e0b` (Amber 500) | Peringatan anggaran terpakai $\ge 80\%$, perhatian penting. |

---

## 3. Typography & Financial Number Formatting

* **Font Family**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`.
* **Tabular Numbers**: Seluruh angka finansial menggunakan class Tailwind `tabular-nums font-mono` atau setting OpenType `tnum` agar digit tersusun tegak lurus pada tabel dan daftar transaksi.

### 3.1 Type Scale

| Level | Size / Line-Height | Weight | Usage |
| :--- | :--- | :--- | :--- |
| **Display / Page Title**| `2rem` (32px) / 1.25 | Bold (700) | Judul utama halaman (Dashboard, Transaksi). |
| **Card Header / H2** | `1.25rem` (20px) / 1.3 | SemiBold (600) | Judul widget kartu, section heading. |
| **Section Subtitle / H3**| `1rem` (16px) / 1.4 | Medium (500) | Sub-heading, nama kategori, nama akun. |
| **Body Regular** | `0.875rem` (14px) / 1.5 | Regular (400) | Teks deskripsi, isi tabel, form input. |
| **Caption / Small** | `0.75rem` (12px) / 1.4 | Regular (400) | Tanggal, catatan kaki form, badge status. |
| **Financial Hero Value**| `2.25rem` (36px) / 1.2 | Bold (700) | Saldo total di kartu utama dashboard. |

### 3.2 Aturan Format Nilai Finansial (IDR)
1. **Simbol Mata Uang**: Menggunakan prefix `Rp` dengan spasi tunggal (`Rp 1.500.000`).
2. **Pemisah Ribuan**: Titik (`.`) sesuai standar konvensi lokal Bahasa Indonesia.
3. **Pemasukan**: Selalu diawali tanda positif hijau `+ Rp 5.000.000`.
4. **Pengeluaran**: Selalu diawali tanda negatif merah `- Rp 250.000`.
5. **Nol Rupiah**: `Rp 0` (netral, warna muted).

---

## 4. Spacing, Elevation & Border Radius System

* **Base Grid**: 4px (`0.25rem`).
* **Padding Kontainer**:
  * Mobile: `px-4 py-6`
  * Tablet/Desktop: `px-8 py-8`
* **Card Border Radius**: `rounded-xl` (12px) untuk kartu, dialog, dan panel.
* **Button & Input Radius**: `rounded-lg` (8px).
* **Elevation / Shadows**:
  * Default card: `shadow-xs border border-border`
  * Dropdown & Popover: `shadow-md border border-border`
  * Modal Dialog: `shadow-xl border border-border`

---

## 5. Iconography System

Menggunakan **Lucide React** dengan ukuran terstandarisasi:
* Icon Tombol / Inline: `size-4` (16px)
* Icon List / Menu: `size-5` (20px)
* Icon Header Kartu / Hero: `size-6` (24px) / container `size-10` rounded-lg.

### 5.1 Standar Icon per Kategori & Menu
* **Dashboard**: `LayoutDashboard`
* **Transaksi**: `ArrowLeftRight`
* **Akun Finansial**: `Wallet`, `Landmark` (Bank), `Smartphone` (E-Wallet)
* **Kategori**: `Tag`, `FolderTree`
* **Anggaran (Budget)**: `PiggyBank`, `Target`
* **Laporan**: `BarChart3`, `PieChart`, `TrendingUp`
* **Pengaturan**: `Settings`, `User`
* **Aksi**: `Plus`, `Search`, `Filter`, `Trash2`, `Edit2`, `Download`, `MoreVertical`

---

## 6. Layout & Navigation Architecture

### 6.1 Desktop Layout (> 1024px)
```
┌─────────────────┬────────────────────────────────────────────────────────┐
│  Brand Logo     │ Header Bar: Page Title | Date Filter | User Profile     │
│  [MoneyTrack]   ├────────────────────────────────────────────────────────┤
├─────────────────┤                                                        │
│  Navigation:    │ Main Scrollable Content Area                           │
│  - Dashboard    │ (Max-width: 1400px, Auto-centered)                     │
│  - Transaksi    │                                                        │
│  - Akun         │                                                        │
│  - Kategori     │                                                        │
│  - Anggaran     │                                                        │
│  - Laporan      │                                                        │
│  - Pengaturan   │                                                        │
│                 │                                                        │
│  [Collapse/User]│ Footer: System Status & Version                        │
└─────────────────┴────────────────────────────────────────────────────────┘
```
* **Sidebar Lebar**: Fixed 260px di sisi kiri, berisi navigasi utama, icon, dan active-state indicator warna `primary`.
* **Top Header**: Tinggi 64px, fixed sticky, menampung judul rute aktif, tombol quick-add `+ Transaksi`, serta avatar user dropdown.

### 6.2 Mobile Layout (< 1024px)
* **Top Bar**: Logo MoneyTrack, hamburger trigger untuk drawer navigasi (Sheet), dan tombol quick-action.
* **Bottom Bar (Opsional) / Mobile Drawer**: Akses 1-klik ke halaman prioritas: Dashboard, Transaksi, Anggaran, Profil.
* **Full-Width Interactions**: Modal form di layar mobile ditampilkan sebagai bottom drawer atau fullscreen dialog yang nyaman untuk sentuhan jempol.

---

## 7. Wireframes & Screen Specifications

### 7.1 Dashboard (`/dashboard`)
```
+-------------------------------------------------------------------------------+
| Halo, Alex! Ringkasan Finansial Anda                          [+ Transaksi]    |
+-------------------------------------------------------------------------------+
| [ Total Saldo ]       | [ Pemasukan Bulan Ini ] | [ Pengeluaran Bulan Ini ]   |
| Rp 18.450.000         | + Rp 12.000.000         | - Rp 6.250.000              |
| 3 Akun Aktif          | Naik 8% dr bln lalu     | 52% dr total anggaran       |
+-------------------------------------------------------------------------------+
| Arus Kas 6 Bulan Terakhir (Bar Chart)   | Proporsi Pengeluaran (Donut Chart)  |
| [ ||  ||  ||  ||  ||  || ]              | [ (O) Makanan (35%), Transport... ] |
+-------------------------------------------------------------------------------+
| Transaksi Terakhir          [Lihat Semua] | Ringkasan Anggaran      [Kelola]  |
| - Kopi Kenangan   - Rp 28.000   [BCA]     | - Makanan: 75% [========    ]     |
| - Gaji Bulanan   + Rp 12.000.000[Mandiri] | - Transport: 92% [=========!]     |
| - Listrik PLN     - Rp 450.000  [Gopay]   | - Hiburan: 30% [===         ]     |
+-------------------------------------------------------------------------------+
```

### 7.2 Transactions Page (`/transactions`)
* **Header Bar**:
  * Search input (pencarian nama/keterangan).
  * Date range selector (Bulan Ini, 30 Hari Terakhir, Custom).
  * Filter dropdown: Tipe (Semua / Pemasukan / Pengeluaran), Akun, Kategori.
  * Tombol CTA: `+ Catat Transaksi`.
* **Data Table**:
  * Kolom: Tanggal, Keterangan/Catatan, Kategori (Badge icon), Akun, Nominal (Hijau/Merah), Aksi (Menu edit/delete).
  * Pagination: `Menampilkan 1-20 dari 142 transaksi | Halaman < 1 2 3 ... 8 >`.
* **Modal Dialog Transaksi**:
  * Pilihan Tab Segment: `Pengeluaran` (Default) | `Pemasukan`.
  * Field: Nominal (Input besar dengan prefix Rp otomatis), Akun (Select), Kategori (Select), Tanggal & Jam (Date picker), Deskripsi / Catatan.

### 7.3 Accounts Page (`/accounts`)
* **Header**: Total Saldo Keseluruhan (`Rp 18.450.000`), Tombol `+ Tambah Akun`.
* **Grid Card**:
  * Menampilkan kartu-kartu akun (Cash, Bank BCA, Mandiri, GoPay).
  * Setiap kartu memuat: Jenis Akun (Icon), Nama Akun, Saldo Terkini, Jumlah transaksi terhubung, tombol opsi edit/hapus.

### 7.4 Categories Page (`/categories`)
* **Tabs**: `Kategori Pengeluaran` | `Kategori Pemasukan`.
* **List / Grid**:
  * Badge icon warna-warni, nama kategori, total frekuensi transaksi.
  * Tombol `+ Tambah Kategori` membuka modal pilihan icon Lucide, warna, dan nama.
  * Dilengkapi tombol hapus dengan proteksi peringatan bila kategori telah digunakan.

### 7.5 Budgets Page (`/budgets`)
* **Filter Periode**: Pilihan Bulan & Tahun (misal: *November 2026*).
* **Summary Banner**: Total Anggaran vs Total Realisasi Pengeluaran, Persentase Pemakaian Global.
* **Category Budget Card**:
  * Nama Kategori & Icon.
  * Progress Bar:
    * `< 80%`: Hijau / Emerald (`bg-emerald-500`).
    * `80% - 99%`: Kuning / Amber (`bg-amber-500`) dengan label *Mendekati Batas*.
    * `≥ 100%`: Merah / Destructive (`bg-red-500`) dengan label *Melebihi Anggaran*.
  * Informasi: Terpakai `Rp 1.500.000` dari `Rp 2.000.000` (Sisa `Rp 500.000`).

### 7.6 Reports Page (`/reports`)
* **Tabs**: `Arus Kas (Cash Flow)` | `Distribusi Pengeluaran` | `Komparasi Income vs Expense`.
* **Filter**: Rentang Tanggal / Tahunan.
* **Visualisasi Recharts**:
  * ResponsiveContainer dengan BarChart ganda (Pemasukan vs Pengeluaran per bulan).
  * Pie/Donut Chart interaktif dengan legend persentase dan tooltip rupiah.
  * Tabel ringkasan statistik (Rata-rata pengeluaran bulanan, tabungan bersih).

### 7.7 Settings Page (`/settings`)
* **Profil**: Nama pengguna, alamat email (read-only atau edit nama).
* **Preferensi**: Format Mata Uang (IDR - Rupiah), Pengaturan Tema (Light / Dark / System).
* **Zona Bahaya (Danger Zone)**: Tombol Keluar (Logout) dengan dialog konfirmasi.

---

## 8. UI State System (State Handling)

Setiap komponen yang berinteraksi dengan API wajib memiliki 5 kondisi tampilan:

```
┌──────────────────┐     Fetch     ┌──────────────────┐
│  Loading State   │ ────────────> │   Empty State    │ (Jika data = 0)
│ (Skeleton loader)│               └──────────────────┘
└────────┬─────────┘                       │
         │ Data loaded                     │ User creates data
         ▼                                 ▼
┌──────────────────┐     Error     ┌──────────────────┐
│   Success Data   │ <───────────> │   Error State    │
│  (Cards & Table) │               │ (Retry + Banner) │
└──────────────────┘               └──────────────────┘
```

1. **Loading State**:
   * Menggunakan komponen `Skeleton` dengan dimensi proporsional kartu/tabel.
   * Dilarang menggunakan blank screen putih saat loading.
2. **Empty State**:
   * Dilengkapi ilustrasi atau icon tematik (misal: `FolderArchive` untuk transaksi kosong).
   * Judul informatif dan deskripsi ramah: *"Belum ada transaksi tercatat untuk bulan ini"*.
   * Tombol CTA langsung: `+ Catat Transaksi Sekarang`.
3. **Error State**:
   * Banner alert merah lembut dengan penjelasan manusiawi (*human-readable*).
   * Tombol aksi `Coba Lagi (Retry)` untuk memicu re-fetch.
4. **Success State & Toasts**:
   * Notifikasi mengambang via `Sonner` di sudut kanan atas:
     * Sukses: *"Transaksi berhasil disimpan"* (Icon checkmark hijau).
     * Update: *"Perubahan berhasil diperbarui"*.
5. **Confirmation Dialog (Destructive Action)**:
   * Menghapus transaksi, akun, atau kategori **wajib** memunculkan alert dialog konfirmasi:
     * Judul: *"Apakah Anda yakin ingin menghapus akun ini?"*
     * Deskripsi: *"Tindakan ini tidak dapat dibatalkan. Saldo dan catatan terkait akan diperbarui."*
     * Tombol: `Batal` (Ghost/Outline) dan `Hapus` (Destructive Red).

---

## 9. Component Inventory (Design System Assets)

| Komponen | Asal / Implementasi | Fungsi Utama |
| :--- | :--- | :--- |
| **`Button`** | `src/components/ui/button.tsx` | Primary, Secondary, Outline, Ghost, Destructive, Icon. |
| **`Card`** | `src/components/ui/card.tsx` | Wadah widget, summary finansial, item akun & budget. |
| **`Input`** | `src/components/ui/input.tsx` | Field teks, input password, search bar. |
| **`Select`** | `src/components/ui/select.tsx` | Dropdown pilihan akun, kategori, periode bulan/tahun. |
| **`Dialog`** | `src/components/ui/dialog.tsx` | Modal form pencatatan transaksi, tambah akun/kategori. |
| **`DropdownMenu`**| `src/components/ui/dropdown-menu.tsx` | Menu aksi baris tabel (Edit / Hapus / Detail). |
| **`Table`** | `src/components/ui/table.tsx` | Menampilkan riwayat transaksi secara terstruktur. |
| **`Tabs`** | `src/components/ui/tabs.tsx` | Segmentasi tipe kategori, tab laporan keuangan. |
| **`Skeleton`** | `src/components/ui/skeleton.tsx` | Placeholder animasi loading untuk kartu dan tabel. |
| **`Sonner`** | `src/components/ui/sonner.tsx` | Toast notification feedback real-time. |
| **`Field` / `Label`**| `src/components/ui/field.tsx`, `label.tsx` | Wrapper form field dengan teks label & validasi error. |

---

*Akhir Dokumen — UI_UX_GUIDE.md*
