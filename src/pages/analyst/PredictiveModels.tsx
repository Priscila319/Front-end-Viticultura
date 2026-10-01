import React, { useState } from 'react';
import { FlaskConical, Play, TestTube, GitCompare, TrendingUp, Clock, Database, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ScatterChart, Scatter } from 'recharts';
import { StatCard, SectionHeader, Card, Table, Tr, Td, Btn, Modal } from '../../components/ui';

const performanceData = [
  { data: '01/Set', real: 27.2, previsto: 27.8 },
  { data: '05/Set', real: 28.1, previsto: 27.5 },
  { data: '10/Set', real: 29.4, previsto: 29.9 },
  { data: '15/Set', real: 27.8, previsto: 28.2 },
  { data: '18/Set', real: 28.4, previsto: 28.1 },
  { data: '20/Set', real: 30.1, previsto: 29.7 },
  { data: '22/Set', real: 29.2, previsto: 29.5 },
  { data: '25/Set', real: 28.8, previsto: 28.4 },
];

const versionsHistory = [
  { versao: 'v2.4', data: '29/09/2026', algoritmo: 'Gradient Boosting', mae: 1.2, rmse: 1.8, precisao: 87, status: 'ativo' },
  { versao: 'v2.3', data: '15/09/2026', algoritmo: 'Random Forest', mae: 1.4, rmse: 2.1, precisao: 84, status: 'inativo' },
  { versao: 'v2.2', data: '01/09/2026', algoritmo: 'Gradient Boosting', mae: 1.5, rmse: 2.3, precisao: 82, status: 'inativo' },
  { versao: 'v2.1', data: '15/08/2026', algoritmo: 'Linear Regression', mae: 2.1, rmse: 3.0, precisao: 76, status: 'inativo' },
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

export default function PredictiveModels() {
  const [trainModal, setTrainModal] = useState(false);
  const [training, setTraining] = useState(false);
  const [trained, setTrained] = useState(false);

  const handleTrain = async () => {
    setTraining(true);
    await new Promise((r) => setTimeout(r, 2000));
    setTraining(false);
    setTrained(true);
    setTrainModal(false);
  };

  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader
        title="Modelos Preditivos"
        subtitle="Configuração, treinamento e avaliação dos modelos de previsão de safra"
        actions={
          <div className="flex gap-2">
            <Btn variant="outline" size="sm" icon={<GitCompare size={14} />}>Comparar modelos</Btn>
            <Btn variant="outline" size="sm" icon={<TestTube size={14} />}>Testar modelo</Btn>
            <Btn size="sm" icon={<Play size={14} />} onClick={() => setTrainModal(true)}>Executar treinamento</Btn>
          </div>
        }
      />

      {/* Active model info */}
      <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2563EB] rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <FlaskConical size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display font-700 text-lg">Modelo Ativo — v2.4</h3>
                <span className="text-xs bg-emerald-500 px-2 py-0.5 rounded-full font-semibold">Em produção</span>
              </div>
              <p className="text-blue-200 text-sm">Gradient Boosting Regressor • Treinado em 29/09/2026</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Precisão', value: '87%' },
              { label: 'MAE', value: '1,2 °C' },
              { label: 'RMSE', value: '1,8 °C' },
              { label: 'Dados usados', value: '48.291' },
            ].map((m) => (
              <div key={m.label} className="text-center bg-white/10 rounded-xl px-4 py-3">
                <p className="font-bold text-xl">{m.value}</p>
                <p className="text-xs text-blue-200 mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Precisão do Modelo" value="87" unit="%" icon={<TrendingUp size={18} />} badge="Alta" badgeColor="bg-emerald-100 text-emerald-700" color="green" />
        <StatCard title="MAE" value="1,2" unit="°C" icon={<CheckCircle size={18} />} color="green" />
        <StatCard title="Última Execução" value="02:00" icon={<Clock size={18} />} badge="29/Set" badgeColor="bg-gray-100 text-gray-600" color="teal" />
        <StatCard title="Dados de Treinamento" value="38.632" icon={<Database size={18} />} color="blue" />
      </div>

      <Card title="Previsão vs Real — Temperatura (°C)">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="data" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
            <YAxis domain={[25, 33]} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="real" name="Real (°C)" stroke="#2D6A4F" strokeWidth={2.5} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="previsto" name="Previsto (°C)" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Version history */}
      <Card title="Histórico de Versões">
        <Table headers={['Versão', 'Data', 'Algoritmo', 'MAE', 'RMSE', 'Precisão', 'Status']}>
          {versionsHistory.map((v) => (
            <Tr key={v.versao}>
              <Td><span className="font-mono-data font-bold text-gray-900">{v.versao}</span></Td>
              <Td><span className="font-mono-data text-xs">{v.data}</span></Td>
              <Td><span className="font-medium">{v.algoritmo}</span></Td>
              <Td><span className="font-mono-data text-amber-600 font-semibold">{v.mae}</span></Td>
              <Td><span className="font-mono-data text-blue-600 font-semibold">{v.rmse}</span></Td>
              <Td>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1.5 bg-gray-100 rounded-full">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${v.precisao}%` }} />
                  </div>
                  <span className="text-xs font-semibold">{v.precisao}%</span>
                </div>
              </Td>
              <Td>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${v.status === 'ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                  {v.status === 'ativo' ? '● Ativo' : 'Inativo'}
                </span>
              </Td>
            </Tr>
          ))}
        </Table>
      </Card>

      {/* Train modal */}
      <Modal open={trainModal} onClose={() => setTrainModal(false)} title="Executar Treinamento"
        actions={
          <>
            <Btn variant="outline" onClick={() => setTrainModal(false)}>Cancelar</Btn>
            <Btn loading={training} onClick={handleTrain} icon={<Play size={14} />}>
              {trained ? 'Concluído!' : 'Confirmar treinamento'}
            </Btn>
          </>
        }
      >
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <strong>Atenção:</strong> O treinamento pode levar de 5 a 30 minutos dependendo do volume de dados. O sistema continuará operando normalmente durante o processo.
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between"><span>Dados disponíveis:</span><strong>48.291 registros</strong></div>
            <div className="flex justify-between"><span>Divisão treino/teste:</span><strong>80% / 20%</strong></div>
            <div className="flex justify-between"><span>Algoritmo:</span><strong>Gradient Boosting</strong></div>
            <div className="flex justify-between"><span>Variáveis:</span><strong>Temp, Umidade, Preço, Demanda</strong></div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
