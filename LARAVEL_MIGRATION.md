# Panduan Migrasi Sistem Inventaris Toko Tentrem ke Laravel

## 1. Setup Laravel Project

### Install Laravel
```bash
# Install Laravel via Composer
composer create-project laravel/laravel toko-tentrem-laravel

# Masuk ke folder project
cd toko-tentrem-laravel

# Install dependencies tambahan
composer require laravel/ui
php artisan ui bootstrap --auth
npm install && npm run dev
```

### Konfigurasi Database
```bash
# Edit file .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=toko_tentrem
DB_USERNAME=root
DB_PASSWORD=
```

## 2. Struktur Database (Migrations)

### Migration untuk Kelompok Tani
```php
// database/migrations/create_kelompok_tani_table.php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKelompokTaniTable extends Migration
{
    public function up()
    {
        Schema::create('kelompok_tani', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('ketua');
            $table->integer('jumlah_anggota');
            $table->string('desa');
            $table->text('alamat')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('kelompok_tani');
    }
}
```

### Migration untuk Petani
```php
// database/migrations/create_petani_table.php
<?php
class CreatePetaniTable extends Migration
{
    public function up()
    {
        Schema::create('petani', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelompok_tani_id')->constrained('kelompok_tani');
            $table->string('nama');
            $table->string('telepon')->nullable();
            $table->decimal('luas_lahan', 8, 2);
            $table->text('alamat')->nullable();
            $table->timestamps();
        });
    }
}
```

### Migration untuk Toko Mitra
```php
// database/migrations/create_toko_mitra_table.php
<?php
class CreateTokoMitraTable extends Migration
{
    public function up()
    {
        Schema::create('toko_mitra', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('pemilik');
            $table->text('alamat');
            $table->string('telepon')->nullable();
            $table->decimal('target_pembelian', 10, 2)->default(0);
            $table->timestamps();
        });
    }
}
```

### Migration untuk Barang
```php
// database/migrations/create_barang_table.php
<?php
class CreateBarangTable extends Migration
{
    public function up()
    {
        Schema::create('barang', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->enum('jenis', ['Beras', 'Gabah']);
            $table->enum('kategori', ['Pangan', 'Bahan Baku']);
            $table->string('satuan');
            $table->decimal('harga', 10, 2);
            $table->integer('stok_saat_ini')->default(0);
            $table->integer('stok_minimum');
            $table->integer('stok_maksimum');
            $table->text('deskripsi')->nullable();
            $table->timestamps();
        });
    }
}
```

### Migration untuk Transaksi Masuk
```php
// database/migrations/create_transaksi_masuk_table.php
<?php
class CreateTransaksiMasukTable extends Migration
{
    public function up()
    {
        Schema::create('transaksi_masuk', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal');
            $table->foreignId('barang_id')->constrained('barang');
            $table->foreignId('kelompok_tani_id')->constrained('kelompok_tani');
            $table->integer('jumlah');
            $table->decimal('harga_satuan', 10, 2);
            $table->decimal('total_harga', 12, 2);
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }
}
```

### Migration untuk Transaksi Keluar
```php
// database/migrations/create_transaksi_keluar_table.php
<?php
class CreateTransaksiKeluarTable extends Migration
{
    public function up()
    {
        Schema::create('transaksi_keluar', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal');
            $table->foreignId('barang_id')->constrained('barang');
            $table->foreignId('toko_mitra_id')->constrained('toko_mitra');
            $table->integer('jumlah');
            $table->decimal('harga_satuan', 10, 2);
            $table->decimal('total_harga', 12, 2);
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }
}
```

## 3. Models Laravel

### Model KelompokTani
```php
// app/Models/KelompokTani.php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KelompokTani extends Model
{
    protected $table = 'kelompok_tani';
    
    protected $fillable = [
        'nama', 'ketua', 'jumlah_anggota', 'desa', 'alamat'
    ];

    public function petani()
    {
        return $this->hasMany(Petani::class);
    }

    public function transaksiMasuk()
    {
        return $this->hasMany(TransaksiMasuk::class);
    }
}
```

