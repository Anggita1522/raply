import React from 'react';
import { Package, TrendingUp, TrendingDown, Archive, Users, Store } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Barang',
      value: '1,250',
      subtitle: 'Kg',
      icon: Package,
      color: 'bg-blue-500',
      trend: '+12%'
    },
    {
      title: 'Barang Masuk',
      value: '320',
      subtitle: 'Kg Bulan Ini',
      icon: TrendingUp,
      color: 'bg-green-500',
      trend: '+8%'
    },
    {
      title: 'Barang Keluar',
      value: '280',
      subtitle: 'Kg Bulan Ini',
      icon: TrendingDown,
      color: 'bg-red-500',
      trend: '-5%'
    },
    {
      title: 'Stok Tersedia',
      value: '970',
      subtitle: 'Kg',
      icon: Archive,
      color: 'bg-purple-500',
      trend: '+15%'
    },
    {
      title: 'Kelompok Tani',
      value: '12',
      subtitle: 'Kelompok Aktif',
      icon: Users,
      color: 'bg-orange-500',
      trend: '+2'
    },
    {
      title: 'Toko Mitra',
      value: '8',
      subtitle: 'Toko Kerjasama',
      icon: Store,
      color: 'bg-teal-500',
      trend: '+1'
    }
  ];

  const chartData = [
    { name: 'Jan', masuk: 400, keluar: 300 },
    { name: 'Feb', masuk: 350, keluar: 280 },
    { name: 'Mar', masuk: 420, keluar: 320 },
    { name: 'Apr', masuk: 380, keluar: 290 },
    { name: 'May', masuk: 450, keluar: 350 },
    { name: 'Jun', masuk: 320, keluar: 280 },
  ];

  const trendData = [
    { name: 'Jan', stok: 1000 },
    { name: 'Feb', stok: 1070 },
    { name: 'Mar', stok: 1170 },
    { name: 'Apr', stok: 1260 },
    { name: 'May', stok: 1360 },
    { name: 'Jun', stok: 1250 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Selamat datang di Sistem Inventaris Toko Tentrem</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Terakhir diperbarui</p>
          <p className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString('id-ID')}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.subtitle}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-green-600">{stat.trend}</span>
              <span className="text-sm text-gray-500 ml-2">dari bulan lalu</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaksi Bulanan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="masuk" fill="#10b981" name="Barang Masuk" />
              <Bar dataKey="keluar" fill="#ef4444" name="Barang Keluar" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Stok</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="stok" stroke="#8b5cf6" strokeWidth={2} name="Stok (Kg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h3>
        <div className="space-y-4">
          {[
            { action: 'Barang Masuk', item: 'Beras Premium', qty: '50 Kg', time: '2 jam yang lalu', type: 'in' },
            { action: 'Barang Keluar', item: 'Beras Medium', qty: '25 Kg', time: '4 jam yang lalu', type: 'out' },
            { action: 'Barang Masuk', item: 'Gabah Kering', qty: '100 Kg', time: '6 jam yang lalu', type: 'in' },
            { action: 'Barang Keluar', item: 'Beras Premium', qty: '15 Kg', time: '1 hari yang lalu', type: 'out' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'in' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {activity.type === 'in' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.item} - {activity.qty}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;