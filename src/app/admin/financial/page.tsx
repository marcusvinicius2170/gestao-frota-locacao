'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/custom/Sidebar';
import { Header } from '@/components/custom/Header';
import { BarChart3, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface VehicleFinancial {
  id: string;
  plate: string;
  model: string;
  totalRevenue: number;
  totalMaintenance: number;
  netProfit: number;
}

const MOCK_FINANCIAL: VehicleFinancial[] = [
  {
    id: 'VEH001',
    plate: 'ABC-1234',
    model: 'Toyota Corolla',
    totalRevenue: 8000,
    totalMaintenance: 1500,
    netProfit: 6500,
  },
  {
    id: 'VEH002',
    plate: 'DEF-5678',
    model: 'Honda Civic',
    totalRevenue: 7200,
    totalMaintenance: 2800,
    netProfit: 4400,
  },
  {
    id: 'VEH003',
    plate: 'GHI-9012',
    model: 'Fiat Uno',
    totalRevenue: 4500,
    totalMaintenance: 5200,
    netProfit: -700,
  },
];

export default function FinancialPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [vehicles] = useState<VehicleFinancial[]>(MOCK_FINANCIAL);

  const totalRevenue = vehicles.reduce((sum, v) => sum + v.totalRevenue, 0);
  const totalMaintenance = vehicles.reduce((sum, v) => sum + v.totalMaintenance, 0);
  const totalProfit = vehicles.reduce((sum, v) => sum + v.netProfit, 0);

  const profitableVehicles = vehicles.filter(v => v.netProfit > 0).length;
  const unprofitableVehicles = vehicles.filter(v => v.netProfit < 0).length;

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      <Sidebar userRole="admin" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header userName="Admin Luvi" userRole="admin" onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0A3556] mb-2">Análise Financeira</h1>
              <p className="text-sm sm:text-base text-gray-600">Resultado financeiro por veículo</p>
            </div>

            {/* Summary Cards - Mobile First */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Receita Total</p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  R$ {totalRevenue.toLocaleString('pt-BR')}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Manutenção Total</p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">
                  R$ {totalMaintenance.toLocaleString('pt-BR')}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    totalProfit >= 0 ? 'bg-blue-100' : 'bg-red-100'
                  }`}>
                    <TrendingUp className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      totalProfit >= 0 ? 'text-blue-600' : 'text-red-600'
                    }`} />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Lucro Líquido</p>
                </div>
                <p className={`text-2xl sm:text-3xl font-bold ${
                  totalProfit >= 0 ? 'text-[#1E88E5]' : 'text-red-600'
                }`}>
                  R$ {totalProfit.toLocaleString('pt-BR')}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#BBDEFB] rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A3556]" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Performance</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-xl sm:text-2xl font-bold text-green-600">{profitableVehicles}</p>
                  <p className="text-xs sm:text-sm text-gray-500">lucrativos</p>
                  <p className="text-xl sm:text-2xl font-bold text-red-600">{unprofitableVehicles}</p>
                  <p className="text-xs sm:text-sm text-gray-500">prejuízo</p>
                </div>
              </div>
            </div>

            {/* Vehicles Financial Table/Cards - Responsivo */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 sm:mb-8">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-base sm:text-xl font-bold text-[#0A3556]">Resultado por Veículo</h2>
              </div>
              
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F7F9FC]">
                    <tr>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Veículo</th>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Receita Total</th>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Manutenção Total</th>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Lucro Líquido</th>
                      <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="py-3 sm:py-4 px-4 sm:px-6">
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{vehicle.plate}</p>
                            <p className="text-xs text-gray-500">{vehicle.model}</p>
                          </div>
                        </td>
                        <td className="py-3 sm:py-4 px-4 sm:px-6">
                          <span className="font-bold text-green-600 text-sm sm:text-base">
                            R$ {vehicle.totalRevenue.toLocaleString('pt-BR')}
                          </span>
                        </td>
                        <td className="py-3 sm:py-4 px-4 sm:px-6">
                          <span className="font-bold text-red-600 text-sm sm:text-base">
                            R$ {vehicle.totalMaintenance.toLocaleString('pt-BR')}
                          </span>
                        </td>
                        <td className="py-3 sm:py-4 px-4 sm:px-6">
                          <span className={`font-bold text-lg sm:text-xl ${
                            vehicle.netProfit >= 0 ? 'text-[#1E88E5]' : 'text-red-600'
                          }`}>
                            R$ {vehicle.netProfit.toLocaleString('pt-BR')}
                          </span>
                        </td>
                        <td className="py-3 sm:py-4 px-4 sm:px-6">
                          {vehicle.netProfit >= 0 ? (
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                              <span className="text-xs sm:text-sm font-medium text-green-600">Lucrativo</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                              <span className="text-xs sm:text-sm font-medium text-red-600">Prejuízo</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden divide-y divide-gray-100">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{vehicle.plate}</p>
                        <p className="text-sm text-gray-500">{vehicle.model}</p>
                      </div>
                      {vehicle.netProfit >= 0 ? (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-medium text-green-600">Lucrativo</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <TrendingDown className="w-4 h-4 text-red-600" />
                          <span className="text-xs font-medium text-red-600">Prejuízo</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Receita Total</p>
                        <p className="text-sm font-bold text-green-600">
                          R$ {vehicle.totalRevenue.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Manutenção Total</p>
                        <p className="text-sm font-bold text-red-600">
                          R$ {vehicle.totalMaintenance.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">Lucro Líquido</p>
                        <p className={`text-lg font-bold ${
                          vehicle.netProfit >= 0 ? 'text-[#1E88E5]' : 'text-red-600'
                        }`}>
                          R$ {vehicle.netProfit.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart Placeholder - Responsivo */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:p-8">
              <h2 className="text-base sm:text-xl font-bold text-[#0A3556] mb-4 sm:mb-6">Gráfico de Performance</h2>
              <div className="h-48 sm:h-64 flex items-center justify-center bg-[#F7F9FC] rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <p className="text-sm sm:text-base text-gray-500">Gráfico de barras comparativo</p>
                  <p className="text-xs sm:text-sm text-gray-400">Receita vs Manutenção por veículo</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