### Model Barang
```php
// app/Models/Barang.php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    protected $table = 'barang';
    
    protected $fillable = [
        'nama', 'jenis', 'kategori', 'satuan', 'harga',
        'stok_saat_ini', 'stok_minimum', 'stok_maksimum', 'deskripsi'
    ];

    public function transaksiMasuk()
    {
        return $this->hasMany(TransaksiMasuk::class);
    }

    public function transaksiKeluar()
    {
        return $this->hasMany(TransaksiKeluar::class);
    }

    public function getStatusStokAttribute()
    {
        if ($this->stok_saat_ini <= $this->stok_minimum) {
            return 'Kritis';
        } elseif ($this->stok_saat_ini <= ($this->stok_minimum * 1.5)) {
            return 'Menipis';
        }
        return 'Aman';
    }
}
```

## 4. Controllers

### DashboardController
```php
// app/Http/Controllers/DashboardController.php
<?php
namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\TransaksiMasuk;
use App\Models\TransaksiKeluar;
use App\Models\KelompokTani;
use App\Models\TokoMitra;

class DashboardController extends Controller
{
    public function index()
    {
        $totalBarang = Barang::sum('stok_saat_ini');
        $barangMasukBulanIni = TransaksiMasuk::whereMonth('tanggal', now()->month)->sum('jumlah');
        $barangKeluarBulanIni = TransaksiKeluar::whereMonth('tanggal', now()->month)->sum('jumlah');
        $totalKelompokTani = KelompokTani::count();
        $totalTokoMitra = TokoMitra::count();
        
        // Data untuk chart
        $chartData = $this->getChartData();
        
        return view('dashboard', compact(
            'totalBarang', 'barangMasukBulanIni', 'barangKeluarBulanIni',
            'totalKelompokTani', 'totalTokoMitra', 'chartData'
        ));
    }

    private function getChartData()
    {
        // Logic untuk mengambil data chart 6 bulan terakhir
        $months = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $months[] = [
                'name' => $date->format('M Y'),
                'masuk' => TransaksiMasuk::whereMonth('tanggal', $date->month)
                    ->whereYear('tanggal', $date->year)->sum('jumlah'),
                'keluar' => TransaksiKeluar::whereMonth('tanggal', $date->month)
                    ->whereYear('tanggal', $date->year)->sum('jumlah')
            ];
        }
        return $months;
    }
}
```

### BarangController
```php
// app/Http/Controllers/BarangController.php
<?php
namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;

class BarangController extends Controller
{
    public function index()
    {
        $barang = Barang::all();
        return view('barang.index', compact('barang'));
    }

    public function create()
    {
        return view('barang.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'jenis' => 'required|in:Beras,Gabah',
            'satuan' => 'required|string',
            'harga' => 'required|numeric|min:0',
            'stok_minimum' => 'required|integer|min:0',
            'stok_maksimum' => 'required|integer|min:0',
        ]);

        Barang::create($request->all());
        return redirect()->route('barang.index')->with('success', 'Barang berhasil ditambahkan');
    }

    public function edit(Barang $barang)
    {
        return view('barang.edit', compact('barang'));
    }

    public function update(Request $request, Barang $barang)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'jenis' => 'required|in:Beras,Gabah',
            'satuan' => 'required|string',
            'harga' => 'required|numeric|min:0',
            'stok_minimum' => 'required|integer|min:0',
            'stok_maksimum' => 'required|integer|min:0',
        ]);

        $barang->update($request->all());
        return redirect()->route('barang.index')->with('success', 'Barang berhasil diperbarui');
    }

    public function destroy(Barang $barang)
    {
        $barang->delete();
        return redirect()->route('barang.index')->with('success', 'Barang berhasil dihapus');
    }
}
```

## 5. Routes

