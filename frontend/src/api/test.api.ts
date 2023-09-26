import { API_BASE_URL, get } from './api';

export const touchBackend = async (): Promise<{ content: string }> => {
  return await get<{ content: string }>(`${API_BASE_URL}/api/test`);
};
