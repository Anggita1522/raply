# Sistem Inventaris Toko Tentrem

## Langkah-langkah Setup di VS Code

### 1. Buka Terminal di VS Code
- Tekan `Ctrl + Shift + ` (backtick) atau
- Menu Terminal → New Terminal

### 2. Navigasi ke Folder Project
```bash
# Pindah ke folder dimana Anda ingin menyimpan project
cd Desktop
# atau
cd Documents
```

### 3. Clone/Download Project
Jika Anda sudah punya file project, copy semua file ke folder baru:
```bash
mkdir toko-tentrem-inventory
cd toko-tentrem-inventory
```

### 4. Install Dependencies
```bash
# Install semua package yang dibutuhkan
npm install
```

### 5. Jalankan Development Server
```bash
# Jalankan aplikasi
npm run dev
```

### 6. Buka di Browser
- Aplikasi akan berjalan di: `http://localhost:5173`
- VS Code akan menampilkan link di terminal, Ctrl+Click untuk membuka

## Perintah-perintah Penting

```bash
# Menjalankan aplikasi
npm run dev

# Build untuk production
npm run build

# Preview build production
npm run preview

# Lint code
npm run lint
```

## Struktur Project
```
toko-tentrem-inventory/
├── src/
│   ├── components/     # Komponen UI (Header, Sidebar)
│   ├── pages/         # Halaman-halaman aplikasi
│   ├── App.tsx        # Komponen utama
│   └── main.tsx       # Entry point
├── public/            # File statis
├── package.json       # Dependencies dan scripts
└── index.html         # HTML template
```

## Fitur yang Tersedia
- ✅ Dashboard dengan grafik dan statistik
- ✅ Kelompok Tani (daftar kelompok dan petani)
- ✅ Data Barang (CRUD barang)
- ✅ Transaksi Masuk (pembelian dari petani)
- ✅ Transaksi Keluar (penjualan ke toko mitra)
- ✅ Stok Barang (monitoring stok)
- ✅ Laporan Masuk & Keluar
- ✅ Profile User

## Tips VS Code
1. Install extension "ES7+ React/Redux/React-Native snippets"
2. Install extension "Tailwind CSS IntelliSense"
3. Install extension "Auto Rename Tag"
4. Gunakan `Ctrl + Shift + P` untuk command palette
5. Gunakan `Ctrl + ` untuk toggle terminal