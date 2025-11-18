'use client';

import { ReactNode } from 'react';
import { Car, Users, DollarSign, Wrench, BarChart3, Settings, LogOut, LayoutDashboard, Wallet, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  userRole: 'admin' | 'tenant';
}

export function Sidebar({ userRole }: SidebarProps) {
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

  return (
    <aside className="w-64 bg-[#0A3556] min-h-screen text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1E88E5] rounded-lg flex items-center justify-center">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Luvi Locadora</h1>
            <p className="text-xs text-white/60">
              {userRole === 'admin' ? 'Administrador' : 'Locatário'}
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#1E88E5] text-white shadow-lg'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-all w-full">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}
