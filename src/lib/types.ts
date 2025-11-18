// Types para o Sistema de Gestão de Frota

export type UserRole = 'admin' | 'tenant';

export type VehicleStatus = 'available' | 'rented' | 'maintenance';

export type PaymentStatus = 'pending' | 'paid' | 'overdue';

export type ContractStatus = 'active' | 'inactive' | 'suspended';

export type MaintenanceType = 'oil' | 'tires' | 'electrical' | 'mechanical' | 'other';

export type Platform = 'uber' | '99' | 'other';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId?: string;
  tenantId?: string;
}

export interface Company {
  id: string;
  name: string;
  plan: 'basic' | 'pro' | 'corporate';
}

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  brand: string;
  year: number;
  color: string;
  mileage: number;
  purchaseValue: number;
  weeklyRent: number;
  monthlyRent: number;
  status: VehicleStatus;
  currentTenantId?: string;
  currentTenantName?: string;
  notes?: string;
}

export interface Tenant {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  startDate: string;
  weeklyRent: number;
  depositAmount: number;
  depositBalance: number;
  vehicleId?: string;
  vehiclePlate?: string;
  vehicleModel?: string;
  dueDay: number;
  contractStatus: ContractStatus;
}

export interface Payment {
  id: string;
  tenantId: string;
  tenantName: string;
  weekPeriod: string;
  amountDue: number;
  status: PaymentStatus;
  paymentDate?: string;
  paymentMethod?: string;
  notes?: string;
}

export interface Maintenance {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleModel: string;
  date: string;
  type: MaintenanceType;
  description: string;
  cost: number;
  unavailable: boolean;
}

export interface DriverEarning {
  id: string;
  tenantId: string;
  platform: Platform;
  period: string;
  amount: number;
  notes?: string;
}

export interface KPI {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}
