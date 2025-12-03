'use client';

import { ReactNode } from 'react';
import { Car, Users, DollarSign, Wrench, BarChart3, Settings, LogOut, LayoutDashboard, Wallet, TrendingUp, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  userRole: 'admin' | 'tenant';
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ userRole, isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Car, label: 'Veículos', href: '/admin/vehicles' },
    { icon: Users, label: 'Locatários', href: '/admin/tenants' },
    { icon: DollarSign, label: 'Pagamentos', href: '/admin/payments' },
    { icon: Wrench, label: 'Manutenções', href: '/admin/maintenance' },
    { icon: BarChart3, label: 'Financeiro', href: '/admin/financial' },
    { icon: Settings, label: 'Planos', href: '/admin/plans' },
  ];

  const tenantMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/tenant/dashboard' },
    { icon: Wallet, label: 'Pagamentos', href: '/tenant/payments' },
    { icon: TrendingUp, label: 'Ganhos', href: '/tenant/earnings' },
    { icon: DollarSign, label: 'Boletos', href: '/tenant/invoices' },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : tenantMenuItems;

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && onClose && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#0A3556] text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-4 sm:p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1E88E5] rounded-lg flex items-center justify-center flex-shrink-0">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-base sm:text-lg">Luvi Locadora</h1>
                <p className="text-xs text-white/60">
                  {userRole === 'admin' ? 'Administrador' : 'Locatário'}
                </p>
              </div>
            </div>
            {/* Botão fechar no mobile */}
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
          <ul className="space-y-1 sm:space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-[#1E88E5] text-white shadow-lg'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-all w-full">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
