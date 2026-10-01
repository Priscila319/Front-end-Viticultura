import React, { useState } from 'react';
import { Sliders, Save, Play, CheckCircle } from 'lucide-react';
import { SectionHeader, Card, Input, Select, Btn, Modal, ProgressBar } from '../../components/ui';

export default function ModelConfig() {
  const [config, setConfig] = useState({
    modelo: 'gradient_boost',
    periodo: '90',
    treino: '80',
    useTemp: true, useUmid: true, usePreco: true, useDemanda: true,
    usePrecipitacao: false, useSazonalidade: true,
    nEstimators: '200', maxDepth: '6', learningRate: '0.1',
  });
  const [saved, setSaved] = useState(false);
  const [runModal, setRunModal] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const set = (k: string, v: any) => { setConfig((p) => ({ ...p, [k]: v })); setSaved(false); };

  const save = async () => {
    await new Promise((r) => setTimeout(r, 500));
    setSaved(true);
  };

  const run = async () => {
    setRunning(true);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 200));
      setProgress(i);
    }
    setRunning(false);
    setRunModal(false);
    setProgress(0);
  };

  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader title="Configuração do Modelo" subtitle="Ajuste os parâmetros e variáveis do modelo preditivo"
        actions={
          <div className="flex gap-2">
            <Btn variant="outline" size="sm" icon={<Save size={14} />} onClick={save}>Salvar configuração</Btn>
            <Btn size="sm" icon={<Play size={14} />} onClick={() => setRunModal(true)}>Executar modelo</Btn>
          </div>
        }
      />

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-emerald-800">
          <CheckCircle size={18} className="text-emerald-600" />
          <span className="text-sm font-medium">Configuração salva com sucesso!</span>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Model & Period */}
        <div className="xl:col-span-2 space-y-5">
          <Card title="Algoritmo e Período">
            <div className="grid grid-cols-2 gap-4">
              <Select label="Modelo / Algoritmo" value={config.modelo} onChange={(v) => set('modelo', v)} options={[
                { value: 'gradient_boost', label: 'Gradient Boosting' },
                { value: 'random_forest', label: 'Random Forest' },
                { value: 'linear_regression', label: 'Regressão Linear' },
                { value: 'xgboost', label: 'XGBoost' },
                { value: 'lstm', label: 'LSTM (Neural Network)' },
              ]} />
              <Select label="Período histórico" value={config.periodo} onChange={(v) => set('periodo', v)} options={[
                { value: '30', label: '30 dias' }, { value: '60', label: '60 dias' },
                { value: '90', label: '90 dias' }, { value: '180', label: '180 dias' },
                { value: '365', label: '1 ano' },
              ]} />
            </div>
          </Card>

          <Card title="Variáveis de Entrada">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { key: 'useTemp', label: 'Temperatura', desc: 'ESP32 via ThingSpeak' },
                { key: 'useUmid', label: 'Umidade', desc: 'ESP32 via ThingSpeak' },
                { key: 'usePreco', label: 'Preço de mercado', desc: 'API Mercado' },
                { key: 'useDemanda', label: 'Demanda export.', desc: 'API Mercado' },
                { key: 'usePrecipitacao', label: 'Precipitação', desc: 'INMET' },
                { key: 'useSazonalidade', label: 'Sazonalidade', desc: 'Histórico interno' },
              ].map((v) => (
                <label key={v.key} className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${(config as any)[v.key] ? 'border-[#2D6A4F] bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="checkbox" checked={(config as any)[v.key]} onChange={(e) => set(v.key, e.target.checked)} className="mt-0.5 accent-[#2D6A4F]" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{v.label}</p>
                    <p className="text-xs text-gray-400">{v.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </Card>

          <Card title="Divisão Treino / Teste">
            <div className="space-y-4">
              <Select label="Percentual de dados para treinamento" value={config.treino} onChange={(v) => set('treino', v)} options={[
                { value: '70', label: '70% treino / 30% teste' },
                { value: '80', label: '80% treino / 20% teste' },
                { value: '90', label: '90% treino / 10% teste' },
              ]} />
              <div>
                <ProgressBar value={parseInt(config.treino)} label={`Treino: ${config.treino}% — Teste: ${100 - parseInt(config.treino)}%`} color="green" />
              </div>
              <p className="text-xs text-gray-400">Com 48.291 registros disponíveis: ~{Math.round(48291 * parseInt(config.treino) / 100).toLocaleString()} para treino e ~{Math.round(48291 * (100 - parseInt(config.treino)) / 100).toLocaleString()} para teste.</p>
            </div>
          </Card>
        </div>

        {/* Hyperparameters */}
        <div className="space-y-5">
          <Card title="Hiperparâmetros">
            <div className="space-y-4">
              <Input label="n_estimators (número de árvores)" type="number" value={config.nEstimators} onChange={(e) => set('nEstimators', e.target.value)} hint="Recomendado: 100–500" />
              <Input label="max_depth (profundidade máxima)" type="number" value={config.maxDepth} onChange={(e) => set('maxDepth', e.target.value)} hint="Recomendado: 3–10" />
              <Input label="learning_rate (taxa de aprendizado)" type="number" step="0.01" value={config.learningRate} onChange={(e) => set('learningRate', e.target.value)} hint="Recomendado: 0.01–0.3" />
            </div>
          </Card>

          <Card title="Resumo da Configuração">
            <div className="space-y-2 text-sm">
              {[
                { label: 'Algoritmo', value: 'Gradient Boosting' },
                { label: 'Período', value: `${config.periodo} dias` },
                { label: 'Variáveis', value: [config.useTemp, config.useUmid, config.usePreco, config.useDemanda, config.usePrecipitacao, config.useSazonalidade].filter(Boolean).length + ' ativas' },
                { label: 'Treino/Teste', value: `${config.treino}/${100 - parseInt(config.treino)}` },
                { label: 'n_estimators', value: config.nEstimators },
                { label: 'learning_rate', value: config.learningRate },
              ].map((r) => (
                <div key={r.label} className="flex justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <span className="text-gray-500">{r.label}</span>
                  <span className="font-semibold text-gray-800 font-mono-data">{r.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Modal open={runModal} onClose={() => !running && setRunModal(false)} title="Confirmar execução do modelo"
        actions={
          <>
            <Btn variant="outline" onClick={() => setRunModal(false)} disabled={running}>Cancelar</Btn>
            <Btn loading={running} onClick={run} icon={<Play size={14} />}>
              {running ? `Treinando... ${progress}%` : 'Executar modelo'}
            </Btn>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Você está prestes a executar o treinamento do modelo com as configurações atuais. Este processo pode levar de 5 a 30 minutos.</p>
          {running && <ProgressBar value={progress} label={`Progresso: ${progress}%`} color="green" />}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Algoritmo:</span><strong>Gradient Boosting</strong></div>
            <div className="flex justify-between"><span className="text-gray-500">Dados:</span><strong>48.291 registros</strong></div>
            <div className="flex justify-between"><span className="text-gray-500">Tempo estimado:</span><strong>~8 minutos</strong></div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
