import React, { useState } from 'react';
import { Download, Filter, Calendar, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const LaporanKeluar: React.FC = () => {
  const [filterPeriode, setFilterPeriode] = useState('bulan');
  const [filterBarang, setFilterBarang] = useState('semua');

  const laporanData = [
    { periode: 'Jan 2024', beras: 650, gabah: 50, total: 700 },
    { periode: 'Feb 2024', beras: 580, gabah: 40, total: 620 },
    { periode: 'Mar 2024', beras: 720, gabah: 60, total: 780 },
    { periode: 'Apr 2024', beras: 680, gabah: 45, total: 725 },
    { periode: 'May 2024', beras: 750, gabah: 70, total: 820 },
    { periode: 'Jun 2024', beras: 600, gabah: 35, total: 635 },
  ];

  const pelangganData = [
    { name: 'Toko Berkah', value: 35, color: '#3b82f6' },
    { name: 'Toko Sari Padi', value: 25, color: '#10b981' },
    { name: 'Toko Rejeki', value: 20, color: '#f97316' },
    { name: 'Konsumen Langsung', value: 15, color: '#8b5cf6' },
    { name: 'Lainnya', value: 5, color: '#ef4444' },
  ];

  const detailTransaksi = [
    { tanggal: '2024-01-15', barang: 'Beras Premium', jumlah: 25, pelanggan: 'Toko Berkah', nilai: 375000 },
    { tanggal: '2024-01-14', barang: 'Beras Medium', jumlah: 40, pelanggan: 'Toko Sari Padi', nilai: 480000 },
    { tanggal: '2024-01-13', barang: 'Beras Premium', jumlah: 15, pelanggan: 'Konsumen Langsung', nilai: 225000 },
    { tanggal: '2024-01-12', barang: 'Beras Medium', jumlah: 30, pelanggan: 'Toko Rejeki', nilai: 360000 },
    { tanggal: '2024-01-11', barang: 'Beras Premium', jumlah: 20, pelanggan: 'Toko Berkah', nilai: 300000 },
  ];

  const handleExport = () => {
    console.log('Exporting report...');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan Barang Keluar</h1>
          <p className="text-gray-600">Analisis dan laporan penjualan barang</p>
        </div>
        <button
          onClick={handleExport}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
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
              <p className="text-2xl font-bold text-gray-900">128</p>
              <p className="text-sm text-gray-500">Tahun ini</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Barang Keluar</p>
              <p className="text-2xl font-bold text-gray-900">4,280 Kg</p>
              <p className="text-sm text-gray-500">Tahun ini</p>
            </div>
            <TrendingDown className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nilai Penjualan</p>
              <p className="text-2xl font-bold text-gray-900">Rp 52.4M</p>
              <p className="text-sm text-gray-500">Tahun ini</p>
            </div>
            <TrendingDown className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rata-rata Bulanan</p>
              <p className="text-2xl font-bold text-gray-900">713 Kg</p>
              <p className="text-sm text-gray-500">Per bulan</p>
            </div>
            <TrendingDown className="w-8 h-8 text-purple-600" />
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Akhir</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Barang</label>
            <select
              value={filterBarang}
              onChange={(e) => setFilterBarang(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Barang Keluar per Bulan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={laporanData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periode" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="beras" fill="#3b82f6" name="Beras (Kg)" />
              <Bar dataKey="gabah" fill="#f97316" name="Gabah (Kg)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribusi Pelanggan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pelangganData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pelangganData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pelanggan Terbanyak</h3>
        <div className="space-y-4">
          {[
            { nama: 'Toko Berkah', jumlah: '1,500 Kg', nilai: 'Rp 18.5M', persentase: 35 },
            { nama: 'Toko Sari Padi', jumlah: '1,070 Kg', nilai: 'Rp 13.1M', persentase: 25 },
            { nama: 'Toko Rejeki', jumlah: '856 Kg', nilai: 'Rp 10.5M', persentase: 20 },
            { nama: 'Konsumen Langsung', jumlah: '642 Kg', nilai: 'Rp 8.2M', persentase: 15 },
            { nama: 'Toko Makmur', jumlah: '214 Kg', nilai: 'Rp 2.6M', persentase: 5 },
          ].map((pelanggan, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{pelanggan.nama}</p>
                <p className="text-sm text-gray-600">{pelanggan.jumlah} • {pelanggan.nilai}</p>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${pelanggan.persentase}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900 ml-3">{pelanggan.persentase}%</span>
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
                <th className="text-left p-4 font-medium text-gray-600">Pelanggan</th>
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
                      {transaksi.pelanggan}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-red-600">
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

export default LaporanKeluar;