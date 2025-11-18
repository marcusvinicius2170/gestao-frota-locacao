'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/custom/Sidebar';
import { Header } from '@/components/custom/Header';
import { Plus, Search, Filter, Wrench, Calendar } from 'lucide-react';

interface Maintenance {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleModel: string;
  date: string;
  type: string;
  description: string;
  cost: number;
}

const MOCK_MAINTENANCES: Maintenance[] = [
  {
    id: 'MAINT001',
    vehicleId: 'VEH001',
    vehiclePlate: 'ABC-1234',
    vehicleModel: 'Toyota Corolla',
    date: '2024-01-15',
    type: 'Troca de óleo',
    description: 'Troca de óleo e filtro',
    cost: 250,
  },
  {
    id: 'MAINT002',
    vehicleId: 'VEH002',
    vehiclePlate: 'DEF-5678',
    vehicleModel: 'Honda Civic',
    date: '2024-01-10',
    type: 'Pneus',
    description: 'Troca dos 4 pneus',
    cost: 1200,
  },
];

export default function MaintenancePage() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>(MOCK_MAINTENANCES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState({
    vehiclePlate: '',
    vehicleModel: '',
    date: new Date().toISOString().split('T')[0],
    type: 'Troca de óleo',
    description: '',
    cost: '',
  });

  const filteredMaintenances = maintenances.filter(maintenance => {
    const matchesSearch = 
      maintenance.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || maintenance.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const totalCost = maintenances.reduce((sum, m) => sum + m.cost, 0);
  
  const costByVehicle = maintenances.reduce((acc, m) => {
    if (!acc[m.vehiclePlate]) {
      acc[m.vehiclePlate] = { plate: m.vehiclePlate, model: m.vehicleModel, total: 0 };
    }
    acc[m.vehiclePlate].total += m.cost;
    return acc;
  }, {} as Record<string, { plate: string; model: string; total: number }>);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const maintenance: Maintenance = {
      id: `MAINT${String(maintenances.length + 1).padStart(3, '0')}`,
      vehicleId: 'VEH999',
      vehiclePlate: newMaintenance.vehiclePlate,
      vehicleModel: newMaintenance.vehicleModel,
      date: newMaintenance.date,
      type: newMaintenance.type,
      description: newMaintenance.description,
      cost: parseFloat(newMaintenance.cost),
    };

    setMaintenances([...maintenances, maintenance]);
    setShowModal(false);
    
    // Reset form
    setNewMaintenance({
      vehiclePlate: '',
      vehicleModel: '',
      date: new Date().toISOString().split('T')[0],
      type: 'Troca de óleo',
      description: '',
      cost: '',
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
              <h1 className="text-3xl font-bold text-[#0A3556] mb-2">Gestão de Manutenções</h1>
              <p className="text-gray-600">Controle todos os gastos com manutenção da frota</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-[#1E88E5] text-white px-6 py-3 rounded-lg hover:bg-[#1976D2] transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Registrar Manutenção
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Total de Manutenções</p>
              <p className="text-3xl font-bold text-[#0A3556]">{maintenances.length}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Custo Total</p>
              <p className="text-3xl font-bold text-red-600">
                R$ {totalCost.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Média por Manutenção</p>
              <p className="text-3xl font-bold text-[#1E88E5]">
                R$ {maintenances.length > 0 ? (totalCost / maintenances.length).toFixed(2) : '0'}
              </p>
            </div>
          </div>

          {/* Cost by Vehicle */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-[#0A3556] mb-4">Custo por Veículo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.values(costByVehicle).map((vehicle) => (
                <div key={vehicle.plate} className="bg-[#F7F9FC] rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">{vehicle.plate}</p>
                  <p className="text-xs text-gray-500 mb-2">{vehicle.model}</p>
                  <p className="text-xl font-bold text-red-600">
                    R$ {vehicle.total.toLocaleString('pt-BR')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por placa ou modelo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                >
                  <option value="all">Todos os Tipos</option>
                  <option value="Troca de óleo">Troca de óleo</option>
                  <option value="Pneus">Pneus</option>
                  <option value="Freios">Freios</option>
                  <option value="Revisão">Revisão</option>
                  <option value="Elétrica">Elétrica</option>
                  <option value="Suspensão">Suspensão</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>
          </div>

          {/* Maintenances Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F7F9FC]">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Data</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Veículo</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tipo</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Descrição</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Custo</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaintenances.map((maintenance) => (
                    <tr key={maintenance.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {new Date(maintenance.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-900">{maintenance.vehiclePlate}</p>
                          <p className="text-sm text-gray-500">{maintenance.vehicleModel}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-[#1E88E5]" />
                          <span className="text-sm font-medium text-gray-900">
                            {maintenance.type}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-600">{maintenance.description}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-red-600">
                          R$ {maintenance.cost.toLocaleString('pt-BR')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Add Maintenance Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-[#0A3556] mb-6">Registrar Manutenção</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Placa do Veículo *
                  </label>
                  <input
                    type="text"
                    value={newMaintenance.vehiclePlate}
                    onChange={(e) => setNewMaintenance({ ...newMaintenance, vehiclePlate: e.target.value })}
                    placeholder="ABC-1234"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modelo do Veículo *
                  </label>
                  <input
                    type="text"
                    value={newMaintenance.vehicleModel}
                    onChange={(e) => setNewMaintenance({ ...newMaintenance, vehicleModel: e.target.value })}
                    placeholder="Toyota Corolla"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data da Manutenção *
                  </label>
                  <input
                    type="date"
                    value={newMaintenance.date}
                    onChange={(e) => setNewMaintenance({ ...newMaintenance, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Manutenção *
                  </label>
                  <select
                    value={newMaintenance.type}
                    onChange={(e) => setNewMaintenance({ ...newMaintenance, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                    required
                  >
                    <option value="Troca de óleo">Troca de óleo</option>
                    <option value="Pneus">Pneus</option>
                    <option value="Freios">Freios</option>
                    <option value="Revisão">Revisão</option>
                    <option value="Elétrica">Elétrica</option>
                    <option value="Suspensão">Suspensão</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição *
                  </label>
                  <textarea
                    value={newMaintenance.description}
                    onChange={(e) => setNewMaintenance({ ...newMaintenance, description: e.target.value })}
                    rows={3}
                    placeholder="Descreva os detalhes da manutenção..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custo da Manutenção *
                  </label>
                  <input
                    type="number"
                    value={newMaintenance.cost}
                    onChange={(e) => setNewMaintenance({ ...newMaintenance, cost: e.target.value })}
                    placeholder="250.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
                    required
                  />
                </div>
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
                  Salvar Manutenção
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
