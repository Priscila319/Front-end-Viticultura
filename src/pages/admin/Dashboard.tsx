import React from 'react';
import { Users, UserX, Activity, AlertTriangle, Database, Wifi, CheckCircle, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { StatCard, SectionHeader, Card, StatusBadge } from '../../components/ui';

const accessData = [
  { hora: '00h', acessos: 12, falhas: 1 }, { hora: '03h', acessos: 5, falhas: 0 },
  { hora: '06h', acessos: 28, falhas: 2 }, { hora: '09h', acessos: 64, falhas: 3 },
  { hora: '12h', acessos: 48, falhas: 1 }, { hora: '15h', acessos: 71, falhas: 4 },
  { hora: '18h', acessos: 52, falhas: 2 }, { hora: '21h', acessos: 31, falhas: 1 },
];

const incidentData = [
  { dia: 'Seg', tentativas: 8, bloqueios: 2, incidentes: 1 },
  { dia: 'Ter', tentativas: 12, bloqueios: 3, incidentes: 0 },
  { dia: 'Qua', tentativas: 6, bloqueios: 1, incidentes: 0 },
  { dia: 'Qui', tentativas: 15, bloqueios: 4, incidentes: 2 },
  { dia: 'Sex', tentativas: 9, bloqueios: 2, incidentes: 0 },
  { dia: 'Sáb', tentativas: 4, bloqueios: 0, incidentes: 0 },
  { dia: 'Dom', tentativas: 3, bloqueios: 1, incidentes: 0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs">
        <p className="font-semibold text-gray-700 mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-gray-600">{p.name}: <strong>{p.value}</strong></span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader title="Dashboard Administrativo" subtitle="Visão geral do sistema, usuários, segurança e integrações" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Usuários Ativos" value="47" icon={<Users size={18} />} trend="up" trendLabel="+3 este mês" color="green" />
        <StatCard title="Usuários Bloqueados" value="2" icon={<UserX size={18} />} badge="Verificar" badgeColor="bg-red-100 text-red-700" color="red" />
        <StatCard title="Acessos Hoje" value="311" icon={<Activity size={18} />} badge="Normal" badgeColor="bg-blue-100 text-blue-700" color="blue" />
        <StatCard title="Incidentes" value="3" icon={<AlertTriangle size={18} />} badge="Esta semana" badgeColor="bg-amber-100 text-amber-700" color="amber" />
      </div>

      {/* Service status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'ThingSpeak API', status: 'online' as const, detail: 'Última sync: 15s' },
          { label: 'Banco de Dados', status: 'online' as const, detail: 'PostgreSQL v15' },
          { label: 'Serviço de Mercado', status: 'online' as const, detail: 'API REST' },
          { label: 'Serviço de Processamento', status: 'warning' as const, detail: 'Latência: 2,4s' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-800">{s.label}</span>
              {s.status === 'online' ? <CheckCircle size={16} className="text-emerald-500" /> : <AlertTriangle size={16} className="text-amber-500" />}
            </div>
            <StatusBadge status={s.status} />
            <p className="text-xs text-gray-400 mt-1">{s.detail}</p>
          </div>
        ))}
      </div>

      {/* Tech indicators */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Disponibilidade', value: '99,9%', color: 'text-emerald-600' },
          { label: 'Tempo médio de consulta', value: '1,8s', color: 'text-blue-600' },
          { label: 'Última sincronização', value: '15s', color: 'text-gray-700' },
          { label: 'Registros no banco', value: '48.291', color: 'text-gray-700' },
          { label: 'Sessões ativas', value: '12', color: 'text-purple-600' },
        ].map((t) => (
          <div key={t.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className={`font-display font-700 text-xl ${t.color}`}>{t.value}</p>
            <p className="text-xs text-gray-500 mt-1">{t.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <Card title="Acessos ao sistema — Hoje (por hora)">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={accessData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hora" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="acessos" name="Acessos" fill="#2D6A4F" radius={[4, 4, 0, 0]} />
              <Bar dataKey="falhas" name="Falhas de login" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Incidentes de Segurança — Esta semana">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={incidentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="dia" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="tentativas" name="Tentativas suspeitas" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="bloqueios" name="Bloqueios" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="incidentes" name="Incidentes confirmados" stroke="#7C3AED" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
