'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Tenant } from '@/lib/types';

interface AddTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tenant: Omit<Tenant, 'id'>) => void;
}

export function AddTenantModal({ isOpen, onClose, onSave }: AddTenantModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    rg: '',
    cpf: '',
    address: '',
    phone: '',
    email: '',
    depositAmount: '',
    depositBalance: '',
    weeklyRent: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    contractStatus: 'active' as 'active' | 'inactive' | 'suspended',
    dueDay: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tenant: Omit<Tenant, 'id'> = {
      name: formData.name,
      rg: formData.rg,
      cpf: formData.cpf,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      depositAmount: parseFloat(formData.depositAmount),
      depositBalance: parseFloat(formData.depositBalance || formData.depositAmount),
      weeklyRent: parseFloat(formData.weeklyRent),
      startDate: formData.startDate,
      endDate: formData.endDate || undefined,
      contractStatus: formData.contractStatus,
      dueDay: formData.dueDay,
    };

    onSave(tenant);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      rg: '',
      cpf: '',
      address: '',
      phone: '',
      email: '',
      depositAmount: '',
      depositBalance: '',
      weeklyRent: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      contractStatus: 'active',
      dueDay: 1,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 max-w-4xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A3556]">Adicionar Novo Locatário</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Personal Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-[#0A3556] mb-3 sm:mb-4">Dados Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome completo do locatário"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  RG *
                </label>
                <input
                  type="text"
                  value={formData.rg}
                  onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                  placeholder="00.000.000-0"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPF *
                </label>
                <input
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  placeholder="000.000.000-00"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Rua, número, bairro, cidade - UF"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(00) 00000-0000"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@exemplo.com"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>
            </div>
          </div>

          {/* Financial Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-[#0A3556] mb-3 sm:mb-4">Dados Financeiros</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor da Caução *
                </label>
                <input
                  type="number"
                  value={formData.depositAmount}
                  onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value, depositBalance: e.target.value })}
                  placeholder="1000"
                  step="0.01"
                  min="0"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor Semanal *
                </label>
                <input
                  type="number"
                  value={formData.weeklyRent}
                  onChange={(e) => setFormData({ ...formData, weeklyRent: e.target.value })}
                  placeholder="500"
                  step="0.01"
                  min="0"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dia de Vencimento *
                </label>
                <select
                  value={formData.dueDay}
                  onChange={(e) => setFormData({ ...formData, dueDay: parseInt(e.target.value) })}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                  required
                >
                  <option value={0}>Domingo</option>
                  <option value={1}>Segunda-feira</option>
                  <option value={2}>Terça-feira</option>
                  <option value={3}>Quarta-feira</option>
                  <option value={4}>Quinta-feira</option>
                  <option value={5}>Sexta-feira</option>
                  <option value={6}>Sábado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contract Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-[#0A3556] mb-3 sm:mb-4">Dados do Contrato</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Início *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Fim
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  value={formData.contractStatus}
                  onChange={(e) => setFormData({ ...formData, contractStatus: e.target.value as any })}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                  required
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                  <option value="suspended">Suspenso</option>
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1976D2] transition-colors font-medium shadow-lg text-sm sm:text-base"
            >
              Salvar Locatário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
