import React, { useState } from 'react';
import { History } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SectionHeader, Card, Table, Tr, Td, Select, Tabs } from '../../components/ui';

const historicalData = [
  { periodo: 'Jan/26', tempMedia: 30.2, umidMedia: 62, precipitacao: 12, colheita: 18200 },
  { periodo: 'Fev/26', tempMedia: 31.1, umidMedia: 65, precipitacao: 28, colheita: 15400 },
  { periodo: 'Mar/26', tempMedia: 29.8, umidMedia: 69, precipitacao: 42, colheita: 12800 },
  { periodo: 'Abr/26', tempMedia: 28.1, umidMedia: 66, precipitacao: 8, colheita: 22600 },
  { periodo: 'Mai/26', tempMedia: 26.4, umidMedia: 63, precipitacao: 3, colheita: 28900 },
  { periodo: 'Jun/26', tempMedia: 25.2, umidMedia: 60, precipitacao: 0, colheita: 32100 },
  { periodo: 'Jul/26', tempMedia: 24.8, umidMedia: 58, precipitacao: 0, colheita: 35800 },
  { periodo: 'Ago/26', tempMedia: 27.3, umidMedia: 61, precipitacao: 5, colheita: 29400 },
  { periodo: 'Set/26', tempMedia: 29.1, umidMedia: 64, precipitacao: 15, colheita: 24100 },
];

const precoHistorico = [
  { mes: 'Jan', uva: 4.1, manga: 3.6, melao: 1.9 },
  { mes: 'Fev', uva: 4.3, manga: 3.4, melao: 2.0 },
  { mes: 'Mar', uva: 4.8, manga: 3.9, melao: 2.4 },
  { mes: 'Abr', uva: 4.2, manga: 3.8, melao: 2.1 },
  { mes: 'Mai', uva: 4.5, manga: 3.5, melao: 2.3 },
  { mes: 'Jun', uva: 5.1, manga: 4.2, melao: 2.8 },
  { mes: 'Jul', uva: 5.8, manga: 4.8, melao: 3.1 },
  { mes: 'Ago', uva: 5.4, manga: 4.5, melao: 2.9 },
  { mes: 'Set', uva: 6.2, manga: 5.1, melao: 3.4 },
];

const tableRows = [
  { data: 'Set/26', cultura: 'Uva Itália', temp: '29,1 °C', umid: '64%', colheita: '24.100 kg', preco: 'R$ 6,20/kg', resultado: 'Excelente' },
  { data: 'Ago/26', cultura: 'Manga Tommy', temp: '27,3 °C', umid: '61%', colheita: '18.900 kg', preco: 'R$ 4,50/kg', resultado: 'Bom' },
  { data: 'Jul/26', cultura: 'Uva Red Globe', temp: '24,8 °C', umid: '58%', colheita: '35.800 kg', preco: 'R$ 5,80/kg', resultado: 'Excelente' },
  { data: 'Jun/26', cultura: 'Melão Amarelo', temp: '25,2 °C', umid: '60%', colheita: '32.100 kg', preco: 'R$ 3,40/kg', resultado: 'Bom' },
  { data: 'Mai/26', cultura: 'Uva Itália', temp: '26,4 °C', umid: '63%', colheita: '28.900 kg', preco: 'R$ 4,50/kg', resultado: 'Bom' },
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

export default function HistoryPage() {
  const [periodo, setPeriodo] = useState('ano');
  const [cultura, setCultura] = useState('todas');
  const [chartTab, setChartTab] = useState('clima');

  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader title="Histórico e Tendências" subtitle="Dados históricos climáticos, de colheita e de mercado"
        actions={
          <div className="flex gap-2">
            <Select value={periodo} onChange={setPeriodo} options={[
              { value: 'mes', label: 'Último mês' }, { value: 'trimestre', label: 'Último trimestre' },
              { value: 'ano', label: 'Último ano' }, { value: 'tudo', label: 'Todo o histórico' },
            ]} />
            <Select value={cultura} onChange={setCultura} options={[
              { value: 'todas', label: 'Todas as culturas' }, { value: 'uva', label: 'Uva' },
              { value: 'manga', label: 'Manga' }, { value: 'melao', label: 'Melão' },
            ]} />
          </div>
        }
      />

      <Card title="Análise Histórica"
        actions={<Tabs tabs={[{ id: 'clima', label: 'Clima' }, { id: 'colheita', label: 'Colheita' }, { id: 'precos', label: 'Preços' }]} active={chartTab} onChange={setChartTab} />}>
        {chartTab === 'clima' && (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="periodo" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="tempMedia" name="Temp. média (°C)" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="umidMedia" name="Umidade média (%)" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
        {chartTab === 'colheita' && (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="periodo" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="colheita" name="Volume colheita (kg)" fill="#2D6A4F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
        {chartTab === 'precos' && (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={precoHistorico}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} tickFormatter={(v) => `R$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="uva" name="Uva" stroke="#7C3AED" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="manga" name="Manga" stroke="#F59E0B" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="melao" name="Melão" stroke="#10B981" strokeWidth={2} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>

      <Card title="Histórico Detalhado por Ciclo de Produção">
        <Table headers={['Período', 'Cultura', 'Temp. Média', 'Umidade Média', 'Volume Colheita', 'Preço Médio', 'Resultado']}>
          {tableRows.map((r) => (
            <Tr key={r.data + r.cultura}>
              <Td><span className="font-mono-data text-xs">{r.data}</span></Td>
              <Td><span className="font-medium text-gray-800">{r.cultura}</span></Td>
              <Td><span className="text-amber-600 font-semibold">{r.temp}</span></Td>
              <Td><span className="text-blue-600 font-semibold">{r.umid}</span></Td>
              <Td><span className="font-semibold">{r.colheita}</span></Td>
              <Td><span className="font-mono-data font-semibold">{r.preco}</span></Td>
              <Td>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${r.resultado === 'Excelente' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{r.resultado}</span>
              </Td>
            </Tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}
