'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/custom/Sidebar';
import { Header } from '@/components/custom/Header';
import { Car, DollarSign, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

export default function TenantDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data do locatário
  const tenantData = {
    name: 'João Silva',
    vehicle: {
      model: 'Toyota Corolla',
      plate: 'ABC-1234',
      weeklyRent: '500',
    },
    contract: {
      dueDay: 'Segunda-feira',
      depositAmount: 2000,
      depositBalance: 2000,
    },
    payments: {
      totalPaidThisMonth: 2000,
      totalDue: 500,
      overduePayments: 0,
      weeksPaid: 4,
    },
    earnings: {
      thisMonth: 4500,
      lastWeek: 1200,
    },
  };

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      <Sidebar userRole="tenant" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header userName={tenantData.name} userRole="tenant" onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0A3556] mb-2">
                Bem-vindo, {tenantData.name}!
              </h1>
              <p className="text-sm sm:text-base text-gray-600">Acompanhe seus pagamentos e ganhos</p>
            </div>

            {/* Vehicle Info Card - Responsivo */}
            <div className="bg-gradient-to-r from-[#0A3556] to-[#1E88E5] rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 text-white">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Car className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">{tenantData.vehicle.model}</h2>
                  <p className="text-sm sm:text-base text-white/80">Placa: {tenantData.vehicle.plate}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-white/70 text-xs sm:text-sm mb-1">Valor Semanal</p>
                  <p className="text-lg sm:text-xl font-bold">R$ {tenantData.vehicle.weeklyRent}</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs sm:text-sm mb-1">Dia de Vencimento</p>
                  <p className="text-lg sm:text-xl font-bold">{tenantData.contract.dueDay}</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs sm:text-sm mb-1">Saldo Caução</p>
                  <p className="text-lg sm:text-xl font-bold">R$ {tenantData.contract.depositBalance}</p>
                </div>
              </div>
            </div>

            {/* Stats Grid - Mobile First */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Pago no Mês</p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  R$ {tenantData.payments.totalPaidThisMonth}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Em Aberto</p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                  R$ {tenantData.payments.totalDue}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Atrasados</p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">
                  {tenantData.payments.overduePayments}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E88E5]" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Ganhos no Mês</p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-[#1E88E5]">
                  R$ {tenantData.earnings.thisMonth}
                </p>
              </div>
            </div>

            {/* Comparison Card - Responsivo */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-bold text-[#0A3556] mb-4">
                Resumo Financeiro do Mês
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center p-3 sm:p-4 bg-[#F7F9FC] rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">Ganhos Totais</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-600">
                    R$ {tenantData.earnings.thisMonth}
                  </p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-[#F7F9FC] rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">Pagamentos Feitos</p>
                  <p className="text-xl sm:text-2xl font-bold text-red-600">
                    R$ {tenantData.payments.totalPaidThisMonth}
                  </p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-[#F7F9FC] rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">Saldo Líquido</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#1E88E5]">
                    R$ {tenantData.earnings.thisMonth - tenantData.payments.totalPaidThisMonth}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Payments - Responsivo */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
              <h3 className="text-base sm:text-lg font-bold text-[#0A3556] mb-4">
                Últimos Pagamentos
              </h3>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-[#F7F9FC] rounded-lg gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Semana 01/01 - 07/01</p>
                    <p className="text-xs sm:text-sm text-gray-500">Pago em 07/01/2024</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-green-600 text-sm sm:text-base">R$ 500</p>
                    <p className="text-xs text-green-600">✓ Pago</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-[#F7F9FC] rounded-lg gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Semana 08/01 - 14/01</p>
                    <p className="text-xs sm:text-sm text-gray-500">Pago em 14/01/2024</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-green-600 text-sm sm:text-base">R$ 500</p>
                    <p className="text-xs text-green-600">✓ Pago</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-200 gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Semana 15/01 - 21/01</p>
                    <p className="text-xs sm:text-sm text-gray-500">Vencimento: 21/01/2024</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-orange-600 text-sm sm:text-base">R$ 500</p>
                    <p className="text-xs text-orange-600">⏳ Pendente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
