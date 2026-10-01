import React, { useState } from 'react';
import { Cloud, Mail, Lock, Eye, EyeOff, User, Phone, Building, Briefcase, CheckCircle } from 'lucide-react';
import { Input, Btn } from '../components/ui';
import { AppScreen } from '../types';

interface RegisterProps { onNavigate: (s: AppScreen) => void; }

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: 'Mínimo 8 caracteres', ok: password.length >= 8 },
    { label: 'Letra maiúscula', ok: /[A-Z]/.test(password) },
    { label: 'Número', ok: /\d/.test(password) },
    { label: 'Caractere especial', ok: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const colors = ['bg-red-400', 'bg-orange-400', 'bg-amber-400', 'bg-emerald-500'];
  const labels = ['Muito fraca', 'Fraca', 'Moderada', 'Forte'];

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < score ? colors[score - 1] : 'bg-gray-200'}`} />
        ))}
      </div>
      {password && <p className={`text-xs font-medium ${score >= 4 ? 'text-emerald-600' : score >= 2 ? 'text-amber-600' : 'text-red-500'}`}>{labels[Math.max(0, score - 1)]}</p>}
      <div className="grid grid-cols-2 gap-1">
        {checks.map((c) => (
          <div key={c.label} className={`flex items-center gap-1 text-xs ${c.ok ? 'text-emerald-600' : 'text-gray-400'}`}>
            <CheckCircle size={11} className={c.ok ? 'text-emerald-500' : 'text-gray-300'} />
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Register({ onNavigate }: RegisterProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', role: '', password: '', confirm: '', profile: 'producer', terms: false });
  const [showPw, setShowPw] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name) e.name = 'Nome obrigatório';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'E-mail inválido';
    if (!form.company) e.company = 'Empresa obrigatória';
    if (form.password.length < 8) e.password = 'Senha muito curta';
    if (form.password !== form.confirm) e.confirm = 'Senhas não conferem';
    if (!form.terms) e.terms = 'Aceite os termos para continuar';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
  };

  if (success) return (
    <div className="min-h-screen bg-[#F0F4F1] flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-sm w-full">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-emerald-600" />
        </div>
        <h2 className="font-display font-700 text-xl text-gray-900 mb-2">Conta criada com sucesso!</h2>
        <p className="text-sm text-gray-500 mb-6">Verifique seu e-mail para ativar sua conta. Após ativação, você poderá acessar o sistema.</p>
        <Btn className="w-full justify-center" onClick={() => onNavigate('login')}>Ir para o login</Btn>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F4F1] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#2D6A4F] rounded-xl flex items-center justify-center">
              <Cloud size={18} className="text-white" />
            </div>
            <div>
              <div className="font-display font-700 text-gray-900">AgroClima Cloud</div>
              <div className="text-xs text-[#52B788]">Criar nova conta</div>
            </div>
          </div>
          <h1 className="font-display font-700 text-xl text-gray-900">Cadastro de usuário</h1>
          <p className="text-sm text-gray-500">Preencha os dados para criar sua conta.</p>
        </div>

        <div className="px-8 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input label="Nome completo *" placeholder="João da Silva" value={form.name} onChange={(e) => set('name', e.target.value)} leftIcon={<User size={15} />} error={errors.name} />
            </div>
            <Input label="E-mail *" type="email" placeholder="email@empresa.com" value={form.email} onChange={(e) => set('email', e.target.value)} leftIcon={<Mail size={15} />} error={errors.email} />
            <Input label="Telefone" type="tel" placeholder="(87) 99999-9999" value={form.phone} onChange={(e) => set('phone', e.target.value)} leftIcon={<Phone size={15} />} />
            <Input label="Empresa / Fazenda *" placeholder="Fazenda São João" value={form.company} onChange={(e) => set('company', e.target.value)} leftIcon={<Building size={15} />} error={errors.company} />
            <Input label="Cargo" placeholder="Gerente de Produção" value={form.role} onChange={(e) => set('role', e.target.value)} leftIcon={<Briefcase size={15} />} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Perfil de usuário *</label>
            <select value={form.profile} onChange={(e) => set('profile', e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F]">
              <option value="producer">Produtor / Exportador</option>
              <option value="analyst">Analista de Dados</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input label="Senha *" type={showPw ? 'text' : 'password'} placeholder="••••••••" value={form.password}
                onChange={(e) => set('password', e.target.value)} leftIcon={<Lock size={15} />}
                rightElement={<button type="button" onClick={() => setShowPw(!showPw)} className="text-gray-400 hover:text-gray-600">{showPw ? <EyeOff size={14} /> : <Eye size={14} />}</button>}
                error={errors.password}
              />
              <PasswordStrength password={form.password} />
            </div>
            <Input label="Confirmar senha *" type="password" placeholder="••••••••" value={form.confirm}
              onChange={(e) => set('confirm', e.target.value)} leftIcon={<Lock size={15} />} error={errors.confirm} />
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={form.terms} onChange={(e) => set('terms', e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-[#2D6A4F] mt-0.5" />
            <span className="text-sm text-gray-600">
              Li e aceito os{' '}
              <span className="text-[#2D6A4F] font-medium cursor-pointer hover:underline">Termos de Uso</span>{' '}
              e a{' '}
              <span className="text-[#2D6A4F] font-medium cursor-pointer hover:underline">Política de Privacidade</span>.
            </span>
          </label>
          {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}
        </div>

        <div className="px-8 pb-8 flex items-center justify-between">
          <button onClick={() => onNavigate('login')} className="text-sm text-gray-500 hover:text-gray-700">← Já tenho conta</button>
          <Btn size="lg" loading={loading} onClick={handleSubmit}>Criar conta</Btn>
        </div>
      </div>
    </div>
  );
}
