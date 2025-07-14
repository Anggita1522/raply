import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import KelompokTani from './pages/KelompokTani';
import DataBarang from './pages/DataBarang';
import TransaksiMasuk from './pages/TransaksiMasuk';
import TransaksiKeluar from './pages/TransaksiKeluar';
import StokBarang from './pages/StokBarang';
import LaporanMasuk from './pages/LaporanMasuk';
import LaporanKeluar from './pages/LaporanKeluar';
import Profile from './pages/Profile';

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'kelompok-tani':
        return <KelompokTani />;
      case 'data-barang':
        return <DataBarang />;
      case 'transaksi-masuk':
        return <TransaksiMasuk />;
      case 'transaksi-keluar':
        return <TransaksiKeluar />;
      case 'stok-barang':
        return <StokBarang />;
      case 'laporan-masuk':
        return <LaporanMasuk />;
      case 'laporan-keluar':
        return <LaporanKeluar />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex-1 flex flex-col">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} setActiveMenu={setActiveMenu} />
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;