import React, { useState } from 'react';
import {
  Thermometer, Droplets, Sprout, TrendingUp, AlertTriangle, Calendar,
  CheckCircle, ArrowRight, Truck, DollarSign
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ComposedChart, Bar, Legend, AreaChart, Area
} from 'recharts';
import { StatCard, SectionHeader, Card, Select } from '../../components/ui';

const tempData = [
  { t: '00h', temp: 22.1, umidade: 71 }, { t: '03h', temp: 20.8, umidade: 74 },
  { t: '06h', temp: 19.5, umidade: 78 }, { t: '09h', temp: 24.2, umidade: 68 },
  { t: '12h', temp: 29.8, umidade: 58 }, { t: '15h', temp: 31.4, umidade: 54 },
  { t: '18h', temp: 28.1, umidade: 62 }, { t: '21h', temp: 25.3, umidade: 67 },
  { t: 'Agora', temp: 28.4, umidade: 67 },
];

const previsaoData = [
  { dia: 'Hoje', min: 19, max: 31, umidade: 65, chuva: 10 },
  { dia: 'Amanhã', min: 20, max: 30, umidade: 68, chuva: 20 },
  { dia: '19/Set', min: 18, max: 28, umidade: 72, chuva: 40 },
  { dia: '20/Set', min: 17, max: 27, umidade: 75, chuva: 35 },
  { dia: '21/Set', min: 19, max: 29, umidade: 70, chuva: 15 },
  { dia: '22/Set', min: 21, max: 32, umidade: 62, chuva: 5 },
  { dia: '23/Set', min: 22, max: 33, umidade: 58, chuva: 0 },
];