### Web Routes
```php
// routes/web.php
<?php
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\KelompokTaniController;
use App\Http\Controllers\TransaksiMasukController;
use App\Http\Controllers\TransaksiKeluarController;

Route::middleware(['auth'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    
    // Barang routes
    Route::resource('barang', BarangController::class);
    
    // Kelompok Tani routes
    Route::resource('kelompok-tani', KelompokTaniController::class);
    
    // Transaksi routes
    Route::resource('transaksi-masuk', TransaksiMasukController::class);
    Route::resource('transaksi-keluar', TransaksiKeluarController::class);
    
    // Laporan routes
    Route::get('/laporan/masuk', [LaporanController::class, 'masuk'])->name('laporan.masuk');
    Route::get('/laporan/keluar', [LaporanController::class, 'keluar'])->name('laporan.keluar');
    Route::get('/stok', [StokController::class, 'index'])->name('stok.index');
});

Auth::routes();
```

## 6. Views dengan Blade Template

### Layout Utama
```php
<!-- resources/views/layouts/app.blade.php -->
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Toko Tentrem - Sistem Inventaris</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="d-flex">
        @include('partials.sidebar')
        
        <div class="flex-grow-1">
            @include('partials.header')
            
            <main class="p-4">
                @yield('content')
            </main>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('js/app.js') }}"></script>
    @stack('scripts')
</body>
</html>
```

### Dashboard View
```php
<!-- resources/views/dashboard.blade.php -->
@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row mb-4">
        <div class="col-12">
            <h1 class="h3 mb-3">Dashboard</h1>
        </div>
    </div>

    <!-- Stats Cards -->
    <div class="row mb-4">
        <div class="col-md-3">
            <div class="card bg-primary text-white">
                <div class="card-body">
                    <h5 class="card-title">Total Barang</h5>
                    <h2>{{ number_format($totalBarang) }} Kg</h2>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card bg-success text-white">
                <div class="card-body">
                    <h5 class="card-title">Barang Masuk</h5>
                    <h2>{{ number_format($barangMasukBulanIni) }} Kg</h2>
                    <small>Bulan ini</small>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card bg-danger text-white">
                <div class="card-body">
                    <h5 class="card-title">Barang Keluar</h5>
                    <h2>{{ number_format($barangKeluarBulanIni) }} Kg</h2>
                    <small>Bulan ini</small>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card bg-info text-white">
                <div class="card-body">
                    <h5 class="card-title">Kelompok Tani</h5>
                    <h2>{{ $totalKelompokTani }}</h2>
                    <small>Kelompok aktif</small>
                </div>
            </div>
        </div>
    </div>

    <!-- Chart -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5>Grafik Transaksi Bulanan</h5>
                </div>
                <div class="card-body">
                    <canvas id="transactionChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    const ctx = document.getElementById('transactionChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: {!! json_encode(array_column($chartData, 'name')) !!},
            datasets: [{
                label: 'Barang Masuk',
                data: {!! json_encode(array_column($chartData, 'masuk')) !!},
                backgroundColor: 'rgba(40, 167, 69, 0.8)'
            }, {
                label: 'Barang Keluar',
                data: {!! json_encode(array_column($chartData, 'keluar')) !!},
                backgroundColor: 'rgba(220, 53, 69, 0.8)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
</script>
@endpush
@endsection
```

## 7. Perintah untuk Menjalankan

```bash
# Jalankan migration
php artisan migrate

# Seed data (opsional)
php artisan db:seed

# Jalankan server
php artisan serve

# Compile assets
npm run dev
```

## 8. Fitur Tambahan Laravel

### API Routes (untuk mobile app)
```php
// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('barang', BarangController::class);
    Route::apiResource('transaksi-masuk', TransaksiMasukController::class);
    Route::get('dashboard/stats', [DashboardController::class, 'apiStats']);
});
```

### Export Excel/PDF
```bash
# Install package untuk export
composer require maatwebsite/excel
composer require barryvdh/laravel-dompdf
```

### Notifikasi Stok Menipis
```php
// app/Notifications/StokMenipis.php
use Illuminate\Notifications\Notification;

class StokMenipis extends Notification
{
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Peringatan Stok Menipis')
            ->line('Beberapa barang memiliki stok yang menipis.')
            ->action('Lihat Stok', url('/stok'));
    }
}
```

Dengan struktur ini, sistem inventaris Toko Tentrem akan berjalan dengan baik di Laravel dengan fitur yang lengkap dan scalable.