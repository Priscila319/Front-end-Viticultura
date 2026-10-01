import { api } from './api';

export interface DadosClima {
  temperatura: number;
  umidade: number;
  previsaoColheitaDias: number;
}

export const agroService = {
  // Buscar os dados do painel principal
  getDashboardData: async (): Promise<DadosClima> => {
    const response = await api.get<DadosClima>('/dashboard');
    return response.data;
  },

  enviarAlerta: async (mensagem: string) => {
    const response = await api.post('/alertas', { mensagem });
    return response.data;
  },
};