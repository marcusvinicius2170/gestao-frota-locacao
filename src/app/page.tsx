'use client';

import { useState } from 'react';
import { Car, Lock, Mail, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'admin' | 'tenant'>('admin');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de login
    if (userType === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/tenant/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A3556] via-[#1E88E5] to-[#0A3556] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-white space-y-6 hidden md:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
              <Car className="w-10 h-10 text-[#0A3556]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Luvi Locadora</h1>
              <p className="text-white/80">Sistema de Gestão de Frota</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-lg">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Gestão Completa</h3>
                <p className="text-white/70">Controle total da sua frota de veículos</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-lg">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Controle Financeiro</h3>
                <p className="text-white/70">Acompanhe pagamentos e receitas em tempo real</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-lg">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Portal do Locatário</h3>
                <p className="text-white/70">Acesso dedicado para seus motoristas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#0A3556] mb-2">Bem-vindo</h2>
            <p className="text-gray-600">Faça login para acessar o sistema</p>
          </div>

          {/* User Type Toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-[#F7F9FC] rounded-lg">
            <button
              type="button"
              onClick={() => setUserType('admin')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                userType === 'admin'
                  ? 'bg-[#1E88E5] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Administrador
            </button>
            <button
              type="button"
              onClick={() => setUserType('tenant')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                userType === 'tenant'
                  ? 'bg-[#1E88E5] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Locatário
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#1E88E5] border-gray-300 rounded focus:ring-[#1E88E5]"
                />
                <span className="text-sm text-gray-600">Lembrar-me</span>
              </label>
              <button type="button" className="text-sm text-[#1E88E5] hover:underline">
                Esqueceu a senha?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1E88E5] text-white py-3 rounded-lg font-medium hover:bg-[#1976D2] transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Entrar
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
