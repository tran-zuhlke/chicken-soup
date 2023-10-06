import { API_BASE_URL, get } from './api';
import { Dish } from '../types/Dish';

export const getDishes = async (): Promise<Dish[]> => {
  return await get<Dish[]>(`${API_BASE_URL}/api/dishes`).catch((e) => {
    return e.toLocaleString();
  });
};
