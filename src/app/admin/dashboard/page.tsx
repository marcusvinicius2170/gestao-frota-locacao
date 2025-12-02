'use client';

import { useState } from 'react';
import { Header } from '@/components/custom/Header';
import { Sidebar } from '@/components/custom/Sidebar';
import { 
  Car, 
  Users, 
  DollarSign, 
  AlertCircle,
  TrendingUp,
  Calendar,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dados simulados
  const stats = [
    {
      title: 'Total de Veículos',
      value: '24',
      icon: Car,
      color: 'bg-[#1E88E5]',
      change: '+2 este mês'
    },
    {
      title: 'Locatários Ativos',
      value: '18',
      icon: Users,
      color: 'bg-[#0A3556]',
      change: '+3 este mês'
    },
    {
      title: 'Receita do Mês',
      value: 'R$ 45.600',
      icon: DollarSign,
      color: 'bg-[#1E88E5]',
      change: '+12% vs mês anterior'
    },
    {
      title: 'Pagamentos Atrasados',
      value: '3',
      icon: AlertCircle,
      color: 'bg-red-500',
      change: '-2 vs semana anterior'
    }
  ];

  const recentPayments = [
    { id: 1, tenant: 'João Silva', vehicle: 'Fiat Argo - ABC1234', amount: 'R$ 800', status: 'paid', date: '15/01/2025' },
    { id: 2, tenant: 'Maria Santos', vehicle: 'VW Gol - DEF5678', amount: 'R$ 750', status: 'paid', date: '14/01/2025' },
    { id: 3, tenant: 'Pedro Costa', vehicle: 'Chevrolet Onix - GHI9012', amount: 'R$ 850', status: 'pending', date: '13/01/2025' },
    { id: 4, tenant: 'Ana Lima', vehicle: 'Hyundai HB20 - JKL3456', amount: 'R$ 800', status: 'late', date: '10/01/2025' },
  ];

  const vehicleStatus = [
    { status: 'Alugados', count: 18, color: 'bg-[#1E88E5]' },
    { status: 'Disponíveis', count: 4, color: 'bg-green-500' },
    { status: 'Manutenção', count: 2, color: 'bg-orange-500' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      <Sidebar userRole="admin" />
      
      <div className="flex-1 flex flex-col">
        <Header userName="Admin" userRole="admin" />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#0A3556] mb-2">Dashboard</h1>
              <p className="text-gray-600">Visão geral do sistema Luvi Locadora</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-[#0A3556] mb-2">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.change}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Vehicle Status */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-[#0A3556] mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Status da Frota
                </h2>
                <div className="space-y-4">
                  {vehicleStatus.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-gray-700">{item.status}</span>
                      </div>
                      <span className="font-bold text-[#0A3556]">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
                <h2 className="text-xl font-bold text-[#0A3556] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Receita Semanal
                </h2>
                <div className="h-48 flex items-end justify-between gap-2">
                  {[65, 80, 75, 90, 85, 95, 100].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-[#1E88E5] to-[#BBDEFB] rounded-t-lg transition-all hover:opacity-80"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs text-gray-500">S{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Payments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#0A3556] flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Pagamentos Recentes
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F7F9FC]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Locatário
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Veículo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-[#F7F9FC] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{payment.tenant}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{payment.vehicle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{payment.amount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{payment.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {payment.status === 'paid' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3" />
                              Pago
                            </span>
                          )}
                          {payment.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <AlertCircle className="w-3 h-3" />
                              Pendente
                            </span>
                          )}
                          {payment.status === 'late' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <XCircle className="w-3 h-3" />
                              Atrasado
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
