import React, { useState } from 'react';
import { Lock, CheckCircle, Info } from 'lucide-react';
import { SectionHeader, Card, Btn } from '../../components/ui';

type Role = 'produtor' | 'analista' | 'admin';
type Permission = 'view' | 'create' | 'edit' | 'delete' | 'admin';

const features = [
  { id: 'dashboard', label: 'Dashboard', group: 'Geral' },
  { id: 'climate', label: 'Monitoramento Climático', group: 'Monitoramento' },
  { id: 'forecasts', label: 'Previsões de Safra', group: 'Monitoramento' },
  { id: 'market', label: 'Mercado e Exportação', group: 'Monitoramento' },
  { id: 'alerts', label: 'Alertas', group: 'Monitoramento' },
  { id: 'history', label: 'Histórico', group: 'Dados' },
  { id: 'data_quality', label: 'Qualidade dos Dados', group: 'Dados' },
  { id: 'models', label: 'Modelos Preditivos', group: 'Análise' },
  { id: 'model_config', label: 'Configuração de Modelos', group: 'Análise' },
  { id: 'reports', label: 'Relatórios', group: 'Relatórios' },
  { id: 'users', label: 'Gerenciamento de Usuários', group: 'Administração' },
  { id: 'permissions', label: 'Permissões', group: 'Administração' },
  { id: 'security', label: 'Segurança', group: 'Administração' },
  { id: 'logs', label: 'Logs do Sistema', group: 'Administração' },
  { id: 'integrations', label: 'Integrações', group: 'Administração' },
  { id: 'settings', label: 'Configurações', group: 'Administração' },
];

type PermMatrix = Record<string, Record<Role, Record<Permission, boolean>>>;

const defaultMatrix: PermMatrix = Object.fromEntries(
  features.map((f) => [
    f.id,
    {
      produtor: {
        view: ['dashboard', 'climate', 'forecasts', 'market', 'alerts', 'history', 'reports'].includes(f.id),
        create: ['reports'].includes(f.id),
        edit: false,
        delete: false,
        admin: false,
      },
      analista: {
        view: !['users', 'permissions', 'security', 'logs', 'integrations', 'settings'].includes(f.id),
        create: ['reports', 'model_config'].includes(f.id),
        edit: ['model_config', 'models'].includes(f.id),
        delete: false,
        admin: false,
      },
      admin: {
        view: true, create: true, edit: true, delete: true, admin: true,
      },
    },
  ])
);

const permLabels: Record<Permission, string> = {
  view: 'Visualizar', create: 'Criar', edit: 'Editar', delete: 'Excluir', admin: 'Administrar',
};

const roleLabels: Record<Role, { label: string; color: string }> = {
  produtor: { label: 'Produtor/Exportador', color: 'text-emerald-700 bg-emerald-100' },
  analista: { label: 'Analista de Dados', color: 'text-blue-700 bg-blue-100' },
  admin: { label: 'Administrador', color: 'text-purple-700 bg-purple-100' },
};

const groups = [...new Set(features.map((f) => f.group))];

export default function Permissions() {
  const [matrix, setMatrix] = useState(defaultMatrix);
  const [saved, setSaved] = useState(false);

  const toggle = (featureId: string, role: Role, perm: Permission) => {
    if (role === 'admin') return;
    setMatrix((p) => ({
      ...p,
      [featureId]: {
        ...p[featureId],
        [role]: { ...p[featureId][role], [perm]: !p[featureId][role][perm] },
      },
    }));
    setSaved(false);
  };

  const save = () => setSaved(true);

  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader title="Permissões e Controle de Acesso (RBAC)"
        subtitle="Gerencie as permissões por perfil de usuário"
        actions={<Btn icon={<Lock size={14} />} onClick={save}>Salvar permissões</Btn>}
      />

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-emerald-800">
          <CheckCircle size={18} className="text-emerald-600" />
          <span className="text-sm font-medium">Permissões atualizadas com sucesso!</span>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Info size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-800">
          <strong>RBAC (Role-Based Access Control)</strong> — O controle de acesso é baseado em perfis. As permissões do Administrador não podem ser alteradas pois possuem acesso total ao sistema por padrão.
        </div>
      </div>

      {/* Role legend */}
      <div className="flex flex-wrap gap-3">
        {(Object.entries(roleLabels) as [Role, { label: string; color: string }][]).map(([role, info]) => (
          <span key={role} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${info.color}`}>{info.label}</span>
        ))}
      </div>

      {/* Matrix */}
      {groups.map((group) => (
        <Card key={group} title={group}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide min-w-48">Funcionalidade</th>
                  {(['produtor', 'analista', 'admin'] as Role[]).map((r) => (
                    <th key={r} colSpan={5} className={`text-center py-2.5 px-3 text-xs font-semibold ${roleLabels[r].color} rounded-lg mx-1`}>
                      {roleLabels[r].label}
                    </th>
                  ))}
                </tr>
                <tr className="border-b border-gray-100">
                  <th />
                  {(['produtor', 'analista', 'admin'] as Role[]).map((r) =>
                    (['view', 'create', 'edit', 'delete', 'admin'] as Permission[]).map((p) => (
                      <th key={`${r}-${p}`} className="text-center py-2 px-1 text-[10px] text-gray-400 font-medium">{permLabels[p]}</th>
                    ))
                  )}
                </tr>
              </thead>
              <tbody>
                {features.filter((f) => f.group === group).map((f) => (
                  <tr key={f.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2.5 px-3 text-sm text-gray-700 font-medium">{f.label}</td>
                    {(['produtor', 'analista', 'admin'] as Role[]).map((r) =>
                      (['view', 'create', 'edit', 'delete', 'admin'] as Permission[]).map((p) => (
                        <td key={`${r}-${p}`} className="text-center py-2.5 px-1">
                          <button
                            onClick={() => toggle(f.id, r, p)}
                            disabled={r === 'admin'}
                            className={`w-5 h-5 rounded flex items-center justify-center mx-auto transition-colors
                              ${matrix[f.id][r][p]
                                ? r === 'admin' ? 'bg-purple-500' : 'bg-[#2D6A4F]'
                                : 'bg-gray-200'}
                              ${r === 'admin' ? 'cursor-default' : 'cursor-pointer hover:opacity-80'}`}
                          >
                            {matrix[f.id][r][p] && <CheckCircle size={11} className="text-white" />}
                          </button>
                        </td>
                      ))
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ))}
    </div>
  );
}
