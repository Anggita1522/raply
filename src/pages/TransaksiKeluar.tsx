import React, { useState } from 'react';
import { Plus, Calendar, TrendingDown, X, Search } from 'lucide-react';

const TransaksiKeluar: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBarang, setFilterBarang] = useState('');
  const [filterPelanggan, setFilterPelanggan] = useState('');

  const [formData, setFormData] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    barang_id: '',
    jenis_pelanggan: 'toko_mitra',
    toko_mitra_id: '',
    nama_pelanggan: '',
    jumlah: '',
    harga_satuan: '',
    diskon: '0',
    metode_pembayaran: 'tunai',
    keterangan: ''
  });

  const [transaksiKeluar, setTransaksiKeluar] = useState([
    {
      id: 1,
      kode_transaksi: 'TK240101',
      tanggal: '2024-01-15',
      barang: 'Beras Premium',
      jumlah: 25,
      satuan: 'Kg',
      harga: 15000,
      total: 375000,
      diskon: 0,
      total_bayar: 375000,
      pelanggan: 'Toko Berkah',
      jenis_pelanggan: 'toko_mitra',
      metode_pembayaran: 'transfer',
      keterangan: 'Penjualan rutin'
    },
    {
      id: 2,
      kode_transaksi: 'TK240102',
      tanggal: '2024-01-14',
      barang: 'Beras Medium',
      jumlah: 40,
      satuan: 'Kg',
      harga: 12000,
      total: 480000,
      diskon: 0,
      total_bayar: 480000,
      pelanggan: 'Toko Sari Padi',
      jenis_pelanggan: 'toko_mitra',
      metode_pembayaran: 'tunai',
      keterangan: 'Pesanan bulanan'
    },
    {
      id: 3,
      kode_transaksi: 'TK240103',
      tanggal: '2024-01-13',
      barang: 'Beras Premium',
      jumlah: 15,
      satuan: 'Kg',
      harga: 15000,
      total: 225000,
      diskon: 0,
      total_bayar: 225000,
      pelanggan: 'Bu Sari',
      jenis_pelanggan: 'konsumen_langsung',
      metode_pembayaran: 'tunai',
      keterangan: 'Pembelian eceran'
    }
  ]);

  const barangList = [
    { id: 1, nama: 'Beras Premium', harga: 15000, stok: 250 },
    { id: 2, nama: 'Beras Medium', harga: 12000, stok: 180 },
    { id: 3, nama: 'Beras Ekonomi', harga: 10000, stok: 120 },
    { id: 4, nama: 'Gabah Kering Grade A', harga: 8000, stok: 500 },
    { id: 5, nama: 'Gabah Kering Grade B', harga: 6500, stok: 300 },
    { id: 6, nama: 'Gabah Basah', harga: 6000, stok: 150 }
  ];

  const tokoMitraList = [
    { id: 1, nama: 'Toko Berkah', pemilik: 'Pak Ahmad' },
    { id: 2, nama: 'Toko Sari Padi', pemilik: 'Bu Wahyu' },
    { id: 3, nama: 'Toko Rejeki', pemilik: 'Pak Hadi' },
    { id: 4, nama: 'Toko Makmur', pemilik: 'Bu Susi' },
    { id: 5, nama: 'Toko Subur Jaya', pemilik: 'Pak Eko' },
    { id: 6, nama: 'Toko Mitra Tani', pemilik: 'Bu Lestari' }
  ];

  const filteredTransaksi = transaksiKeluar.filter(transaksi => {
    const matchesSearch = transaksi.barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaksi.pelanggan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaksi.kode_transaksi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBarang = filterBarang === '' || transaksi.barang.includes(filterBarang);
    const matchesPelanggan = filterPelanggan === '' || transaksi.jenis_pelanggan === filterPelanggan;
    return matchesSearch && matchesBarang && matchesPelanggan;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-fill harga when barang is selected
    if (name === 'barang_id') {
      const selectedBarang = barangList.find(b => b.id.toString() === value);
      if (selectedBarang) {
        setFormData(prev => ({
          ...prev,
          harga_satuan: selectedBarang.harga.toString()
        }));
      }
    }

    // Clear toko_mitra_id when jenis_pelanggan changes
    if (name === 'jenis_pelanggan') {
      setFormData(prev => ({
        ...prev,
        toko_mitra_id: '',
        nama_pelanggan: ''
      }));
    }
  };

  const generateKodeTransaksi = () => {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const count = transaksiKeluar.length + 1;
    return `TK${year}${month}${count.toString().padStart(2, '0')}`;
  };

  const calculateTotal = () => {
    if (!formData.jumlah || !formData.harga_satuan) return 0;
    const subtotal = parseInt(formData.jumlah) * parseInt(formData.harga_satuan);
    const diskonAmount = (subtotal * parseFloat(formData.diskon || '0')) / 100;
    return subtotal - diskonAmount;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.barang_id || !formData.jumlah || !formData.harga_satuan) {
      alert('Mohon lengkapi semua field yang wajib diisi!');
      return;
    }

    if (formData.jenis_pelanggan === 'toko_mitra' && !formData.toko_mitra_id) {
      alert('Mohon pilih toko mitra!');
      return;
    }

    if (formData.jenis_pelanggan !== 'toko_mitra' && !formData.nama_pelanggan) {
      alert('Mohon masukkan nama pelanggan!');
      return;
    }

    const selectedBarang = barangList.find(b => b.id.toString() === formData.barang_id);
    const selectedToko = tokoMitraList.find(t => t.id.toString() === formData.toko_mitra_id);

    // Check stock availability
    if (selectedBarang && parseInt(formData.jumlah) > selectedBarang.stok) {
      alert(`Stok tidak mencukupi! Stok tersedia: ${selectedBarang.stok} Kg`);
      return;
    }

    const subtotal = parseInt(formData.jumlah) * parseInt(formData.harga_satuan);
    const diskonAmount = (subtotal * parseFloat(formData.diskon || '0')) / 100;
    const totalBayar = subtotal - diskonAmount;

    const newTransaksi = {
      id: transaksiKeluar.length + 1,
      kode_transaksi: generateKodeTransaksi(),
      tanggal: formData.tanggal,
      barang: selectedBarang?.nama || '',
      jumlah: parseInt(formData.jumlah),
      satuan: 'Kg',
      harga: parseInt(formData.harga_satuan),
      total: subtotal,
      diskon: parseFloat(formData.diskon || '0'),
      total_bayar: totalBayar,
      pelanggan: formData.jenis_pelanggan === 'toko_mitra' ? selectedToko?.nama || '' : formData.nama_pelanggan,
      jenis_pelanggan: formData.jenis_pelanggan,
      metode_pembayaran: formData.metode_pembayaran,
      keterangan: formData.keterangan
    };

    setTransaksiKeluar(prev => [newTransaksi, ...prev]);
    setShowAddModal(false);
    
    // Reset form
    setFormData({
      tanggal: new Date().toISOString().split('T')[0],
      barang_id: '',
      jenis_pelanggan: 'toko_mitra',
      toko_mitra_id: '',
      nama_pelanggan: '',
      jumlah: '',
      harga_satuan: '',
      diskon: '0',
      metode_pembayaran: 'tunai',
      keterangan: ''
    });
  };

  const selectedBarang = barangList.find(b => b.id.toString() === formData.barang_id);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaksi Barang Keluar</h1>
          <p className="text-gray-600">Kelola data penjualan dan distribusi barang</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Transaksi</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Transaksi</p>
              <p className="text-2xl font-bold text-gray-900">{transaksiKeluar.length}</p>
              <p className="text-sm text-gray-500">Bulan ini</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Barang Keluar</p>
              <p className="text-2xl font-bold text-gray-900">{transaksiKeluar.reduce((sum, t) => sum + t.jumlah, 0)} Kg</p>
              <p className="text-sm text-gray-500">Bulan ini</p>
            </div>
            <TrendingDown className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nilai Penjualan</p>
              <p className="text-2xl font-bold text-gray-900">Rp {(transaksiKeluar.reduce((sum, t) => sum + t.total_bayar, 0) / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-500">Bulan ini</p>
            </div>
            <TrendingDown className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari transaksi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={filterBarang}
              onChange={(e) => setFilterBarang(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Semua Barang</option>
              <option value="Beras">Beras</option>
              <option value="Gabah">Gabah</option>
            </select>
          </div>
          <div>
            <select
              value={filterPelanggan}
              onChange={(e) => setFilterPelanggan(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Semua Pelanggan</option>
              <option value="toko_mitra">Toko Mitra</option>
              <option value="konsumen_langsung">Konsumen Langsung</option>
              <option value="grosir">Grosir</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Daftar Transaksi Keluar ({filteredTransaksi.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Kode</th>
                <th className="text-left p-4 font-medium text-gray-600">Tanggal</th>
                <th className="text-left p-4 font-medium text-gray-600">Barang</th>
                <th className="text-left p-4 font-medium text-gray-600">Jumlah</th>
                <th className="text-left p-4 font-medium text-gray-600">Harga</th>
                <th className="text-left p-4 font-medium text-gray-600">Total</th>
                <th className="text-left p-4 font-medium text-gray-600">Pelanggan</th>
                <th className="text-left p-4 font-medium text-gray-600">Pembayaran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransaksi.map((transaksi) => (
                <tr key={transaksi.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{transaksi.kode_transaksi}</span>
                  </td>
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
                    <div className="text-sm text-gray-500">{transaksi.keterangan}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-gray-900">
                      {transaksi.jumlah} {transaksi.satuan}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-900">
                      Rp {transaksi.harga.toLocaleString('id-ID')}
                    </span>
                  </td>
                  <td className="p-4">
                    <div>
                      <span className="font-medium text-red-600">
                        Rp {transaksi.total_bayar.toLocaleString('id-ID')}
                      </span>
                      {transaksi.diskon > 0 && (
                        <div className="text-sm text-gray-500">
                          Diskon {transaksi.diskon}%
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        transaksi.jenis_pelanggan === 'toko_mitra' ? 'bg-blue-100 text-blue-800' :
                        transaksi.jenis_pelanggan === 'grosir' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {transaksi.pelanggan}
                      </span>
                      <div className="text-sm text-gray-500 mt-1 capitalize">
                        {transaksi.jenis_pelanggan.replace('_', ' ')}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm capitalize ${
                      transaksi.metode_pembayaran === 'tunai' ? 'bg-green-100 text-green-800' :
                      transaksi.metode_pembayaran === 'transfer' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaksi.metode_pembayaran}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Tambah Transaksi Keluar</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Barang <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="barang_id"
                    value={formData.barang_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih barang</option>
                    {barangList.map(barang => (
                      <option key={barang.id} value={barang.id}>
                        {barang.nama} (Stok: {barang.stok} Kg)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Pelanggan <span className="text-red-500">*</span>
                </label>
                <select
                  name="jenis_pelanggan"
                  value={formData.jenis_pelanggan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  <option value="toko_mitra">Toko Mitra</option>
                  <option value="konsumen_langsung">Konsumen Langsung</option>
                  <option value="grosir">Grosir</option>
                </select>
              </div>

              {formData.jenis_pelanggan === 'toko_mitra' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Toko Mitra <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="toko_mitra_id"
                    value={formData.toko_mitra_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih toko mitra</option>
                    {tokoMitraList.map(toko => (
                      <option key={toko.id} value={toko.id}>
                        {toko.nama} - {toko.pemilik}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Pelanggan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama_pelanggan"
                    value={formData.nama_pelanggan}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Masukkan nama pelanggan"
                    required
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah (Kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="jumlah"
                    value={formData.jumlah}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Masukkan jumlah"
                    min="1"
                    max={selectedBarang?.stok || 999999}
                    required
                  />
                  {selectedBarang && (
                    <p className="text-sm text-gray-500 mt-1">
                      Stok tersedia: {selectedBarang.stok} Kg
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Harga per Kg <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="harga_satuan"
                    value={formData.harga_satuan}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Masukkan harga"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diskon (%)</label>
                  <input
                    type="number"
                    name="diskon"
                    value={formData.diskon}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Metode Pembayaran</label>
                  <select
                    name="metode_pembayaran"
                    value={formData.metode_pembayaran}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="tunai">Tunai</option>
                    <option value="transfer">Transfer</option>
                    <option value="kredit">Kredit</option>
                  </select>
                </div>
              </div>

              {formData.jumlah && formData.harga_satuan && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-red-800">Subtotal:</span>
                      <span className="font-medium text-red-900">
                        Rp {(parseInt(formData.jumlah) * parseInt(formData.harga_satuan)).toLocaleString('id-ID')}
                      </span>
                    </div>
                    {parseFloat(formData.diskon || '0') > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-red-800">Diskon ({formData.diskon}%):</span>
                        <span className="font-medium text-red-900">
                          -Rp {((parseInt(formData.jumlah) * parseInt(formData.harga_satuan) * parseFloat(formData.diskon || '0')) / 100).toLocaleString('id-ID')}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center border-t border-red-200 pt-2">
                      <span className="text-sm font-medium text-red-800">Total Pembayaran:</span>
                      <span className="text-lg font-bold text-red-900">
                        Rp {calculateTotal().toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Keterangan</label>
                <textarea
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={3}
                  placeholder="Masukkan keterangan transaksi"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Simpan Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransaksiKeluar;