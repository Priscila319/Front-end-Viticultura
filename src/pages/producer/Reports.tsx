import React, { useState } from 'react';
import { FileText, Download, Eye, Cloud, Sprout, BarChart3, Truck, Bell } from 'lucide-react';
import { SectionHeader, Card, Select, Btn } from '../../components/ui';

const reportTypes = [
  { id: 'clima', icon: <Cloud size={20} />, title: 'Relatório Climático', desc: 'Temperatura, umidade, precipitação e condições ao longo do período.', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { id: 'safra', icon: <Sprout size={20} />, title: 'Relatório de Safra', desc: 'Colheita por período, cultura, produtividade e janelas recomendadas.', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { id: 'mercado', icon: <BarChart3 size={20} />, title: 'Relatório de Mercado', desc: 'Evolução de preços, demanda por destino e tendências de mercado.', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { id: 'exportacao', icon: <Truck size={20} />, title: 'Relatório de Exportação', desc: 'Logística, destinos, volumes exportados e receita estimada.', color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { id: 'alertas', icon: <Bell size={20} />, title: 'Relatório de Alertas', desc: 'Histórico de alertas, incidentes e ações realizadas no período.', color: 'bg-red-50 border-red-200 text-red-700' },
];

export default function Reports() {
  const [periodo, setPeriodo] = useState('mes');
  const [cultura, setCultura] = useState('todas');
  const [fazenda, setFazenda] = useState('todas');
  const [selected, setSelected] = useState('safra');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1200));
    setGenerating(false);
    setGenerated(true);
  };

  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader title="Relatórios" subtitle="Gere e exporte relatórios personalizados da sua operação" />

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 text-sm mb-4">Configurações do relatório</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Select label="Período" value={periodo} onChange={setPeriodo} options={[
            { value: 'semana', label: 'Última semana' }, { value: 'mes', label: 'Último mês' },
            { value: 'trimestre', label: 'Último trimestre' }, { value: 'ano', label: 'Último ano' },
            { value: 'custom', label: 'Personalizado' },
          ]} />
          <Select label="Cultura" value={cultura} onChange={setCultura} options={[
            { value: 'todas', label: 'Todas' }, { value: 'uva', label: 'Uva' },
            { value: 'manga', label: 'Manga' }, { value: 'melao', label: 'Melão' },
          ]} />
          <Select label="Propriedade" value={fazenda} onChange={setFazenda} options={[
            { value: 'todas', label: 'Todas' }, { value: 'sjb', label: 'Fazenda São João' },
            { value: 'bv', label: 'Fazenda Boa Vista' },
          ]} />
        </div>
      </div>

      {/* Report types */}
      <div>
        <h3 className="font-semibold text-gray-800 text-sm mb-3">Selecione o tipo de relatório</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((r) => (
            <button
              key={r.id}
              onClick={() => { setSelected(r.id); setGenerated(false); }}
              className={`text-left rounded-xl border-2 p-4 transition-all ${selected === r.id ? 'border-[#2D6A4F] bg-emerald-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${r.color}`}>
                {r.icon}
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{r.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{r.desc}</p>
              {selected === r.id && <div className="mt-2 text-xs text-[#2D6A4F] font-semibold">✓ Selecionado</div>}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Btn icon={<Eye size={16} />} loading={generating} onClick={generate}>Visualizar</Btn>
        {generated && (
          <>
            <Btn variant="outline" icon={<Download size={16} />}>Exportar PDF</Btn>
            <Btn variant="outline" icon={<Download size={16} />}>Exportar CSV</Btn>
          </>
        )}
      </div>

      {/* Preview */}
      {generated && (
        <Card title={`Preview — ${reportTypes.find((r) => r.id === selected)?.title}`}>
          <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-200">
            <FileText size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-display font-700 text-gray-800 text-lg mb-2">
              {reportTypes.find((r) => r.id === selected)?.title}
            </h3>
            <p className="text-sm text-gray-500 mb-1">Período: {periodo === 'mes' ? 'Último mês' : periodo}</p>
            <p className="text-sm text-gray-500 mb-4">Gerado em: 29/09/2026 às 09:42</p>
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mt-6">
              {[
                { label: 'Registros', value: '1.248' },
                { label: 'Gráficos', value: '6' },
                { label: 'Páginas', value: '12' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
