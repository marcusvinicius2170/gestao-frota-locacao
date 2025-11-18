'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/custom/Sidebar';
import { Header } from '@/components/custom/Header';
import { StatusBadge } from '@/components/custom/StatusBadge';
import { AddTenantModal } from '@/components/custom/AddTenantModal';
import { Plus, Search, Edit, Eye, Phone, Mail } from 'lucide-react';
import { MOCK_TENANTS } from '@/lib/constants';
import { Tenant } from '@/lib/types';

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>(MOCK_TENANTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.cpf.includes(searchTerm) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeTenants = tenants.filter(t => t.contractStatus === 'active').length;
  const suspendedTenants = tenants.filter(t => t.contractStatus === 'suspended').length;
  const totalDeposit = tenants.reduce((sum, t) => sum + t.depositBalance, 0);

  const handleSaveTenant = (newTenant: Omit<Tenant, 'id'>) => {
    const tenant: Tenant = {
      ...newTenant,
      id: `TEN${String(tenants.length + 1).padStart(3, '0')}`,
    };
    setTenants([...tenants, tenant]);
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
              <h1 className="text-3xl font-bold text-[#0A3556] mb-2">Gestão de Locatários</h1>
              <p className="text-gray-600">Gerencie todos os motoristas da sua frota</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-[#1E88E5] text-white px-6 py-3 rounded-lg hover:bg-[#1976D2] transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Adicionar Locatário
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Total</p>
              <p className="text-3xl font-bold text-[#0A3556]">{tenants.length}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Ativos</p>
              <p className="text-3xl font-bold text-green-600">{activeTenants}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Suspensos</p>
              <p className="text-3xl font-bold text-red-600">{suspendedTenants}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Caução Total</p>
              <p className="text-3xl font-bold text-[#0A3556]">
                R$ {totalDeposit.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome, CPF ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
              />
            </div>
          </div>

          {/* Tenants Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTenants.map((tenant) => (
              <div key={tenant.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#0A3556] mb-1">{tenant.name}</h3>
                    <p className="text-sm text-gray-500">{tenant.cpf}</p>
                  </div>
                  <StatusBadge status={tenant.contractStatus}>
                    {tenant.contractStatus === 'active' ? 'Ativo' :
                     tenant.contractStatus === 'inactive' ? 'Inativo' : 'Suspenso'}
                  </StatusBadge>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{tenant.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{tenant.email}</span>
                  </div>
                </div>

                {/* Vehicle Info */}
                {tenant.vehiclePlate && (
                  <div className="bg-[#F7F9FC] rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-600 mb-1">Veículo Vinculado</p>
                    <p className="font-semibold text-[#0A3556]">
                      {tenant.vehiclePlate} - {tenant.vehicleModel}
                    </p>
                  </div>
                )}

                {/* Financial Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Valor Semanal</p>
                    <p className="font-bold text-[#0A3556]">R$ {tenant.weeklyRent}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Saldo Caução</p>
                    <p className="font-bold text-green-600">R$ {tenant.depositBalance}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Data de Início</p>
                    <p className="text-sm text-gray-900">
                      {new Date(tenant.startDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Dia Vencimento</p>
                    <p className="text-sm text-gray-900">
                      {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][tenant.dueDay]}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1976D2] transition-colors">
                    <Eye className="w-4 h-4" />
                    Ver Extrato
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTenants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum locatário encontrado</p>
            </div>
          )}
        </main>
      </div>

      {/* Add Tenant Modal */}
      <AddTenantModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveTenant}
      />
    </div>
  );
}
