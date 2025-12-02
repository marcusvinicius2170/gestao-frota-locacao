// Tipos de usuário
export type UserRole = 'admin' | 'locatario';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

// Mock de usuários para demonstração
// Em produção, isso viria de um banco de dados
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@luvi.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin'
  },
  {
    id: '2',
    email: 'locador@luvi.com',
    password: 'locador123',
    name: 'Locador Principal',
    role: 'admin'
  },
  {
    id: '3',
    email: 'motorista@luvi.com',
    password: 'motorista123',
    name: 'João Silva',
    role: 'locatario'
  },
  {
    id: '4',
    email: 'locatario@luvi.com',
    password: 'locatario123',
    name: 'Maria Santos',
    role: 'locatario'
  }
];

// Função para autenticar usuário
export function authenticateUser(email: string, password: string): User | null {
  const user = mockUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  
  return user || null;
}

// Função para obter rota de redirecionamento baseada no role
export function getRedirectPath(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'locatario':
      return '/tenant/dashboard';
    default:
      return '/';
  }
}

// Função para salvar usuário no localStorage (sessão simples)
export function saveUserSession(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('currentUser', JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }));
  }
}

// Função para obter usuário da sessão
export function getUserSession(): Omit<User, 'password'> | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
}

// Função para fazer logout
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('currentUser');
  }
}
