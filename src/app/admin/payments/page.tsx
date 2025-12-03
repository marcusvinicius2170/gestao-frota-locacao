'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/custom/Sidebar';
import { Header } from '@/components/custom/Header';
import { StatusBadge } from '@/components/custom/StatusBadge';
import { Plus, Search, Filter, Calendar, DollarSign } from 'lucide-react';

interface Payment {
  id: string;
  tenantId: string;
  tenantName: string;
  vehiclePlate?: string;
  weekStart: string;
  weekEnd: string;
  amountDue: string;
  amountPaid?: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentDate?: string;
  paymentMethod?: string;
  notes?: string;
}

// Função para formatar data de forma consistente (evita hydration error)
const formatDate = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00'); // Força timezone local
  return date.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
};

const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'PAY001',
    tenantId: 'TEN001',
    tenantName: 'João Silva',
    vehiclePlate: 'ABC-1234',
    weekStart: '2024-01-01',
    weekEnd: '2024-01-07',
    amountDue: '500',
    amountPaid: '500',
    status: 'paid',
    paymentDate: '2024-01-07',
    paymentMethod: 'PIX',
  },
  {
    id: 'PAY002',
    tenantId: 'TEN002',
    tenantName: 'Maria Santos',
    vehiclePlate: 'DEF-5678',
    weekStart: '2024-01-01',
    weekEnd: '2024-01-07',
    amountDue: '450',
    status: 'pending',
  },
  {
    id: 'PAY003',
    tenantId: 'TEN001',
    tenantName: 'João Silva',
    vehiclePlate: 'ABC-1234',
    weekStart: '2023-12-25',
    weekEnd: '2023-12-31',
    amountDue: '500',
    status: 'overdue',
  },
];

