import React, { useState } from 'react';
import { AppScreen, User, UserProfile } from './types';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Producer pages
import ProducerDashboard from './pages/producer/Dashboard';
import ClimateMonitoring from './pages/producer/ClimateMonitoring';
import Forecasts from './pages/producer/Forecasts';
import Market from './pages/producer/Market';
import Alerts from './pages/producer/Alerts';
import HistoryPage from './pages/producer/History';
import Reports from './pages/producer/Reports';

// Analyst pages
import AnalystDashboard from './pages/analyst/Dashboard';
import DataQuality from './pages/analyst/DataQuality';
import PredictiveModels from './pages/analyst/PredictiveModels';
import ModelConfig from './pages/analyst/ModelConfig';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Permissions from './pages/admin/Permissions';
import Security from './pages/admin/Security';
import Logs from './pages/admin/Logs';
import Integrations from './pages/admin/Integrations';
import SettingsPage from './pages/admin/Settings';

const demoUsers: Record<UserProfile, User> = {
  producer: { name: 'João da Silva', email: 'joao@fazendaboavista.com', profile: 'producer', company: 'Fazenda Boa Vista' },
  analyst: { name: 'Maria Fernanda Costa', email: 'mfernanda@agroanalist.com', profile: 'analyst', company: 'AgroAnalyt' },
  admin: { name: 'Ana Beatriz Ramos', email: 'ana@admin.com', profile: 'admin', company: 'AgroClima Cloud' },
};

const defaultScreen: Record<UserProfile, AppScreen> = {
  producer: 'p-dashboard',
  analyst: 'a-dashboard',
  admin: 'adm-dashboard',
};

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('login');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (profile: UserProfile) => {
    setUser(demoUsers[profile]);
    setScreen(defaultScreen[profile]);
  };

  const handleLogout = () => {
    setUser(null);
    setScreen('login');
  };

  // Auth screens
  if (screen === 'login') return <Login onLogin={handleLogin} onNavigate={setScreen} />;
  if (screen === 'register') return <Register onNavigate={setScreen} />;
  if (screen === 'forgot-password') return <ForgotPassword onNavigate={setScreen} />;
  if (screen === 'reset-password') return <ForgotPassword onNavigate={setScreen} />;

  if (!user) return <Login onLogin={handleLogin} onNavigate={setScreen} />;

  const renderPage = () => {
    switch (screen) {
      // Producer
      case 'p-dashboard': return <ProducerDashboard />;
      case 'p-climate': return <ClimateMonitoring />;
      case 'p-forecasts': return <Forecasts />;
      case 'p-market': return <Market />;
      case 'p-alerts': return <Alerts />;
      case 'p-history': return <HistoryPage />;
      case 'p-reports': return <Reports />;
      // Analyst
      case 'a-dashboard': return <AnalystDashboard />;
      case 'a-data-quality': return <DataQuality />;
      case 'a-models': return <PredictiveModels />;
      case 'a-model-config': return <ModelConfig />;
      case 'a-forecasts': return <Forecasts />;
      case 'a-history': return <HistoryPage />;
      case 'a-reports': return <Reports />;
      // Admin
      case 'adm-dashboard': return <AdminDashboard />;
      case 'adm-users': return <Users />;
      case 'adm-permissions': return <Permissions />;
      case 'adm-security': return <Security />;
      case 'adm-logs': return <Logs />;
      case 'adm-integrations': return <Integrations />;
      case 'adm-settings': return <SettingsPage />;
      default: return <ProducerDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F0F4F1]">
      <Sidebar
        profile={user.profile}
        current={screen}
        onNavigate={setScreen}
        onLogout={handleLogout}
        userName={user.name}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header user={user} alertCount={3} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
