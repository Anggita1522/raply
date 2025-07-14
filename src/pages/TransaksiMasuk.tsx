import React, { useState } from 'react';
import { Plus, Calendar, TrendingUp, X, Search } from 'lucide-react';

const TransaksiMasuk: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBarang, setFilterBarang] = useState('');
  const [filterSupplier, setFilterSupplier] = useState('');

  const [formData, setFormData] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    barang_id: '',
    kelompok_tani_id: '',
    petani_id: '',
    jumlah: '',
    harga_satuan: '',
    kualitas: 'A',
    kadar_air: '',
    keterangan: ''
  });

  const [transaksiMasuk, setTransaksiMasuk] = useState([
    {
      id: 1,
      kode_transaksi: 'TM240101',
      tanggal: '2024-01-15',
      barang: 'Gabah Kering Grade A',
      jumlah: 100,
      satuan: 'Kg',
      harga: 8000,
      total: 800000,
      supplier: 'Kelompok Tani Makmur',
      petani: 'Pak Slamet Riyadi',
      kualitas: 'A',
      kadar_air: 14.2,
      keterangan: 'Hasil panen periode Januari'
    },
    {
      id: 2,
      kode_transaksi: 'TM240102',
      tanggal: '2024-01-14',
      barang: 'Gabah Basah',
      jumlah: 75,
      satuan: 'Kg',
      harga: 6000,
      total: 450000,
      supplier: 'Kelompok Tani Sejahtera',
      petani: 'Pak Joko Susilo',
      kualitas: 'B',
      kadar_air: 18.5,
      keterangan: 'Panen awal bulan'
    },
    {
      id: 3,
      kode_transaksi: 'TM240103',
      tanggal: '2024-01-13',
      barang: 'Gabah Kering Grade A',
      jumlah: 120,
      satuan: 'Kg',
      harga: 8000,
      total: 960000,
      supplier: 'Kelompok Tani Maju',
      petani: 'Pak Warno Sutrisno',
      kualitas: 'A',
      kadar_air: 13.8,
      keterangan: 'Hasil panen terbaik'
    }
  ]);

  const barangList = [
    { id: 1, nama: 'Beras Premium', harga: 12000 },
    { id: 2, nama: 'Beras Medium', harga: 9000 },
    { id: 3, nama: 'Beras Ekonomi', harga: 7000 },
    { id: 4, nama: 'Gabah Kering Grade A', harga: 6000 },
    { id: 5, nama: 'Gabah Kering Grade B', harga: 5000 },
    { id: 6, nama: 'Gabah Basah', harga: 4000 }
  ];

  const kelompokTaniList = [
    { id: 1, nama: 'Kelompok Tani Makmur', petani: [
      { id: 1, nama: 'Pak Slamet Riyadi' },
      { id: 2, nama: 'Bu Siti Rahayu' },
      { id: 3, nama: 'Pak Budi Santoso' }
    ]},
    { id: 2, nama: 'Kelompok Tani Sejahtera', petani: [
      { id: 4, nama: 'Pak Joko Susilo' },
      { id: 5, nama: 'Bu Rini Handayani' },
      { id: 6, nama: 'Pak Bambang Sutopo' }
    ]},
    { id: 3, nama: 'Kelompok Tani Maju', petani: [
      { id: 7, nama: 'Pak Warno Sutrisno' },
      { id: 8, nama: 'Bu Tini Suryani' },
      { id: 9, nama: 'Pak Sutrisno Adi' }
    ]}
  ];

  const filteredTransaksi = transaksiMasuk.filter(transaksi => {
    const matchesSearch = transaksi.barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaksi.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaksi.kode_transaksi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBarang = filterBarang === '' || transaksi.barang.includes(filterBarang);
    const matchesSupplier = filterSupplier === '' || transaksi.supplier === filterSupplier;
    return matchesSearch && matchesBarang && matchesSupplier;
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
  };

  const generateKodeTransaksi = () => {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const count = transaksiMasuk.length + 1;
    return `TM${year}${month}${count.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.barang_id || !formData.kelompok_tani_id || !formData.jumlah || !formData.harga_satuan) {
      alert('Mohon lengkapi semua field yang wajib diisi!');
      return;
    }

    const selectedBarang = barangList.find(b => b.id.toString() === formData.barang_id);
    const selectedKelompok = kelompokTaniList.find(k => k.id.toString() === formData.kelompok_tani_id);
    const selectedPetani = selectedKelompok?.petani.find(p => p.id.toString() === formData.petani_id);

    const newTransaksi = {
      id: transaksiMasuk.length + 1,
      kode_transaksi: generateKodeTransaksi(),
      tanggal: formData.tanggal,
      barang: selectedBarang?.nama || '',
      jumlah: parseInt(formData.jumlah),
      satuan: 'Kg',
      harga: parseInt(formData.harga_satuan),
      total: parseInt(formData.jumlah) * parseInt(formData.harga_satuan),
      supplier: selectedKelompok?.nama || '',
      petani: selectedPetani?.nama || '',
      kualitas: formData.kualitas,
      kadar_air: parseFloat(formData.kadar_air) || 0,
      keterangan: formData.keterangan
    };

    setTransaksiMasuk(prev => [newTransaksi, ...prev]);
    setShowAddModal(false);
    
    // Reset form
    setFormData({
      tanggal: new Date().toISOString().split('T')[0],
      barang_id: '',
      kelompok_tani_id: '',
      petani_id: '',
      jumlah: '',
      harga_satuan: '',
      kualitas: 'A',
      kadar_air: '',
      keterangan: ''
    });
  };

  const selectedKelompok = kelompokTaniList.find(k => k.id.toString() === formData.kelompok_tani_id);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaksi Barang Masuk</h1>
          <p className="text-gray-600">Kelola data barang masuk dan pembelian</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
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
              <p className="text-2xl font-bold text-gray-900">{transaksiMasuk.length}</p>
              <p className="text-sm text-gray-500">Bulan ini</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Barang Masuk</p>
              <p className="text-2xl font-bold text-gray-900">{transaksiMasuk.reduce((sum, t) => sum + t.jumlah, 0)} Kg</p>
              <p className="text-sm text-gray-500">Bulan ini</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nilai Pembelian</p>
              <p className="text-2xl font-bold text-gray-900">Rp {(transaksiMasuk.reduce((sum, t) => sum + t.total, 0) / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-500">Bulan ini</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={filterBarang}
              onChange={(e) => setFilterBarang(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Semua Barang</option>
              <option value="Beras">Beras</option>
              <option value="Gabah">Gabah</option>
            </select>
          </div>
          <div>
            <select
              value={filterSupplier}
              onChange={(e) => setFilterSupplier(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Semua Supplier</option>
              {kelompokTaniList.map(kelompok => (
                <option key={kelompok.id} value={kelompok.nama}>{kelompok.nama}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Daftar Transaksi Masuk ({filteredTransaksi.length})</h3>
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
                <th className="text-left p-4 font-medium text-gray-600">Supplier</th>
                <th className="text-left p-4 font-medium text-gray-600">Kualitas</th>
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
                    <span className="font-medium text-green-600">
                      Rp {transaksi.total.toLocaleString('id-ID')}
                    </span>
                  </td>
                  <td className="p-4">
                    <div>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        {transaksi.supplier}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">{transaksi.petani}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        transaksi.kualitas === 'A' ? 'bg-green-100 text-green-800' :
                        transaksi.kualitas === 'B' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        Grade {transaksi.kualitas}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        Kadar air: {transaksi.kadar_air}%
                      </div>
                    </div>
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
              <h3 className="text-lg font-semibold text-gray-900">Tambah Transaksi Masuk</h3>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih barang</option>
                    {barangList.map(barang => (
                      <option key={barang.id} value={barang.id}>{barang.nama}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kelompok Tani <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="kelompok_tani_id"
                    value={formData.kelompok_tani_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih kelompok tani</option>
                    {kelompokTaniList.map(kelompok => (
                      <option key={kelompok.id} value={kelompok.id}>{kelompok.nama}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Petani</label>
                  <select
                    name="petani_id"
                    value={formData.petani_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={!formData.kelompok_tani_id}
                  >
                    <option value="">Pilih petani</option>
                    {selectedKelompok?.petani.map(petani => (
                      <option key={petani.id} value={petani.id}>{petani.nama}</option>
                    ))}
                  </select>
                </div>
              </div>

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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Masukkan jumlah"
                    min="1"
                    required
                  />
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Masukkan harga"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kualitas</label>
                  <select
                    name="kualitas"
                    value={formData.kualitas}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="A">Grade A (Terbaik)</option>
                    <option value="B">Grade B (Sedang)</option>
                    <option value="C">Grade C (Standar)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kadar Air (%)</label>
                  <input
                    type="number"
                    name="kadar_air"
                    value={formData.kadar_air}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Masukkan kadar air"
                    step="0.1"
                    min="0"
                    max="30"
                  />
                </div>
              </div>

              {formData.jumlah && formData.harga_satuan && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-800">Total Pembayaran:</span>
                    <span className="text-lg font-bold text-green-900">
                      Rp {(parseInt(formData.jumlah) * parseInt(formData.harga_satuan)).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Keterangan</label>
                <textarea
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
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

export default TransaksiMasuk;