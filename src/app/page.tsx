'use client';

import { useState } from 'react';
import { 
  CarFront, 
  CheckCircle, 
  Users, 
  CreditCard, 
  Wrench, 
  BarChart3, 
  TrendingUp, 
  Star, 
  ChevronRight, 
  ArrowRight, 
  Menu, 
  X,
  Gauge,
  Calendar,
  DollarSign,
  AlertCircle,
  UserCheck,
  FileText,
  Zap,
  Shield,
  Clock
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const goToQuiz = () => {
    router.push('/quiz');
  };

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Fixo */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <CarFront className="w-8 h-8 text-[#1E88E5]" />
              <span className="ml-2 text-xl font-bold text-[#0A3556]">Luvi Locadora</span>
            </div>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('como-funciona')}
                className="text-[#374151] hover:text-[#1E88E5] transition-colors font-medium"
              >
                Como funciona
              </button>
              <button
                onClick={() => scrollToSection('para-quem')}
                className="text-[#374151] hover:text-[#1E88E5] transition-colors font-medium"
              >
                Para quem é
              </button>
              <button
                onClick={() => scrollToSection('recursos')}
                className="text-[#374151] hover:text-[#1E88E5] transition-colors font-medium"
              >
                Recursos
              </button>
              <button
                onClick={() => scrollToSection('planos')}
                className="text-[#374151] hover:text-[#1E88E5] transition-colors font-medium"
              >
                Planos
              </button>
              <button
                onClick={() => scrollToSection('depoimentos')}
                className="text-[#374151] hover:text-[#1E88E5] transition-colors font-medium"
              >
                Depoimentos
              </button>
            </nav>

            {/* Botões de Ação */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#374151] hover:text-[#1E88E5]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <button
                onClick={goToLogin}
                className="hidden sm:block border-2 border-[#1E88E5] text-[#1E88E5] px-5 py-2 rounded-lg hover:bg-[#1E88E5] hover:text-white transition-all font-semibold"
              >
                Entrar
              </button>

              <button
                onClick={goToQuiz}
                className="bg-[#1E88E5] text-white px-5 py-2 rounded-lg hover:bg-[#0A3556] transition-all font-semibold shadow-md hover:shadow-lg"
              >
                Comece a usar
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => scrollToSection('como-funciona')}
                className="block w-full text-left px-4 py-2 text-[#374151] hover:bg-[#F7F9FC] rounded-lg transition-colors font-medium"
              >
                Como funciona
              </button>
              <button
                onClick={() => scrollToSection('para-quem')}
                className="block w-full text-left px-4 py-2 text-[#374151] hover:bg-[#F7F9FC] rounded-lg transition-colors font-medium"
              >
                Para quem é
              </button>
              <button
                onClick={() => scrollToSection('recursos')}
                className="block w-full text-left px-4 py-2 text-[#374151] hover:bg-[#F7F9FC] rounded-lg transition-colors font-medium"
              >
                Recursos
              </button>
              <button
                onClick={() => scrollToSection('planos')}
                className="block w-full text-left px-4 py-2 text-[#374151] hover:bg-[#F7F9FC] rounded-lg transition-colors font-medium"
              >
                Planos
              </button>
              <button
                onClick={() => scrollToSection('depoimentos')}
                className="block w-full text-left px-4 py-2 text-[#374151] hover:bg-[#F7F9FC] rounded-lg transition-colors font-medium"
              >
                Depoimentos
              </button>
              <button
                onClick={goToLogin}
                className="block w-full text-left px-4 py-2 text-[#1E88E5] border-2 border-[#1E88E5] rounded-lg hover:bg-[#1E88E5] hover:text-white transition-all font-semibold"
              >
                Entrar
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F7F9FC] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Texto */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0A3556] mb-4 sm:mb-6 leading-tight">
                Controle total da sua frota em um único lugar.
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[#374151] mb-6 sm:mb-8 leading-relaxed">
                Gestão de veículos, locatários, pagamentos e manutenção em uma plataforma simples e poderosa para locadoras de todos os tamanhos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={goToQuiz}
                  className="bg-[#1E88E5] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#0A3556] transition-all font-semibold text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  Descubra o melhor plano para você <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToSection('exemplos')}
                  className="border-2 border-[#1E88E5] text-[#1E88E5] px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#1E88E5] hover:text-white transition-all font-semibold text-base sm:text-lg"
                >
                  Ver o sistema por dentro
                </button>
              </div>
            </div>

            {/* Mock Dashboard */}
            <div className="relative">
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Mini Sidebar */}
                <div className="flex">
                  <div className="hidden sm:block w-16 bg-[#0A3556] p-3 space-y-4">
                    <Gauge className="w-6 h-6 text-white mx-auto" />
                    <CarFront className="w-6 h-6 text-[#BBDEFB] mx-auto" />
                    <Users className="w-6 h-6 text-[#BBDEFB] mx-auto" />
                    <CreditCard className="w-6 h-6 text-[#BBDEFB] mx-auto" />
                    <Wrench className="w-6 h-6 text-[#BBDEFB] mx-auto" />
                    <BarChart3 className="w-6 h-6 text-[#BBDEFB] mx-auto" />
                  </div>

                  {/* Dashboard Content */}
                  <div className="flex-1 p-4 sm:p-6">
                    <h3 className="text-lg font-bold text-[#0A3556] mb-4">Dashboard</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-[#F7F9FC] p-4 rounded-lg border border-[#BBDEFB]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-[#374151] font-medium">Veículos Ativos</span>
                          <CarFront className="w-4 h-4 text-[#1E88E5]" />
                        </div>
                        <p className="text-2xl font-bold text-[#0A3556]">24</p>
                      </div>
                      <div className="bg-[#F7F9FC] p-4 rounded-lg border border-[#BBDEFB]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-[#374151] font-medium">Locatários</span>
                          <Users className="w-4 h-4 text-[#1E88E5]" />
                        </div>
                        <p className="text-2xl font-bold text-[#0A3556]">18</p>
                      </div>
                      <div className="bg-[#F7F9FC] p-4 rounded-lg border border-[#BBDEFB] sm:col-span-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-[#374151] font-medium">Receita do Mês</span>
                          <DollarSign className="w-4 h-4 text-[#1E88E5]" />
                        </div>
                        <p className="text-2xl font-bold text-[#0A3556]">R$ 42.850</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A3556] mb-4">Como funciona</h2>
            <p className="text-base sm:text-lg text-[#374151] max-w-2xl mx-auto">
              Três passos simples para transformar a gestão da sua frota
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Passo 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#BBDEFB] rounded-full flex items-center justify-center mx-auto mb-6">
                <UserCheck className="w-8 h-8 text-[#0A3556]" />
              </div>
              <div className="mb-4">
                <span className="inline-block bg-[#1E88E5] text-white text-sm font-bold px-3 py-1 rounded-full mb-3">
                  Passo 1
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#0A3556] mb-3">Cadastre sua frota e locatários</h3>
              <p className="text-[#374151]">
                Adicione seus veículos e clientes em poucos cliques. Todas as informações organizadas em um só lugar.
              </p>
            </div>

            {/* Passo 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#BBDEFB] rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 text-[#0A3556]" />
              </div>
              <div className="mb-4">
                <span className="inline-block bg-[#1E88E5] text-white text-sm font-bold px-3 py-1 rounded-full mb-3">
                  Passo 2
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#0A3556] mb-3">Controle pagamentos semanais e manutenções</h3>
              <p className="text-[#374151]">
                Acompanhe pagamentos, registre manutenções e mantenha tudo sob controle com alertas automáticos.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#BBDEFB] rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-[#0A3556]" />
              </div>
              <div className="mb-4">
                <span className="inline-block bg-[#1E88E5] text-white text-sm font-bold px-3 py-1 rounded-full mb-3">
                  Passo 3
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#0A3556] mb-3">Veja o lucro de cada veículo em tempo real</h3>
              <p className="text-[#374151]">
                Relatórios completos mostram exatamente quanto cada carro está gerando de lucro para você.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Para Quem É */}
      <section id="para-quem" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A3556] mb-4">Para quem é a Luvi Locadora</h2>
            <p className="text-base sm:text-lg text-[#374151] max-w-2xl mx-auto">
              Soluções sob medida para cada tipo de negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border-2 border-[#BBDEFB] hover:border-[#1E88E5] transition-all">
              <div className="w-12 h-12 bg-[#BBDEFB] rounded-lg flex items-center justify-center mb-4">
                <CarFront className="w-6 h-6 text-[#0A3556]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A3556] mb-3">Pessoas com 1 a 5 veículos</h3>
              <p className="text-[#374151] mb-4">
                Você aluga carros por aplicativos e precisa organizar ganhos, despesas e manutenções de forma simples.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Controle financeiro básico</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Alertas de manutenção</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Relatórios simples</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border-2 border-[#1E88E5] hover:shadow-xl transition-all relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1E88E5] text-white text-xs font-bold px-4 py-1 rounded-full">
                MAIS POPULAR
              </div>
              <div className="w-12 h-12 bg-[#1E88E5] rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A3556] mb-3">Pequenas locadoras até 50 veículos</h3>
              <p className="text-[#374151] mb-4">
                Sua locadora está crescendo e você precisa de controle profissional sem complicação.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Gestão completa de contratos</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Controle de pagamentos semanais</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Relatórios financeiros avançados</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border-2 border-[#BBDEFB] hover:border-[#1E88E5] transition-all">
              <div className="w-12 h-12 bg-[#BBDEFB] rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-[#0A3556]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A3556] mb-3">Empresas que precisam de controle financeiro</h3>
              <p className="text-[#374151] mb-4">
                Você precisa de relatórios claros, análise de lucro por veículo e visão estratégica do negócio.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Dashboard executivo</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Análise de rentabilidade</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Exportação de dados</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Exemplos do Sistema */}
      <section id="exemplos" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A3556] mb-4">Exemplos reais do sistema</h2>
            <p className="text-base sm:text-lg text-[#374151] max-w-2xl mx-auto">
              Veja como a Luvi Locadora funciona na prática
            </p>
          </div>

          <div className="space-y-12 lg:space-y-16">
            {/* Exemplo 1: Dashboard Admin */}
            <div className="bg-gradient-to-br from-[#F7F9FC] to-white p-6 sm:p-8 rounded-2xl shadow-xl border border-[#BBDEFB]">
              <h3 className="text-2xl font-bold text-[#0A3556] mb-6 flex items-center gap-3">
                <Gauge className="w-7 h-7 text-[#1E88E5]" />
                Dashboard Administrativo
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-5 rounded-lg shadow-md border border-[#BBDEFB]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#374151] font-medium">Veículos Ativos</span>
                    <CarFront className="w-5 h-5 text-[#1E88E5]" />
                  </div>
                  <p className="text-3xl font-bold text-[#0A3556]">24</p>
                  <p className="text-xs text-green-600 mt-1">↑ 12% vs mês anterior</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md border border-[#BBDEFB]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#374151] font-medium">Em Manutenção</span>
                    <Wrench className="w-5 h-5 text-[#1E88E5]" />
                  </div>
                  <p className="text-3xl font-bold text-[#0A3556]">3</p>
                  <p className="text-xs text-[#374151] mt-1">Previsão: 2-5 dias</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md border border-[#BBDEFB]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#374151] font-medium">Receita do Mês</span>
                    <DollarSign className="w-5 h-5 text-[#1E88E5]" />
                  </div>
                  <p className="text-3xl font-bold text-[#0A3556]">R$ 42.8k</p>
                  <p className="text-xs text-green-600 mt-1">↑ 8% vs mês anterior</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md border border-[#BBDEFB]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#374151] font-medium">Pagamentos Atrasados</span>
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="text-3xl font-bold text-[#0A3556]">2</p>
                  <p className="text-xs text-red-600 mt-1">Requer atenção</p>
                </div>
              </div>
              {/* Mini Gráfico */}
              <div className="bg-white p-5 rounded-lg shadow-md border border-[#BBDEFB]">
                <h4 className="text-sm font-semibold text-[#374151] mb-4">Receita dos últimos 6 meses</h4>
                <div className="flex items-end justify-between gap-2 h-32">
                  <div className="flex-1 bg-[#BBDEFB] rounded-t" style={{ height: '60%' }}></div>
                  <div className="flex-1 bg-[#BBDEFB] rounded-t" style={{ height: '70%' }}></div>
                  <div className="flex-1 bg-[#BBDEFB] rounded-t" style={{ height: '55%' }}></div>
                  <div className="flex-1 bg-[#BBDEFB] rounded-t" style={{ height: '80%' }}></div>
                  <div className="flex-1 bg-[#BBDEFB] rounded-t" style={{ height: '75%' }}></div>
                  <div className="flex-1 bg-[#1E88E5] rounded-t" style={{ height: '90%' }}></div>
                </div>
              </div>
            </div>

            {/* Exemplo 2: Tabela de Veículos */}
            <div className="bg-gradient-to-br from-[#F7F9FC] to-white p-6 sm:p-8 rounded-2xl shadow-xl border border-[#BBDEFB]">
              <h3 className="text-2xl font-bold text-[#0A3556] mb-6 flex items-center gap-3">
                <CarFront className="w-7 h-7 text-[#1E88E5]" />
                Gestão de Veículos
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b-2 border-[#BBDEFB]">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#374151]">Placa</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#374151]">Veículo</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#374151]">Locatário</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#374151]">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#374151]">Valor Semanal</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#374151]">Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-white transition-colors">
                      <td className="py-4 px-4 text-sm text-[#374151] font-medium">ABC-1234</td>
                      <td className="py-4 px-4 text-sm text-[#374151]">Fiat Argo 2023</td>
                      <td className="py-4 px-4 text-sm text-[#374151]">João Silva</td>
                      <td className="py-4 px-4">
                        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                          Ativo
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-[#374151] font-semibold">R$ 450</td>
                      <td className="py-4 px-4">
                        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                          Em dia
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-white transition-colors">
                      <td className="py-4 px-4 text-sm text-[#374151] font-medium">DEF-5678</td>
                      <td className="py-4 px-4 text-sm text-[#374151]">VW Gol 2022</td>
                      <td className="py-4 px-4 text-sm text-[#374151]">Maria Santos</td>
                      <td className="py-4 px-4">
                        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                          Ativo
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-[#374151] font-semibold">R$ 400</td>
                      <td className="py-4 px-4">
                        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                          Em dia
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-white transition-colors">
                      <td className="py-4 px-4 text-sm text-[#374151] font-medium">GHI-9012</td>
                      <td className="py-4 px-4 text-sm text-[#374151]">Hyundai HB20 2023</td>
                      <td className="py-4 px-4 text-sm text-[#374151]">-</td>
                      <td className="py-4 px-4">
                        <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                          Manutenção
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-[#374151] font-semibold">R$ 480</td>
                      <td className="py-4 px-4">
                        <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                          Indisponível
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Exemplo 3: Tela do Locatário */}
            <div className="bg-gradient-to-br from-[#F7F9FC] to-white p-6 sm:p-8 rounded-2xl shadow-xl border border-[#BBDEFB]">
              <h3 className="text-2xl font-bold text-[#0A3556] mb-6 flex items-center gap-3">
                <Users className="w-7 h-7 text-[#1E88E5]" />
                Portal do Locatário
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Card Contrato */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#BBDEFB]">
                  <h4 className="text-lg font-bold text-[#0A3556] mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#1E88E5]" />
                    Meu Contrato
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#374151]">Veículo:</span>
                      <span className="text-sm font-semibold text-[#0A3556]">Fiat Argo 2023</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#374151]">Placa:</span>
                      <span className="text-sm font-semibold text-[#0A3556]">ABC-1234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#374151]">Valor Semanal:</span>
                      <span className="text-sm font-semibold text-[#1E88E5]">R$ 450,00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#374151]">Início:</span>
                      <span className="text-sm font-semibold text-[#0A3556]">01/01/2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#374151]">Status:</span>
                      <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Ativo
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lista de Pagamentos */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-[#BBDEFB]">
                  <h4 className="text-lg font-bold text-[#0A3556] mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#1E88E5]" />
                    Histórico de Pagamentos
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <div>
                        <p className="text-sm font-semibold text-[#0A3556]">Semana 15/01 - 21/01</p>
                        <p className="text-xs text-[#374151]">Pago em 20/01/2024</p>
                      </div>
                      <span className="text-sm font-bold text-green-600">R$ 450</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <div>
                        <p className="text-sm font-semibold text-[#0A3556]">Semana 08/01 - 14/01</p>
                        <p className="text-xs text-[#374151]">Pago em 13/01/2024</p>
                      </div>
                      <span className="text-sm font-bold text-green-600">R$ 450</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div>
                        <p className="text-sm font-semibold text-[#0A3556]">Semana 22/01 - 28/01</p>
                        <p className="text-xs text-[#374151]">Vencimento: 27/01/2024</p>
                      </div>
                      <span className="text-sm font-bold text-yellow-600">Pendente</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section id="recursos" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A3556] mb-4">Recursos completos</h2>
            <p className="text-base sm:text-lg text-[#374151] max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar sua locadora com eficiência
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all border border-[#BBDEFB]">
              <Zap className="w-10 h-10 text-[#1E88E5] mb-4" />
              <h3 className="text-lg font-bold text-[#0A3556] mb-2">Rápido e Intuitivo</h3>
              <p className="text-sm text-[#374151]">Interface simples que você aprende a usar em minutos.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all border border-[#BBDEFB]">
              <Shield className="w-10 h-10 text-[#1E88E5] mb-4" />
              <h3 className="text-lg font-bold text-[#0A3556] mb-2">Seguro e Confiável</h3>
              <p className="text-sm text-[#374151]">Seus dados protegidos com criptografia de ponta.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all border border-[#BBDEFB]">
              <Clock className="w-10 h-10 text-[#1E88E5] mb-4" />
              <h3 className="text-lg font-bold text-[#0A3556] mb-2">Alertas Automáticos</h3>
              <p className="text-sm text-[#374151]">Receba notificações de pagamentos e manutenções.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all border border-[#BBDEFB]">
              <BarChart3 className="w-10 h-10 text-[#1E88E5] mb-4" />
              <h3 className="text-lg font-bold text-[#0A3556] mb-2">Relatórios Detalhados</h3>
              <p className="text-sm text-[#374151]">Análises completas para decisões estratégicas.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all border border-[#BBDEFB]">
              <Users className="w-10 h-10 text-[#1E88E5] mb-4" />
              <h3 className="text-lg font-bold text-[#0A3556] mb-2">Portal do Locatário</h3>
              <p className="text-sm text-[#374151]">Seus clientes acompanham tudo pelo app.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all border border-[#BBDEFB]">
              <TrendingUp className="w-10 h-10 text-[#1E88E5] mb-4" />
              <h3 className="text-lg font-bold text-[#0A3556] mb-2">Análise de Lucro</h3>
              <p className="text-sm text-[#374151]">Saiba exatamente quanto cada veículo rende.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A3556] mb-4">Escolha o plano ideal</h2>
            <p className="text-base sm:text-lg text-[#374151] max-w-2xl mx-auto">
              Planos flexíveis que crescem junto com o seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Plano Start */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-[#BBDEFB] hover:border-[#1E88E5] transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#0A3556] mb-2">Start</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[#1E88E5]">R$ 29</span>
                  <span className="text-[#374151]">/mês</span>
                </div>
                <p className="text-sm text-[#374151]">Até 5 veículos</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Gestão de até 5 veículos</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Controle de locatários</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Registro de pagamentos</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Alertas de manutenção</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Relatórios básicos</span>
                </li>
              </ul>
              <button
                onClick={goToQuiz}
                className="w-full bg-[#1E88E5] text-white py-3 rounded-lg hover:bg-[#0A3556] transition-all font-semibold"
              >
                Descobrir se este plano é para mim
              </button>
            </div>

            {/* Plano Pro */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-2 border-[#1E88E5] hover:shadow-2xl transition-all relative transform md:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1E88E5] text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg">
                RECOMENDADO
              </div>
              <div className="text-center mb-6 mt-2">
                <h3 className="text-2xl font-bold text-[#0A3556] mb-2">Pro</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[#1E88E5]">R$ 59</span>
                  <span className="text-[#374151]">/mês</span>
                </div>
                <p className="text-sm text-[#374151]">Até 15 veículos</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Gestão de até 15 veículos</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Tudo do plano Start</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Portal do locatário</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Relatórios avançados</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Análise de rentabilidade</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
              <button
                onClick={goToQuiz}
                className="w-full bg-[#1E88E5] text-white py-3 rounded-lg hover:bg-[#0A3556] transition-all font-semibold shadow-lg"
              >
                Descobrir se este plano é para mim
              </button>
            </div>

            {/* Plano Business */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-[#BBDEFB] hover:border-[#1E88E5] transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#0A3556] mb-2">Business</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[#1E88E5]">R$ 149</span>
                  <span className="text-[#374151]">/mês</span>
                </div>
                <p className="text-sm text-[#374151]">Até 50 veículos</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Gestão de até 50 veículos</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Tudo do plano Pro</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Dashboard executivo</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Exportação de dados</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>API de integração</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#1E88E5] flex-shrink-0 mt-0.5" />
                  <span>Suporte dedicado</span>
                </li>
              </ul>
              <button
                onClick={goToQuiz}
                className="w-full bg-[#1E88E5] text-white py-3 rounded-lg hover:bg-[#0A3556] transition-all font-semibold"
              >
                Descobrir se este plano é para mim
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A3556] mb-4">O que nossos clientes dizem</h2>
            <p className="text-base sm:text-lg text-[#374151] max-w-2xl mx-auto">
              Histórias reais de quem transformou a gestão da frota
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Depoimento 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-[#BBDEFB]">
              <div className="flex gap-1 mb-4">
                <Star className="w-5 h-5 fill-[#1E88E5] text-[#1E88E5]" />
                <Star className="w-5 h-5 fill-[#1E88E5] text-[#1E88E5]" />
                <Star className="w-5 h-5 fill-[#1E88E5] text-[#1E88E5]" />
                <Star className="w-5 h-5 fill-[#1E88E5] text-[#1E88E5]" />
                <Star className="w-5 h-5 fill-[#1E88E5] text-[#1E88E5]" />
              </div>
              <p className="text-[#374151] mb-6 italic">
                "Parei de controlar tudo em caderno e planilha. Agora tenho tudo organizado e sei exatamente a situação de cada veículo."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#BBDEFB] rounded-full flex items-center justify-center">
                  <span className="text-[#0A3556] font-bold text-lg">J</span>
                </div>
                <div>
                  <p className="font-semibold text-[#0A3556]">João Silva</p>
                  <p className="text-sm text-[#374151]">8 veículos</p>
                </div>
              </div>
            </div>

            {/* Depoimento 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-[#BBDEFB]">
              <div className="flex gap-1 mb-4">
                <Star className="w-5 h-5 fill-[#1E88E5] text-[#1E88E5]" />
                <Star className="w-5 h-5 fill-[#1E88E5] text-[#1E88E5]" />
                <Star className="w-5 h-5 fill-[#1E88E5] text-[#1E88E5]" />
                <Star className="w-5 h-5 fill-[#1E88E5] text-[#1E88E5]" />
                <Star className="w-5 h-5 fill-[#1E88E5] text-[#1E88E5]" />
              </div>
              <p className="text-[#374151] mb-6 italic">
                "Agora sei exatamente quanto cada carro dá de lucro. Isso mudou completamente a forma como tomo decisões no meu negócio."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#BBDEFB] rounded-full flex items-center justify-center">
                  <span className="text-[#0A3556] font-bold text-lg">C</span>
                </div>
                <div>
                  <p className="font-semibold text-[#0A3556]">Carla Mendes</p>
                  <p className="text-sm text-[#374151]">15 veículos</p>
                </div>
              </div>
            </div>

            {/* Depoimento 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-[#BBDEFB]">
              <div className="flex gap-1 mb-4">
                <Star className="w-5 h-5 fill-[#1E88E5] text-[#1E88E5]" />
                <Star className="w-5 h-5 fill-[#1E88E5] text-[#1E88E5]" />
                <Star className="w-5 h-5 fill-[#1E88E5] text-[#1E88E5]" />
                <Star className="w-5 h-5 fill-[#1E88E5] text-[#1E88E5]" />
                <Star className="w-5 h-5 fill-[#1E88E5] text-[#1E88E5]" />
              </div>
              <p className="text-[#374151] mb-6 italic">
                "O sistema me fez crescer como locadora. Consegui organizar tudo e expandir de 10 para 22 veículos em menos de 1 ano."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#BBDEFB] rounded-full flex items-center justify-center">
                  <span className="text-[#0A3556] font-bold text-lg">R</span>
                </div>
                <div>
                  <p className="font-semibold text-[#0A3556]">Rafael Costa</p>
                  <p className="text-sm text-[#374151]">22 veículos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0A3556] to-[#1E88E5]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Pronto para organizar sua frota e parar de perder dinheiro?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-10">
            Descubra em 2 minutos qual plano é perfeito para o seu negócio
          </p>
          <button
            onClick={goToQuiz}
            className="bg-white text-[#1E88E5] px-8 sm:px-12 py-4 sm:py-5 rounded-lg hover:bg-gray-100 transition-all font-bold text-lg sm:text-xl flex items-center justify-center gap-3 mx-auto shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            Fazer o quiz e encontrar meu plano ideal <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A3556] text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center">
              <CarFront className="w-8 h-8 text-[#1E88E5]" />
              <span className="ml-2 text-xl font-bold">Luvi Locadora</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <button
                onClick={() => scrollToSection('como-funciona')}
                className="text-blue-100 hover:text-white transition-colors"
              >
                Como funciona
              </button>
              <button
                onClick={() => scrollToSection('planos')}
                className="text-blue-100 hover:text-white transition-colors"
              >
                Planos
              </button>
              <button
                onClick={goToLogin}
                className="text-blue-100 hover:text-white transition-colors"
              >
                Entrar
              </button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-800 text-center">
            <p className="text-sm text-blue-200">
              &copy; 2024 Luvi Locadora. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
