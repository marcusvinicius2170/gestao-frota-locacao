import { Vehicle, Tenant, Payment, Maintenance, DriverEarning } from './types';

// Paleta de Cores
export const COLORS = {
  primary: '#0A3556', // Azul Navy
  secondary: '#1E88E5', // Azul médio
  accent: '#BBDEFB', // Azul claro
  background: '#F7F9FC', // Cinza suave
  text: '#374151', // Cinza texto
  white: '#FFFFFF',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
} as const;

// Mock Data - Veículos
export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: '1',
    plate: 'ABC-1234',
    model: 'Onix',
    brand: 'Chevrolet',
    year: 2022,
    color: 'Branco',
    mileage: 45000,
    purchaseValue: 55000,
    weeklyRent: 350,
    monthlyRent: 1400,
    status: 'rented',
    currentTenantId: '1',
    currentTenantName: 'João Silva',
  },
  {
    id: '2',
    plate: 'DEF-5678',
    model: 'HB20',
    brand: 'Hyundai',
    year: 2021,
    color: 'Prata',
    mileage: 52000,
    purchaseValue: 52000,
    weeklyRent: 330,
    monthlyRent: 1320,
    status: 'available',
  },
  {
    id: '3',
    plate: 'GHI-9012',
    model: 'Argo',
    brand: 'Fiat',
    year: 2023,
    color: 'Preto',
    mileage: 28000,
    purchaseValue: 58000,
    weeklyRent: 380,
    monthlyRent: 1520,
    status: 'maintenance',
    notes: 'Troca de óleo agendada',
  },
  {
    id: '4',
    plate: 'JKL-3456',
    model: 'Polo',
    brand: 'Volkswagen',
    year: 2022,
    color: 'Azul',
    mileage: 38000,
    purchaseValue: 62000,
    weeklyRent: 400,
    monthlyRent: 1600,
    status: 'rented',
    currentTenantId: '2',
    currentTenantName: 'Maria Santos',
  },
];

// Mock Data - Locatários
export const MOCK_TENANTS: Tenant[] = [
  {
    id: '1',
    name: 'João Silva',
    rg: '12.345.678-9',
    cpf: '123.456.789-00',
    address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    phone: '(11) 98765-4321',
    email: 'joao.silva@email.com',
    startDate: '2024-01-15',
    weeklyRent: 350,
    depositAmount: 1000,
    depositBalance: 1000,
    vehicleId: '1',
    vehiclePlate: 'ABC-1234',
    vehicleModel: 'Chevrolet Onix 2022',
    dueDay: 1, // Segunda-feira
    contractStatus: 'active',
  },
  {
    id: '2',
    name: 'Maria Santos',
    rg: '98.765.432-1',
    cpf: '987.654.321-00',
    address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
    phone: '(11) 91234-5678',
    email: 'maria.santos@email.com',
    startDate: '2024-02-01',
    weeklyRent: 400,
    depositAmount: 1200,
    depositBalance: 1200,
    vehicleId: '4',
    vehiclePlate: 'JKL-3456',
    vehicleModel: 'Volkswagen Polo 2022',
    dueDay: 3, // Quarta-feira
    contractStatus: 'active',
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    rg: '45.678.912-3',
    cpf: '456.789.123-00',
    address: 'Rua Augusta, 500 - Consolação, São Paulo - SP',
    phone: '(11) 99876-5432',
    email: 'carlos.oliveira@email.com',
    startDate: '2023-11-20',
    weeklyRent: 330,
    depositAmount: 1000,
    depositBalance: 800,
    dueDay: 5, // Sexta-feira
    contractStatus: 'suspended',
  },
];

