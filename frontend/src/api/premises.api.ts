import { API_BASE_URL, get } from './api';
import { Premise } from '../types/Premise';

export const getPremises = async (): Promise<Premise[]> => {
  return await get<Premise[]>(`${API_BASE_URL}/premises/relations`);
};
