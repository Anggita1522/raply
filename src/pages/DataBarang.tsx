import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package, Search, X } from 'lucide-react';

const DataBarang: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterJenis, setFilterJenis] = useState('');

  const [formData, setFormData] = useState({
    kode_barang: '',
    nama: '',
    jenis: '',
    kategori: '',
    satuan: 'Kg',
    harga_beli: '',
    harga_jual: '',
    stok_minimum: '',
    stok_maksimum: '',
    lokasi_gudang: 'Gudang A',
    deskripsi: ''
  });

  const [barang, setBarang] = useState([
    {
      id: 1,
      kode_barang: 'BRS001',
      nama: 'Beras Premium',
      jenis: 'Beras',
      kategori: 'Pangan',
      satuan: 'Kg',
      harga_beli: 12000,
      harga_jual: 15000,
      stok: 250,
      stokMin: 50,
      stokMaks: 500,
      lokasi_gudang: 'Gudang A',
      deskripsi: 'Beras berkualitas tinggi dari petani lokal'
    },
    {
      id: 2,
      kode_barang: 'BRS002',
      nama: 'Beras Medium',
      jenis: 'Beras',
      kategori: 'Pangan',
      satuan: 'Kg',
      harga_beli: 9000,
      harga_jual: 12000,
      stok: 180,
      stokMin: 30,
      stokMaks: 400,
      lokasi_gudang: 'Gudang A',
      deskripsi: 'Beras kualitas sedang dengan harga terjangkau'
    },
    {
      id: 3,
      kode_barang: 'GBH001',
      nama: 'Gabah Kering Grade A',
      jenis: 'Gabah',
      kategori: 'Bahan Baku',
      satuan: 'Kg',
      harga_beli: 6000,
      harga_jual: 8000,
      stok: 500,
      stokMin: 100,
      stokMaks: 1000,
      lokasi_gudang: 'Gudang B',
      deskripsi: 'Gabah hasil panen langsung dari petani'
    },
    {
      id: 4,
      kode_barang: 'GBH002',
      nama: 'Gabah Basah',
      jenis: 'Gabah',
      kategori: 'Bahan Baku',
      satuan: 'Kg',
      harga_beli: 4000,
      harga_jual: 6000,
      stok: 300,
      stokMin: 50,
      stokMaks: 600,
      lokasi_gudang: 'Gudang B',
      deskripsi: 'Gabah segar yang perlu dikeringkan'
    }
  ]);

  const filteredBarang = barang.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.kode_barang.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterJenis === '' || item.jenis === filterJenis;
    return matchesSearch && matchesFilter;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateKodeBarang = (jenis: string) => {
    const prefix = jenis === 'Beras' ? 'BRS' : 'GBH';
    const count = barang.filter(item => item.jenis === jenis).length + 1;
    return `${prefix}${count.toString().padStart(3, '0')}`;
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setFormData({
      kode_barang: '',
      nama: '',
      jenis: '',
      kategori: '',
      satuan: 'Kg',
      harga_beli: '',
      harga_jual: '',
      stok_minimum: '',
      stok_maksimum: '',
      lokasi_gudang: 'Gudang A',
      deskripsi: ''
    });
    setShowAddModal(true);
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setFormData({
      kode_barang: item.kode_barang,
      nama: item.nama,
      jenis: item.jenis,
      kategori: item.kategori,
      satuan: item.satuan,
      harga_beli: item.harga_beli.toString(),
      harga_jual: item.harga_jual.toString(),
      stok_minimum: item.stokMin.toString(),
      stok_maksimum: item.stokMaks.toString(),
      lokasi_gudang: item.lokasi_gudang,
      deskripsi: item.deskripsi
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.jenis || !formData.harga_beli || !formData.harga_jual) {
      alert('Mohon lengkapi semua field yang wajib diisi!');
      return;
    }

    const newItem = {
      id: editingItem ? editingItem.id : barang.length + 1,
      kode_barang: formData.kode_barang || generateKodeBarang(formData.jenis),
      nama: formData.nama,
      jenis: formData.jenis,
      kategori: formData.jenis === 'Beras' ? 'Pangan' : 'Bahan Baku',
      satuan: formData.satuan,
      harga_beli: parseInt(formData.harga_beli),
      harga_jual: parseInt(formData.harga_jual),
      stok: editingItem ? editingItem.stok : 0,
      stokMin: parseInt(formData.stok_minimum),
      stokMaks: parseInt(formData.stok_maksimum),
      lokasi_gudang: formData.lokasi_gudang,
      deskripsi: formData.deskripsi
    };

    if (editingItem) {
      setBarang(prev => prev.map(item => item.id === editingItem.id ? newItem : item));
    } else {
      setBarang(prev => [...prev, newItem]);
    }

    setShowAddModal(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
      setBarang(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Barang</h1>
          <p className="text-gray-600">Kelola data barang dan inventaris</p>
        </div>
        <button
          onClick={handleAddItem}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Barang</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Barang</p>
              <p className="text-2xl font-bold text-gray-900">{barang.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stok Tersedia</p>
              <p className="text-2xl font-bold text-gray-900">{barang.reduce((sum, item) => sum + item.stok, 0)} Kg</p>
            </div>
            <Package className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stok Menipis</p>
              <p className="text-2xl font-bold text-gray-900">{barang.filter(item => item.stok <= item.stokMin).length}</p>
            </div>
            <Package className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nilai Inventaris</p>
              <p className="text-2xl font-bold text-gray-900">Rp {(barang.reduce((sum, item) => sum + (item.stok * item.harga_beli), 0) / 1000000).toFixed(1)}M</p>
            </div>
            <Package className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari nama barang atau kode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={filterJenis}
              onChange={(e) => setFilterJenis(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Semua Jenis</option>
              <option value="Beras">Beras</option>
              <option value="Gabah">Gabah</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Daftar Barang ({filteredBarang.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Kode</th>
                <th className="text-left p-4 font-medium text-gray-600">Nama Barang</th>
                <th className="text-left p-4 font-medium text-gray-600">Jenis</th>
                <th className="text-left p-4 font-medium text-gray-600">Harga Beli</th>
                <th className="text-left p-4 font-medium text-gray-600">Harga Jual</th>
                <th className="text-left p-4 font-medium text-gray-600">Stok</th>
                <th className="text-left p-4 font-medium text-gray-600">Status</th>
                <th className="text-left p-4 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBarang.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{item.kode_barang}</span>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{item.nama}</div>
                    <div className="text-sm text-gray-500">{item.deskripsi}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      item.jenis === 'Beras' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.jenis}
                    </span>
                  </td>
                  <td className="p-4 text-gray-900">Rp {item.harga_beli.toLocaleString('id-ID')}</td>
                  <td className="p-4 font-medium text-gray-900">Rp {item.harga_jual.toLocaleString('id-ID')}</td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{item.stok} {item.satuan}</div>
                    <div className="text-sm text-gray-500">Min: {item.stokMin} {item.satuan}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      item.stok > item.stokMin ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.stok > item.stokMin ? 'Tersedia' : 'Stok Menipis'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="text-green-600 hover:text-green-800 p-1"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingItem ? 'Edit Barang' : 'Tambah Barang Baru'}
              </h3>
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
                    Kode Barang <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="kode_barang"
                    value={formData.kode_barang}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Otomatis jika kosong"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Barang <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Masukkan nama barang"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jenis"
                    value={formData.jenis}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih jenis</option>
                    <option value="Beras">Beras</option>
                    <option value="Gabah">Gabah</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Satuan</label>
                  <select
                    name="satuan"
                    value={formData.satuan}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Kg">Kilogram (Kg)</option>
                    <option value="Ton">Ton</option>
                    <option value="Karung">Karung</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Harga Beli <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="harga_beli"
                    value={formData.harga_beli}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Masukkan harga beli"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Harga Jual <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="harga_jual"
                    value={formData.harga_jual}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Masukkan harga jual"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stok Minimum</label>
                  <input
                    type="number"
                    name="stok_minimum"
                    value={formData.stok_minimum}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Masukkan stok minimum"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stok Maksimum</label>
                  <input
                    type="number"
                    name="stok_maksimum"
                    value={formData.stok_maksimum}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Masukkan stok maksimum"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi Gudang</label>
                <select
                  name="lokasi_gudang"
                  value={formData.lokasi_gudang}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Gudang A">Gudang A</option>
                  <option value="Gudang B">Gudang B</option>
                  <option value="Gudang C">Gudang C</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Masukkan deskripsi barang"
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
                  {editingItem ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataBarang;