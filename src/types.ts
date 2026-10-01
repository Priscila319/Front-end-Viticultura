export type UserProfile = 'producer' | 'analyst' | 'admin';

export type AppScreen =
  | 'login' | 'register' | 'forgot-password' | 'reset-password'
  // Producer
  | 'p-dashboard' | 'p-climate' | 'p-forecasts' | 'p-market'
  | 'p-alerts' | 'p-history' | 'p-reports'
  // Analyst
  | 'a-dashboard' | 'a-data-quality' | 'a-models' | 'a-model-config'
  | 'a-forecasts' | 'a-history' | 'a-reports'
  // Admin
  | 'adm-dashboard' | 'adm-users' | 'adm-permissions' | 'adm-security'
  | 'adm-logs' | 'adm-integrations' | 'adm-settings';

export interface User {
  name: string;
  email: string;
  profile: UserProfile;
  company: string;
}
