'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/custom/Sidebar';
import { Header } from '@/components/custom/Header';
import { StatusBadge } from '@/components/custom/StatusBadge';
import { Calendar, Filter } from 'lucide-react';

interface TenantPayment {
  id: string;
  weekStart: string;
  weekEnd: string;
  amountDue: string;
  amountPaid?: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentDate?: string;
}

// Função para formatar data de forma consistente (evita hydration error)
const formatDate = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00'); // Força timezone local
  return date.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
};

const MOCK_TENANT_PAYMENTS: TenantPayment[] = [
  {
    id: 'PAY001',
    weekStart: '2024-01-01',
    weekEnd: '2024-01-07',
    amountDue: '500',
    amountPaid: '500',
    status: 'paid',
    paymentDate: '2024-01-07',
  },
  {
    id: 'PAY002',
    weekStart: '2024-01-08',
    weekEnd: '2024-01-14',
    amountDue: '500',
    amountPaid: '500',
    status: 'paid',
    paymentDate: '2024-01-14',
  },
  {
    id: 'PAY003',
    weekStart: '2024-01-15',
    weekEnd: '2024-01-21',
    amountDue: '500',
    status: 'pending',
  },
  {
    id: 'PAY004',
    weekStart: '2023-12-25',
    weekEnd: '2023-12-31',
    amountDue: '500',
    status: 'overdue',
  },
];

export default function TenantPaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [payments] = useState<TenantPayment[]>(MOCK_TENANT_PAYMENTS);
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredPayments = payments.filter(payment => {
    const matchesFilter = filterStatus === 'all' || payment.status === filterStatus;
    
    let matchesDate = true;
    if (startDate && endDate) {
      const paymentDate = new Date(payment.weekStart + 'T00:00:00');
      matchesDate = paymentDate >= new Date(startDate + 'T00:00:00') && paymentDate <= new Date(endDate + 'T00:00:00');
    }
    
    return matchesFilter && matchesDate;
  });

  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + parseFloat(p.amountPaid || '0'), 0);

  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + parseFloat(p.amountDue), 0);

  const totalOverdue = payments
    .filter(p => p.status === 'overdue')
    .reduce((sum, p) => sum + parseFloat(p.amountDue), 0);

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      <Sidebar userRole="tenant" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header userName="João Silva" userRole="tenant" onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0A3556] mb-2">Extrato de Pagamentos</h1>
              <p className="text-sm sm:text-base text-gray-600">Acompanhe o histórico dos seus pagamentos semanais</p>
            </div>

            {/* Stats Cards - Mobile First */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Pago</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  R$ {totalPaid.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Pendentes</p>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                  R$ {totalPending.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Atrasados</p>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">
                  R$ {totalOverdue.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>

            {/* Filters - Responsivo */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="all">Todos</option>
                      <option value="paid">Pago</option>
                      <option value="pending">Pendente</option>
                      <option value="overdue">Atrasado</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Inicial
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Final
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Payments Table/Cards - Responsivo */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F7F9FC]">
                    <tr>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Período</th>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Valor Devido</th>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Valor Pago</th>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Data Pagamento</th>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment) => (
                      <tr key={payment.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="py-3 sm:py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <div className="text-xs sm:text-sm">
                              <p className="text-gray-900 font-medium">
                                {formatDate(payment.weekStart)}
                              </p>
                              <p className="text-gray-500">
                                até {formatDate(payment.weekEnd)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 sm:py-4 px-4 sm:px-6">
                          <span className="font-semibold text-gray-900 text-sm sm:text-base">
                            R$ {payment.amountDue}
                          </span>
                        </td>
                        <td className="py-3 sm:py-4 px-4 sm:px-6">
                          <span className="font-semibold text-green-600 text-sm sm:text-base">
                            {payment.amountPaid ? `R$ ${payment.amountPaid}` : '-'}
                          </span>
                        </td>
                        <td className="py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm text-gray-600">
                          {payment.paymentDate 
                            ? formatDate(payment.paymentDate)
                            : '-'}
                        </td>
                        <td className="py-3 sm:py-4 px-4 sm:px-6">
                          <StatusBadge status={payment.status}>
                            {payment.status === 'paid' ? 'Pago' :
                             payment.status === 'pending' ? 'Pendente' : 'Atrasado'}
                          </StatusBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-gray-100">
                {filteredPayments.map((payment) => (
                  <div key={payment.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div className="text-sm">
                            <p className="text-gray-900 font-medium">
                              {formatDate(payment.weekStart)}
                            </p>
                            <p className="text-gray-500 text-xs">
                              até {formatDate(payment.weekEnd)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <StatusBadge status={payment.status}>
                        {payment.status === 'paid' ? 'Pago' :
                         payment.status === 'pending' ? 'Pendente' : 'Atrasado'}
                      </StatusBadge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Valor Devido</p>
                        <p className="text-sm font-semibold text-gray-900">R$ {payment.amountDue}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Valor Pago</p>
                        <p className="text-sm font-semibold text-green-600">
                          {payment.amountPaid ? `R$ ${payment.amountPaid}` : '-'}
                        </p>
                      </div>
                      {payment.paymentDate && (
                        <div className="col-span-2">
                          <p className="text-xs text-gray-500">Data Pagamento</p>
                          <p className="text-sm font-medium text-gray-900">
                            {formatDate(payment.paymentDate)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Empty State */}
            {filteredPayments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm sm:text-base">Nenhum pagamento encontrado</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
