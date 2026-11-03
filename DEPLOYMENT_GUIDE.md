# MoneyTrack - Production Deployment & Operations Guide

**Aplikasi:** MoneyTrack (Personal Finance Management Platform)  
**Versi:** 1.0.0 (Production Release)  
**Target Environment:** Linux VPS (Ubuntu 22.04 / 24.04 LTS), Docker & Docker Compose, Nginx Reverse Proxy, Let's Encrypt SSL  

---

## 1. Arsitektur Deployment Produksi

Arsitektur produksi MoneyTrack dirancang dengan prinsip **high isolation**, **minimal attack surface**, dan **zero-downtime rolling updates**:

```
[ Internet / Clients ]
         │
         ▼ (Port 80 / 443 HTTPS)
┌────────────────────────────────────────────────────────┐
│ Nginx Reverse Proxy (Host Level / VPS)                 │
│ - SSL Termination (Let's Encrypt TLS 1.3)              │
│ - Security Headers (HSTS, CSP, X-Frame-Options)        │
│ - Gzip Compression & Static Asset Caching (/_next/)    │
└────────────────────────┬───────────────────────────────┘
                         │ (HTTP Reverse Proxy to 127.0.0.1:3000)
                         ▼
┌────────────────────────────────────────────────────────┐
│ Docker Bridge Network (moneytrack_net)                 │
│                                                        │
│  ┌────────────────────────┐   Prisma Client    ┌──────┴───────────────┐
│  │ moneytrack-app         │ ─────────────────> │ moneytrack-db        │
│  │ (Next.js 16 Standalone)│                    │ (PostgreSQL 16)      │
│  │ Port: 3000 (Internal)  │                    │ Port: 5432 (Internal)│
│  └────────────────────────┘                    └──────┬───────────────┘
│                                                       │
└───────────────────────────────────────────────────────┼┘
                                                        ▼
                                       ┌────────────────────────┐
                                       │ Persistent Volume      │
                                       │ (postgres_data)        │
                                       └────────────────────────┘
```

> [!IMPORTANT]
> **Keamanan Database:** Port database PostgreSQL (`5432`) sengaja **TIDAK** diekspos ke public internet atau host port. Database hanya dapat diakses melalui Docker network internal (`moneytrack_net`) oleh container aplikasi Next.js.

---

## 2. Spesifikasi Server & Prasyarat (Prerequisites)

### 2.1. Rekomendasi Hardware VPS
- **CPU:** Minimal 2 vCPU (disarankan 4 vCPU untuk volume pengguna aktif)
- **RAM:** Minimal 4 GB (2 GB baseline + 2 GB buffer build & database caching)
- **Storage:** Minimal 40 GB NVMe/SSD
- **Operating System:** Ubuntu 22.04 LTS atau Ubuntu 24.04 LTS
- **Domain:** Domain aktif dengan akses pengelolaan DNS (A Record mengarah ke Public IP VPS)

---

## 3. Tahap 1: Persiapan & Hardening Server VPS

Jalankan perintah berikut di VPS Ubuntu setelah login via SSH:

### 3.1. Update Sistem & Install Utilities Dasar
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git ufw fail2ban htop unzip software-properties-common ca-certificates gnupg
```

### 3.2. Konfigurasi Firewall (UFW)
Hanya buka port yang benar-benar esensial (SSH, HTTP, HTTPS):
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp comment 'SSH'
sudo ufw allow 80/tcp comment 'HTTP Certbot'
sudo ufw allow 443/tcp comment 'HTTPS SSL'
sudo ufw enable
```

### 3.3. Install Docker Engine & Docker Compose
```bash
# Tambahkan Docker GPG key & repository resmi
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Masukkan user saat ini ke grup docker (opsional agar tidak perlu sudo)
sudo usermod -aG docker $USER
```

---

## 4. Tahap 2: Clone Repository & Konfigurasi Environment

### 4.1. Clone Source Code
```bash
cd /opt
sudo mkdir -p moneytrack && sudo chown $USER:$USER moneytrack
cd moneytrack
git clone <URL_REPOSITORY_GIT_ANDA> .
```

### 4.2. Setup Environment Variables Produksi
Buat file `.env` di direktori `/opt/moneytrack/.env`:

```bash
cp .env.example .env
nano .env
```

Isi dengan nilai aman untuk lingkungan produksi:
```ini
# ==========================================
# MoneyTrack - Production Environment
# ==========================================
NODE_ENV=production
PORT=3000

# Database Credentials
POSTGRES_USER=moneytrack_admin
POSTGRES_PASSWORD=GANTI_DENGAN_PASSWORD_DB_YANG_SANGAT_KUAT_MIN_32_KARAKTER
POSTGRES_DB=moneytrack_prod

# Koneksi Prisma Internal (menggunakan nama container service 'db')
DATABASE_URL=postgresql://moneytrack_admin:GANTI_DENGAN_PASSWORD_DB_YANG_SANGAT_KUAT_MIN_32_KARAKTER@db:5432/moneytrack_prod?schema=public

# NextAuth Secret (Generate via: openssl rand -base64 32)
AUTH_SECRET=GANTI_DENGAN_OUTPUT_OPENSSL_RAND_BASE64_32
AUTH_URL=https://moneytrack.domainanda.com
NEXT_PUBLIC_APP_URL=https://moneytrack.domainanda.com
```

> [!WARNING]
> Jangan pernah meng-commit file `.env` ke Git! Pastikan permissions file dibatasi:
> `chmod 600 /opt/moneytrack/.env`

