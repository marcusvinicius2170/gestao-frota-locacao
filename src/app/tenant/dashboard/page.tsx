'use client';

import { Sidebar } from '@/components/custom/Sidebar';
import { Header } from '@/components/custom/Header';
import { Car, DollarSign, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

export default function TenantDashboard() {
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
      <Sidebar userRole="tenant" />
      
      <div className="flex-1 flex flex-col">
        <Header userName={tenantData.name} userRole="tenant" />
        
        <main className="flex-1 p-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0A3556] mb-2">
              Bem-vindo, {tenantData.name}!
            </h1>
            <p className="text-gray-600">Acompanhe seus pagamentos e ganhos</p>
          </div>

          {/* Vehicle Info Card */}
          <div className="bg-gradient-to-r from-[#0A3556] to-[#1E88E5] rounded-xl p-6 mb-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                <Car className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{tenantData.vehicle.model}</h2>
                <p className="text-white/80">Placa: {tenantData.vehicle.plate}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
              <div>
                <p className="text-white/70 text-sm mb-1">Valor Semanal</p>
                <p className="text-xl font-bold">R$ {tenantData.vehicle.weeklyRent}</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Dia de Vencimento</p>
                <p className="text-xl font-bold">{tenantData.contract.dueDay}</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Saldo Caução</p>
                <p className="text-xl font-bold">R$ {tenantData.contract.depositBalance}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Pago no Mês</p>
              </div>
              <p className="text-3xl font-bold text-green-600">
                R$ {tenantData.payments.totalPaidThisMonth}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-sm text-gray-600">Em Aberto</p>
              </div>
              <p className="text-3xl font-bold text-orange-600">
                R$ {tenantData.payments.totalDue}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-sm text-gray-600">Atrasados</p>
              </div>
              <p className="text-3xl font-bold text-red-600">
                {tenantData.payments.overduePayments}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#1E88E5]" />
                </div>
                <p className="text-sm text-gray-600">Ganhos no Mês</p>
              </div>
              <p className="text-3xl font-bold text-[#1E88E5]">
                R$ {tenantData.earnings.thisMonth}
              </p>
            </div>
          </div>

          {/* Comparison Card */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
            <h3 className="text-lg font-bold text-[#0A3556] mb-4">
              Resumo Financeiro do Mês
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-[#F7F9FC] rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Ganhos Totais</p>
                <p className="text-2xl font-bold text-green-600">
                  R$ {tenantData.earnings.thisMonth}
                </p>
              </div>
              <div className="text-center p-4 bg-[#F7F9FC] rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Pagamentos Feitos</p>
                <p className="text-2xl font-bold text-red-600">
                  R$ {tenantData.payments.totalPaidThisMonth}
                </p>
              </div>
              <div className="text-center p-4 bg-[#F7F9FC] rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Saldo Líquido</p>
                <p className="text-2xl font-bold text-[#1E88E5]">
                  R$ {tenantData.earnings.thisMonth - tenantData.payments.totalPaidThisMonth}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-[#0A3556] mb-4">
              Últimos Pagamentos
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-[#F7F9FC] rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Semana 01/01 - 07/01</p>
                  <p className="text-sm text-gray-500">Pago em 07/01/2024</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">R$ 500</p>
                  <p className="text-xs text-green-600">✓ Pago</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#F7F9FC] rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Semana 08/01 - 14/01</p>
                  <p className="text-sm text-gray-500">Pago em 14/01/2024</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">R$ 500</p>
                  <p className="text-xs text-green-600">✓ Pago</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div>
                  <p className="font-medium text-gray-900">Semana 15/01 - 21/01</p>
                  <p className="text-sm text-gray-500">Vencimento: 21/01/2024</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-600">R$ 500</p>
                  <p className="text-xs text-orange-600">⏳ Pendente</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
