'use client';

import { Bell, Search, User, Menu } from 'lucide-react';

interface HeaderProps {
  userName: string;
  userRole: 'admin' | 'tenant';
  onMenuClick?: () => void;
}

export function Header({ userName, userRole, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Menu Button (Mobile) + Search */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          {/* Botão Menu Mobile */}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          )}

          {/* Search - Oculto em mobile muito pequeno */}
          <div className="hidden sm:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User */}
          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray-200">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-[#374151]">{userName}</p>
              <p className="text-xs text-gray-500">
                {userRole === 'admin' ? 'Administrador' : 'Locatário'}
              </p>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#BBDEFB] rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-[#0A3556]" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Mobile (abaixo do header em telas pequenas) */}
      <div className="sm:hidden mt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
          />
        </div>
      </div>
    </header>
  );
}