const precoData = [
  { mes: 'Abr', uva: 4.2, manga: 3.8, melao: 2.1 },
  { mes: 'Mai', uva: 4.5, manga: 3.5, melao: 2.3 },
  { mes: 'Jun', uva: 5.1, manga: 4.2, melao: 2.8 },
  { mes: 'Jul', uva: 5.8, manga: 4.8, melao: 3.1 },
  { mes: 'Ago', uva: 5.4, manga: 4.5, melao: 2.9 },
  { mes: 'Set', uva: 6.2, manga: 5.1, melao: 3.4 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs">
        <p className="font-semibold text-gray-700 mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-gray-600">{p.name}:</span>
            <span className="font-semibold text-gray-900">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ProducerDashboard() {
  const [periodo, setPeriodo] = useState('hoje');
  const [fazenda, setFazenda] = useState('todas');
  const [cultura, setCultura] = useState('todas');

  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Header */}
      <SectionHeader
        title="Visão Geral"
        subtitle="Monitoramento da sua operação agrícola e logística"
        actions={
          <div className="flex items-center gap-2">
            <Select value={periodo} onChange={setPeriodo} options={[
              { value: 'hoje', label: 'Hoje' }, { value: 'semana', label: 'Esta semana' },
              { value: 'mes', label: 'Este mês' }, { value: 'custom', label: 'Personalizado' },
            ]} />
            <Select value={fazenda} onChange={setFazenda} options={[
              { value: 'todas', label: 'Todas as fazendas' }, { value: 'sjb', label: 'Fazenda São João' },
              { value: 'bv', label: 'Fazenda Boa Vista' },
            ]} />
            <Select value={cultura} onChange={setCultura} options={[
              { value: 'todas', label: 'Todas as culturas' }, { value: 'uva', label: 'Uva' },
              { value: 'manga', label: 'Manga' }, { value: 'melao', label: 'Melão' },
            ]} />
          </div>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Temperatura Atual" value="28,4" unit="°C" icon={<Thermometer size={18} />} trend="up" trendLabel="+1,2°C vs ontem" color="amber" />
        <StatCard title="Umidade Relativa" value="67" unit="%" icon={<Droplets size={18} />} trend="down" trendLabel="-4% vs ontem" color="blue" />
        <StatCard title="Condição da Safra" value="Favorável" icon={<Sprout size={18} />} badge="✓ Boa" badgeColor="bg-emerald-100 text-emerald-700" color="green" />
        <StatCard title="Janela de Colheita" value="3 dias" icon={<Calendar size={18} />} badge="Próximos" badgeColor="bg-green-100 text-green-700" color="green" />
        <StatCard title="Janela de Exportação" value="18–21/Set" icon={<TrendingUp size={18} />} badge="Favorável" badgeColor="bg-blue-100 text-blue-700" color="blue" />
        <StatCard title="Risco Climático" value="Baixo" icon={<AlertTriangle size={18} />} badge="●  Baixo" badgeColor="bg-emerald-100 text-emerald-700" color="green" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Temp & Humidity combined */}
        <Card title="Temperatura e Umidade — Últimas 24h">
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={tempData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="t" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Line yAxisId="left" type="monotone" dataKey="temp" name="Temp (°C)" stroke="#F59E0B" strokeWidth={2} dot={false} />
              <Bar yAxisId="right" dataKey="umidade" name="Umidade (%)" fill="#93C5FD" radius={[3, 3, 0, 0]} opacity={0.7} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Previsão 7 dias */}
        <Card title="Previsão — Próximos 7 dias">
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={previsaoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="dia" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="max" name="Temp. máx (°C)" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="min" name="Temp. mín (°C)" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
              <Bar dataKey="chuva" name="Chuva (%)" fill="#60A5FA" radius={[3, 3, 0, 0]} opacity={0.6} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Harvest recommendation */}
        <div className="bg-gradient-to-br from-[#2D6A4F] to-[#40916C] rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Sprout size={18} />
              </div>
              <div>
                <h3 className="font-semibold">Recomendação de Colheita</h3>
                <p className="text-xs text-emerald-200">Atualizado agora há 15 min</p>
              </div>
            </div>

            <div className="bg-white/15 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={16} className="text-emerald-300" />
                <span className="font-bold text-lg">Janela favorável identificada</span>
              </div>
              <p className="text-2xl font-display font-700 mt-1">18 a 20 de setembro</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-xs text-emerald-200 mb-0.5">Confiança da previsão</p>
                <p className="font-bold text-xl">87%</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-xs text-emerald-200 mb-0.5">Condição climática</p>
                <p className="font-bold">Favorável</p>
              </div>
            </div>

            <p className="text-sm text-emerald-100 leading-relaxed">
              Com base nos dados históricos e nas condições climáticas atuais, o período de 18 a 20/Set apresenta temperatura e umidade ideais para colheita com mínimo risco de danos.
            </p>
          </div>
        </div>

        {/* Logistics recommendation */}
        <div className="bg-gradient-to-br from-[#1E3A5F] to-[#1565C0] rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Truck size={18} />
              </div>
              <div>
                <h3 className="font-semibold">Recomendação Logística</h3>
                <p className="text-xs text-blue-200">Exportação — Uva Itália</p>
              </div>
            </div>

            <div className="bg-white/15 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={16} className="text-blue-300" />
                <span className="font-bold text-lg">Melhor período de transporte</span>
              </div>
              <p className="text-2xl font-display font-700 mt-1">21 a 23 de setembro</p>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-[10px] text-blue-200 mb-0.5">Risco climático</p>
                <p className="font-bold text-sm text-green-300">Baixo</p>
              </div>
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-[10px] text-blue-200 mb-0.5">Demanda</p>
                <p className="font-bold text-sm">Alta</p>
              </div>
              <div className="bg-white/10 rounded-lg p-2 text-center">
                <p className="text-[10px] text-blue-200 mb-0.5">Preço est.</p>
                <p className="font-bold text-sm">R$ 6,20/kg</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-blue-100">
              <DollarSign size={14} />
              <span>Receita estimada: <strong className="text-white">R$ 124.000</strong> por carga</span>
            </div>
          </div>
        </div>
      </div>

      {/* Market prices chart */}
      <Card title="Preços de Mercado — R$/kg (últimos 6 meses)"
        actions={<button className="text-xs text-[#2D6A4F] font-medium hover:underline flex items-center gap-1">Ver mercado <ArrowRight size={12} /></button>}>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={precoData}>
            <defs>
              <linearGradient id="uvaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="mangaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="melaoGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
            <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} tickFormatter={(v) => `R$${v}`} />
            <Tooltip content={<CustomTooltip />} formatter={(v: any) => [`R$ ${v}`, '']} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="uva" name="Uva" stroke="#7C3AED" fill="url(#uvaGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="manga" name="Manga" stroke="#F59E0B" fill="url(#mangaGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="melao" name="Melão" stroke="#10B981" fill="url(#melaoGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
