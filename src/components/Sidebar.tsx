import React from 'react';
import { 
  Home, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown, 
  Archive, 
  FileText, 
  FileUp, 
  FileDown,
  Store
} from 'lucide-react';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'kelompok-tani', label: 'Kelompok Tani', icon: Users },
    { id: 'data-barang', label: 'Data Barang', icon: Package },
    { 
      id: 'transaksi', 
      label: 'Transaksi', 
      icon: FileText,
      submenu: [
        { id: 'transaksi-masuk', label: 'Barang Masuk', icon: TrendingUp },
        { id: 'transaksi-keluar', label: 'Barang Keluar', icon: TrendingDown }
      ]
    },
    { 
      id: 'stok', 
      label: 'Stok & Laporan', 
      icon: Archive,
      submenu: [
        { id: 'stok-barang', label: 'Stok Barang', icon: Archive },
        { id: 'laporan-masuk', label: 'Laporan Masuk', icon: FileUp },
        { id: 'laporan-keluar', label: 'Laporan Keluar', icon: FileDown }
      ]
    }
  ];

  const isActiveOrChild = (menuId: string, submenu?: any[]) => {
    if (activeMenu === menuId) return true;
    if (submenu) {
      return submenu.some(item => item.id === activeMenu);
    }
    return false;
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Toko Tentrem</h1>
            <p className="text-sm text-gray-500">Inventaris System</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => setActiveMenu(item.submenu ? item.submenu[0].id : item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                isActiveOrChild(item.id, item.submenu)
                  ? 'bg-green-50 text-green-700 border-l-4 border-green-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
            
            {item.submenu && isActiveOrChild(item.id, item.submenu) && (
              <div className="ml-6 mt-2 space-y-1">
                {item.submenu.map((subItem) => (
                  <button
                    key={subItem.id}
                    onClick={() => setActiveMenu(subItem.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors ${
                      activeMenu === subItem.id
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    <subItem.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{subItem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          © 2024 BUMDes Kedungumpul
        </div>
      </div>
    </div>
  );
};

export default Sidebar;