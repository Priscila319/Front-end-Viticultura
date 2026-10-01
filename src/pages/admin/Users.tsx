import React, { useState } from 'react';
import { UserPlus, Search, Edit3, Lock, Unlock, Trash2, CheckCircle } from 'lucide-react';
import { SectionHeader, Card, Table, Tr, Td, Btn, Modal, Input, Select } from '../../components/ui';

const initialUsers = [
  { id: 1, name: 'João da Silva', email: 'joao@fazendaboavista.com', profile: 'Produtor/Exportador', status: 'ativo', lastAccess: '29/Set 08:45' },
  { id: 2, name: 'Maria Fernanda Costa', email: 'mfernanda@agroanalist.com', profile: 'Analista de Dados', status: 'ativo', lastAccess: '29/Set 09:12' },
  { id: 3, name: 'Carlos Eduardo Lima', email: 'carlos@fazendaboavista.com', profile: 'Produtor/Exportador', status: 'ativo', lastAccess: '28/Set 17:30' },
  { id: 4, name: 'Ana Beatriz Ramos', email: 'ana@admin.com', profile: 'Administrador', status: 'ativo', lastAccess: '29/Set 07:00' },
  { id: 5, name: 'Pedro Oliveira', email: 'pedro@exportadora.com', profile: 'Produtor/Exportador', status: 'bloqueado', lastAccess: '15/Set 14:22' },
  { id: 6, name: 'Luisa Carvalho', email: 'luisa@analytics.com', profile: 'Analista de Dados', status: 'ativo', lastAccess: '29/Set 08:00' },
];

const profileColors: Record<string, string> = {
  'Produtor/Exportador': 'bg-emerald-100 text-emerald-700',
  'Analista de Dados': 'bg-blue-100 text-blue-700',
  'Administrador': 'bg-purple-100 text-purple-700',
};

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [profileFilter, setProfileFilter] = useState('todos');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [newModal, setNewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState<null | typeof initialUsers[0]>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', profile: 'Produtor/Exportador' });
  const [success, setSuccess] = useState('');

  const setNU = (k: string, v: string) => setNewUser((p) => ({ ...p, [k]: v }));

  const filtered = users.filter((u) => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (profileFilter !== 'todos' && u.profile !== profileFilter) return false;
    if (statusFilter !== 'todos' && u.status !== statusFilter) return false;
    return true;
  });

  const toggleBlock = (id: number) => {
    setUsers((p) => p.map((u) => u.id === id ? { ...u, status: u.status === 'ativo' ? 'bloqueado' : 'ativo' } : u));
    setSuccess('Usuário atualizado com sucesso.');
    setTimeout(() => setSuccess(''), 3000);
  };

  const deleteUser = (id: number) => {
    setUsers((p) => p.filter((u) => u.id !== id));
    setDeleteModal(null);
    setSuccess('Usuário excluído com sucesso.');
    setTimeout(() => setSuccess(''), 3000);
  };

  const createUser = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers((p) => [...p, { id: Date.now(), name: newUser.name, email: newUser.email, profile: newUser.profile, status: 'ativo', lastAccess: 'Nunca' }]);
    setNewModal(false);
    setNewUser({ name: '', email: '', profile: 'Produtor/Exportador' });
    setSuccess('Usuário criado com sucesso.');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="p-6 space-y-6 fade-in">
      <SectionHeader title="Gerenciamento de Usuários" subtitle={`${users.length} usuários cadastrados`}
        actions={<Btn icon={<UserPlus size={16} />} onClick={() => setNewModal(true)}>Novo usuário</Btn>}
      />

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-emerald-800">
          <CheckCircle size={18} className="text-emerald-600" />
          <span className="text-sm font-medium">{success}</span>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-48">
          <Input placeholder="Buscar por nome ou e-mail..." value={search} onChange={(e) => setSearch(e.target.value)} leftIcon={<Search size={15} />} />
        </div>
        <Select value={profileFilter} onChange={setProfileFilter} options={[
          { value: 'todos', label: 'Todos os perfis' },
          { value: 'Produtor/Exportador', label: 'Produtor/Exportador' },
          { value: 'Analista de Dados', label: 'Analista de Dados' },
          { value: 'Administrador', label: 'Administrador' },
        ]} />
        <Select value={statusFilter} onChange={setStatusFilter} options={[
          { value: 'todos', label: 'Todos os status' },
          { value: 'ativo', label: 'Ativos' },
          { value: 'bloqueado', label: 'Bloqueados' },
        ]} />
      </div>

      <Card>
        <Table headers={['Nome', 'E-mail', 'Perfil', 'Status', 'Último acesso', 'Ações']}>
          {filtered.map((u) => (
            <Tr key={u.id}>
              <Td>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {u.name.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-800">{u.name}</span>
                </div>
              </Td>
              <Td><span className="text-gray-500 text-xs">{u.email}</span></Td>
              <Td><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${profileColors[u.profile]}`}>{u.profile}</span></Td>
              <Td>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${u.status === 'ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {u.status === 'ativo' ? '● Ativo' : '● Bloqueado'}
                </span>
              </Td>
              <Td><span className="text-xs text-gray-400 font-mono-data">{u.lastAccess}</span></Td>
              <Td>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Editar">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => toggleBlock(u.id)} className={`p-1.5 rounded-lg transition-colors ${u.status === 'ativo' ? 'text-gray-400 hover:text-amber-600 hover:bg-amber-50' : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50'}`} title={u.status === 'ativo' ? 'Bloquear' : 'Desbloquear'}>
                    {u.status === 'ativo' ? <Lock size={14} /> : <Unlock size={14} />}
                  </button>
                  <button onClick={() => setDeleteModal(u)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Excluir">
                    <Trash2 size={14} />
                  </button>
                </div>
              </Td>
            </Tr>
          ))}
        </Table>
      </Card>

      {/* Create user modal */}
      <Modal open={newModal} onClose={() => setNewModal(false)} title="Novo usuário"
        actions={
          <>
            <Btn variant="outline" onClick={() => setNewModal(false)}>Cancelar</Btn>
            <Btn onClick={createUser} icon={<UserPlus size={14} />}>Criar usuário</Btn>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Nome completo *" placeholder="João da Silva" value={newUser.name} onChange={(e) => setNU('name', e.target.value)} />
          <Input label="E-mail *" type="email" placeholder="email@empresa.com" value={newUser.email} onChange={(e) => setNU('email', e.target.value)} />
          <Select label="Perfil de acesso *" value={newUser.profile} onChange={(v) => setNU('profile', v)} options={[
            { value: 'Produtor/Exportador', label: 'Produtor/Exportador' },
            { value: 'Analista de Dados', label: 'Analista de Dados' },
            { value: 'Administrador', label: 'Administrador' },
          ]} />
          <p className="text-xs text-gray-400">O usuário receberá um e-mail com instruções para criar sua senha.</p>
        </div>
      </Modal>

      {/* Delete modal */}
      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Confirmar exclusão"
        actions={
          <>
            <Btn variant="outline" onClick={() => setDeleteModal(null)}>Cancelar</Btn>
            <Btn variant="danger" icon={<Trash2 size={14} />} onClick={() => deleteUser(deleteModal!.id)}>Excluir usuário</Btn>
          </>
        }
      >
        <div className="space-y-3">
          <p className="text-sm text-gray-600">Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.</p>
          {deleteModal && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="font-semibold text-red-900">{deleteModal.name}</p>
              <p className="text-sm text-red-700">{deleteModal.email}</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
