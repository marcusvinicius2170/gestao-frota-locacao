'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/custom/Sidebar';
import { Header } from '@/components/custom/Header';
import StatusBadge from '@/components/custom/StatusBadge';
import { AddVehicleModal } from '@/components/custom/AddVehicleModal';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import { MOCK_VEHICLES, MOCK_TENANTS } from '@/lib/constants';
import { Vehicle } from '@/lib/types';

export default function VehiclesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'rented' | 'maintenance'>('all');
  const [showModal, setShowModal] = useState(false);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || vehicle.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleSaveVehicle = (newVehicle: Omit<Vehicle, 'id'>) => {
    const vehicle: Vehicle = {
      ...newVehicle,
      id: `VEH${String(vehicles.length + 1).padStart(3, '0')}`,
    };
    setVehicles([...vehicles, vehicle]);
  };

  const tenantsList = MOCK_TENANTS.map(t => ({ id: t.id, name: t.name }));

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      <Sidebar userRole="admin" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header userName="Admin Luvi" userRole="admin" onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0A3556] mb-2">Gestão de Veículos</h1>
              <p className="text-sm sm:text-base text-gray-600">Gerencie todos os veículos da sua frota</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 bg-[#1E88E5] text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-[#1976D2] transition-colors shadow-lg text-sm sm:text-base"
            >
              <Plus className="w-5 h-5" />
              Adicionar Veículo
            </button>
          </div>

          {/* Stats Cards - Mobile First */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Total</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#0A3556]">{vehicles.length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Disponíveis</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {vehicles.filter(v => v.status === 'available').length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Alugados</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#1E88E5]">
                {vehicles.filter(v => v.status === 'rented').length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Manutenção</p>
              <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                {vehicles.filter(v => v.status === 'maintenance').length}
              </p>
            </div>
          </div>

          {/* Filters and Search - Responsivo */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por placa, modelo ou marca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent text-sm sm:text-base"
                >
                  <option value="all">Todos os Status</option>
                  <option value="available">Disponível</option>
                  <option value="rented">Alugado</option>
                  <option value="maintenance">Manutenção</option>
                </select>
              </div>
            </div>
          </div>

          {/* Vehicles Table/Cards - Responsivo */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F7F9FC]">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Placa</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Veículo</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Ano</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">KM</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Valor Semanal</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Locatário</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <span className="font-mono font-semibold text-[#0A3556]">{vehicle.plate}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-900">{vehicle.brand} {vehicle.model}</p>
                          <p className="text-sm text-gray-500">{vehicle.color}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{vehicle.year}</td>
                      <td className="py-4 px-6 text-gray-600">
                        {vehicle.mileage.toLocaleString('pt-BR')} km
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-[#0A3556]">
                          R$ {vehicle.weeklyRent}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {vehicle.currentTenantName || '-'}
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={vehicle.status}>
                          {vehicle.status === 'available' ? 'Disponível' :
                           vehicle.status === 'rented' ? 'Alugado' : 'Manutenção'}
                        </StatusBadge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-[#1E88E5] hover:bg-[#BBDEFB] rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Cards */}
            <div className="lg:hidden divide-y divide-gray-100">
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-[#0A3556]">{vehicle.plate}</span>
                        <StatusBadge status={vehicle.status}>
                          {vehicle.status === 'available' ? 'Disponível' :
                           vehicle.status === 'rented' ? 'Alugado' : 'Manutenção'}
                        </StatusBadge>
                      </div>
                      <p className="font-medium text-gray-900">{vehicle.brand} {vehicle.model}</p>
                      <p className="text-sm text-gray-500">{vehicle.color} • {vehicle.year}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-2 text-[#1E88E5] hover:bg-[#BBDEFB] rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">KM Atual</p>
                      <p className="text-sm font-medium text-gray-900">{vehicle.mileage.toLocaleString('pt-BR')} km</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Valor Semanal</p>
                      <p className="text-sm font-semibold text-[#0A3556]">R$ {vehicle.weeklyRent}</p>
                    </div>
                    {vehicle.currentTenantName && (
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">Locatário</p>
                        <p className="text-sm font-medium text-gray-900">{vehicle.currentTenantName}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum veículo encontrado</p>
            </div>
          )}
        </main>
      </div>

      {/* Add Vehicle Modal */}
      <AddVehicleModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveVehicle}
        tenants={tenantsList}
      />
    </div>
  );
}
