'use client';

import { ReactNode } from 'react';

interface StatusBadgeProps {
  status: 'available' | 'rented' | 'maintenance' | 'active' | 'inactive' | 'suspended' | 'pending' | 'paid' | 'overdue';
  children: ReactNode;
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const styles = {
    available: 'bg-green-100 text-green-700 border-green-200',
    rented: 'bg-blue-100 text-blue-700 border-blue-200',
    maintenance: 'bg-orange-100 text-orange-700 border-orange-200',
    active: 'bg-green-100 text-green-700 border-green-200',
    inactive: 'bg-gray-100 text-gray-700 border-gray-200',
    suspended: 'bg-red-100 text-red-700 border-red-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    paid: 'bg-green-100 text-green-700 border-green-200',
    overdue: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {children}
    </span>
  );
}

// Export default também para compatibilidade
export default StatusBadge;
