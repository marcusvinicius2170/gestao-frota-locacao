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
      <Sidebar userRole="admin" />
      
      <div className="flex-1 flex flex-col">
        <Header userName="Admin Luvi" userRole="admin" />
        
        <main className="flex-1 p-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#0A3556] mb-2">Gestão de Pagamentos</h1>
              <p className="text-gray-600">Controle todos os pagamentos semanais</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-[#1E88E5] text-white px-6 py-3 rounded-lg hover:bg-[#1976D2] transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Registrar Pagamento
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Total de Pagamentos</p>
              <p className="text-3xl font-bold text-[#0A3556]">{payments.length}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Pagos</p>
              <p className="text-3xl font-bold text-green-600">
                R$ {totalPaid.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Pendentes</p>
              <p className="text-3xl font-bold text-orange-600">
                R$ {totalPending.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Atrasados</p>
              <p className="text-3xl font-bold text-red-600">
                R$ {totalOverdue.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por locatário ou veículo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                >
                  <option value="all">Todos os Status</option>
                  <option value="paid">Pago</option>
                  <option value="pending">Pendente</option>
                  <option value="overdue">Atrasado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F7F9FC]">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Locatário</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Veículo</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Período</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Valor Devido</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Valor Pago</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Data Pagamento</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Método</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <p className="font-medium text-gray-900">{payment.tenantName}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm text-gray-600">
                          {payment.vehiclePlate || '-'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <p className="text-gray-900">
                            {new Date(payment.weekStart).toLocaleDateString('pt-BR')}
                          </p>
                          <p className="text-gray-500">
                            até {new Date(payment.weekEnd).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-gray-900">
                          R$ {payment.amountDue}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-green-600">
                          {payment.amountPaid ? `R$ ${payment.amountPaid}` : '-'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {payment.paymentDate 
                          ? new Date(payment.paymentDate).toLocaleDateString('pt-BR')
                          : '-'}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {payment.paymentMethod || '-'}
                      </td>
                      <td className="py-4 px-6">
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
          </div>
        </main>
      </div>

      {/* Add Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#0A3556] mb-6">Registrar Pagamento</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Locatário *
                  </label>
                  <input
                    type="text"
                    value={newPayment.tenantName}
                    onChange={(e) => setNewPayment({ ...newPayment, tenantName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Forma de Pagamento
                  </label>
                  <select
                    value={newPayment.paymentMethod}
                    onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1976D2] transition-colors shadow-lg"
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
