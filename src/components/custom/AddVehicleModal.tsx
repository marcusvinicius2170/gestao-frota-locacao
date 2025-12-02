'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Vehicle } from '@/lib/types';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vehicle: Omit<Vehicle, 'id'>) => void;
  tenants: Array<{ id: string; name: string }>;
}

export function AddVehicleModal({ isOpen, onClose, onSave, tenants }: AddVehicleModalProps) {
  const [formData, setFormData] = useState({
    plate: '',
    brand: '',
    model: '',
    color: '',
    year: new Date().getFullYear(),
    mileage: 0,
    purchaseValue: '',
    weeklyRent: '',
    monthlyRent: '',
    currentTenantId: '',
    currentTenantName: '',
    status: 'available' as 'available' | 'rented' | 'maintenance',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const vehicle: Omit<Vehicle, 'id'> = {
      plate: formData.plate,
      brand: formData.brand,
      model: formData.model,
      color: formData.color,
      year: formData.year,
      mileage: formData.mileage,
      purchaseValue: parseFloat(formData.purchaseValue) || 0,
      weeklyRent: parseFloat(formData.weeklyRent),
      monthlyRent: parseFloat(formData.monthlyRent) || parseFloat(formData.weeklyRent) * 4,
      currentTenantId: formData.currentTenantId || undefined,
      currentTenantName: formData.currentTenantName || undefined,
      status: formData.status,
    };

    onSave(vehicle);
    onClose();
    
    // Reset form
    setFormData({
      plate: '',
      brand: '',
      model: '',
      color: '',
      year: new Date().getFullYear(),
      mileage: 0,
      purchaseValue: '',
      weeklyRent: '',
      monthlyRent: '',
      currentTenantId: '',
      currentTenantName: '',
      status: 'available',
    });
  };

  const handleTenantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tenantId = e.target.value;
    const tenant = tenants.find(t => t.id === tenantId);
    setFormData({
      ...formData,
      currentTenantId: tenantId,
      currentTenantName: tenant?.name || '',
      status: tenantId ? 'rented' : 'available',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#0A3556]">Adicionar Novo Veículo</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Placa *
              </label>
              <input
                type="text"
                value={formData.plate}
                onChange={(e) => setFormData({ ...formData, plate: e.target.value.toUpperCase() })}
                placeholder="ABC-1234"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marca *
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="Ex: Toyota, Honda, Fiat"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modelo *
              </label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="Ex: Corolla, Civic, Uno"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor *
              </label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="Ex: Branco, Preto, Prata"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ano *
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                min="1990"
                max={new Date().getFullYear() + 1}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                KM Atual *
              </label>
              <input
                type="number"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor de Compra
              </label>
              <input
                type="number"
                value={formData.purchaseValue}
                onChange={(e) => setFormData({ ...formData, purchaseValue: e.target.value })}
                placeholder="50000"
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor Mensal
              </label>
              <input
                type="number"
                value={formData.monthlyRent}
                onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                placeholder="2000"
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Locatário
              </label>
              <select
                value={formData.currentTenantId}
                onChange={handleTenantChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
              >
                <option value="">Nenhum (Disponível)</option>
                {tenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                required
              >
                <option value="available">Disponível</option>
                <option value="rented">Alugado</option>
                <option value="maintenance">Em Manutenção</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1976D2] transition-colors font-medium shadow-lg"
            >
              Salvar Veículo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
