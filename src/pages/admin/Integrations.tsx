import React from 'react';
import { Wifi, Database, BarChart3, Cpu, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { SectionHeader, Card, StatusBadge } from '../../components/ui';

const integrations = [
  {
    id: 'thingspeak',
    name: 'ThingSpeak',
    type: 'API REST / Channel Feeds',
    status: 'online' as const,
    icon: <Wifi size={20} />,
    color: 'bg-blue-100 text-blue-700',
    detail: 'Channel ID: 2847391',
    sync: '09:42:15',
    records: '48.291',
    readKey: '••••••••••••',
  },
  {
    id: 'database',
    name: 'Banco de Dados',
    type: 'PostgreSQL 15 (Cloud)',
    status: 'online' as const,
    icon: <Database size={20} />,
    color: 'bg-emerald-100 text-emerald-700',
    detail: 'Supabase / AWS RDS',
    sync: 'Tempo real',
    records: '48.291',
    readKey: '••••••••••••',
  },
  {
    id: 'market',
    name: 'Serviço de Mercado',
    type: 'API REST (externa)',
    status: 'online' as const,
    icon: <BarChart3 size={20} />,
    color: 'bg-purple-100 text-purple-700',
    detail: 'Preços e demanda',
    sync: '08:00:00',
    records: '1.240',
    readKey: '••••••••••••',
  },
  {
    id: 'processing',
    name: 'Serviço de Processamento',
    type: 'Backend interno',
    status: 'warning' as const,
    icon: <Cpu size={20} />,
    color: 'bg-amber-100 text-amber-700',
    detail: 'Latência: 2,4s (acima do normal)',
    sync: '09:40:00',
    records: '48.291',
    readKey: null,
  },
];

export default function Integrations() {
  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader title="Integrações" subtitle="Status e configuração das integrações do sistema" />

      {/* Data flow diagram */}
      <Card title="Fluxo de Dados — Arquitetura do Sistema">
        <div className="py-4">
          <div className="flex items-center justify-center flex-wrap gap-2">
            {[
              { label: 'ESP32', sub: 'Sensor IoT', color: 'bg-orange-100 border-orange-300 text-orange-800' },
              null,
              { label: 'ThingSpeak', sub: 'Cloud IoT', color: 'bg-blue-100 border-blue-300 text-blue-800' },
              null,
              { label: 'API REST', sub: 'Channel Feeds', color: 'bg-indigo-100 border-indigo-300 text-indigo-800' },
              null,
              { label: 'Processamento', sub: 'Backend/Cloud', color: 'bg-purple-100 border-purple-300 text-purple-800' },
              null,
              { label: 'Banco de Dados', sub: 'PostgreSQL', color: 'bg-emerald-100 border-emerald-300 text-emerald-800' },
              null,
              { label: 'Dashboard', sub: 'AgroClima Cloud', color: 'bg-[#2D6A4F]/10 border-[#2D6A4F]/40 text-[#2D6A4F]' },
            ].map((item, i) =>
              item === null ? (
                <div key={i} className="flex items-center text-gray-400">
                  <ArrowRight size={18} />
                </div>
              ) : (
                <div key={i} className={`border-2 rounded-xl px-4 py-3 text-center min-w-24 ${item.color}`}>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-[10px] opacity-70">{item.sub}</p>
                </div>
              )
            )}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            Os sensores ESP32 enviam dados para o ThingSpeak. A aplicação consome os dados via API REST (Channel Feeds), processa e armazena em banco de dados em nuvem, exibindo no dashboard.
          </p>
        </div>
      </Card>

      {/* Integration cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {integrations.map((intg) => (
          <div key={intg.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${intg.color}`}>
                  {intg.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{intg.name}</h3>
                  <p className="text-xs text-gray-500">{intg.type}</p>
                </div>
              </div>
              <StatusBadge status={intg.status} />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Detalhe</span>
                <span className="font-medium text-gray-800">{intg.detail}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500 flex items-center gap-1"><Clock size={12} /> Última sync</span>
                <span className="font-mono-data font-semibold text-gray-800">{intg.sync}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Registros</span>
                <span className="font-mono-data font-semibold text-gray-800">{intg.records}</span>
              </div>
              {intg.readKey && (
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">Chave API</span>
                  <span className="font-mono-data text-gray-400 text-xs">{intg.readKey}</span>
                </div>
              )}
            </div>

            {intg.status === 'warning' && (
              <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                ⚠ Latência acima do normal. Verifique a capacidade do serviço de processamento.
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Technical indicators */}
      <Card title="Indicadores Técnicos">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Disponibilidade', value: '99,9%', icon: <CheckCircle size={16} className="text-emerald-500" /> },
            { label: 'Tempo médio de consulta', value: '1,8s', icon: <Clock size={16} className="text-blue-500" /> },
            { label: 'Última sincronização ThingSpeak', value: '15s atrás', icon: <Wifi size={16} className="text-blue-500" /> },
            { label: 'Registros no banco', value: '48.291', icon: <Database size={16} className="text-emerald-500" /> },
          ].map((t) => (
            <div key={t.label} className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">{t.icon}</div>
              <p className="font-display font-700 text-xl text-gray-900">{t.value}</p>
              <p className="text-xs text-gray-500 mt-1">{t.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
