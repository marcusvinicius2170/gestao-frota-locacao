'use client';

import { Bell, Search, User, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
  userName?: string;
  userRole?: 'admin' | 'tenant';
}

export default function Header({ onMenuClick, userName = 'Usuário', userRole = 'admin' }: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white border-b border-gray-200 px-4 lg:px-8 py-4 z-40">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        {/* Search */}
        <div className="flex-1 max-w-xl ml-4 lg:ml-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User */}
          <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-[#374151]">{userName}</p>
              <p className="text-xs text-gray-500">
                {userRole === 'admin' ? 'Administrador' : 'Locatário'}
              </p>
            </div>
            <div className="w-10 h-10 bg-[#BBDEFB] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[#0A3556]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
