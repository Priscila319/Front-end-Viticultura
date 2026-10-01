import React from 'react';
import { Sprout, TrendingUp, AlertTriangle, Info, Calendar, CheckCircle } from 'lucide-react';
import {
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine
} from 'recharts';
import { StatCard, SectionHeader, Card } from '../../components/ui';

const forecastData = [
  { data: '01/Set', observado: 27.2, previsao: null, min: null, max: null },
  { data: '05/Set', observado: 28.1, previsao: null, min: null, max: null },
  { data: '10/Set', observado: 29.4, previsao: null, min: null, max: null },
  { data: '15/Set', observado: 27.8, previsao: null, min: null, max: null },
  { data: '18/Set', observado: 28.4, previsao: 28.4, min: 26.5, max: 30.3 },
  { data: '19/Set', observado: null, previsao: 29.1, min: 27.0, max: 31.2 },
  { data: '20/Set', observado: null, previsao: 29.8, min: 27.5, max: 32.1 },
  { data: '21/Set', observado: null, previsao: 28.5, min: 26.2, max: 30.8 },
  { data: '22/Set', observado: null, previsao: 27.9, min: 25.8, max: 30.0 },
  { data: '23/Set', observado: null, previsao: 30.2, min: 27.9, max: 32.5 },
];

const historicoPrev = [
  { data: '15/Ago', prev: '20-22/Ago', confianca: 81, resultado: 'Correto' },
  { data: '01/Set', prev: '05-08/Set', confianca: 79, resultado: 'Correto' },
  { data: '10/Set', prev: '12-15/Set', confianca: 84, resultado: 'Parcial' },
  { data: '15/Set', prev: '18-20/Set', confianca: 87, resultado: 'Em andamento' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs">
        <p className="font-semibold text-gray-700 mb-2">{label}</p>
        {payload.map((p: any) => p.value !== null && (
          <div key={p.name} className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-gray-600">{p.name}: <strong>{p.value?.toFixed ? p.value.toFixed(1) : p.value}</strong></span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Forecasts() {
  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader title="Previsões de Safra" subtitle="Janela de colheita e exportação com base em dados climáticos e históricos" />

      {/* Key forecast cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Confiança do Modelo" value="87" unit="%" icon={<TrendingUp size={18} />} badge="Alta" badgeColor="bg-emerald-100 text-emerald-700" color="green" />
        <StatCard title="Janela de Colheita" value="18–20/Set" icon={<Calendar size={18} />} badge="3 dias" badgeColor="bg-blue-100 text-blue-700" color="blue" />
        <StatCard title="Risco Climático" value="Baixo" icon={<AlertTriangle size={18} />} badge="●  Monitorando" badgeColor="bg-emerald-100 text-emerald-700" color="green" />
        <StatCard title="Tendência" value="↗ Favorável" icon={<Sprout size={18} />} color="green" />
      </div>

      {/* Main forecast chart */}
      <Card title="Temperatura Observada vs Previsão — com Intervalo de Confiança">
        <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#2D6A4F] inline-block" /> Observado</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#3B82F6] border-dashed inline-block" style={{ borderBottom: '2px dashed #3B82F6' }} /> Previsão</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-100 inline-block rounded" /> Intervalo de confiança</div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="data" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
            <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} domain={[22, 36]} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x="18/Set" stroke="#2D6A4F" strokeDasharray="4 4" label={{ value: 'Hoje', fontSize: 10, fill: '#2D6A4F' }} />
            <Area type="monotone" dataKey="max" name="IC máx" fill="#BFDBFE" stroke="none" fillOpacity={0.5} connectNulls />
            <Area type="monotone" dataKey="min" name="IC mín" fill="#F0F9FF" stroke="none" fillOpacity={0.8} connectNulls />
            <Line type="monotone" dataKey="observado" name="Observado" stroke="#2D6A4F" strokeWidth={2.5} dot={{ r: 3, fill: '#2D6A4F' }} connectNulls />
            <Line type="monotone" dataKey="previsao" name="Previsão" stroke="#3B82F6" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3 }} connectNulls />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* Recommendation + explanation */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 bg-gradient-to-br from-[#2D6A4F] to-[#40916C] rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={20} />
            <h3 className="font-semibold text-lg">Análise e Recomendação</h3>
          </div>
          <div className="bg-white/15 rounded-xl p-5 mb-5">
            <p className="text-emerald-100 text-sm leading-relaxed">
              Com base nos dados climáticos históricos, condições atuais e dados de mercado, o modelo identificou uma <strong className="text-white">janela favorável para colheita entre 18 e 20 de setembro</strong>.
            </p>
            <br />
            <p className="text-emerald-100 text-sm leading-relaxed">
              A temperatura média prevista de <strong className="text-white">28–30 °C</strong> e umidade entre <strong className="text-white">62–68%</strong> estão dentro da faixa ideal para Uva Itália, com mínima incidência de chuvas prevista (menos de 10mm).
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Dados climáticos', value: '45 dias' },
              { label: 'Histórico safras', value: '3 anos' },
              { label: 'Dados mercado', value: '6 meses' },
            ].map((d) => (
              <div key={d.label} className="bg-white/10 rounded-lg p-3 text-center">
                <p className="text-xs text-emerald-200 mb-1">{d.label}</p>
                <p className="font-bold">{d.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Info size={16} className="text-blue-600" />
              <span className="font-semibold text-blue-900 text-sm">Sobre o modelo</span>
            </div>
            <p className="text-xs text-blue-700 leading-relaxed">
              Modelo de regressão com dados climáticos IoT (ThingSpeak), séries históricas e indicadores de mercado. Confiança: <strong>87%</strong> (MAE: 1,2 °C).
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-amber-600" />
              <span className="font-semibold text-amber-900 text-sm">Atenção</span>
            </div>
            <p className="text-xs text-amber-700 leading-relaxed">
              Probabilidade de chuva acima de 40% em 19/Set. Reavalie a janela se umidade relativa ultrapassar 80%.
            </p>
          </div>
        </div>
      </div>

      {/* Histórico de previsões */}
      <Card title="Histórico de Previsões Anteriores">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Data da previsão', 'Janela prevista', 'Confiança', 'Resultado'].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {historicoPrev.map((r) => (
                <tr key={r.data} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono-data text-xs text-gray-600">{r.data}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">{r.prev}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full max-w-20">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${r.confianca}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-700">{r.confianca}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      r.resultado === 'Correto' ? 'bg-emerald-100 text-emerald-700'
                      : r.resultado === 'Parcial' ? 'bg-amber-100 text-amber-700'
                      : 'bg-blue-100 text-blue-700'
                    }`}>{r.resultado}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
