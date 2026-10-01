import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Globe } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { StatCard, SectionHeader, Card, Table, Tr, Td, Tabs } from '../../components/ui';

const precoHistorico = [
  { mes: 'Abr', uva: 4.2, manga: 3.8, melao: 2.1 },
  { mes: 'Mai', uva: 4.5, manga: 3.5, melao: 2.3 },
  { mes: 'Jun', uva: 5.1, manga: 4.2, melao: 2.8 },
  { mes: 'Jul', uva: 5.8, manga: 4.8, melao: 3.1 },
  { mes: 'Ago', uva: 5.4, manga: 4.5, melao: 2.9 },
  { mes: 'Set', uva: 6.2, manga: 5.1, melao: 3.4 },
  { mes: 'Out*', uva: 6.5, manga: 5.3, melao: 3.6 },
  { mes: 'Nov*', uva: 6.1, manga: 5.0, melao: 3.2 },
];

const demandaData = [
  { mes: 'Abr', europa: 320, asia: 180, americas: 240 },
  { mes: 'Mai', europa: 340, asia: 210, americas: 260 },
  { mes: 'Jun', europa: 380, asia: 250, americas: 280 },
  { mes: 'Jul', europa: 420, asia: 290, americas: 310 },
  { mes: 'Ago', europa: 390, asia: 270, americas: 295 },
  { mes: 'Set', europa: 450, asia: 320, americas: 340 },
];

const mercadoTable = [
  { produto: 'Uva Itália', mercado: 'Europa (UE)', preco: 'R$ 6,20', variacao: '+8,2%', demanda: 'Alta', tendencia: 'up', atualizacao: 'Hoje 08:00' },
  { produto: 'Manga Tommy', mercado: 'Oriente Médio', preco: 'R$ 5,10', variacao: '+12,4%', demanda: 'Muito alta', tendencia: 'up', atualizacao: 'Hoje 08:00' },
  { produto: 'Melão Amarelo', mercado: 'Europa (UE)', preco: 'R$ 3,40', variacao: '+5,1%', demanda: 'Média', tendencia: 'up', atualizacao: 'Hoje 08:00' },
  { produto: 'Uva Red Globe', mercado: 'Asia', preco: 'R$ 5,80', variacao: '-2,3%', demanda: 'Baixa', tendencia: 'down', atualizacao: 'Ontem 18:00' },
  { produto: 'Manga Keitt', mercado: 'EUA', preco: 'R$ 4,90', variacao: '+3,7%', demanda: 'Média', tendencia: 'neutral', atualizacao: 'Ontem 18:00' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs">
        <p className="font-semibold text-gray-700 mb-2">{label} {label?.includes('*') ? '(previsão)' : ''}</p>
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

export default function Market() {
  const [tab, setTab] = useState('precos');

  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader title="Mercado e Exportação" subtitle="Preços, demanda e tendências para frutas da região Petrolina/Juazeiro" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Uva — Preço Atual" value="R$ 6,20" unit="/kg" icon={<DollarSign size={18} />} trend="up" trendLabel="+8,2% vs mês ant." color="green" />
        <StatCard title="Manga — Preço Atual" value="R$ 5,10" unit="/kg" icon={<DollarSign size={18} />} trend="up" trendLabel="+12,4%" color="amber" />
        <StatCard title="Demanda Exportação" value="Alta" icon={<Globe size={18} />} badge="Europa/Ásia" badgeColor="bg-blue-100 text-blue-700" color="blue" />
        <StatCard title="Tendência Geral" value="↗ Positiva" icon={<TrendingUp size={18} />} badge="Favorável" badgeColor="bg-emerald-100 text-emerald-700" color="green" />
      </div>

      <Card title="Evolução de Preços e Demanda"
        actions={<Tabs tabs={[{ id: 'precos', label: 'Preços' }, { id: 'demanda', label: 'Demanda' }]} active={tab} onChange={setTab} />}>
        {tab === 'precos' ? (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={precoHistorico}>
              <defs>
                {[['uva', '#7C3AED'], ['manga', '#F59E0B'], ['melao', '#10B981']].map(([k, c]) => (
                  <linearGradient key={k} id={`${k}G`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={c} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={c} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} tickFormatter={(v) => `R$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="uva" name="Uva (R$/kg)" stroke="#7C3AED" fill="url(#uvaG)" strokeWidth={2} />
              <Area type="monotone" dataKey="manga" name="Manga (R$/kg)" stroke="#F59E0B" fill="url(#mangaG)" strokeWidth={2} />
              <Area type="monotone" dataKey="melao" name="Melão (R$/kg)" stroke="#10B981" fill="url(#melaoG)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={demandaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="europa" name="Europa" fill="#3B82F6" radius={[3, 3, 0, 0]} />
              <Bar dataKey="asia" name="Ásia" fill="#8B5CF6" radius={[3, 3, 0, 0]} />
              <Bar dataKey="americas" name="Américas" fill="#10B981" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
        <p className="text-xs text-gray-400 mt-2">* Meses com asterisco representam previsões do modelo</p>
      </Card>

      <Card title="Tabela de Mercado">
        <Table headers={['Produto', 'Mercado', 'Preço', 'Variação', 'Demanda', 'Tendência', 'Atualização']}>
          {mercadoTable.map((r) => (
            <Tr key={r.produto}>
              <Td><span className="font-semibold text-gray-800">{r.produto}</span></Td>
              <Td>{r.mercado}</Td>
              <Td><span className="font-mono-data font-semibold text-gray-900">{r.preco}</span></Td>
              <Td>
                <span className={`text-xs font-semibold flex items-center gap-1 ${r.variacao.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                  {r.variacao.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {r.variacao}
                </span>
              </Td>
              <Td>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  r.demanda === 'Alta' || r.demanda === 'Muito alta' ? 'bg-emerald-100 text-emerald-700'
                  : r.demanda === 'Média' ? 'bg-amber-100 text-amber-700'
                  : 'bg-red-100 text-red-700'
                }`}>{r.demanda}</span>
              </Td>
              <Td>
                {r.tendencia === 'up' ? <TrendingUp size={16} className="text-emerald-500" />
                  : r.tendencia === 'down' ? <TrendingDown size={16} className="text-red-500" />
                  : <BarChart3 size={16} className="text-gray-400" />}
              </Td>
              <Td><span className="text-xs text-gray-400">{r.atualizacao}</span></Td>
            </Tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}
