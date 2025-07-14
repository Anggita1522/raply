import React, { useState } from 'react';
import { Plus, Users, Edit, Trash2, Eye, X, UserPlus } from 'lucide-react';

const KelompokTani: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddPetaniModal, setShowAddPetaniModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [editingGroup, setEditingGroup] = useState<any>(null);

  const [formData, setFormData] = useState({
    nama: '',
    ketua: '',
    desa: 'Kedungumpul',
    alamat: '',
    telepon: '',
    tahun_berdiri: new Date().getFullYear().toString()
  });

  const [petaniFormData, setPetaniFormData] = useState({
    nama: '',
    nik: '',
    telepon: '',
    alamat: '',
    luas_lahan: '',
    jenis_lahan: 'sawah'
  });

  const [kelompokTani, setKelompokTani] = useState([
    {
      id: 1,
      nama: 'Kelompok Tani Makmur',
      ketua: 'Pak Slamet Riyadi',
      anggota: 15,
      desa: 'Kedungumpul',
      alamat: 'Dusun Krajan RT 01 RW 02',
      telepon: '081234567890',
      tahun_berdiri: 2018,
      totalGabah: '2,500 Kg',
      petani: [
        { id: 1, nama: 'Pak Slamet Riyadi', nik: '3301010101010001', lahan: '2.5 Ha', produksi: '500 Kg', telepon: '081234567890' },
        { id: 2, nama: 'Bu Siti Rahayu', nik: '3301010101010002', lahan: '1.8 Ha', produksi: '400 Kg', telepon: '081234567895' },
        { id: 3, nama: 'Pak Budi Santoso', nik: '3301010101010003', lahan: '1.2 Ha', produksi: '300 Kg', telepon: '081234567896' },
      ]
    },
    {
      id: 2,
      nama: 'Kelompok Tani Sejahtera',
      ketua: 'Pak Joko Susilo',
      anggota: 12,
      desa: 'Kedungumpul',
      alamat: 'Dusun Tengah RT 03 RW 01',
      telepon: '081234567891',
      tahun_berdiri: 2019,
      totalGabah: '1,800 Kg',
      petani: [
        { id: 4, nama: 'Pak Joko Susilo', nik: '3301010101010006', lahan: '2.2 Ha', produksi: '450 Kg', telepon: '081234567891' },
        { id: 5, nama: 'Bu Rini Handayani', nik: '3301010101010007', lahan: '1.6 Ha', produksi: '350 Kg', telepon: '081234567899' },
        { id: 6, nama: 'Pak Bambang Sutopo', nik: '3301010101010008', lahan: '1.4 Ha', produksi: '250 Kg', telepon: '081234567900' },
      ]
    },
    {
      id: 3,
      nama: 'Kelompok Tani Maju',
      ketua: 'Pak Warno Sutrisno',
      anggota: 18,
      desa: 'Kedungumpul',
      alamat: 'Dusun Selatan RT 02 RW 03',
      telepon: '081234567892',
      tahun_berdiri: 2017,
      totalGabah: '3,200 Kg',
      petani: [
        { id: 7, nama: 'Pak Warno Sutrisno', nik: '3301010101010010', lahan: '3.0 Ha', produksi: '600 Kg', telepon: '081234567892' },
        { id: 8, nama: 'Bu Tini Suryani', nik: '3301010101010011', lahan: '2.1 Ha', produksi: '480 Kg', telepon: '081234567902' },
        { id: 9, nama: 'Pak Sutrisno Adi', nik: '3301010101010012', lahan: '1.7 Ha', produksi: '420 Kg', telepon: '081234567903' },
      ]
    }
  ]);

  const tokoMitra = [
    { id: 1, nama: 'Toko Berkah', alamat: 'Jl. Raya Kedungumpul', pemilik: 'Pak Ahmad', pembelian: '500 Kg/bulan' },
    { id: 2, nama: 'Toko Sari Padi', alamat: 'Jl. Pasar Kedungumpul', pemilik: 'Bu Wahyu', pembelian: '400 Kg/bulan' },
    { id: 3, nama: 'Toko Rejeki', alamat: 'Jl. Desa Kedungumpul', pemilik: 'Pak Hadi', pembelian: '300 Kg/bulan' },
    { id: 4, nama: 'Toko Makmur', alamat: 'Jl. Raya Utara', pemilik: 'Bu Susi', pembelian: '350 Kg/bulan' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePetaniInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPetaniFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddGroup = () => {
    setEditingGroup(null);
    setFormData({
      nama: '',
      ketua: '',
      desa: 'Kedungumpul',
      alamat: '',
      telepon: '',
      tahun_berdiri: new Date().getFullYear().toString()
    });
    setShowAddModal(true);
  };

  const handleEditGroup = (group: any) => {
    setEditingGroup(group);
    setFormData({
      nama: group.nama,
      ketua: group.ketua,
      desa: group.desa,
      alamat: group.alamat,
      telepon: group.telepon,
      tahun_berdiri: group.tahun_berdiri.toString()
    });
    setShowAddModal(true);
  };

  const handleSubmitGroup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.ketua) {
      alert('Mohon lengkapi nama kelompok dan ketua!');
      return;
    }

    const newGroup = {
      id: editingGroup ? editingGroup.id : kelompokTani.length + 1,
      nama: formData.nama,
      ketua: formData.ketua,
      anggota: editingGroup ? editingGroup.anggota : 0,
      desa: formData.desa,
      alamat: formData.alamat,
      telepon: formData.telepon,
      tahun_berdiri: parseInt(formData.tahun_berdiri),
      totalGabah: editingGroup ? editingGroup.totalGabah : '0 Kg',
      petani: editingGroup ? editingGroup.petani : []
    };

    if (editingGroup) {
      setKelompokTani(prev => prev.map(group => group.id === editingGroup.id ? newGroup : group));
    } else {
      setKelompokTani(prev => [...prev, newGroup]);
    }

    setShowAddModal(false);
    setEditingGroup(null);
  };

  const handleAddPetani = (kelompokId: number) => {
    setSelectedGroup(kelompokTani.find(g => g.id === kelompokId));
    setPetaniFormData({
      nama: '',
      nik: '',
      telepon: '',
      alamat: '',
      luas_lahan: '',
      jenis_lahan: 'sawah'
    });
    setShowAddPetaniModal(true);
  };

  const handleSubmitPetani = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!petaniFormData.nama || !petaniFormData.nik || !petaniFormData.luas_lahan) {
      alert('Mohon lengkapi data petani yang wajib diisi!');
      return;
    }

    const newPetani = {
      id: Date.now(),
      nama: petaniFormData.nama,
      nik: petaniFormData.nik,
      lahan: `${petaniFormData.luas_lahan} Ha`,
      produksi: '0 Kg',
      telepon: petaniFormData.telepon
    };

    setKelompokTani(prev => prev.map(group => {
      if (group.id === selectedGroup?.id) {
        return {
          ...group,
          petani: [...group.petani, newPetani],
          anggota: group.anggota + 1
        };
      }
      return group;
    }));

    setShowAddPetaniModal(false);
    setSelectedGroup(null);
  };

  const handleDeleteGroup = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus kelompok tani ini?')) {
      setKelompokTani(prev => prev.filter(group => group.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelompok Tani</h1>
          <p className="text-gray-600">Kelola data kelompok tani dan petani mitra</p>
        </div>
        <button
          onClick={handleAddGroup}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kelompok</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Kelompok</p>
              <p className="text-2xl font-bold text-gray-900">{kelompokTani.length}</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Petani</p>
              <p className="text-2xl font-bold text-gray-900">{kelompokTani.reduce((sum, group) => sum + group.anggota, 0)}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Produksi</p>
              <p className="text-2xl font-bold text-gray-900">7,500 Kg</p>
            </div>
            <Users className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Toko Mitra</p>
              <p className="text-2xl font-bold text-gray-900">{tokoMitra.length}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Kelompok Tani Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Daftar Kelompok Tani</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Nama Kelompok</th>
                <th className="text-left p-4 font-medium text-gray-600">Ketua</th>
                <th className="text-left p-4 font-medium text-gray-600">Anggota</th>
                <th className="text-left p-4 font-medium text-gray-600">Tahun Berdiri</th>
                <th className="text-left p-4 font-medium text-gray-600">Total Gabah</th>
                <th className="text-left p-4 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {kelompokTani.map((kelompok) => (
                <tr key={kelompok.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{kelompok.nama}</div>
                    <div className="text-sm text-gray-500">{kelompok.desa}</div>
                  </td>
                  <td className="p-4 text-gray-900">{kelompok.ketua}</td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {kelompok.anggota} petani
                    </span>
                  </td>
                  <td className="p-4 text-gray-900">{kelompok.tahun_berdiri}</td>
                  <td className="p-4 font-medium text-gray-900">{kelompok.totalGabah}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedGroup(kelompok)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAddPetani(kelompok.id)}
                        className="text-purple-600 hover:text-purple-800 p-1"
                        title="Tambah Petani"
                      >
                        <UserPlus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditGroup(kelompok)}
                        className="text-green-600 hover:text-green-800 p-1"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGroup(kelompok.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Hapus"
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

      {/* Toko Mitra */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Toko Mitra</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Nama Toko</th>
                <th className="text-left p-4 font-medium text-gray-600">Pemilik</th>
                <th className="text-left p-4 font-medium text-gray-600">Alamat</th>
                <th className="text-left p-4 font-medium text-gray-600">Pembelian</th>
                <th className="text-left p-4 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tokoMitra.map((toko) => (
                <tr key={toko.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{toko.nama}</td>
                  <td className="p-4 text-gray-900">{toko.pemilik}</td>
                  <td className="p-4 text-gray-600">{toko.alamat}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      {toko.pembelian}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-800 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1">
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

      {/* Add/Edit Kelompok Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingGroup ? 'Edit Kelompok Tani' : 'Tambah Kelompok Tani Baru'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitGroup} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Kelompok <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Masukkan nama kelompok"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ketua Kelompok <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ketua"
                  value={formData.ketua}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Masukkan nama ketua"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Desa</label>
                <select
                  name="desa"
                  value={formData.desa}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Kedungumpul">Kedungumpul</option>
                  <option value="Desa Lain">Desa Lain</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={2}
                  placeholder="Masukkan alamat lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                <input
                  type="tel"
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Masukkan nomor telepon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tahun Berdiri</label>
                <input
                  type="number"
                  name="tahun_berdiri"
                  value={formData.tahun_berdiri}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="2000"
                  max={new Date().getFullYear()}
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
                  {editingGroup ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Petani Modal */}
      {showAddPetaniModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Tambah Petani ke {selectedGroup?.nama}
              </h3>
              <button
                onClick={() => setShowAddPetaniModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitPetani} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Petani <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  value={petaniFormData.nama}
                  onChange={handlePetaniInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Masukkan nama petani"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NIK <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nik"
                  value={petaniFormData.nik}
                  onChange={handlePetaniInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Masukkan NIK"
                  maxLength={16}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                <input
                  type="tel"
                  name="telepon"
                  value={petaniFormData.telepon}
                  onChange={handlePetaniInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Masukkan nomor telepon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                <textarea
                  name="alamat"
                  value={petaniFormData.alamat}
                  onChange={handlePetaniInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={2}
                  placeholder="Masukkan alamat"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Luas Lahan (Ha) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="luas_lahan"
                  value={petaniFormData.luas_lahan}
                  onChange={handlePetaniInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Masukkan luas lahan"
                  step="0.1"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Lahan</label>
                <select
                  name="jenis_lahan"
                  value={petaniFormData.jenis_lahan}
                  onChange={handlePetaniInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="sawah">Sawah</option>
                  <option value="ladang">Ladang</option>
                  <option value="kebun">Kebun</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddPetaniModal(false)}
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Tambah Petani
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedGroup && !showAddPetaniModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Detail {selectedGroup.nama}</h3>
              <button
                onClick={() => setSelectedGroup(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Ketua Kelompok</p>
                  <p className="font-medium text-gray-900">{selectedGroup.ketua}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Jumlah Anggota</p>
                  <p className="font-medium text-gray-900">{selectedGroup.anggota} petani</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Desa</p>
                  <p className="font-medium text-gray-900">{selectedGroup.desa}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tahun Berdiri</p>
                  <p className="font-medium text-gray-900">{selectedGroup.tahun_berdiri}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Alamat</p>
                  <p className="font-medium text-gray-900">{selectedGroup.alamat}</p>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Daftar Petani</h4>
                  <button
                    onClick={() => handleAddPetani(selectedGroup.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center space-x-1"
                  >
                    <UserPlus className="w-3 h-3" />
                    <span>Tambah</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedGroup.petani.map((petani: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{petani.nama}</p>
                        <p className="text-sm text-gray-600">NIK: {petani.nik} • Lahan: {petani.lahan}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{petani.produksi}</p>
                        <p className="text-sm text-gray-600">Produksi</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelompokTani;