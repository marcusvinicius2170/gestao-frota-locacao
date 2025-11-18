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
  const [vehicles] = useState<VehicleFinancial[]>(MOCK_FINANCIAL);

  const totalRevenue = vehicles.reduce((sum, v) => sum + v.totalRevenue, 0);
  const totalMaintenance = vehicles.reduce((sum, v) => sum + v.totalMaintenance, 0);
  const totalProfit = vehicles.reduce((sum, v) => sum + v.netProfit, 0);

  const profitableVehicles = vehicles.filter(v => v.netProfit > 0).length;
  const unprofitableVehicles = vehicles.filter(v => v.netProfit < 0).length;

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      <Sidebar userRole="admin" />
      
      <div className="flex-1 flex flex-col">
        <Header userName="Admin Luvi" userRole="admin" />
        
        <main className="flex-1 p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0A3556] mb-2">Análise Financeira</h1>
            <p className="text-gray-600">Resultado financeiro por veículo</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Receita Total</p>
              </div>
              <p className="text-3xl font-bold text-green-600">
                R$ {totalRevenue.toLocaleString('pt-BR')}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-sm text-gray-600">Manutenção Total</p>
              </div>
              <p className="text-3xl font-bold text-red-600">
                R$ {totalMaintenance.toLocaleString('pt-BR')}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  totalProfit >= 0 ? 'bg-blue-100' : 'bg-red-100'
                }`}>
                  <TrendingUp className={`w-5 h-5 ${
                    totalProfit >= 0 ? 'text-blue-600' : 'text-red-600'
                  }`} />
                </div>
                <p className="text-sm text-gray-600">Lucro Líquido</p>
              </div>
              <p className={`text-3xl font-bold ${
                totalProfit >= 0 ? 'text-[#1E88E5]' : 'text-red-600'
              }`}>
                R$ {totalProfit.toLocaleString('pt-BR')}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#BBDEFB] rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#0A3556]" />
                </div>
                <p className="text-sm text-gray-600">Performance</p>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-green-600">{profitableVehicles}</p>
                <p className="text-sm text-gray-500">lucrativos</p>
                <p className="text-2xl font-bold text-red-600">{unprofitableVehicles}</p>
                <p className="text-sm text-gray-500">prejuízo</p>
              </div>
            </div>
          </div>

          {/* Vehicles Financial Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#0A3556]">Resultado por Veículo</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F7F9FC]">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Veículo</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Receita Total</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Manutenção Total</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Lucro Líquido</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-900">{vehicle.plate}</p>
                          <p className="text-sm text-gray-500">{vehicle.model}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-green-600">
                          R$ {vehicle.totalRevenue.toLocaleString('pt-BR')}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-red-600">
                          R$ {vehicle.totalMaintenance.toLocaleString('pt-BR')}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`font-bold text-xl ${
                          vehicle.netProfit >= 0 ? 'text-[#1E88E5]' : 'text-red-600'
                        }`}>
                          R$ {vehicle.netProfit.toLocaleString('pt-BR')}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {vehicle.netProfit >= 0 ? (
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-green-600">Lucrativo</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <TrendingDown className="w-5 h-5 text-red-600" />
                            <span className="text-sm font-medium text-red-600">Prejuízo</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-[#0A3556] mb-6">Gráfico de Performance</h2>
            <div className="h-64 flex items-center justify-center bg-[#F7F9FC] rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Gráfico de barras comparativo</p>
                <p className="text-sm text-gray-400">Receita vs Manutenção por veículo</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