---

## 5. Tahap 3: Build & Deployment Container

### 5.1. Build Image Docker
Gunakan Docker Compose untuk membangun image container berbasis Next.js 16 standalone:
```bash
docker compose build --no-cache
```

### 5.2. Jalankan Database Container Terlebih Dahulu
```bash
docker compose up -d db
```
Tunggu hingga PostgreSQL sehat (*healthy*):
```bash
docker compose ps
```

### 5.3. Jalankan Database Migration
Jalankan migrasi schema Prisma langsung ke database produksi:
```bash
docker compose run --rm app npx prisma migrate deploy
```
*(Atau gunakan Node/Prisma di host jika terpasang: `DATABASE_URL="..." npx prisma migrate deploy`)*

### 5.4. Jalankan Seluruh Layanan (Aplikasi & Database)
```bash
docker compose up -d
```

Verifikasi status container:
```bash
docker compose ps
docker compose logs -f app
```

---

## 6. Tahap 4: Setup Nginx & Let's Encrypt SSL

### 6.1. Install Nginx & Certbot
```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

### 6.2. Salin Konfigurasi Nginx
Salin template konfigurasi dari `deploy/nginx/moneytrack.conf`:
```bash
sudo cp deploy/nginx/moneytrack.conf /etc/nginx/sites-available/moneytrack.conf
```
Edit nama domain sesuai domain aktif Anda:
```bash
sudo nano /etc/nginx/sites-available/moneytrack.conf
```
Ganti `moneytrack.example.com` menjadi nama domain Anda (misal: `moneytrack.domainanda.com`).

### 6.3. Generate Sertifikat SSL Gratis via Certbot
Aktifkan sementara konfigurasi Nginx untuk ACME Challenge:
```bash
sudo ln -sf /etc/nginx/sites-available/moneytrack.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# Jalankan Certbot
sudo certbot --nginx -d moneytrack.domainanda.com
```

Certbot akan otomatis memperbarui file konfigurasi Nginx dengan certificate block dan redirect HTTPS permanen (301).

---

## 7. Tahap 5: Uji Asap Produksi (Production Smoke Test)

Lakukan verifikasi fungsionalitas langsung di browser atau via curl:

| No | Komponen yang Diuji | Cara Pengujian | Ekspektasi |
| :-: | :--- | :--- | :--- |
| 1 | **Healthcheck Endpoint** | `curl -i https://moneytrack.domainanda.com/api/health` | Status 200, `"status":"ok"`, `"database":"connected"` |
| 2 | **Landing & Auth Pages** | Buka `/` dan `/login` di browser | Halaman tampil cepat tanpa layout shift |
| 3 | **Pendaftaran Akun Baru** | Buka `/register`, buat user baru | Auto-login sukses & redirect ke `/dashboard` |
| 4 | **Pencatatan Rekening** | Tambah Akun di `/accounts` (BCA Rp 10.000.000) | Saldo total terbarui secara instan |
| 5 | **Pencatatan Transaksi** | Tambah Transaksi di `/transactions` | Transaksi tercatat, saldo akun berkurang/bertambah tepat |
| 6 | **Pengecekan Anggaran** | Pasang Limit Anggaran di `/budgets` | Progress bar dan status persentase akurat |
| 7 | **Visualisasi Laporan** | Buka `/reports` | Grafik Cashflow & Breakdown kategori ter-render mulus |
| 8 | **Ekspor Laporan CSV** | Klik tombol *Ekspor CSV* di `/transactions` | File `.csv` terunduh dengan BOM UTF-8 dan formula ternetralisir |
| 9 | **Dark/Light Mode** | Toggle tema di header | Tema berganti seketika tanpa flicker (*hydration safe*) |
| 10 | **Logout & Sesi** | Klik Logout di dropdown profil | Sesi berakhir, redirect aman ke `/login` |

---

## 8. Tahap 6: Backup & Disaster Recovery Runbook

### 8.1. Backup Otomatis Harian (Cronjob)
Buat direktori backup dan beri permission pada script backup:
```bash
sudo mkdir -p /var/backups/moneytrack
chmod +x deploy/scripts/backup.sh
chmod +x deploy/scripts/restore.sh
```

Tambahkan ke cron job server (`sudo crontab -e`):
```cron
# Eksekusi backup database setiap hari pukul 02.00 dini hari
0 2 * * * /opt/moneytrack/deploy/scripts/backup.sh /var/backups/moneytrack >> /var/log/moneytrack_backup.log 2>&1
```

### 8.2. Prosedur Restore Database (Disaster Recovery)
Jika terjadi insiden data corruption atau migrasi server:
```bash
cd /opt/moneytrack
./deploy/scripts/restore.sh /var/backups/moneytrack/moneytrack_backup_YYYYMMDD_HHMMSS.sql.gz
```
Script akan meminta konfirmasi `YES`, memvalidasi hash SHA256, menghentikan sementara container aplikasi, memulihkan data, dan menyalakan kembali container.

---

## 9. Pemeliharaan & Troubleshooting

### Melihat Log Aplikasi Secara Real-time
```bash
docker compose logs -f app
```

### Melihat Log Database
```bash
docker compose logs -f db
```

### Prosedur Deploy Update Versi Baru (Zero-Downtime)
```bash
cd /opt/moneytrack
git pull origin master
docker compose build app
docker compose run --rm app npx prisma migrate deploy
docker compose up -d --no-deps app
```

---
*MoneyTrack siap beroperasi secara handal dan aman di lingkungan produksi.*
