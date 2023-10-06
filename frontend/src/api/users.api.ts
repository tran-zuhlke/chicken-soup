import { API_BASE_URL, get, post } from './api';

export const login = async (username: string, password: string): Promise<{ access_token: string }> => {
  return await post<{ access_token: string }>(`${API_BASE_URL}/api/auth/login`, { username, password }).catch((e) => {
    return e.toLocaleString();
  });
};

export const getUserProfile = async (): Promise<{ username: string }> => {
  return await get<{ username: string }>(`${API_BASE_URL}/api/auth/profile`).catch((e) => {
    return e.toLocaleString();
  });
};
