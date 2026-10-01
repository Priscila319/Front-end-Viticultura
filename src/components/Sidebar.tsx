import React, { useState } from 'react';
import {
  LayoutDashboard, Cloud, TrendingUp, ShoppingCart, Bell, History,
  FileText, Database, Settings, Users, Shield, ScrollText, Link,
  ChevronLeft, ChevronRight, BarChart3, FlaskConical, Sliders,
  Lock, Activity, Sprout
} from 'lucide-react';
import { UserProfile, AppScreen } from '../types';

interface NavItem { id: AppScreen; label: string; icon: React.ReactNode; }

const producerNav: NavItem[] = [
  { id: 'p-dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'p-climate', label: 'Monitoramento Climático', icon: <Cloud size={18} /> },
  { id: 'p-forecasts', label: 'Previsões de Safra', icon: <Sprout size={18} /> },
  { id: 'p-market', label: 'Mercado e Exportação', icon: <ShoppingCart size={18} /> },
  { id: 'p-alerts', label: 'Alertas', icon: <Bell size={18} /> },
  { id: 'p-history', label: 'Histórico', icon: <History size={18} /> },
  { id: 'p-reports', label: 'Relatórios', icon: <FileText size={18} /> },
];

const analystNav: NavItem[] = [
  { id: 'a-dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'p-climate', label: 'Dados Climáticos', icon: <Cloud size={18} /> },
  { id: 'p-market', label: 'Dados de Mercado', icon: <BarChart3 size={18} /> },
  { id: 'a-data-quality', label: 'Qualidade dos Dados', icon: <Database size={18} /> },
  { id: 'a-models', label: 'Modelos Preditivos', icon: <FlaskConical size={18} /> },
  { id: 'a-model-config', label: 'Config. do Modelo', icon: <Sliders size={18} /> },
  { id: 'a-forecasts', label: 'Previsões', icon: <TrendingUp size={18} /> },
  { id: 'a-history', label: 'Histórico', icon: <History size={18} /> },
  { id: 'a-reports', label: 'Relatórios', icon: <FileText size={18} /> },
];

const adminNav: NavItem[] = [
  { id: 'adm-dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'adm-users', label: 'Usuários', icon: <Users size={18} /> },
  { id: 'adm-permissions', label: 'Permissões', icon: <Lock size={18} /> },
  { id: 'adm-security', label: 'Segurança', icon: <Shield size={18} /> },
  { id: 'adm-logs', label: 'Logs do Sistema', icon: <ScrollText size={18} /> },
  { id: 'adm-integrations', label: 'Integrações', icon: <Link size={18} /> },
  { id: 'adm-settings', label: 'Configurações', icon: <Settings size={18} /> },
];

const navByProfile: Record<UserProfile, NavItem[]> = {
  producer: producerNav,
  analyst: analystNav,
  admin: adminNav,
};

const profileLabels: Record<UserProfile, { label: string; color: string }> = {
  producer: { label: 'Produtor/Exportador', color: 'bg-emerald-100 text-emerald-800' },
  analyst: { label: 'Analista de Dados', color: 'bg-blue-100 text-blue-800' },
  admin: { label: 'Administrador', color: 'bg-purple-100 text-purple-800' },
};

interface SidebarProps {
  profile: UserProfile;
  current: AppScreen;
  onNavigate: (s: AppScreen) => void;
  onLogout: () => void;
  userName: string;
}

export default function Sidebar({ profile, current, onNavigate, onLogout, userName }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const nav = navByProfile[profile];
  const prof = profileLabels[profile];

  return (
    <aside
      className={`relative flex flex-col bg-[#1B4332] text-white sidebar-transition flex-shrink-0 ${collapsed ? 'w-16' : 'w-60'}`}
      style={{ minHeight: '100vh' }}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 bg-[#52B788] rounded-lg flex items-center justify-center flex-shrink-0">
          <Cloud size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="font-display font-700 text-sm text-white leading-tight">AgroClima</div>
            <div className="text-xs text-emerald-400 font-medium leading-tight">Cloud</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {nav.map((item) => {
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all mb-0.5
                ${active
                  ? 'bg-[#52B788] text-white'
                  : 'text-emerald-200 hover:bg-white/10 hover:text-white'}
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="text-left leading-tight">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User info */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-[#52B788] rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{userName}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${prof.color}`}>{prof.label}</span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full text-sm text-emerald-300 hover:text-white flex items-center gap-2 py-1 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sair
          </button>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
