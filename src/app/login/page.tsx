'use client';

import { useState } from 'react';
import { CarFront, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authenticateUser, getRedirectPath, saveUserSession } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulação de delay de rede (remova em produção se não usar API)
    await new Promise(resolve => setTimeout(resolve, 800));

    // Autenticar usuário
    const user = authenticateUser(email, password);

    if (!user) {
      setError('Email ou senha inválidos. Tente novamente.');
      setIsLoading(false);
      return;
    }

    // Salvar sessão do usuário
    saveUserSession(user);

    // Obter rota de redirecionamento baseada no role
    const redirectPath = getRedirectPath(user.role);

    // Redirecionar para o dashboard correto
    setIsLoading(false);
    router.push(redirectPath);
  };

  const goToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo e Título */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center items-center mb-4">
            <CarFront className="w-10 h-10 sm:w-12 sm:h-12 text-[#1E88E5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#374151] mb-2">Luvi Locadora</h1>
          <p className="text-sm sm:text-base text-[#6B7280]">Entre na sua conta para continuar</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
            {/* Mensagem de Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-800 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#374151] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#374151] mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] hover:text-[#374151]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Esqueceu a senha */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 text-[#1E88E5] border-gray-300 rounded focus:ring-[#1E88E5]"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-[#6B7280]">
                  Lembrar-me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-[#1E88E5] hover:text-[#1976D2] font-medium text-left sm:text-right"
              >
                Esqueceu a senha?
              </button>
            </div>

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1E88E5] text-white py-2.5 sm:py-3 rounded-lg hover:bg-[#1976D2] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-5 sm:mt-6 mb-5 sm:mb-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-[#6B7280]">ou</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Criar conta */}
          <div className="text-center">
            <p className="text-sm text-[#6B7280]">
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={goToHome}
                className="text-[#1E88E5] hover:text-[#1976D2] font-medium"
              >
                Comece a usar
              </button>
            </p>
          </div>
        </div>

        {/* Voltar para home */}
        <div className="text-center mt-4 sm:mt-6">
          <button
            onClick={goToHome}
            className="text-sm text-[#6B7280] hover:text-[#374151]"
          >
            ← Voltar para página inicial
          </button>
        </div>

        {/* Credenciais de teste */}
        <div className="mt-6 sm:mt-8 bg-white/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-blue-200">
          <p className="text-xs font-semibold text-[#374151] mb-2">🔐 Credenciais de Teste:</p>
          <div className="space-y-1 text-xs text-[#6B7280]">
            <p><strong>Admin:</strong> admin@luvi.com / admin123</p>
            <p><strong>Locatário:</strong> motorista@luvi.com / motorista123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
