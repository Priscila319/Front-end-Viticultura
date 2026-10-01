import React from 'react';
import { Database, Activity, CheckCircle, FlaskConical, TrendingUp, Clock, AlertCircle, BarChart3 } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { StatCard, SectionHeader, Card } from '../../components/ui';

const dataQualityTrend = [
  { dia: '23/Set', completude: 98.2, consistencia: 97.1, validos: 1820 },
  { dia: '24/Set', completude: 97.8, consistencia: 96.5, validos: 1775 },
  { dia: '25/Set', completude: 99.1, consistencia: 98.2, validos: 1890 },
  { dia: '26/Set', completude: 98.5, consistencia: 97.8, validos: 1854 },
  { dia: '27/Set', completude: 99.3, consistencia: 98.7, validos: 1912 },
  { dia: '28/Set', completude: 98.9, consistencia: 97.9, validos: 1876 },
  { dia: '29/Set', completude: 99.1, consistencia: 98.4, validos: 1904 },
];

const modelPerformance = [
  { data: '01/Set', real: 27.2, previsto: 27.8 },
  { data: '05/Set', real: 28.1, previsto: 27.5 },
  { data: '10/Set', real: 29.4, previsto: 29.9 },
  { data: '15/Set', real: 27.8, previsto: 28.2 },
  { data: '18/Set', real: 28.4, previsto: 28.1 },
  { data: '20/Set', real: 30.1, previsto: 29.7 },
  { data: '22/Set', real: 29.2, previsto: 29.5 },
  { data: '25/Set', real: 28.8, previsto: 28.4 },
];

const outlierData = [
  { hora: '03h', temp: 21.2, status: 'normal' }, { hora: '06h', temp: 19.1, status: 'normal' },
  { hora: '09h', temp: 24.5, status: 'normal' }, { hora: '12h', temp: 38.2, status: 'outlier' },
  { hora: '15h', temp: 31.1, status: 'normal' }, { hora: '18h', temp: 28.3, status: 'normal' },
  { hora: '21h', temp: 25.6, status: 'normal' },
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

export default function AnalystDashboard() {
  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader title="Dashboard — Analista de Dados" subtitle="Métricas operacionais, qualidade de dados e desempenho dos modelos" />

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Registros Processados" value="48.291" icon={<Database size={18} />} trend="up" trendLabel="+1.248 hoje" color="blue" />
        <StatCard title="Dados Recebidos Hoje" value="1.904" icon={<Activity size={18} />} badge="Em tempo real" badgeColor="bg-blue-100 text-blue-700" color="blue" />
        <StatCard title="Qualidade dos Dados" value="99,1" unit="%" icon={<CheckCircle size={18} />} trend="up" trendLabel="+0,2% vs ontem" color="green" />
        <StatCard title="Modelo Ativo" value="v2.4" icon={<FlaskConical size={18} />} badge="Gradient Boost" badgeColor="bg-purple-100 text-purple-700" color="teal" />
        <StatCard title="Precisão do Modelo" value="87" unit="%" icon={<TrendingUp size={18} />} badge="MAE: 1,2°C" badgeColor="bg-emerald-100 text-emerald-700" color="green" />
        <StatCard title="Última Execução" value="02:00" icon={<Clock size={18} />} badge="29/Set 02:00" badgeColor="bg-gray-100 text-gray-600" color="teal" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <Card title="Qualidade dos Dados — Últimos 7 dias">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dataQualityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="dia" tick={{ fontSize: 10, fill: '#9CA3AF' }} />
              <YAxis domain={[95, 100]} tick={{ fontSize: 10, fill: '#9CA3AF' }} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="completude" name="Completude (%)" stroke="#2D6A4F" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="consistencia" name="Consistência (%)" stroke="#3B82F6" strokeWidth={2} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Modelo: Previsão vs Real — Temperatura (°C)">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={modelPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="data" tick={{ fontSize: 10, fill: '#9CA3AF' }} />
              <YAxis domain={[24, 34]} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="real" name="Real (°C)" stroke="#2D6A4F" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="previsto" name="Previsto (°C)" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 3" dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <Card title="Distribuição de Dados — Volumes por dia" actions={<span className="text-xs text-gray-400 font-mono-data">Últimos 7 dias</span>}>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dataQualityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="dia" tick={{ fontSize: 10, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="validos" name="Registros válidos" fill="#2D6A4F" radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Detecção de Outliers — Temperatura hoje">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={outlierData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hora" tick={{ fontSize: 10, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="temp" name="Temperatura (°C)" radius={[4, 4, 0, 0]}
                fill="#3B82F6"
                label={({ x, y, value, index }: any) =>
                  outlierData[index]?.status === 'outlier'
                    ? <text x={x + 12} y={y - 5} fontSize={9} fill="#EF4444" fontWeight="bold">⚠</text>
                    : null
                }
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-2 mt-2 text-xs text-amber-600">
            <AlertCircle size={12} />
            1 outlier detectado: 38,2°C às 12h — dado marcado como suspeito
          </div>
        </Card>
      </div>
    </div>
  );
}
