import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  title: string;
  value: string;
  unit?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
  color?: 'green' | 'blue' | 'amber' | 'red' | 'teal';
  badge?: string;
  badgeColor?: string;
}

const colorMap = {
  green: { bg: 'bg-emerald-50', icon: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-200' },
  blue: { bg: 'bg-blue-50', icon: 'bg-blue-100 text-blue-700', border: 'border-blue-200' },
  amber: { bg: 'bg-amber-50', icon: 'bg-amber-100 text-amber-700', border: 'border-amber-200' },
  red: { bg: 'bg-red-50', icon: 'bg-red-100 text-red-700', border: 'border-red-200' },
  teal: { bg: 'bg-teal-50', icon: 'bg-teal-100 text-teal-700', border: 'border-teal-200' },
};

export function StatCard({ title, value, unit, icon, trend, trendLabel, color = 'green', badge, badgeColor }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className={`bg-white rounded-xl border ${c.border} p-5 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm font-medium text-gray-500 leading-tight">{title}</span>
        <div className={`w-9 h-9 rounded-lg ${c.icon} flex items-center justify-center flex-shrink-0`}>{icon}</div>
      </div>
      <div className="flex items-end gap-1 mb-1">
        <span className="font-display text-2xl font-700 text-gray-900 leading-none">{value}</span>
        {unit && <span className="text-sm text-gray-500 mb-0.5">{unit}</span>}
      </div>
      <div className="flex items-center justify-between">
        {trendLabel && (
          <div className="flex items-center gap-1">
            {trend === 'up' && <TrendingUp size={13} className="text-emerald-600" />}
            {trend === 'down' && <TrendingDown size={13} className="text-red-500" />}
            {trend === 'neutral' && <Minus size={13} className="text-gray-400" />}
            <span className={`text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>{trendLabel}</span>
          </div>
        )}
        {badge && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColor || 'bg-emerald-100 text-emerald-700'}`}>{badge}</span>
        )}
      </div>
    </div>
  );
}

// ─── Alert Badge ──────────────────────────────────────────────────────────────
type AlertLevel = 'info' | 'attention' | 'important' | 'critical';
const alertStyles: Record<AlertLevel, { border: string; bg: string; icon: string; badge: string; label: string }> = {
  info: { border: 'border-blue-200', bg: 'bg-blue-50', icon: 'text-blue-600', badge: 'bg-blue-100 text-blue-700', label: 'Informativo' },
  attention: { border: 'border-amber-200', bg: 'bg-amber-50', icon: 'text-amber-600', badge: 'bg-amber-100 text-amber-700', label: 'Atenção' },
  important: { border: 'border-orange-200', bg: 'bg-orange-50', icon: 'text-orange-600', badge: 'bg-orange-100 text-orange-700', label: 'Importante' },
  critical: { border: 'border-red-200', bg: 'bg-red-50', icon: 'text-red-600', badge: 'bg-red-100 text-red-700', label: 'Crítico' },
};

interface AlertCardProps {
  level: AlertLevel;
  category: string;
  title: string;
  description: string;
  time: string;
  read?: boolean;
  icon: React.ReactNode;
  onRead?: () => void;
}

export function AlertCard({ level, category, title, description, time, read, icon, onRead }: AlertCardProps) {
  const s = alertStyles[level];
  return (
    <div className={`rounded-xl border ${s.border} ${s.bg} p-4 ${read ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${s.icon}`}>{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.badge}`}>{s.label}</span>
            <span className="text-xs text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full">{category}</span>
            {!read && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
          </div>
          <p className="font-semibold text-gray-900 text-sm">{title}</p>
          <p className="text-sm text-gray-600 mt-0.5">{description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-400">{time}</span>
            {!read && onRead && (
              <button onClick={onRead} className="text-xs text-blue-600 hover:text-blue-700 font-medium">Marcar como lido</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
type StatusType = 'online' | 'offline' | 'warning' | 'syncing';
const statusConfig: Record<StatusType, { dot: string; text: string; label: string }> = {
  online: { dot: 'bg-emerald-500 status-pulse', text: 'text-emerald-700', label: 'Conectado' },
  offline: { dot: 'bg-red-500', text: 'text-red-700', label: 'Offline' },
  warning: { dot: 'bg-amber-500 status-pulse', text: 'text-amber-700', label: 'Atenção' },
  syncing: { dot: 'bg-blue-500 status-pulse', text: 'text-blue-700', label: 'Sincronizando' },
};
export function StatusBadge({ status, label }: { status: StatusType; label?: string }) {
  const c = statusConfig[status];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${c.dot}`} />
      <span className={`text-xs font-semibold ${c.text}`}>{label || c.label}</span>
    </span>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
export function SectionHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="font-display text-xl font-700 text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────
interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
}
const btnVariants = {
  primary: 'bg-[#2D6A4F] text-white hover:bg-[#245A42] shadow-sm',
  secondary: 'bg-[#52B788] text-white hover:bg-[#45A37A] shadow-sm',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
  outline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
};
const btnSizes = {
  sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
  md: 'text-sm px-4 py-2 rounded-lg gap-2',
  lg: 'text-sm px-5 py-2.5 rounded-xl gap-2',
};
export function Btn({ variant = 'primary', size = 'md', icon, loading, children, className = '', ...rest }: BtnProps) {
  return (
    <button
      className={`inline-flex items-center font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${btnVariants[variant]} ${btnSizes[size]} ${className}`}
      {...rest}
    >
      {loading ? <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : icon}
      {children}
    </button>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, className = '', title, actions }: { children: React.ReactNode; className?: string; title?: string; actions?: React.ReactNode }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          {title && <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

// ─── Table ────────────────────────────────────────────────────────────────────
export function Table({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {headers.map((h) => (
              <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Tr({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${className}`}>{children}</tr>;
}

export function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`py-3 px-4 text-gray-700 ${className}`}>{children}</td>;
}

// ─── Select ───────────────────────────────────────────────────────────────────
export function Select({ label, options, value, onChange }: { label?: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      {label && <label className="text-xs font-medium text-gray-500 block mb-1">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F]"
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}
export function Input({ label, error, hint, leftIcon, rightElement, className = '', ...rest }: InputProps) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium text-gray-700 block">{label}</label>}
      <div className="relative">
        {leftIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{leftIcon}</div>}
        <input
          className={`w-full text-sm border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:border-[#2D6A4F] transition-colors
            ${leftIcon ? 'pl-10' : ''}
            ${rightElement ? 'pr-10' : ''}
            ${error ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-[#2D6A4F]/30'}
            ${className}`}
          {...rest}
        />
        {rightElement && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
export function Tabs({ tabs, active, onChange }: { tabs: { id: string; label: string }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`text-sm px-4 py-1.5 rounded-lg font-medium transition-all ${active === t.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, actions }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; actions?: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md fade-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-display font-700 text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
        {actions && <div className="flex items-center justify-end gap-3 px-6 pb-6">{actions}</div>}
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 mb-4">{icon}</div>
      <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-xs">{description}</p>
    </div>
  );
}

// ─── Loading State ────────────────────────────────────────────────────────────
export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-10 h-10 border-4 border-[#2D6A4F]/20 border-t-[#2D6A4F] rounded-full animate-spin mb-4" />
      <p className="text-sm text-gray-500">Carregando dados...</p>
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
export function ProgressBar({ value, max = 100, color = 'green', label }: { value: number; max?: number; color?: string; label?: string }) {
  const pct = Math.min(100, (value / max) * 100);
  const barColor = color === 'green' ? 'bg-emerald-500' : color === 'blue' ? 'bg-blue-500' : color === 'amber' ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div>
      {label && <div className="flex justify-between text-xs text-gray-500 mb-1"><span>{label}</span><span>{value}%</span></div>}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
