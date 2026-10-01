import React from 'react';
import { Shield, UserCheck, AlertTriangle, Lock, Activity, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { StatCard, SectionHeader, Card, Table, Tr, Td } from '../../components/ui';

const accessHistory = [
  { hora: '06h', sucesso: 18, falhas: 2 }, { hora: '08h', sucesso: 45, falhas: 3 },
  { hora: '10h', sucesso: 62, falhas: 4 }, { hora: '12h', sucesso: 38, falhas: 1 },
  { hora: '14h', sucesso: 55, falhas: 2 }, { hora: '16h', sucesso: 71, falhas: 6 },
  { hora: '18h', sucesso: 48, falhas: 2 }, { hora: '20h', sucesso: 29, falhas: 1 },
];

const incidentTrend = [
  { dia: 'Seg', tentativas: 8, bloqueios: 2 }, { dia: 'Ter', tentativas: 12, bloqueios: 3 },
  { dia: 'Qua', tentativas: 6, bloqueios: 1 }, { dia: 'Qui', tentativas: 15, bloqueios: 4 },
  { dia: 'Sex', tentativas: 9, bloqueios: 2 }, { dia: 'Sáb', tentativas: 4, bloqueios: 0 },
  { dia: 'Dom', tentativas: 3, bloqueios: 1 },
];

const events = [
  { dt: '29/Set 09:42', user: 'joao@fazendaboavista.com', event: 'Login bem-sucedido', ip: '189.124.32.15', status: 'ok' },
  { dt: '29/Set 09:38', user: 'tentativa@externo.com', event: 'Tentativa de login falhou', ip: '45.188.230.44', status: 'fail' },
  { dt: '29/Set 09:35', user: 'mfernanda@agroanalist.com', event: 'Login bem-sucedido', ip: '177.92.18.200', status: 'ok' },
  { dt: '29/Set 09:12', user: 'pedro@exportadora.com', event: 'Conta bloqueada (5 tentativas)', ip: '200.225.118.72', status: 'block' },
  { dt: '29/Set 08:57', user: 'carlos@fazendaboavista.com', event: 'Logout', ip: '189.124.32.16', status: 'ok' },
  { dt: '29/Set 08:45', user: 'joao@fazendaboavista.com', event: 'Acesso em novo dispositivo', ip: '200.128.44.18', status: 'warn' },
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

export default function Security() {
  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader title="Segurança" subtitle="Monitoramento de acessos, tentativas e incidentes de segurança" />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Acessos Bem-sucedidos" value="311" icon={<UserCheck size={18} />} trend="up" trendLabel="+12 vs ontem" color="green" />
        <StatCard title="Tentativas de Login" value="21" icon={<AlertTriangle size={18} />} badge="Monitorar" badgeColor="bg-amber-100 text-amber-700" color="amber" />
        <StatCard title="Bloqueios" value="2" icon={<Lock size={18} />} color="red" />
        <StatCard title="Incidentes" value="3" icon={<Shield size={18} />} badge="Esta semana" badgeColor="bg-orange-100 text-orange-700" color="amber" />
        <StatCard title="Sessões Ativas" value="12" icon={<Activity size={18} />} color="blue" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <Card title="Acessos por período — Hoje">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={accessHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hora" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="sucesso" name="Acessos" fill="#2D6A4F" radius={[4, 4, 0, 0]} />
              <Bar dataKey="falhas" name="Falhas" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Tentativas suspeitas — Esta semana">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={incidentTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="dia" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="tentativas" name="Tentativas suspeitas" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="bloqueios" name="Bloqueios" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Eventos de Segurança Recentes">
        <Table headers={['Data/Hora', 'Usuário', 'Evento', 'IP', 'Status']}>
          {events.map((e, i) => (
            <Tr key={i}>
              <Td><span className="font-mono-data text-xs">{e.dt}</span></Td>
              <Td><span className="text-xs text-gray-600">{e.user}</span></Td>
              <Td>{e.event}</Td>
              <Td><span className="font-mono-data text-xs text-gray-500">{e.ip}</span></Td>
              <Td>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  e.status === 'ok' ? 'bg-emerald-100 text-emerald-700'
                  : e.status === 'fail' ? 'bg-red-100 text-red-700'
                  : e.status === 'block' ? 'bg-orange-100 text-orange-700'
                  : 'bg-amber-100 text-amber-700'
                }`}>
                  {e.status === 'ok' ? '✓ OK' : e.status === 'fail' ? '✗ Falha' : e.status === 'block' ? '🔒 Bloqueado' : '⚠ Atenção'}
                </span>
              </Td>
            </Tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}
