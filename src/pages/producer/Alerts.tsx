import React, { useState } from 'react';
import { Bell, Cloud, Sprout, Truck, BarChart3, Shield, Settings, Filter } from 'lucide-react';
import { AlertCard, SectionHeader, Select } from '../../components/ui';

const initialAlerts = [
  { id: 1, level: 'info' as const, category: 'Colheita', title: 'Condições favoráveis para colheita identificadas', description: 'As condições climáticas dos próximos 3 dias indicam janela favorável para colheita de Uva Itália no bloco A.', time: 'Há 5 min', read: false, icon: <Sprout size={18} /> },
  { id: 2, level: 'attention' as const, category: 'Climático', title: 'Umidade acima da faixa recomendada', description: 'Sensor ESP32-001 registrou umidade de 78%, acima do limite recomendado de 75% para o período de colheita.', time: 'Há 22 min', read: false, icon: <Cloud size={18} /> },
  { id: 3, level: 'info' as const, category: 'Logística', title: 'Janela de exportação favorável nas próximas 48h', description: 'Condições de transporte e preços estão favoráveis para embarque entre 21 e 23 de setembro.', time: 'Há 1h', read: false, icon: <Truck size={18} /> },
  { id: 4, level: 'critical' as const, category: 'Sistema', title: 'Falha temporária na sincronização com ThingSpeak', description: 'A sincronização falhou às 07:15. Dados foram recuperados retroativamente. Monitorar nas próximas horas.', time: 'Há 2h', read: false, icon: <Settings size={18} /> },
  { id: 5, level: 'important' as const, category: 'Mercado', title: 'Variação de preço acima de 10% na Manga Tommy', description: 'Preço da Manga Tommy subiu 12,4% nesta semana. Considere revisar estratégia de exportação.', time: 'Há 3h', read: true, icon: <BarChart3 size={18} /> },
  { id: 6, level: 'info' as const, category: 'Segurança', title: 'Login realizado em novo dispositivo', description: 'Um acesso foi realizado de um novo dispositivo em São Paulo, SP. Se não foi você, altere sua senha.', time: 'Há 5h', read: true, icon: <Shield size={18} /> },
  { id: 7, level: 'attention' as const, category: 'Climático', title: 'Previsão de chuvas acima de 30mm para 19/Set', description: 'A previsão indica possibilidade de 35mm de chuva em 19/Set. Isso pode impactar a janela de colheita prevista.', time: 'Hoje 06:00', read: true, icon: <Cloud size={18} /> },
];

const categories = ['Todos', 'Climático', 'Colheita', 'Logística', 'Mercado', 'Segurança', 'Sistema'];

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [catFilter, setCatFilter] = useState('Todos');
  const [levelFilter, setLevelFilter] = useState('todos');
  const [readFilter, setReadFilter] = useState('todos');

  const markRead = (id: number) => setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, read: true } : a));
  const markAllRead = () => setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));

  const filtered = alerts.filter((a) => {
    if (catFilter !== 'Todos' && a.category !== catFilter) return false;
    if (levelFilter !== 'todos' && a.level !== levelFilter) return false;
    if (readFilter === 'unread' && a.read) return false;
    if (readFilter === 'read' && !a.read) return false;
    return true;
  });

  const unread = alerts.filter((a) => !a.read).length;

  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader
        title="Central de Alertas"
        subtitle={`${unread} alertas não lidos`}
        actions={
          <div className="flex items-center gap-2">
            {unread > 0 && (
              <button onClick={markAllRead} className="text-sm text-[#2D6A4F] font-medium hover:underline">
                Marcar todos como lidos
              </button>
            )}
          </div>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Filter size={14} className="text-gray-400" />
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${catFilter === c ? 'bg-[#2D6A4F] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#2D6A4F]'}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          <Select value={levelFilter} onChange={setLevelFilter} options={[
            { value: 'todos', label: 'Todos os níveis' },
            { value: 'info', label: 'Informativo' },
            { value: 'attention', label: 'Atenção' },
            { value: 'important', label: 'Importante' },
            { value: 'critical', label: 'Crítico' },
          ]} />
          <Select value={readFilter} onChange={setReadFilter} options={[
            { value: 'todos', label: 'Todos' },
            { value: 'unread', label: 'Não lidos' },
            { value: 'read', label: 'Lidos' },
          ]} />
        </div>
      </div>

      {/* Summary badges */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Informativo', count: alerts.filter((a) => a.level === 'info').length, color: 'bg-blue-100 text-blue-700' },
          { label: 'Atenção', count: alerts.filter((a) => a.level === 'attention').length, color: 'bg-amber-100 text-amber-700' },
          { label: 'Importante', count: alerts.filter((a) => a.level === 'important').length, color: 'bg-orange-100 text-orange-700' },
          { label: 'Crítico', count: alerts.filter((a) => a.level === 'critical').length, color: 'bg-red-100 text-red-700' },
        ].map((b) => (
          <div key={b.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${b.color} text-xs font-semibold`}>
            <Bell size={12} />
            {b.label}: {b.count}
          </div>
        ))}
      </div>

      {/* Alert cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Bell size={32} className="mx-auto mb-2 opacity-40" />
            <p className="font-medium">Nenhum alerta encontrado</p>
          </div>
        )}
        {filtered.map((a) => (
          <AlertCard
            key={a.id}
            level={a.level}
            category={a.category}
            title={a.title}
            description={a.description}
            time={a.time}
            read={a.read}
            icon={a.icon}
            onRead={() => markRead(a.id)}
          />
        ))}
      </div>
    </div>
  );
}
