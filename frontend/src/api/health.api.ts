import { API_BASE_URL, get } from './api';

export const checkHealth = async (): Promise<{ content: string }> => {
  return await get<{ content: string }>(`${API_BASE_URL}/api/health`).catch((e) => {
    return e.toLocaleString();
  });
};
