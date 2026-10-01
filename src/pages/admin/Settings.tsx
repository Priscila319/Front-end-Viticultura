import React, { useState } from 'react';
import { Settings, Building, Bell, Shield, Globe, Moon, Sun, CheckCircle } from 'lucide-react';
import { SectionHeader, Card, Input, Select, Btn, Tabs } from '../../components/ui';

export default function SettingsPage() {
  const [tab, setTab] = useState('empresa');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [saved, setSaved] = useState(false);

  const save = async () => {
    await new Promise((r) => setTimeout(r, 400));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader title="Configurações do Sistema" subtitle="Gerencie as configurações gerais da plataforma AgroClima Cloud" />

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-emerald-800">
          <CheckCircle size={18} className="text-emerald-600" />
          <span className="text-sm font-medium">Configurações salvas com sucesso!</span>
        </div>
      )}

      <Tabs tabs={[
        { id: 'empresa', label: 'Empresa' },
        { id: 'notificacoes', label: 'Notificações' },
        { id: 'seguranca', label: 'Segurança' },
        { id: 'preferencias', label: 'Preferências' },
      ]} active={tab} onChange={setTab} />

      {tab === 'empresa' && (
        <Card title="Dados da Empresa">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input label="Nome da empresa" defaultValue="AgroExport Petrolina Ltda." />
            </div>
            <Input label="CNPJ" defaultValue="12.345.678/0001-90" />
            <Input label="Telefone" defaultValue="(87) 3867-0000" />
            <div className="col-span-2">
              <Input label="Endereço" defaultValue="Rua Agricultor, 100 — Petrolina/PE" />
            </div>
            <Input label="E-mail de contato" type="email" defaultValue="contato@agroexport.com.br" />
            <Input label="Site" defaultValue="www.agroexport.com.br" />
          </div>
          <div className="mt-4 flex justify-end">
            <Btn onClick={save}>Salvar dados da empresa</Btn>
          </div>
        </Card>
      )}

      {tab === 'notificacoes' && (
        <Card title="Configurações de Notificações">
          <div className="space-y-4">
            {[
              { label: 'Alertas climáticos', desc: 'Notificações de temperatura e umidade fora dos limites', default: true },
              { label: 'Janela de colheita', desc: 'Aviso quando uma janela favorável for identificada', default: true },
              { label: 'Alertas de exportação', desc: 'Notificações de oportunidades no mercado', default: true },
              { label: 'Falhas de integração', desc: 'Alertas quando ThingSpeak ou outros serviços falharem', default: true },
              { label: 'Relatórios automáticos', desc: 'Envio automático de relatórios semanais', default: false },
              { label: 'Alertas de segurança', desc: 'Login em dispositivo desconhecido e tentativas suspeitas', default: true },
            ].map((n) => (
              <label key={n.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{n.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
                </div>
                <input type="checkbox" defaultChecked={n.default} className="w-5 h-5 rounded accent-[#2D6A4F]" />
              </label>
            ))}
            <div className="flex justify-end mt-2">
              <Btn onClick={save}>Salvar notificações</Btn>
            </div>
          </div>
        </Card>
      )}

      {tab === 'seguranca' && (
        <div className="space-y-4">
          <Card title="Políticas de Senha">
            <div className="grid grid-cols-2 gap-4">
              <Select label="Comprimento mínimo" value="8" onChange={() => {}} options={[
                { value: '6', label: '6 caracteres' }, { value: '8', label: '8 caracteres' },
                { value: '12', label: '12 caracteres' },
              ]} />
              <Select label="Expiração de senha" value="90" onChange={() => {}} options={[
                { value: '30', label: '30 dias' }, { value: '60', label: '60 dias' },
                { value: '90', label: '90 dias' }, { value: '0', label: 'Nunca' },
              ]} />
              <Select label="Bloqueio após tentativas" value="5" onChange={() => {}} options={[
                { value: '3', label: '3 tentativas' }, { value: '5', label: '5 tentativas' },
                { value: '10', label: '10 tentativas' },
              ]} />
              <Select label="Duração da sessão" value="8" onChange={() => {}} options={[
                { value: '1', label: '1 hora' }, { value: '4', label: '4 horas' },
                { value: '8', label: '8 horas' }, { value: '24', label: '24 horas' },
              ]} />
            </div>
            <div className="mt-4 flex justify-end">
              <Btn onClick={save}>Salvar políticas</Btn>
            </div>
          </Card>
        </div>
      )}

      {tab === 'preferencias' && (
        <div className="space-y-4">
          <Card title="Aparência e Idioma">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Tema da interface</label>
                <div className="flex gap-3">
                  <button onClick={() => setTheme('light')} className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-[#2D6A4F] bg-emerald-50' : 'border-gray-200'}`}>
                    <Sun size={18} className="text-amber-500" />
                    <span className="font-medium text-sm">Claro</span>
                  </button>
                  <button onClick={() => setTheme('dark')} className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-[#2D6A4F] bg-emerald-50' : 'border-gray-200'}`}>
                    <Moon size={18} className="text-blue-700" />
                    <span className="font-medium text-sm">Escuro</span>
                  </button>
                </div>
              </div>
              <Select label="Idioma" value="pt-BR" onChange={() => {}} options={[
                { value: 'pt-BR', label: 'Português (Brasil)' },
                { value: 'en-US', label: 'English (US)' },
                { value: 'es-ES', label: 'Español' },
              ]} />
              <Select label="Fuso horário" value="BRT" onChange={() => {}} options={[
                { value: 'BRT', label: 'BRT (UTC-3) — Brasília' },
                { value: 'UTC', label: 'UTC+0' },
              ]} />
            </div>
            <div className="mt-4 flex justify-end">
              <Btn onClick={save}>Salvar preferências</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
