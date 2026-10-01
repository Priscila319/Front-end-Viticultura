import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Database } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { StatCard, SectionHeader, Card, Table, Tr, Td, StatusBadge, ProgressBar } from '../../components/ui';

const qualityTrend = [
  { dia: '23/Set', validos: 1820, invalidos: 36, ausentes: 18 },
  { dia: '24/Set', validos: 1775, invalidos: 42, ausentes: 27 },
  { dia: '25/Set', validos: 1890, invalidos: 28, ausentes: 10 },
  { dia: '26/Set', validos: 1854, invalidos: 31, ausentes: 14 },
  { dia: '27/Set', validos: 1912, invalidos: 19, ausentes: 8 },
  { dia: '28/Set', validos: 1876, invalidos: 25, ausentes: 12 },
  { dia: '29/Set', validos: 1904, invalidos: 22, ausentes: 9 },
];

const sourceTable = [
  { data: '29/Set', fonte: 'ThingSpeak API', registros: 1935, validos: 1904, invalidos: 22, ausentes: 9, status: 'ok' },
  { data: '28/Set', fonte: 'ThingSpeak API', registros: 1913, validos: 1876, invalidos: 25, ausentes: 12, status: 'ok' },
  { data: '27/Set', fonte: 'ThingSpeak API', registros: 1939, validos: 1912, invalidos: 19, ausentes: 8, status: 'ok' },
  { data: '26/Set', fonte: 'ThingSpeak API', registros: 1899, validos: 1854, invalidos: 31, ausentes: 14, status: 'warn' },
  { data: '25/Set', fonte: 'ThingSpeak API', registros: 1928, validos: 1890, invalidos: 28, ausentes: 10, status: 'ok' },
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

export default function DataQuality() {
  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader title="Qualidade dos Dados" subtitle="Monitoramento de completude, consistência e integridade dos dados IoT" />

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Completude" value="99,1" unit="%" icon={<CheckCircle size={18} />} trend="up" trendLabel="+0,2% vs ontem" color="green" />
        <StatCard title="Consistência" value="98,4" unit="%" icon={<CheckCircle size={18} />} color="green" />
        <StatCard title="Dados Ausentes" value="9" icon={<AlertCircle size={18} />} badge="Hoje" badgeColor="bg-amber-100 text-amber-700" color="amber" />
        <StatCard title="Outliers Detectados" value="1" icon={<AlertCircle size={18} />} badge="Suspeito" badgeColor="bg-orange-100 text-orange-700" color="amber" />
        <StatCard title="Registros Processados" value="1.904" icon={<Database size={18} />} trend="up" trendLabel="+1.904 hoje" color="blue" />
        <StatCard title="Registros Rejeitados" value="22" icon={<XCircle size={18} />} badge="1,1%" badgeColor="bg-red-100 text-red-700" color="red" />
      </div>

      {/* Quality indicators */}
      <Card title="Indicadores de Qualidade — Detalhamento">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <ProgressBar value={99.1} label="Completude dos dados" color="green" />
            <ProgressBar value={98.4} label="Consistência dos dados" color="green" />
            <ProgressBar value={97.8} label="Acurácia (dados dentro de limites físicos)" color="green" />
            <ProgressBar value={99.5} label="Pontualidade (dados no intervalo esperado)" color="green" />
          </div>
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={16} className="text-emerald-600" />
                <span className="font-semibold text-emerald-900 text-sm">Situação geral: Boa</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Total de registros hoje</span><strong>1.935</strong></div>
                <div className="flex justify-between"><span className="text-gray-600">Válidos</span><strong className="text-emerald-600">1.904 (98,4%)</strong></div>
                <div className="flex justify-between"><span className="text-gray-600">Inválidos</span><strong className="text-red-500">22 (1,1%)</strong></div>
                <div className="flex justify-between"><span className="text-gray-600">Ausentes</span><strong className="text-amber-600">9 (0,5%)</strong></div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Chart */}
      <Card title="Qualidade dos Dados — Últimos 7 dias">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={qualityTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="dia" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
            <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="validos" name="Válidos" fill="#2D6A4F" radius={[4, 4, 0, 0]} stackId="a" />
            <Bar dataKey="invalidos" name="Inválidos" fill="#EF4444" radius={[0, 0, 0, 0]} stackId="a" />
            <Bar dataKey="ausentes" name="Ausentes" fill="#F59E0B" radius={[4, 4, 0, 0]} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Table */}
      <Card title="Histórico por Data e Fonte">
        <Table headers={['Data', 'Fonte', 'Total', 'Válidos', 'Inválidos', 'Ausentes', 'Status']}>
          {sourceTable.map((r) => (
            <Tr key={r.data}>
              <Td><span className="font-mono-data text-xs">{r.data}</span></Td>
              <Td>{r.fonte}</Td>
              <Td><span className="font-semibold">{r.registros.toLocaleString()}</span></Td>
              <Td><span className="text-emerald-600 font-semibold">{r.validos.toLocaleString()}</span></Td>
              <Td><span className="text-red-500 font-semibold">{r.invalidos}</span></Td>
              <Td><span className="text-amber-600 font-semibold">{r.ausentes}</span></Td>
              <Td><StatusBadge status={r.status === 'ok' ? 'online' : 'warning'} label={r.status === 'ok' ? 'OK' : 'Atenção'} /></Td>
            </Tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}