// Mock Data - Pagamentos
export const MOCK_PAYMENTS: Payment[] = [
  {
    id: '1',
    tenantId: '1',
    tenantName: 'João Silva',
    weekPeriod: '01/01 - 07/01',
    amountDue: 350,
    status: 'paid',
    paymentDate: '2024-01-02',
    paymentMethod: 'PIX',
  },
  {
    id: '2',
    tenantId: '1',
    tenantName: 'João Silva',
    weekPeriod: '08/01 - 14/01',
    amountDue: 350,
    status: 'paid',
    paymentDate: '2024-01-09',
    paymentMethod: 'Dinheiro',
  },
  {
    id: '3',
    tenantId: '2',
    tenantName: 'Maria Santos',
    weekPeriod: '01/01 - 07/01',
    amountDue: 400,
    status: 'paid',
    paymentDate: '2024-01-03',
    paymentMethod: 'PIX',
  },
  {
    id: '4',
    tenantId: '3',
    tenantName: 'Carlos Oliveira',
    weekPeriod: '01/01 - 07/01',
    amountDue: 330,
    status: 'overdue',
  },
  {
    id: '5',
    tenantId: '1',
    tenantName: 'João Silva',
    weekPeriod: '15/01 - 21/01',
    amountDue: 350,
    status: 'pending',
  },
];

// Mock Data - Manutenções
export const MOCK_MAINTENANCES: Maintenance[] = [
  {
    id: '1',
    vehicleId: '1',
    vehiclePlate: 'ABC-1234',
    vehicleModel: 'Chevrolet Onix 2022',
    date: '2024-01-10',
    type: 'oil',
    description: 'Troca de óleo e filtros',
    cost: 280,
    unavailable: false,
  },
  {
    id: '2',
    vehicleId: '3',
    vehiclePlate: 'GHI-9012',
    vehicleModel: 'Fiat Argo 2023',
    date: '2024-01-15',
    type: 'tires',
    description: 'Troca de 2 pneus dianteiros',
    cost: 650,
    unavailable: true,
  },
  {
    id: '3',
    vehicleId: '4',
    vehiclePlate: 'JKL-3456',
    vehicleModel: 'Volkswagen Polo 2022',
    date: '2024-01-05',
    type: 'mechanical',
    description: 'Revisão dos 40.000km',
    cost: 850,
    unavailable: false,
  },
];

// Mock Data - Ganhos do Motorista
export const MOCK_DRIVER_EARNINGS: DriverEarning[] = [
  {
    id: '1',
    tenantId: '1',
    platform: 'uber',
    period: '01/01 - 07/01',
    amount: 1850,
  },
  {
    id: '2',
    tenantId: '1',
    platform: '99',
    period: '01/01 - 07/01',
    amount: 950,
  },
  {
    id: '3',
    tenantId: '1',
    platform: 'uber',
    period: '08/01 - 14/01',
    amount: 2100,
  },
  {
    id: '4',
    tenantId: '1',
    platform: '99',
    period: '08/01 - 14/01',
    amount: 1200,
  },
];

// Tipos de Manutenção
export const MAINTENANCE_TYPES = [
  { value: 'oil', label: 'Troca de Óleo' },
  { value: 'tires', label: 'Pneus' },
  { value: 'electrical', label: 'Elétrica' },
  { value: 'mechanical', label: 'Mecânica' },
  { value: 'other', label: 'Outros' },
] as const;

// Plataformas
export const PLATFORMS = [
  { value: 'uber', label: 'Uber' },
  { value: '99', label: '99' },
  { value: 'other', label: 'Outro' },
] as const;

// Planos SaaS
export const PLANS = [
  {
    id: 'basic',
    name: 'Básico',
    price: 'R$ 97/mês',
    features: [
      'Até 10 veículos',
      'Gestão de locatários',
      'Controle financeiro básico',
      'Suporte por email',
    ],
  },
  {
    id: 'pro',
    name: 'Profissional',
    price: 'R$ 197/mês',
    features: [
      'Até 50 veículos',
      'Todos recursos do Básico',
      'Relatórios avançados',
      'Portal do locatário',
      'Suporte prioritário',
    ],
    popular: true,
  },
  {
    id: 'corporate',
    name: 'Corporativo',
    price: 'Sob consulta',
    features: [
      'Veículos ilimitados',
      'Todos recursos do Pro',
      'API de integração',
      'Múltiplas filiais',
      'Suporte 24/7',
    ],
  },
];
