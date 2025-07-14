import React, { useState } from 'react';
import { Download, Filter, Calendar, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const LaporanMasuk: React.FC = () => {
  const [filterPeriode, setFilterPeriode] = useState('bulan');
  const [filterBarang, setFilterBarang] = useState('semua');

  const laporanData = [
    { periode: 'Jan 2024', gabah: 800, beras: 200, total: 1000 },
    { periode: 'Feb 2024', gabah: 750, beras: 180, total: 930 },
    { periode: 'Mar 2024', gabah: 900, beras: 220, total: 1120 },
    { periode: 'Apr 2024', gabah: 850, beras: 190, total: 1040 },
    { periode: 'May 2024', gabah: 950, beras: 250, total: 1200 },
    { periode: 'Jun 2024', gabah: 700, beras: 180, total: 880 },
  ];

  const detailTransaksi = [
    { tanggal: '2024-01-15', barang: 'Gabah Kering', jumlah: 100, supplier: 'Kelompok Tani Makmur', nilai: 800000 },
    { tanggal: '2024-01-14', barang: 'Gabah Basah', jumlah: 75, supplier: 'Kelompok Tani Sejahtera', nilai: 450000 },
    { tanggal: '2024-01-13', barang: 'Beras Premium', jumlah: 50, supplier: 'Pengolahan Internal', nilai: 750000 },
    { tanggal: '2024-01-12', barang: 'Gabah Kering', jumlah: 120, supplier: 'Kelompok Tani Maju', nilai: 960000 },
    { tanggal: '2024-01-11', barang: 'Beras Medium', jumlah: 40, supplier: 'Pengolahan Internal', nilai: 480000 },
  ];

  const handleExport = () => {
    console.log('Exporting report...');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan Barang Masuk</h1>
          <p className="text-gray-600">Analisis dan laporan transaksi barang masuk</p>
        </div>
        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export PDF</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Transaksi</p>
              <p className="text-2xl font-bold text-gray-900">145</p>
              <p className="text-sm text-gray-500">Tahun ini</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Barang Masuk</p>
              <p className="text-2xl font-bold text-gray-900">6,270 Kg</p>
              <p className="text-sm text-gray-500">Tahun ini</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nilai Pembelian</p>
              <p className="text-2xl font-bold text-gray-900">Rp 58.2M</p>
              <p className="text-sm text-gray-500">Tahun ini</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rata-rata Bulanan</p>
              <p className="text-2xl font-bold text-gray-900">1,045 Kg</p>
              <p className="text-sm text-gray-500">Per bulan</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filter Laporan</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Periode</label>
            <select
              value={filterPeriode}
              onChange={(e) => setFilterPeriode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="hari">Harian</option>
              <option value="minggu">Mingguan</option>
              <option value="bulan">Bulanan</option>
              <option value="tahun">Tahunan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Akhir</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Barang</label>
            <select
              value={filterBarang}
              onChange={(e) => setFilterBarang(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="semua">Semua Barang</option>
              <option value="beras">Beras</option>
              <option value="gabah">Gabah</option>
            </select>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Barang Masuk per Bulan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={laporanData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periode" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="gabah" fill="#f97316" name="Gabah (Kg)" />
              <Bar dataKey="beras" fill="#3b82f6" name="Beras (Kg)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Total Barang Masuk</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={laporanData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periode" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2} name="Total (Kg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Suppliers */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Terbanyak</h3>
        <div className="space-y-4">
          {[
            { nama: 'Kelompok Tani Makmur', jumlah: '2,500 Kg', nilai: 'Rp 18.5M', persentase: 40 },
            { nama: 'Kelompok Tani Sejahtera', jumlah: '1,800 Kg', nilai: 'Rp 14.2M', persentase: 30 },
            { nama: 'Kelompok Tani Maju', jumlah: '1,200 Kg', nilai: 'Rp 9.8M', persentase: 20 },
            { nama: 'Pengolahan Internal', jumlah: '770 Kg', nilai: 'Rp 6.1M', persentase: 10 },
          ].map((supplier, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{supplier.nama}</p>
                <p className="text-sm text-gray-600">{supplier.jumlah} • {supplier.nilai}</p>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${supplier.persentase}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900 ml-3">{supplier.persentase}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Transaksi Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Tanggal</th>
                <th className="text-left p-4 font-medium text-gray-600">Barang</th>
                <th className="text-left p-4 font-medium text-gray-600">Jumlah</th>
                <th className="text-left p-4 font-medium text-gray-600">Supplier</th>
                <th className="text-left p-4 font-medium text-gray-600">Nilai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {detailTransaksi.map((transaksi, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">
                        {new Date(transaksi.tanggal).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{transaksi.barang}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-gray-900">{transaksi.jumlah} Kg</span>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {transaksi.supplier}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-green-600">
                      Rp {transaksi.nilai.toLocaleString('id-ID')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LaporanMasuk;