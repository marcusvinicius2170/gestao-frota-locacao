'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: 'Quantos veículos você possui ou planeja gerenciar?',
      options: [
        { text: '1 a 5 veículos', value: 'start' },
        { text: '6 a 15 veículos', value: 'pro' },
        { text: '16 a 50 veículos', value: 'business' },
        { text: 'Mais de 50 veículos', value: 'enterprise' }
      ]
    },
    {
      question: 'Você precisa de relatórios avançados e controle de manutenção?',
      options: [
        { text: 'Sim, preciso de recursos completos', value: 'advanced' },
        { text: 'Não, apenas o básico', value: 'basic' }
      ]
    },
    {
      question: 'Qual é o seu orçamento mensal aproximado?',
      options: [
        { text: 'Até R$ 50', value: 'low' },
        { text: 'R$ 50 a R$ 150', value: 'medium' },
        { text: 'Mais de R$ 150', value: 'high' }
      ]
    }
  ];

  const handleAnswer = (questionIndex: number, answer: string) => {
    setAnswers({ ...answers, [questionIndex]: answer });
    if (questionIndex < questions.length - 1) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const getRecommendedPlan = () => {
    const vehicleAnswer = answers[0];
    const featureAnswer = answers[1];
    const budgetAnswer = answers[2];

    if (vehicleAnswer === 'start') return 'start';
    if (vehicleAnswer === 'pro' && (featureAnswer === 'advanced' || budgetAnswer === 'medium')) return 'pro';
    if (vehicleAnswer === 'business' || budgetAnswer === 'high') return 'business';
    return 'pro'; // default
  };

  const plans = {
    start: {
      name: 'Start',
      price: 'R$ 29/mês',
      features: ['Até 5 veículos', 'Controle básico', 'Relatórios simples', 'Suporte por email']
    },
    pro: {
      name: 'Pro',
      price: 'R$ 59/mês',
      features: ['Até 15 veículos', 'Relatórios avançados', 'Controle de manutenção', 'Suporte prioritário']
    },
    business: {
      name: 'Business',
      price: 'R$ 149/mês',
      features: ['Até 50 veículos', 'API para integrações', 'Relatórios personalizados', 'Suporte 24/7']
    }
  };

  const recommendedPlan = getRecommendedPlan();
  const plan = plans[recommendedPlan as keyof typeof plans];

  if (showResult) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#0A3556] mb-4">Seu plano recomendado</h1>
            <p className="text-xl text-[#374151]">Baseado nas suas respostas, recomendamos:</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-[#0A3556] mb-2">{plan.name}</h2>
              <div className="text-4xl font-bold text-[#1E88E5] mb-4">{plan.price}</div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-[#374151]">{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full bg-[#1E88E5] text-white py-3 rounded-lg hover:bg-[#1976D2] transition-colors font-semibold">
              Começar teste grátis
            </button>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers({});
                setShowResult(false);
              }}
              className="text-[#1E88E5] hover:underline"
            >
              Refazer quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0A3556] mb-4">Descubra o plano ideal para você</h1>
          <p className="text-xl text-[#374151]">Responda algumas perguntas rápidas</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-[#374151]">Pergunta {currentQuestion + 1} de {questions.length}</span>
              <span className="text-sm text-[#374151]">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#1E88E5] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-[#0A3556] mb-6">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQuestion, option.value)}
                className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-[#1E88E5] hover:bg-[#BBDEFB] transition-colors flex items-center justify-between group"
              >
                <span className="text-[#374151]">{option.text}</span>
                <ArrowRight className="w-5 h-5 text-[#1E88E5] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}