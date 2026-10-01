import React, { useState } from 'react';
import { ScrollText, Eye, Filter } from 'lucide-react';
import { SectionHeader, Card, Table, Tr, Td, Select, Input, Modal } from '../../components/ui';

const allLogs = [
  { dt: '29/Set 09:42:15', user: 'joao@fazendaboavista.com', acao: 'LOGIN', modulo: 'Autenticação', ip: '189.124.32.15', resultado: 'Sucesso', detalhe: 'Login bem-sucedido via navegador Chrome/Windows' },
  { dt: '29/Set 09:41:30', user: 'mfernanda@agroanalist.com', acao: 'VISUALIZAR', modulo: 'Modelos Preditivos', ip: '177.92.18.200', resultado: 'Sucesso', detalhe: 'Acesso à tela de modelos preditivos' },
  { dt: '29/Set 09:40:05', user: 'ana@admin.com', acao: 'EDITAR', modulo: 'Usuários', ip: '200.140.32.88', resultado: 'Sucesso', detalhe: 'Permissões do usuário pedro@exportadora.com atualizadas' },
  { dt: '29/Set 09:38:22', user: 'tentativa@externo.com', acao: 'LOGIN', modulo: 'Autenticação', ip: '45.188.230.44', resultado: 'Falha', detalhe: 'Credenciais inválidas — 3ª tentativa' },
  { dt: '29/Set 09:35:10', user: 'carlos@fazendaboavista.com', acao: 'EXPORTAR', modulo: 'Relatórios', ip: '189.124.32.16', resultado: 'Sucesso', detalhe: 'Relatório climático exportado em PDF (setembro/2026)' },
  { dt: '29/Set 09:32:00', user: 'mfernanda@agroanalist.com', acao: 'EXECUTAR', modulo: 'Modelos Preditivos', ip: '177.92.18.200', resultado: 'Sucesso', detalhe: 'Treinamento do modelo v2.4 executado com sucesso' },
  { dt: '29/Set 09:28:44', user: 'ana@admin.com', acao: 'CRIAR', modulo: 'Usuários', ip: '200.140.32.88', resultado: 'Sucesso', detalhe: 'Novo usuário luisa@analytics.com criado — perfil: Analista' },
  { dt: '29/Set 09:12:05', user: 'pedro@exportadora.com', acao: 'LOGIN', modulo: 'Autenticação', ip: '200.225.118.72', resultado: 'Bloqueado', detalhe: 'Conta bloqueada por excesso de tentativas (5/5)' },
];

const resultColors: Record<string, string> = {
  'Sucesso': 'bg-emerald-100 text-emerald-700',
  'Falha': 'bg-red-100 text-red-700',
  'Bloqueado': 'bg-orange-100 text-orange-700',
};

export default function Logs() {
  const [search, setSearch] = useState('');
  const [modFilter, setModFilter] = useState('todos');
  const [resultFilter, setResultFilter] = useState('todos');
  const [detailLog, setDetailLog] = useState<null | typeof allLogs[0]>(null);

  const filtered = allLogs.filter((l) => {
    if (search && !l.user.includes(search) && !l.acao.includes(search.toUpperCase())) return false;
    if (modFilter !== 'todos' && l.modulo !== modFilter) return false;
    if (resultFilter !== 'todos' && l.resultado !== resultFilter) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader title="Logs do Sistema" subtitle="Auditoria completa de todas as ações realizadas no sistema" />

      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-48">
          <Input placeholder="Buscar por usuário ou ação..." value={search} onChange={(e) => setSearch(e.target.value)} leftIcon={<Filter size={15} />} />
        </div>
        <Select value={modFilter} onChange={setModFilter} options={[
          { value: 'todos', label: 'Todos os módulos' },
          { value: 'Autenticação', label: 'Autenticação' },
          { value: 'Usuários', label: 'Usuários' },
          { value: 'Modelos Preditivos', label: 'Modelos Preditivos' },
          { value: 'Relatórios', label: 'Relatórios' },
        ]} />
        <Select value={resultFilter} onChange={setResultFilter} options={[
          { value: 'todos', label: 'Todos os resultados' },
          { value: 'Sucesso', label: 'Sucesso' },
          { value: 'Falha', label: 'Falha' },
          { value: 'Bloqueado', label: 'Bloqueado' },
        ]} />
      </div>

      <Card>
        <Table headers={['Data/Hora', 'Usuário', 'Ação', 'Módulo', 'IP', 'Resultado', '']}>
          {filtered.map((l, i) => (
            <Tr key={i}>
              <Td><span className="font-mono-data text-xs text-gray-500">{l.dt}</span></Td>
              <Td><span className="text-xs text-gray-600">{l.user}</span></Td>
              <Td>
                <span className={`text-xs font-mono-data font-bold px-2 py-0.5 rounded-md ${
                  l.acao === 'LOGIN' ? 'bg-blue-100 text-blue-700'
                  : l.acao === 'EDITAR' ? 'bg-amber-100 text-amber-700'
                  : l.acao === 'CRIAR' ? 'bg-emerald-100 text-emerald-700'
                  : l.acao === 'EXCLUIR' ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-600'
                }`}>{l.acao}</span>
              </Td>
              <Td><span className="text-xs text-gray-600">{l.modulo}</span></Td>
              <Td><span className="font-mono-data text-xs text-gray-400">{l.ip}</span></Td>
              <Td>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${resultColors[l.resultado] || 'bg-gray-100 text-gray-600'}`}>{l.resultado}</span>
              </Td>
              <Td>
                <button onClick={() => setDetailLog(l)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                  <Eye size={14} />
                </button>
              </Td>
            </Tr>
          ))}
        </Table>
      </Card>

      <Modal open={!!detailLog} onClose={() => setDetailLog(null)} title="Detalhes do Log" actions={undefined}>
        {detailLog && (
          <div className="space-y-3 text-sm">
            {[
              { label: 'Data/Hora', value: detailLog.dt, mono: true },
              { label: 'Usuário', value: detailLog.user },
              { label: 'Ação', value: detailLog.acao, mono: true },
              { label: 'Módulo', value: detailLog.modulo },
              { label: 'Endereço IP', value: detailLog.ip, mono: true },
              { label: 'Resultado', value: detailLog.resultado },
              { label: 'Detalhes', value: detailLog.detalhe },
            ].map((r) => (
              <div key={r.label} className="flex justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-500 flex-shrink-0">{r.label}</span>
                <span className={`font-semibold text-gray-800 text-right ${r.mono ? 'font-mono-data' : ''}`}>{r.value}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
