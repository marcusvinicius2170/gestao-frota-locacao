'use client';

import { useState } from 'react';
import { CarFront, CheckCircle, Users, CreditCard, Wrench, BarChart3, TrendingUp, Star, ChevronRight, ArrowRight, Menu, X } from 'lucide-react';
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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <CarFront className="w-8 h-8 text-[#1E88E5]" />
              <span className="ml-2 text-xl font-bold text-[#374151]">Luvi Locadora</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#374151] hover:text-[#1E88E5]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <button
                onClick={goToLogin}
                className="hidden md:block border border-[#1E88E5] text-[#1E88E5] px-4 py-2 rounded-lg hover:bg-[#1E88E5] hover:text-white transition-colors font-medium"
              >
                Entrar
              </button>

              <button
                onClick={goToQuiz}
                className="bg-[#1E88E5] text-white px-6 py-2 rounded-lg hover:bg-[#1976D2] transition-colors font-medium"
              >
                Comece a usar
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-2">
              <button
                onClick={goToLogin}
                className="block w-full text-left px-4 py-2 text-[#1E88E5] border border-[#1E88E5] rounded-lg hover:bg-[#1E88E5] hover:text-white transition-colors font-medium"
              >
                Entrar
              </button>
              <button
                onClick={goToQuiz}
                className="block w-full text-left px-4 py-2 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1976D2] transition-colors font-medium"
              >
                Comece a usar
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#374151] mb-6">
              Sistema de Gestão de Frota <span className="text-[#1E88E5]">Completo</span>
            </h1>
            <p className="text-xl text-[#6B7280] mb-8 max-w-3xl mx-auto">
              Gerencie sua locadora de veículos com eficiência. Controle financeiro, manutenções, locatários e muito mais em uma única plataforma.
            </p>
            <div className="flex justify-center">
              <button
                onClick={goToQuiz}
                className="bg-[#1E88E5] text-white px-8 py-4 rounded-lg hover:bg-[#1976D2] transition-colors font-semibold text-lg flex items-center justify-center gap-2"
              >
                Comece a usar <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#374151] mb-4">Funcionalidades Principais</h2>
            <p className="text-lg text-[#6B7280]">Tudo que você precisa para gerenciar sua locadora</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <CarFront className="w-12 h-12 text-[#1E88E5] mb-4" />
              <h3 className="text-xl font-semibold text-[#374151] mb-2">Gestão de Veículos</h3>
              <p className="text-[#6B7280]">Cadastre e controle todos os seus veículos com detalhes completos.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Users className="w-12 h-12 text-[#1E88E5] mb-4" />
              <h3 className="text-xl font-semibold text-[#374151] mb-2">Controle de Locatários</h3>
              <p className="text-[#6B7280]">Gerencie seus clientes e contratos de locação de forma eficiente.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <CreditCard className="w-12 h-12 text-[#1E88E5] mb-4" />
              <h3 className="text-xl font-semibold text-[#374151] mb-2">Financeiro</h3>
              <p className="text-[#6B7280]">Acompanhe receitas, despesas e lucros da sua locadora.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Wrench className="w-12 h-12 text-[#1E88E5] mb-4" />
              <h3 className="text-xl font-semibold text-[#374151] mb-2">Manutenção</h3>
              <p className="text-[#6B7280]">Controle manutenções preventivas e corretivas dos veículos.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <BarChart3 className="w-12 h-12 text-[#1E88E5] mb-4" />
              <h3 className="text-xl font-semibold text-[#374151] mb-2">Relatórios</h3>
              <p className="text-[#6B7280]">Gere relatórios detalhados para tomada de decisões.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <TrendingUp className="w-12 h-12 text-[#1E88E5] mb-4" />
              <h3 className="text-xl font-semibold text-[#374151] mb-2">Dashboard</h3>
              <p className="text-[#6B7280]">Visualize métricas importantes em tempo real.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1E88E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pronto para começar?</h2>
          <p className="text-xl text-blue-100 mb-8">Junte-se a milhares de locadoras que já confiam no Luvi</p>
          <button
            onClick={goToQuiz}
            className="bg-white text-[#1E88E5] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg flex items-center justify-center gap-2 mx-auto"
          >
            Comece a usar <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#374151] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <CarFront className="w-8 h-8 text-[#1E88E5]" />
              <span className="ml-2 text-xl font-bold">Luvi Locadora</span>
            </div>
            <p className="text-gray-300">&copy; 2024 Luvi Locadora. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}