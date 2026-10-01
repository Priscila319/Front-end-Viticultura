import React, { useState } from 'react';
import { Bell, HelpCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  alertCount?: number;
}

export default function Header({ user, alertCount = 3 }: HeaderProps) {
  const [showAlerts, setShowAlerts] = useState(false);
  const online = true;

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 relative z-20">
      {/* Left: sync indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {online ? <Wifi size={14} className="text-emerald-500" /> : <WifiOff size={14} className="text-red-500" />}
          <span className="text-xs text-gray-500 font-mono-data">ThingSpeak •</span>
          <span className="text-xs text-emerald-600 font-semibold font-mono-data">15s atrás</span>
        </div>
        <div className="w-px h-4 bg-gray-200" />
        <div className="flex items-center gap-1.5">
          <RefreshCw size={12} className="text-gray-400 animate-spin" style={{ animationDuration: '3s' }} />
          <span className="text-xs text-gray-400">Atualizando...</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className="relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Bell size={18} />
            {alertCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {alertCount}
              </span>
            )}
          </button>
          {showAlerts && (
            <div className="absolute right-0 top-11 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="font-semibold text-gray-900 text-sm">Notificações</span>
                <span className="text-xs text-blue-600 cursor-pointer hover:underline">Marcar todas como lidas</span>
              </div>
              {[
                { level: 'attention', text: 'Umidade acima da faixa recomendada (78%)', time: '5 min' },
                { level: 'info', text: 'Janela de exportação favorável identificada', time: '1h' },
                { level: 'critical', text: 'Falha na sincronização com ThingSpeak', time: '2h' },
              ].map((a, i) => (
                <div key={i} className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start gap-2">
                    <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.level === 'critical' ? 'bg-red-500' : a.level === 'attention' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-800">{a.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">há {a.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="px-4 py-2.5 text-center">
                <span className="text-xs text-blue-600 cursor-pointer hover:underline">Ver todos os alertas</span>
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
          <HelpCircle size={18} />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200" />

        {/* User */}
        <div className="flex items-center gap-2.5">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-tight">{user.name}</p>
            <p className="text-xs text-gray-400">{user.company}</p>
          </div>
          <div className="w-8 h-8 bg-[#2D6A4F] rounded-full flex items-center justify-center text-sm font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
