import { API_BASE_URL, post } from './api';

export const login = async (username: string, password: string): Promise<{ access_token: string }> => {
  return await post<{ access_token: string }>(`${API_BASE_URL}/api/auth/login`, { username, password }).catch((e) => {
    return e.toLocaleString();
  });
};
