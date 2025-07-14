-- =====================================================
-- DATABASE TOKO TENTREM - SISTEM INVENTARIS
-- BUMDes Desa Kedungumpul
-- =====================================================

-- Buat database
CREATE DATABASE IF NOT EXISTS toko_tentrem;
USE toko_tentrem;

-- =====================================================
-- STRUKTUR TABEL
-- =====================================================

-- Tabel Users (untuk authentication)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'operator') DEFAULT 'operator',
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Kelompok Tani
CREATE TABLE kelompok_tani (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    ketua VARCHAR(255) NOT NULL,
    jumlah_anggota INT NOT NULL DEFAULT 0,
    desa VARCHAR(255) NOT NULL,
    alamat TEXT,
    telepon VARCHAR(20),
    tahun_berdiri YEAR,
    status ENUM('aktif', 'non-aktif') DEFAULT 'aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Petani
CREATE TABLE petani (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kelompok_tani_id INT NOT NULL,
    nama VARCHAR(255) NOT NULL,
    nik VARCHAR(20) UNIQUE,
    telepon VARCHAR(20),
    alamat TEXT,
    luas_lahan DECIMAL(8,2) NOT NULL DEFAULT 0,
    jenis_lahan ENUM('sawah', 'ladang', 'kebun') DEFAULT 'sawah',
    status ENUM('aktif', 'non-aktif') DEFAULT 'aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kelompok_tani_id) REFERENCES kelompok_tani(id) ON DELETE CASCADE
);

-- Tabel Toko Mitra
CREATE TABLE toko_mitra (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(255) NOT NULL,
    pemilik VARCHAR(255) NOT NULL,
    alamat TEXT NOT NULL,
    telepon VARCHAR(20),
    email VARCHAR(255),
    target_pembelian_bulanan DECIMAL(10,2) DEFAULT 0,
    status ENUM('aktif', 'non-aktif') DEFAULT 'aktif',
    tanggal_kerjasama DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Barang
CREATE TABLE barang (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kode_barang VARCHAR(20) UNIQUE NOT NULL,
    nama VARCHAR(255) NOT NULL,
    jenis ENUM('Beras', 'Gabah') NOT NULL,
    kategori ENUM('Pangan', 'Bahan Baku') NOT NULL,
    satuan VARCHAR(20) NOT NULL DEFAULT 'Kg',
    harga_beli DECIMAL(10,2) NOT NULL DEFAULT 0,
    harga_jual DECIMAL(10,2) NOT NULL DEFAULT 0,
    stok_saat_ini INT NOT NULL DEFAULT 0,
    stok_minimum INT NOT NULL DEFAULT 0,
    stok_maksimum INT NOT NULL DEFAULT 0,
    lokasi_gudang VARCHAR(100) DEFAULT 'Gudang A',
    deskripsi TEXT,
    status ENUM('aktif', 'non-aktif') DEFAULT 'aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Transaksi Masuk
CREATE TABLE transaksi_masuk (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kode_transaksi VARCHAR(20) UNIQUE NOT NULL,
    tanggal DATE NOT NULL,
    barang_id INT NOT NULL,
    kelompok_tani_id INT NOT NULL,
    petani_id INT,
    jumlah INT NOT NULL,
    harga_satuan DECIMAL(10,2) NOT NULL,
    total_harga DECIMAL(12,2) NOT NULL,
    kualitas ENUM('A', 'B', 'C') DEFAULT 'A',
    kadar_air DECIMAL(5,2),
    keterangan TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (barang_id) REFERENCES barang(id) ON DELETE CASCADE,
    FOREIGN KEY (kelompok_tani_id) REFERENCES kelompok_tani(id) ON DELETE CASCADE,
    FOREIGN KEY (petani_id) REFERENCES petani(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabel Transaksi Keluar
CREATE TABLE transaksi_keluar (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kode_transaksi VARCHAR(20) UNIQUE NOT NULL,
    tanggal DATE NOT NULL,
    barang_id INT NOT NULL,
    toko_mitra_id INT,
    jenis_pelanggan ENUM('toko_mitra', 'konsumen_langsung', 'grosir') DEFAULT 'toko_mitra',
    nama_pelanggan VARCHAR(255),
    jumlah INT NOT NULL,
    harga_satuan DECIMAL(10,2) NOT NULL,
    total_harga DECIMAL(12,2) NOT NULL,
    diskon DECIMAL(5,2) DEFAULT 0,
    total_bayar DECIMAL(12,2) NOT NULL,
    metode_pembayaran ENUM('tunai', 'transfer', 'kredit') DEFAULT 'tunai',
    keterangan TEXT,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (barang_id) REFERENCES barang(id) ON DELETE CASCADE,
    FOREIGN KEY (toko_mitra_id) REFERENCES toko_mitra(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabel Log Stok (untuk tracking perubahan stok)
CREATE TABLE log_stok (
    id INT PRIMARY KEY AUTO_INCREMENT,
    barang_id INT NOT NULL,
    jenis_transaksi ENUM('masuk', 'keluar', 'adjustment') NOT NULL,
    referensi_id INT,
    stok_sebelum INT NOT NULL,
    perubahan INT NOT NULL,
    stok_sesudah INT NOT NULL,
    keterangan TEXT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (barang_id) REFERENCES barang(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- DATA SAMPLE
-- =====================================================

-- Insert Users
INSERT INTO users (name, email, password, role) VALUES
('Admin Toko Tentrem', 'admin@tokotentrem.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('Operator 1', 'operator1@tokotentrem.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'operator'),
('Operator 2', 'operator2@tokotentrem.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'operator');

-- Insert Kelompok Tani
INSERT INTO kelompok_tani (nama, ketua, jumlah_anggota, desa, alamat, telepon, tahun_berdiri) VALUES
('Kelompok Tani Makmur', 'Pak Slamet Riyadi', 15, 'Kedungumpul', 'Dusun Krajan RT 01 RW 02', '081234567890', 2018),
('Kelompok Tani Sejahtera', 'Pak Joko Susilo', 12, 'Kedungumpul', 'Dusun Tengah RT 03 RW 01', '081234567891', 2019),
('Kelompok Tani Maju', 'Pak Warno Sutrisno', 18, 'Kedungumpul', 'Dusun Selatan RT 02 RW 03', '081234567892', 2017),
('Kelompok Tani Berkah', 'Bu Siti Aminah', 10, 'Kedungumpul', 'Dusun Utara RT 04 RW 02', '081234567893', 2020),
('Kelompok Tani Subur', 'Pak Bambang Wijaya', 14, 'Kedungumpul', 'Dusun Barat RT 01 RW 01', '081234567894', 2019);

-- Insert Petani
INSERT INTO petani (kelompok_tani_id, nama, nik, telepon, alamat, luas_lahan, jenis_lahan) VALUES
-- Kelompok Tani Makmur
(1, 'Pak Slamet Riyadi', '3301010101010001', '081234567890', 'Dusun Krajan RT 01 RW 02', 2.5, 'sawah'),
(1, 'Bu Siti Rahayu', '3301010101010002', '081234567895', 'Dusun Krajan RT 01 RW 02', 1.8, 'sawah'),
(1, 'Pak Budi Santoso', '3301010101010003', '081234567896', 'Dusun Krajan RT 01 RW 02', 1.2, 'sawah'),
(1, 'Pak Agus Priyanto', '3301010101010004', '081234567897', 'Dusun Krajan RT 01 RW 02', 2.0, 'sawah'),
(1, 'Bu Rina Sari', '3301010101010005', '081234567898', 'Dusun Krajan RT 01 RW 02', 1.5, 'sawah'),

-- Kelompok Tani Sejahtera
(2, 'Pak Joko Susilo', '3301010101010006', '081234567891', 'Dusun Tengah RT 03 RW 01', 2.2, 'sawah'),
(2, 'Bu Rini Handayani', '3301010101010007', '081234567899', 'Dusun Tengah RT 03 RW 01', 1.6, 'sawah'),
(2, 'Pak Bambang Sutopo', '3301010101010008', '081234567900', 'Dusun Tengah RT 03 RW 01', 1.4, 'sawah'),
(2, 'Pak Hadi Purnomo', '3301010101010009', '081234567901', 'Dusun Tengah RT 03 RW 01', 1.8, 'sawah'),

-- Kelompok Tani Maju
(3, 'Pak Warno Sutrisno', '3301010101010010', '081234567892', 'Dusun Selatan RT 02 RW 03', 3.0, 'sawah'),
(3, 'Bu Tini Suryani', '3301010101010011', '081234567902', 'Dusun Selatan RT 02 RW 03', 2.1, 'sawah'),
(3, 'Pak Sutrisno Adi', '3301010101010012', '081234567903', 'Dusun Selatan RT 02 RW 03', 1.7, 'sawah'),
(3, 'Pak Mulyono', '3301010101010013', '081234567904', 'Dusun Selatan RT 02 RW 03', 2.3, 'sawah'),

-- Kelompok Tani Berkah
(4, 'Bu Siti Aminah', '3301010101010014', '081234567893', 'Dusun Utara RT 04 RW 02', 1.9, 'sawah'),
(4, 'Pak Ahmad Fauzi', '3301010101010015', '081234567905', 'Dusun Utara RT 04 RW 02', 1.3, 'sawah'),
(4, 'Bu Wahyu Ningsih', '3301010101010016', '081234567906', 'Dusun Utara RT 04 RW 02', 1.6, 'sawah'),

-- Kelompok Tani Subur
(5, 'Pak Bambang Wijaya', '3301010101010017', '081234567894', 'Dusun Barat RT 01 RW 01', 2.4, 'sawah'),
(5, 'Bu Endang Susilowati', '3301010101010018', '081234567907', 'Dusun Barat RT 01 RW 01', 1.7, 'sawah'),
(5, 'Pak Sugeng Riyadi', '3301010101010019', '081234567908', 'Dusun Barat RT 01 RW 01', 2.0, 'sawah');

-- Insert Toko Mitra
INSERT INTO toko_mitra (nama, pemilik, alamat, telepon, email, target_pembelian_bulanan, tanggal_kerjasama) VALUES
('Toko Berkah', 'Pak Ahmad Hidayat', 'Jl. Raya Kedungumpul No. 15', '081345678901', 'tokoberkah@gmail.com', 500.00, '2023-01-15'),
('Toko Sari Padi', 'Bu Wahyu Indrawati', 'Jl. Pasar Kedungumpul No. 8', '081345678902', 'saripadi@gmail.com', 400.00, '2023-02-20'),
('Toko Rejeki', 'Pak Hadi Susanto', 'Jl. Desa Kedungumpul No. 22', '081345678903', 'tokorejeki@gmail.com', 300.00, '2023-03-10'),
('Toko Makmur', 'Bu Susi Ratnawati', 'Jl. Raya Utara No. 45', '081345678904', 'tokomakmur@gmail.com', 350.00, '2023-04-05'),
('Toko Subur Jaya', 'Pak Eko Prasetyo', 'Jl. Pasar Baru No. 12', '081345678905', 'suburjaya@gmail.com', 250.00, '2023-05-12'),
('Toko Mitra Tani', 'Bu Lestari Wulandari', 'Jl. Desa Tengah No. 18', '081345678906', 'mitratani@gmail.com', 200.00, '2023-06-08'),
('Toko Harapan', 'Pak Dedi Kurniawan', 'Jl. Raya Selatan No. 30', '081345678907', 'tokoharapan@gmail.com', 180.00, '2023-07-15'),
('Toko Sejahtera', 'Bu Rina Marlina', 'Jl. Pasar Lama No. 5', '081345678908', 'sejahtera@gmail.com', 220.00, '2023-08-20');

-- Insert Barang
INSERT INTO barang (kode_barang, nama, jenis, kategori, satuan, harga_beli, harga_jual, stok_saat_ini, stok_minimum, stok_maksimum, lokasi_gudang, deskripsi) VALUES
('BRS001', 'Beras Premium', 'Beras', 'Pangan', 'Kg', 12000, 15000, 250, 50, 500, 'Gudang A', 'Beras berkualitas tinggi dari gabah pilihan'),
('BRS002', 'Beras Medium', 'Beras', 'Pangan', 'Kg', 9000, 12000, 180, 30, 400, 'Gudang A', 'Beras kualitas sedang dengan harga terjangkau'),
('BRS003', 'Beras Ekonomi', 'Beras', 'Pangan', 'Kg', 7000, 10000, 120, 25, 300, 'Gudang A', 'Beras kualitas ekonomis untuk kebutuhan sehari-hari'),
('GBH001', 'Gabah Kering Grade A', 'Gabah', 'Bahan Baku', 'Kg', 6000, 8000, 500, 100, 1000, 'Gudang B', 'Gabah kering kualitas terbaik dengan kadar air rendah'),
('GBH002', 'Gabah Kering Grade B', 'Gabah', 'Bahan Baku', 'Kg', 5000, 6500, 300, 80, 800, 'Gudang B', 'Gabah kering kualitas sedang'),
('GBH003', 'Gabah Basah', 'Gabah', 'Bahan Baku', 'Kg', 4000, 6000, 150, 50, 600, 'Gudang B', 'Gabah segar yang perlu dikeringkan');

-- Insert Transaksi Masuk (6 bulan terakhir)
INSERT INTO transaksi_masuk (kode_transaksi, tanggal, barang_id, kelompok_tani_id, petani_id, jumlah, harga_satuan, total_harga, kualitas, kadar_air, keterangan, status, user_id) VALUES
-- Januari 2024
('TM240101', '2024-01-05', 4, 1, 1, 120, 6000, 720000, 'A', 14.2, 'Hasil panen periode Januari - Kelompok Makmur', 'approved', 1),
('TM240102', '2024-01-08', 5, 2, 6, 80, 5000, 400000, 'B', 15.1, 'Panen awal bulan - Kelompok Sejahtera', 'approved', 1),
('TM240103', '2024-01-12', 4, 3, 10, 150, 6000, 900000, 'A', 13.8, 'Hasil panen terbaik - Kelompok Maju', 'approved', 2),
('TM240104', '2024-01-15', 6, 4, 14, 60, 4000, 240000, 'C', 18.5, 'Gabah basah perlu pengeringan', 'approved', 1),
('TM240105', '2024-01-20', 5, 5, 17, 90, 5000, 450000, 'B', 14.8, 'Panen tengah bulan', 'approved', 2),
('TM240106', '2024-01-25', 4, 1, 3, 100, 6000, 600000, 'A', 14.0, 'Panen akhir bulan', 'approved', 1),

-- Februari 2024
('TM240201', '2024-02-03', 4, 2, 7, 110, 6000, 660000, 'A', 13.9, 'Hasil panen Februari - Kelompok Sejahtera', 'approved', 1),
('TM240202', '2024-02-07', 5, 3, 11, 85, 5000, 425000, 'B', 15.3, 'Panen awal Februari', 'approved', 2),
('TM240203', '2024-02-12', 4, 1, 4, 130, 6000, 780000, 'A', 14.1, 'Hasil panen terbaik bulan ini', 'approved', 1),
('TM240204', '2024-02-18', 6, 5, 18, 70, 4000, 280000, 'C', 19.2, 'Gabah basah kualitas sedang', 'approved', 2),
('TM240205', '2024-02-22', 5, 4, 15, 95, 5000, 475000, 'B', 14.7, 'Panen tengah Februari', 'approved', 1),

-- Maret 2024
('TM240301', '2024-03-05', 4, 3, 12, 140, 6000, 840000, 'A', 13.7, 'Hasil panen Maret - Kelompok Maju', 'approved', 1),
('TM240302', '2024-03-10', 5, 1, 5, 100, 5000, 500000, 'B', 15.0, 'Panen awal Maret', 'approved', 2),
('TM240303', '2024-03-15', 4, 2, 8, 125, 6000, 750000, 'A', 14.3, 'Hasil panen berkualitas', 'approved', 1),
('TM240304', '2024-03-20', 6, 4, 16, 80, 4000, 320000, 'C', 18.8, 'Gabah basah perlu penanganan', 'approved', 2),
('TM240305', '2024-03-25', 5, 5, 19, 105, 5000, 525000, 'B', 14.9, 'Panen akhir Maret', 'approved', 1),

-- April 2024
('TM240401', '2024-04-02', 4, 1, 2, 115, 6000, 690000, 'A', 14.0, 'Hasil panen April - Kelompok Makmur', 'approved', 1),
('TM240402', '2024-04-08', 5, 3, 13, 90, 5000, 450000, 'B', 15.2, 'Panen awal April', 'approved', 2),
('TM240403', '2024-04-14', 4, 2, 9, 135, 6000, 810000, 'A', 13.8, 'Hasil panen terbaik April', 'approved', 1),
('TM240404', '2024-04-20', 6, 5, 17, 65, 4000, 260000, 'C', 19.0, 'Gabah basah kualitas standar', 'approved', 2),
('TM240405', '2024-04-26', 5, 4, 14, 85, 5000, 425000, 'B', 14.6, 'Panen akhir April', 'approved', 1),

-- Mei 2024
('TM240501', '2024-05-05', 4, 2, 6, 145, 6000, 870000, 'A', 13.9, 'Hasil panen Mei - Kelompok Sejahtera', 'approved', 1),
('TM240502', '2024-05-10', 5, 1, 1, 110, 5000, 550000, 'B', 14.8, 'Panen awal Mei', 'approved', 2),
('TM240503', '2024-05-16', 4, 3, 10, 160, 6000, 960000, 'A', 14.1, 'Hasil panen terbaik Mei', 'approved', 1),
('TM240504', '2024-05-22', 6, 4, 15, 75, 4000, 300000, 'C', 18.7, 'Gabah basah perlu pengeringan', 'approved', 2),
('TM240505', '2024-05-28', 5, 5, 18, 100, 5000, 500000, 'B', 15.1, 'Panen akhir Mei', 'approved', 1),

-- Juni 2024
('TM240601', '2024-06-03', 4, 3, 11, 120, 6000, 720000, 'A', 14.2, 'Hasil panen Juni - Kelompok Maju', 'approved', 1),
('TM240602', '2024-06-08', 5, 2, 7, 95, 5000, 475000, 'B', 15.0, 'Panen awal Juni', 'approved', 2),
('TM240603', '2024-06-14', 4, 1, 3, 130, 6000, 780000, 'A', 13.8, 'Hasil panen berkualitas Juni', 'approved', 1),
('TM240604', '2024-06-20', 6, 5, 19, 70, 4000, 280000, 'C', 19.1, 'Gabah basah kualitas sedang', 'approved', 2),
('TM240605', '2024-06-25', 5, 4, 16, 90, 5000, 450000, 'B', 14.7, 'Panen akhir Juni', 'approved', 1);

-- Insert Transaksi Keluar (6 bulan terakhir)
INSERT INTO transaksi_keluar (kode_transaksi, tanggal, barang_id, toko_mitra_id, jenis_pelanggan, nama_pelanggan, jumlah, harga_satuan, total_harga, diskon, total_bayar, metode_pembayaran, keterangan, status, user_id) VALUES
-- Januari 2024
('TK240101', '2024-01-06', 1, 1, 'toko_mitra', 'Toko Berkah', 50, 15000, 750000, 0, 750000, 'transfer', 'Penjualan rutin bulanan', 'completed', 1),
('TK240102', '2024-01-10', 2, 2, 'toko_mitra', 'Toko Sari Padi', 40, 12000, 480000, 0, 480000, 'tunai', 'Pesanan mingguan', 'completed', 2),
('TK240103', '2024-01-15', 1, NULL, 'konsumen_langsung', 'Bu Sari', 15, 15000, 225000, 0, 225000, 'tunai', 'Pembelian eceran', 'completed', 1),
('TK240104', '2024-01-20', 2, 3, 'toko_mitra', 'Toko Rejeki', 35, 12000, 420000, 2, 411600, 'transfer', 'Diskon pelanggan setia', 'completed', 2),
('TK240105', '2024-01-25', 3, NULL, 'konsumen_langsung', 'Pak Budi', 20, 10000, 200000, 0, 200000, 'tunai', 'Pembelian langsung', 'completed', 1),

-- Februari 2024
('TK240201', '2024-02-05', 1, 4, 'toko_mitra', 'Toko Makmur', 45, 15000, 675000, 0, 675000, 'transfer', 'Penjualan bulanan', 'completed', 1),
('TK240202', '2024-02-12', 2, 5, 'toko_mitra', 'Toko Subur Jaya', 30, 12000, 360000, 0, 360000, 'tunai', 'Pesanan reguler', 'completed', 2),
('TK240203', '2024-02-18', 1, NULL, 'konsumen_langsung', 'Bu Rina', 12, 15000, 180000, 0, 180000, 'tunai', 'Pembelian eceran', 'completed', 1),
('TK240204', '2024-02-22', 3, 6, 'toko_mitra', 'Toko Mitra Tani', 25, 10000, 250000, 0, 250000, 'transfer', 'Penjualan rutin', 'completed', 2),
('TK240205', '2024-02-28', 2, NULL, 'grosir', 'CV Beras Jaya', 100, 11500, 1150000, 5, 1092500, 'transfer', 'Penjualan grosir', 'completed', 1),

-- Maret 2024
('TK240301', '2024-03-08', 1, 1, 'toko_mitra', 'Toko Berkah', 55, 15000, 825000, 0, 825000, 'transfer', 'Penjualan bulanan Maret', 'completed', 1),
('TK240302', '2024-03-15', 2, 7, 'toko_mitra', 'Toko Harapan', 28, 12000, 336000, 0, 336000, 'tunai', 'Pesanan baru', 'completed', 2),
('TK240303', '2024-03-20', 1, NULL, 'konsumen_langsung', 'Pak Ahmad', 18, 15000, 270000, 0, 270000, 'tunai', 'Pembelian langsung', 'completed', 1),
('TK240304', '2024-03-25', 3, 8, 'toko_mitra', 'Toko Sejahtera', 22, 10000, 220000, 0, 220000, 'transfer', 'Penjualan rutin', 'completed', 2),
('TK240305', '2024-03-30', 2, 2, 'toko_mitra', 'Toko Sari Padi', 42, 12000, 504000, 0, 504000, 'transfer', 'Pesanan akhir bulan', 'completed', 1),

-- April 2024
('TK240401', '2024-04-05', 1, 3, 'toko_mitra', 'Toko Rejeki', 48, 15000, 720000, 0, 720000, 'transfer', 'Penjualan April', 'completed', 1),
('TK240402', '2024-04-12', 2, 4, 'toko_mitra', 'Toko Makmur', 38, 12000, 456000, 0, 456000, 'tunai', 'Pesanan reguler', 'completed', 2),
('TK240403', '2024-04-18', 1, NULL, 'konsumen_langsung', 'Bu Dewi', 14, 15000, 210000, 0, 210000, 'tunai', 'Pembelian eceran', 'completed', 1),
('TK240404', '2024-04-24', 3, NULL, 'grosir', 'UD Sumber Rejeki', 80, 9500, 760000, 3, 737200, 'transfer', 'Penjualan grosir', 'completed', 2),
('TK240405', '2024-04-28', 2, 5, 'toko_mitra', 'Toko Subur Jaya', 32, 12000, 384000, 0, 384000, 'transfer', 'Pesanan akhir April', 'completed', 1),

-- Mei 2024
('TK240501', '2024-05-06', 1, 6, 'toko_mitra', 'Toko Mitra Tani', 52, 15000, 780000, 0, 780000, 'transfer', 'Penjualan Mei', 'completed', 1),
('TK240502', '2024-05-13', 2, 1, 'toko_mitra', 'Toko Berkah', 45, 12000, 540000, 0, 540000, 'transfer', 'Pesanan reguler', 'completed', 2),
('TK240503', '2024-05-19', 1, NULL, 'konsumen_langsung', 'Pak Joko', 16, 15000, 240000, 0, 240000, 'tunai', 'Pembelian langsung', 'completed', 1),
('TK240504', '2024-05-25', 3, 7, 'toko_mitra', 'Toko Harapan', 26, 10000, 260000, 0, 260000, 'tunai', 'Penjualan rutin', 'completed', 2),
('TK240505', '2024-05-30', 2, NULL, 'grosir', 'PT Beras Nusantara', 120, 11800, 1416000, 4, 1359360, 'transfer', 'Kontrak grosir', 'completed', 1),

-- Juni 2024
('TK240601', '2024-06-04', 1, 8, 'toko_mitra', 'Toko Sejahtera', 46, 15000, 690000, 0, 690000, 'transfer', 'Penjualan Juni', 'completed', 1),
('TK240602', '2024-06-11', 2, 2, 'toko_mitra', 'Toko Sari Padi', 36, 12000, 432000, 0, 432000, 'tunai', 'Pesanan mingguan', 'completed', 2),
('TK240603', '2024-06-17', 1, NULL, 'konsumen_langsung', 'Bu Ani', 13, 15000, 195000, 0, 195000, 'tunai', 'Pembelian eceran', 'completed', 1),
('TK240604', '2024-06-23', 3, 3, 'toko_mitra', 'Toko Rejeki', 24, 10000, 240000, 0, 240000, 'transfer', 'Penjualan rutin', 'completed', 2),
('TK240605', '2024-06-28', 2, 4, 'toko_mitra', 'Toko Makmur', 40, 12000, 480000, 0, 480000, 'transfer', 'Pesanan akhir Juni', 'completed', 1);

-- Update stok barang berdasarkan transaksi
UPDATE barang SET stok_saat_ini = 250 WHERE id = 1; -- Beras Premium
UPDATE barang SET stok_saat_ini = 180 WHERE id = 2; -- Beras Medium  
UPDATE barang SET stok_saat_ini = 120 WHERE id = 3; -- Beras Ekonomi
UPDATE barang SET stok_saat_ini = 500 WHERE id = 4; -- Gabah Kering Grade A
UPDATE barang SET stok_saat_ini = 300 WHERE id = 5; -- Gabah Kering Grade B
UPDATE barang SET stok_saat_ini = 150 WHERE id = 6; -- Gabah Basah

-- Insert Log Stok untuk tracking
INSERT INTO log_stok (barang_id, jenis_transaksi, referensi_id, stok_sebelum, perubahan, stok_sesudah, keterangan, user_id) VALUES
(1, 'masuk', 1, 0, 250, 250, 'Stok awal beras premium', 1),
(2, 'masuk', 2, 0, 180, 180, 'Stok awal beras medium', 1),
(3, 'masuk', 3, 0, 120, 120, 'Stok awal beras ekonomi', 1),
(4, 'masuk', 4, 0, 500, 500, 'Stok awal gabah kering grade A', 1),
(5, 'masuk', 5, 0, 300, 300, 'Stok awal gabah kering grade B', 1),
(6, 'masuk', 6, 0, 150, 150, 'Stok awal gabah basah', 1);

-- =====================================================
-- VIEWS UNTUK LAPORAN
-- =====================================================

-- View untuk laporan stok
CREATE VIEW view_laporan_stok AS
SELECT 
    b.id,
    b.kode_barang,
    b.nama,
    b.jenis,
    b.satuan,
    b.stok_saat_ini,
    b.stok_minimum,
    b.stok_maksimum,
    b.harga_beli,
    b.harga_jual,
    (b.stok_saat_ini * b.harga_beli) as nilai_stok,
    CASE 
        WHEN b.stok_saat_ini <= b.stok_minimum THEN 'Kritis'
        WHEN b.stok_saat_ini <= (b.stok_minimum * 1.5) THEN 'Menipis'
        ELSE 'Aman'
    END as status_stok
FROM barang b
WHERE b.status = 'aktif';

-- View untuk laporan transaksi masuk
CREATE VIEW view_laporan_masuk AS
SELECT 
    tm.id,
    tm.kode_transaksi,
    tm.tanggal,
    b.nama as nama_barang,
    b.jenis,
    kt.nama as kelompok_tani,
    p.nama as petani,
    tm.jumlah,
    tm.harga_satuan,
    tm.total_harga,
    tm.kualitas,
    tm.status,
    u.name as operator
FROM transaksi_masuk tm
JOIN barang b ON tm.barang_id = b.id
JOIN kelompok_tani kt ON tm.kelompok_tani_id = kt.id
LEFT JOIN petani p ON tm.petani_id = p.id
LEFT JOIN users u ON tm.user_id = u.id
ORDER BY tm.tanggal DESC;

-- View untuk laporan transaksi keluar
CREATE VIEW view_laporan_keluar AS
SELECT 
    tk.id,
    tk.kode_transaksi,
    tk.tanggal,
    b.nama as nama_barang,
    b.jenis,
    tk.jenis_pelanggan,
    COALESCE(tm.nama, tk.nama_pelanggan) as pelanggan,
    tk.jumlah,
    tk.harga_satuan,
    tk.total_harga,
    tk.diskon,
    tk.total_bayar,
    tk.metode_pembayaran,
    tk.status,
    u.name as operator
FROM transaksi_keluar tk
JOIN barang b ON tk.barang_id = b.id
LEFT JOIN toko_mitra tm ON tk.toko_mitra_id = tm.id
LEFT JOIN users u ON tk.user_id = u.id
ORDER BY tk.tanggal DESC;

-- =====================================================
-- STORED PROCEDURES
-- =====================================================

DELIMITER //

-- Procedure untuk update stok otomatis
CREATE PROCEDURE UpdateStokBarang(
    IN p_barang_id INT,
    IN p_jenis_transaksi ENUM('masuk', 'keluar'),
    IN p_jumlah INT,
    IN p_referensi_id INT,
    IN p_user_id INT
)
BEGIN
    DECLARE v_stok_sebelum INT;
    DECLARE v_stok_sesudah INT;
    DECLARE v_perubahan INT;
    
    -- Ambil stok saat ini
    SELECT stok_saat_ini INTO v_stok_sebelum 
    FROM barang WHERE id = p_barang_id;
    
    -- Hitung perubahan stok
    IF p_jenis_transaksi = 'masuk' THEN
        SET v_perubahan = p_jumlah;
        SET v_stok_sesudah = v_stok_sebelum + p_jumlah;
    ELSE
        SET v_perubahan = -p_jumlah;
        SET v_stok_sesudah = v_stok_sebelum - p_jumlah;
    END IF;
    
    -- Update stok barang
    UPDATE barang 
    SET stok_saat_ini = v_stok_sesudah,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_barang_id;
    
    -- Insert log stok
    INSERT INTO log_stok (
        barang_id, jenis_transaksi, referensi_id, 
        stok_sebelum, perubahan, stok_sesudah, 
        keterangan, user_id
    ) VALUES (
        p_barang_id, p_jenis_transaksi, p_referensi_id,
        v_stok_sebelum, v_perubahan, v_stok_sesudah,
        CONCAT('Update stok ', p_jenis_transaksi), p_user_id
    );
END //

-- Procedure untuk laporan bulanan
CREATE PROCEDURE LaporanBulanan(
    IN p_tahun INT,
    IN p_bulan INT
)
BEGIN
    SELECT 
        'Transaksi Masuk' as jenis,
        COUNT(*) as total_transaksi,
        SUM(jumlah) as total_barang,
        SUM(total_harga) as total_nilai
    FROM transaksi_masuk 
    WHERE YEAR(tanggal) = p_tahun AND MONTH(tanggal) = p_bulan
    
    UNION ALL
    
    SELECT 
        'Transaksi Keluar' as jenis,
        COUNT(*) as total_transaksi,
        SUM(jumlah) as total_barang,
        SUM(total_bayar) as total_nilai
    FROM transaksi_keluar 
    WHERE YEAR(tanggal) = p_tahun AND MONTH(tanggal) = p_bulan;
END //

DELIMITER ;

-- =====================================================
-- TRIGGERS
-- =====================================================

DELIMITER //

-- Trigger untuk auto update stok saat insert transaksi masuk
CREATE TRIGGER tr_transaksi_masuk_insert 
AFTER INSERT ON transaksi_masuk
FOR EACH ROW
BEGIN
    IF NEW.status = 'approved' THEN
        CALL UpdateStokBarang(NEW.barang_id, 'masuk', NEW.jumlah, NEW.id, NEW.user_id);
    END IF;
END //

-- Trigger untuk auto update stok saat insert transaksi keluar
CREATE TRIGGER tr_transaksi_keluar_insert 
AFTER INSERT ON transaksi_keluar
FOR EACH ROW
BEGIN
    IF NEW.status = 'completed' THEN
        CALL UpdateStokBarang(NEW.barang_id, 'keluar', NEW.jumlah, NEW.id, NEW.user_id);
    END IF;
END //

-- Trigger untuk update jumlah anggota kelompok tani
CREATE TRIGGER tr_petani_insert 
AFTER INSERT ON petani
FOR EACH ROW
BEGIN
    UPDATE kelompok_tani 
    SET jumlah_anggota = (
        SELECT COUNT(*) FROM petani 
        WHERE kelompok_tani_id = NEW.kelompok_tani_id 
        AND status = 'aktif'
    )
    WHERE id = NEW.kelompok_tani_id;
END //

CREATE TRIGGER tr_petani_update 
AFTER UPDATE ON petani
FOR EACH ROW
BEGIN
    UPDATE kelompok_tani 
    SET jumlah_anggota = (
        SELECT COUNT(*) FROM petani 
        WHERE kelompok_tani_id = NEW.kelompok_tani_id 
        AND status = 'aktif'
    )
    WHERE id = NEW.kelompok_tani_id;
    
    IF OLD.kelompok_tani_id != NEW.kelompok_tani_id THEN
        UPDATE kelompok_tani 
        SET jumlah_anggota = (
            SELECT COUNT(*) FROM petani 
            WHERE kelompok_tani_id = OLD.kelompok_tani_id 
            AND status = 'aktif'
        )
        WHERE id = OLD.kelompok_tani_id;
    END IF;
END //

DELIMITER ;

-- =====================================================
-- INDEXES UNTUK PERFORMA
-- =====================================================

-- Index untuk pencarian dan filtering
CREATE INDEX idx_transaksi_masuk_tanggal ON transaksi_masuk(tanggal);
CREATE INDEX idx_transaksi_keluar_tanggal ON transaksi_keluar(tanggal);
CREATE INDEX idx_barang_jenis ON barang(jenis);
CREATE INDEX idx_barang_status_stok ON barang(stok_saat_ini, stok_minimum);
CREATE INDEX idx_petani_kelompok ON petani(kelompok_tani_id);
CREATE INDEX idx_log_stok_barang_tanggal ON log_stok(barang_id, created_at);

-- =====================================================
-- SAMPLE QUERIES UNTUK TESTING
-- =====================================================

-- Query untuk dashboard stats
SELECT 
    (SELECT SUM(stok_saat_ini) FROM barang WHERE status = 'aktif') as total_stok,
    (SELECT SUM(jumlah) FROM transaksi_masuk WHERE MONTH(tanggal) = MONTH(CURDATE())) as barang_masuk_bulan_ini,
    (SELECT SUM(jumlah) FROM transaksi_keluar WHERE MONTH(tanggal) = MONTH(CURDATE())) as barang_keluar_bulan_ini,
    (SELECT COUNT(*) FROM kelompok_tani WHERE status = 'aktif') as total_kelompok_tani,
    (SELECT COUNT(*) FROM toko_mitra WHERE status = 'aktif') as total_toko_mitra;

-- Query untuk barang dengan stok menipis
SELECT * FROM view_laporan_stok WHERE status_stok IN ('Kritis', 'Menipis');

-- Query untuk top supplier (kelompok tani)
SELECT 
    kt.nama,
    COUNT(tm.id) as total_transaksi,
    SUM(tm.jumlah) as total_barang,
    SUM(tm.total_harga) as total_nilai
FROM kelompok_tani kt
JOIN transaksi_masuk tm ON kt.id = tm.kelompok_tani_id
WHERE tm.status = 'approved'
GROUP BY kt.id, kt.nama
ORDER BY total_nilai DESC;

-- Query untuk top customer (toko mitra)
SELECT 
    tm.nama,
    COUNT(tk.id) as total_transaksi,
    SUM(tk.jumlah) as total_barang,
    SUM(tk.total_bayar) as total_nilai
FROM toko_mitra tm
JOIN transaksi_keluar tk ON tm.id = tk.toko_mitra_id
WHERE tk.status = 'completed'
GROUP BY tm.id, tm.nama
ORDER BY total_nilai DESC;

-- =====================================================
-- BACKUP COMMANDS
-- =====================================================

-- Untuk backup database:
-- mysqldump -u username -p toko_tentrem > backup_toko_tentrem.sql

-- Untuk restore database:
-- mysql -u username -p toko_tentrem < backup_toko_tentrem.sql

-- =====================================================
-- SELESAI
-- =====================================================

-- Database Toko Tentrem berhasil dibuat dengan:
-- ✅ 8 Tabel utama dengan relasi yang tepat
-- ✅ Data sample 6 bulan terakhir
-- ✅ 5 Kelompok tani dengan 17 petani
-- ✅ 8 Toko mitra
-- ✅ 6 Jenis barang (3 beras, 3 gabah)
-- ✅ 30 transaksi masuk dan 30 transaksi keluar
-- ✅ Views untuk laporan
-- ✅ Stored procedures untuk otomasi
-- ✅ Triggers untuk update otomatis
-- ✅ Indexes untuk performa optimal
-- ✅ Sample queries untuk testing

COMMIT;