import React, { useState } from 'react';
import { Thermometer, Droplets, Wifi, Clock, AlertCircle, RefreshCw, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { StatCard, SectionHeader, Card, Table, Tr, Td, StatusBadge, Tabs } from '../../components/ui';

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hora: `${String(i).padStart(2, '0')}h`,
  temp: +(20 + Math.sin(i * 0.5) * 6 + Math.random() * 1.5).toFixed(1),
  umidade: +(65 + Math.cos(i * 0.4) * 12 + Math.random() * 2).toFixed(1),
}));

const dailyData = [
  { dia: '23/Set', tempMax: 31, tempMin: 19, umidMedia: 68 },
  { dia: '24/Set', tempMax: 29, tempMin: 18, umidMedia: 72 },
  { dia: '25/Set', tempMax: 33, tempMin: 21, umidMedia: 61 },
  { dia: '26/Set', tempMax: 30, tempMin: 20, umidMedia: 65 },
  { dia: '27/Set', tempMax: 28, tempMin: 17, umidMedia: 74 },
  { dia: '28/Set', tempMax: 32, tempMin: 22, umidMedia: 63 },
  { dia: '29/Set', tempMax: 31, tempMin: 20, umidMedia: 67 },
];

const tableData = [
  { dt: '29/09 09:42', temp: 28.4, umid: 67, sensor: 'ESP32-001', status: 'ok' },
  { dt: '29/09 09:27', temp: 27.9, umid: 68, sensor: 'ESP32-001', status: 'ok' },
  { dt: '29/09 09:12', temp: 27.1, umid: 69, sensor: 'ESP32-001', status: 'ok' },
  { dt: '29/09 08:57', temp: 26.8, umid: 71, sensor: 'ESP32-001', status: 'ok' },
  { dt: '29/09 08:42', temp: 25.3, umid: 72, sensor: 'ESP32-002', status: 'warn' },
  { dt: '29/09 08:27', temp: 24.1, umid: 74, sensor: 'ESP32-001', status: 'ok' },
  { dt: '29/09 08:12', temp: 23.5, umid: 76, sensor: 'ESP32-002', status: 'ok' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-gray-600">{p.name}: <strong className="text-gray-900">{p.value}</strong></span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ClimateMonitoring() {
  const [tab, setTab] = useState('hora');

  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader title="Monitoramento Climático" subtitle="Dados em tempo real dos sensores IoT via ThingSpeak" />

      {/* ThingSpeak integration bar */}
      <div className="bg-[#1E3A5F] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
            <Wifi size={18} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-sm">ThingSpeak</span>
              <StatusBadge status="online" label="Conectado" />
            </div>
            <p className="text-xs text-blue-200">API REST / Channel Feeds • Channel ID: 2847391</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-white">
          <div className="text-center">
            <p className="text-xs text-blue-300">Última sincronização</p>
            <p className="font-mono-data text-sm font-semibold">09:42:15</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-blue-300">Registros hoje</p>
            <p className="font-mono-data text-sm font-semibold">1.248</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-blue-300">Intervalo</p>
            <p className="font-mono-data text-sm font-semibold">15 min</p>
          </div>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-3 py-1.5 text-sm">
            <RefreshCw size={14} />
            Atualizar
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Temperatura Atual" value="28,4" unit="°C" icon={<Thermometer size={18} />} trend="up" trendLabel="+0,5°C (1h)" color="amber" />
        <StatCard title="Umidade Relativa" value="67" unit="%" icon={<Droplets size={18} />} trend="down" trendLabel="-2% (1h)" color="blue" />
        <StatCard title="Status do Sensor" value="Online" icon={<Activity size={18} />} badge="ESP32-001" badgeColor="bg-emerald-100 text-emerald-700" color="green" />
        <StatCard title="Última Atualização" value="15s" icon={<Clock size={18} />} badge="Automático" badgeColor="bg-gray-100 text-gray-600" color="teal" />
      </div>

      {/* Charts with tabs */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <Card title="Temperatura"
          actions={<Tabs tabs={[{ id: 'hora', label: 'Por hora' }, { id: 'dia', label: 'Por dia' }]} active={tab} onChange={setTab} />}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={(tab === 'hora' ? hourlyData : dailyData) as any[]}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey={tab === 'hora' ? 'hora' : 'dia'} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey={tab === 'hora' ? 'temp' : 'tempMax'} name="Temp (°C)" stroke="#F59E0B" fill="url(#tempGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Umidade Relativa">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={(tab === 'hora' ? hourlyData : dailyData) as any[]}>
              <defs>
                <linearGradient id="umidGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey={tab === 'hora' ? 'hora' : 'dia'} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey={tab === 'hora' ? 'umidade' : 'umidMedia'} name="Umidade (%)" stroke="#3B82F6" fill="url(#umidGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Data table */}
      <Card title="Histórico de Leituras" actions={
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <RefreshCw size={12} className="animate-spin" style={{ animationDuration: '3s' }} />
          Última sincronização: há 15 segundos
        </div>
      }>
        <Table headers={['Data / Hora', 'Temperatura', 'Umidade', 'Sensor', 'Status']}>
          {tableData.map((r, i) => (
            <Tr key={i}>
              <Td><span className="font-mono-data text-xs">{r.dt}</span></Td>
              <Td><span className={`font-semibold ${r.temp > 30 ? 'text-orange-600' : 'text-gray-800'}`}>{r.temp} °C</span></Td>
              <Td><span className={`font-semibold ${r.umid > 75 ? 'text-amber-600' : 'text-gray-800'}`}>{r.umid}%</span></Td>
              <Td><span className="text-xs bg-gray-100 px-2 py-0.5 rounded-md font-mono-data">{r.sensor}</span></Td>
              <Td>
                {r.status === 'ok'
                  ? <StatusBadge status="online" label="OK" />
                  : <StatusBadge status="warning" label="Atenção" />}
              </Td>
            </Tr>
          ))}
        </Table>
      </Card>

      {/* Sensor status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['ESP32-001', 'ESP32-002'].map((s, i) => (
          <div key={s} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${i === 0 ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                <Activity size={18} className={i === 0 ? 'text-emerald-600' : 'text-amber-600'} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{s}</p>
                <p className="text-xs text-gray-500">Fazenda São João — Bloco {i + 1}</p>
              </div>
            </div>
            <div className="text-right">
              <StatusBadge status={i === 0 ? 'online' : 'warning'} label={i === 0 ? 'Online' : 'Sinal fraco'} />
              <p className="text-xs text-gray-400 mt-1 font-mono-data">28.4°C / 67%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