export default function PaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [showModal, setShowModal] = useState(false);
  const [newPayment, setNewPayment] = useState({
    tenantName: '',
    vehiclePlate: '',
    weekStart: '',
    weekEnd: '',
    amountDue: '',
    amountPaid: '',
    paymentDate: '',
    paymentMethod: 'PIX',
    notes: '',
  });

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.vehiclePlate?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    const matchesFilter = filterStatus === 'all' || payment.status === filterStatus;
    
    return matchesSearch && matchesFilter;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const payment: Payment = {
      id: `PAY${String(payments.length + 1).padStart(3, '0')}`,
      tenantId: 'TEN999',
      tenantName: newPayment.tenantName,
      vehiclePlate: newPayment.vehiclePlate || undefined,
      weekStart: newPayment.weekStart,
      weekEnd: newPayment.weekEnd,
      amountDue: newPayment.amountDue,
      amountPaid: newPayment.amountPaid || undefined,
      status: newPayment.amountPaid ? 'paid' : 'pending',
      paymentDate: newPayment.paymentDate || undefined,
      paymentMethod: newPayment.paymentMethod || undefined,
      notes: newPayment.notes || undefined,
    };

    setPayments([...payments, payment]);
    setShowModal(false);
    
    // Reset form
    setNewPayment({
      tenantName: '',
      vehiclePlate: '',
      weekStart: '',
      weekEnd: '',
      amountDue: '',
      amountPaid: '',
      paymentDate: '',
      paymentMethod: 'PIX',
      notes: '',
    });
  };

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      <Sidebar userRole="admin" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header userName="Admin Luvi" userRole="admin" onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#0A3556] mb-2">Gestão de Pagamentos</h1>
                <p className="text-sm sm:text-base text-gray-600">Controle todos os pagamentos semanais</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 bg-[#1E88E5] text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-[#1976D2] transition-colors shadow-lg text-sm sm:text-base"
              >
                <Plus className="w-5 h-5" />
                Registrar Pagamento
              </button>
            </div>

            {/* Stats Cards - Mobile First */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Total de Pagamentos</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#0A3556]">{payments.length}</p>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Pagos</p>
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
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por locatário ou veículo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="all">Todos os Status</option>
                    <option value="paid">Pago</option>
                    <option value="pending">Pendente</option>
                    <option value="overdue">Atrasado</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payments Table/Cards - Responsivo */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F7F9FC]">
                    <tr>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Locatário</th>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Veículo</th>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Período</th>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Valor Devido</th>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Valor Pago</th>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Data Pagamento</th>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Método</th>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment) => (
                      <tr key={payment.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="py-3 sm:py-4 px-4 sm:px-6">
                          <p className="font-medium text-gray-900 text-sm sm:text-base">{payment.tenantName}</p>
                        </td>
                        <td className="py-3 sm:py-4 px-4 sm:px-6">
                          <span className="font-mono text-xs sm:text-sm text-gray-600">
                            {payment.vehiclePlate || '-'}
                          </span>
                        </td>
                        <td className="py-3 sm:py-4 px-4 sm:px-6">
                          <div className="text-xs sm:text-sm">
                            <p className="text-gray-900">
                              {formatDate(payment.weekStart)}
                            </p>
                            <p className="text-gray-500">
                              até {formatDate(payment.weekEnd)}
                            </p>
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
                        <td className="py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm text-gray-600">
                          {payment.paymentMethod || '-'}
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
              <div className="lg:hidden divide-y divide-gray-100">
                {filteredPayments.map((payment) => (
                  <div key={payment.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{payment.tenantName}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {payment.vehiclePlate ? `Veículo: ${payment.vehiclePlate}` : 'Sem veículo'}
                        </p>
                      </div>
                      <StatusBadge status={payment.status}>
                        {payment.status === 'paid' ? 'Pago' :
                         payment.status === 'pending' ? 'Pendente' : 'Atrasado'}
                      </StatusBadge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Período</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(payment.weekStart)}
                        </p>
                        <p className="text-xs text-gray-500">
                          até {formatDate(payment.weekEnd)}
                        </p>
                      </div>
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
                        <div>
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
          </div>
        </main>
      </div>

      {/* Add Payment Modal - Responsivo */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 max-w-2xl w-full my-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A3556] mb-4 sm:mb-6">Registrar Pagamento</h2>
            
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Locatário *
                  </label>
                  <input
                    type="text"
                    value={newPayment.tenantName}
                    onChange={(e) => setNewPayment({ ...newPayment, tenantName: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Veículo (Placa)
                  </label>
                  <input
                    type="text"
                    value={newPayment.vehiclePlate}
                    onChange={(e) => setNewPayment({ ...newPayment, vehiclePlate: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Início do Período *
                  </label>
                  <input
                    type="date"
                    value={newPayment.weekStart}
                    onChange={(e) => setNewPayment({ ...newPayment, weekStart: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fim do Período *
                  </label>
                  <input
                    type="date"
                    value={newPayment.weekEnd}
                    onChange={(e) => setNewPayment({ ...newPayment, weekEnd: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor Devido *
                  </label>
                  <input
                    type="text"
                    value={newPayment.amountDue}
                    onChange={(e) => setNewPayment({ ...newPayment, amountDue: e.target.value })}
                    placeholder="500"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor Pago
                  </label>
                  <input
                    type="text"
                    value={newPayment.amountPaid}
                    onChange={(e) => setNewPayment({ ...newPayment, amountPaid: e.target.value })}
                    placeholder="500"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data do Pagamento
                  </label>
                  <input
                    type="date"
                    value={newPayment.paymentDate}
                    onChange={(e) => setNewPayment({ ...newPayment, paymentDate: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Forma de Pagamento
                  </label>
                  <select
                    value={newPayment.paymentMethod}
                    onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-sm sm:text-base"
                  >
                    <option value="PIX">PIX</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Transferência">Transferência</option>
                    <option value="Cartão">Cartão</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações
                </label>
                <textarea
                  value={newPayment.notes}
                  onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] text-sm sm:text-base"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1976D2] transition-colors shadow-lg text-sm sm:text-base"
                >
                  Salvar Pagamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
