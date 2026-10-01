import React, { useState } from 'react';
import { Cloud, Mail, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { Input, Btn } from '../components/ui';
import { AppScreen } from '../types';

interface Props { onNavigate: (s: AppScreen) => void; }

export default function ForgotPassword({ onNavigate }: Props) {
  const [step, setStep] = useState<'email' | 'sent' | 'reset' | 'done'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const sendLink = async () => {
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setStep('sent');
  };

  const resetPw = async () => {
    if (!password || password !== confirm) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setStep('done');
  };

  return (
    <div className="min-h-screen bg-[#F0F4F1] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#2D6A4F] rounded-xl flex items-center justify-center">
            <Cloud size={18} className="text-white" />
          </div>
          <div className="font-display font-700 text-gray-900 text-sm">AgroClima Cloud</div>
        </div>

        {step === 'email' && (
          <>
            <h1 className="font-display font-700 text-xl text-gray-900 mb-1">Esqueci minha senha</h1>
            <p className="text-sm text-gray-500 mb-6">Informe seu e-mail para receber o link de recuperação.</p>
            <div className="space-y-4">
              <Input label="E-mail" type="email" placeholder="seuemail@empresa.com.br" value={email} onChange={(e) => setEmail(e.target.value)} leftIcon={<Mail size={15} />} />
              <Btn className="w-full justify-center" loading={loading} onClick={sendLink}>Enviar link de recuperação</Btn>
            </div>
          </>
        )}

        {step === 'sent' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={28} className="text-blue-600" />
            </div>
            <h1 className="font-display font-700 text-xl text-gray-900 mb-2">Link enviado!</h1>
            <p className="text-sm text-gray-500 mb-2">Enviamos um link de recuperação para:</p>
            <p className="font-semibold text-gray-800 mb-6">{email}</p>
            <p className="text-xs text-gray-400 mb-6">Verifique sua caixa de entrada e a pasta de spam. O link expira em 30 minutos.</p>
            <Btn variant="outline" className="w-full justify-center" onClick={() => setStep('reset')}>Já tenho o link — redefinir senha</Btn>
          </div>
        )}

        {step === 'reset' && (
          <>
            <h1 className="font-display font-700 text-xl text-gray-900 mb-1">Nova senha</h1>
            <p className="text-sm text-gray-500 mb-6">Cadastre sua nova senha de acesso.</p>
            <div className="space-y-4">
              <Input label="Nova senha" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} leftIcon={<Lock size={15} />} />
              <Input label="Confirmar nova senha" type="password" placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} leftIcon={<Lock size={15} />} error={confirm && confirm !== password ? 'Senhas não conferem' : undefined} />
              <Btn className="w-full justify-center" loading={loading} onClick={resetPw}>Redefinir senha</Btn>
            </div>
          </>
        )}

        {step === 'done' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-emerald-600" />
            </div>
            <h1 className="font-display font-700 text-xl text-gray-900 mb-2">Senha redefinida!</h1>
            <p className="text-sm text-gray-500 mb-6">Sua senha foi atualizada com sucesso. Faça login com sua nova senha.</p>
            <Btn className="w-full justify-center" onClick={() => onNavigate('login')}>Ir para o login</Btn>
          </div>
        )}

        {step === 'email' && (
          <button onClick={() => onNavigate('login')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mt-4">
            <ArrowLeft size={14} /> Voltar ao login
          </button>
        )}
      </div>
    </div>
  );
}
