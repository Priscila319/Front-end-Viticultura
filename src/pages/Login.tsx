import React, { useState } from 'react';
import { Cloud, Mail, Lock, Eye, EyeOff, Sprout, Wifi, BarChart3, Thermometer } from 'lucide-react';
import { Input, Btn } from '../components/ui';
import { AppScreen } from '../types';

interface LoginProps {
  onLogin: (profile: 'producer' | 'analyst' | 'admin') => void;
  onNavigate: (s: AppScreen) => void;
}

export default function Login({ onLogin, onNavigate }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) { setError('Preencha todos os campos.'); return; }
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    // Demo: pick profile by email
    if (email.includes('analista')) onLogin('analyst');
    else if (email.includes('admin')) onLogin('admin');
    else onLogin('producer');
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 max-w-lg mx-auto w-full">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-11 h-11 bg-[#2D6A4F] rounded-xl flex items-center justify-center shadow-lg">
            <Cloud size={22} className="text-white" />
          </div>
          <div>
            <div className="font-display font-700 text-xl text-gray-900 leading-tight">AgroClima Cloud</div>
            <div className="text-xs text-[#52B788] font-medium">Monitoramento Inteligente</div>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <h1 className="font-display font-700 text-2xl text-gray-900 mb-1">Bem-vindo de volta</h1>
          <p className="text-sm text-gray-500 mb-8">Monitoramento climático e logístico inteligente</p>

          <div className="space-y-4">
            <Input
              label="E-mail"
              type="email"
              placeholder="seuemail@empresa.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={16} />}
            />
            <Input
              label="Senha"
              type={showPw ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={16} />}
              rightElement={
                <button type="button" onClick={() => setShowPw(!showPw)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
          </div>

          {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

          <div className="flex items-center justify-between mt-4 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-[#2D6A4F]"
              />
              <span className="text-sm text-gray-600">Lembrar de mim</span>
            </label>
            <button onClick={() => onNavigate('forgot-password')} className="text-sm text-[#2D6A4F] hover:underline font-medium">
              Esqueci minha senha
            </button>
          </div>

          <Btn size="lg" className="w-full justify-center" loading={loading} onClick={handleLogin}>
            Entrar
          </Btn>

          <p className="text-center text-sm text-gray-500 mt-5">
            Não tem conta?{' '}
            <button onClick={() => onNavigate('register')} className="text-[#2D6A4F] font-semibold hover:underline">
              Criar uma conta
            </button>
          </p>

          {/* Demo hint */}
          <div className="mt-8 p-3 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 text-center font-medium mb-2">Demo rápido — use qualquer senha:</p>
            <div className="space-y-1">
              {[
                { email: 'produtor@fazenda.com', label: 'Produtor/Exportador' },
                { email: 'analista@empresa.com', label: 'Analista de Dados' },
                { email: 'admin@sistema.com', label: 'Administrador' },
              ].map((d) => (
                <button key={d.email} onClick={() => { setEmail(d.email); setPassword('demo123'); }}
                  className="w-full text-left text-xs text-gray-600 hover:text-[#2D6A4F] px-2 py-1 rounded-lg hover:bg-white transition-colors"
                >
                  <span className="font-semibold">{d.label}</span> — {d.email}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1E3A5F] relative overflow-hidden items-center justify-center p-12">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute bottom-10 -left-16 w-48 h-48 bg-[#52B788]/20 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-500/10 rounded-full" />

        <div className="relative z-10 max-w-sm text-center text-white">
          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { icon: <Thermometer size={20} />, label: 'Temperatura', value: '28,4 °C', color: 'bg-orange-500/20 border-orange-400/30' },
              { icon: <Cloud size={20} />, label: 'Umidade', value: '67%', color: 'bg-blue-500/20 border-blue-400/30' },
              { icon: <Sprout size={20} />, label: 'Colheita', value: '3 dias', color: 'bg-emerald-500/20 border-emerald-400/30' },
              { icon: <BarChart3 size={20} />, label: 'Exportação', value: 'Favorável', color: 'bg-purple-500/20 border-purple-400/30' },
            ].map((f) => (
              <div key={f.label} className={`rounded-xl border p-4 text-left ${f.color}`}>
                <div className="mb-2 opacity-80">{f.icon}</div>
                <div className="text-lg font-bold">{f.value}</div>
                <div className="text-xs opacity-70">{f.label}</div>
              </div>
            ))}
          </div>

          {/* Connection indicator */}
          <div className="flex items-center justify-center gap-2 mb-6 bg-white/10 rounded-full px-4 py-2">
            <Wifi size={14} className="text-emerald-400" />
            <span className="text-xs font-mono-data text-emerald-300">ThingSpeak • Conectado</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 status-pulse" />
          </div>

          <h2 className="font-display font-700 text-2xl mb-3">Agricultura de Precisão</h2>
          <p className="text-sm text-emerald-200 leading-relaxed">
            Dados IoT em tempo real, previsões de safra com IA e indicadores de mercado para maximizar sua exportação.
          </p>

          {/* Data flow */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-white/60">
            {['ESP32', 'ThingSpeak', 'Cloud', 'Dashboard'].map((s, i) => (
              <React.Fragment key={s}>
                <span className="bg-white/10 px-2 py-1 rounded-md">{s}</span>
                {i < 3 && <span className="opacity-40">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
