import React, { useState } from 'react';
import { Package, AlertTriangle, TrendingUp, TrendingDown, Search } from 'lucide-react';

const StokBarang: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const stokBarang = [
    {
      id: 1,
      nama: 'Beras Premium',
      jenis: 'Beras',
      stokSaat: 250,
      stokMin: 50,
      stokMaks: 500,
      satuan: 'Kg',
      harga: 15000,
      lokasi: 'Gudang A',
      terakhirUpdate: '2024-01-15',
      status: 'Aman'
    },
    {
      id: 2,
      nama: 'Beras Medium',
      jenis: 'Beras',
      stokSaat: 35,
      stokMin: 30,
      stokMaks: 400,
      satuan: 'Kg',
      harga: 12000,
      lokasi: 'Gudang A',
      terakhirUpdate: '2024-01-14',
      status: 'Menipis'
    },
    {
      id: 3,
      nama: 'Gabah Kering',
      jenis: 'Gabah',
      stokSaat: 500,
      stokMin: 100,
      stokMaks: 1000,
      satuan: 'Kg',
      harga: 8000,
      lokasi: 'Gudang B',
      terakhirUpdate: '2024-01-13',
      status: 'Aman'
    },
    {
      id: 4,
      nama: 'Gabah Basah',
      jenis: 'Gabah',
      stokSaat: 15,
      stokMin: 50,
      stokMaks: 800,
      satuan: 'Kg',
      harga: 6000,
      lokasi: 'Gudang B',
      terakhirUpdate: '2024-01-12',
      status: 'Kritis'
    }
  ];

  const filteredStok = stokBarang.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jenis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aman': return 'bg-green-100 text-green-800';
      case 'Menipis': return 'bg-yellow-100 text-yellow-800';
      case 'Kritis': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStokPercentage = (stokSaat: number, stokMaks: number) => {
    return Math.min((stokSaat / stokMaks) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stok Barang</h1>
          <p className="text-gray-600">Monitor dan kelola stok inventaris</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari barang..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Item</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stok Aman</p>
              <p className="text-2xl font-bold text-green-600">2</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stok Menipis</p>
              <p className="text-2xl font-bold text-yellow-600">1</p>
            </div>
            <TrendingDown className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stok Kritis</p>
              <p className="text-2xl font-bold text-red-600">1</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Stock Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStok.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.nama}</h3>
                <p className="text-sm text-gray-600">{item.jenis} • {item.lokasi}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>

            <div className="space-y-3">
              {/* Stock Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Stok Saat Ini</span>
                  <span className="text-sm font-medium text-gray-900">
                    {item.stokSaat} / {item.stokMaks} {item.satuan}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.status === 'Aman' ? 'bg-green-500' :
                      item.status === 'Menipis' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${getStokPercentage(item.stokSaat, item.stokMaks)}%` }}
                  />
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Stok Minimum</p>
                  <p className="font-medium text-gray-900">{item.stokMin} {item.satuan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Harga Satuan</p>
                  <p className="font-medium text-gray-900">Rp {item.harga.toLocaleString('id-ID')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nilai Stok</p>
                  <p className="font-medium text-gray-900">
                    Rp {(item.stokSaat * item.harga).toLocaleString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Terakhir Update</p>
                  <p className="font-medium text-gray-900">
                    {new Date(item.terakhirUpdate).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>

              {/* Alert */}
              {item.status !== 'Aman' && (
                <div className={`flex items-center space-x-2 p-3 rounded-lg ${
                  item.status === 'Menipis' ? 'bg-yellow-50 text-yellow-800' : 'bg-red-50 text-red-800'
                }`}>
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {item.status === 'Menipis' 
                      ? 'Stok mendekati batas minimum' 
                      : 'Stok di bawah batas minimum, segera lakukan pengisian!'
                    }
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detail Stok Barang</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Barang</th>
                <th className="text-left p-4 font-medium text-gray-600">Jenis</th>
                <th className="text-left p-4 font-medium text-gray-600">Stok Saat Ini</th>
                <th className="text-left p-4 font-medium text-gray-600">Min/Maks</th>
                <th className="text-left p-4 font-medium text-gray-600">Harga</th>
                <th className="text-left p-4 font-medium text-gray-600">Nilai Stok</th>
                <th className="text-left p-4 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStok.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{item.nama}</div>
                    <div className="text-sm text-gray-500">{item.lokasi}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      item.jenis === 'Beras' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.jenis}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-gray-900">{item.stokSaat} {item.satuan}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-900">{item.stokMin} / {item.stokMaks} {item.satuan}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-900">Rp {item.harga.toLocaleString('id-ID')}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-gray-900">
                      Rp {(item.stokSaat * item.harga).toLocaleString('id-ID')}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}>
                      {item.status}
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

export default StokBarang;