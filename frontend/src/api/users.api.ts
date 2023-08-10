import { API_BASE_URL, get } from './api';
import { User } from '../types/User';

export const login = async (username: string, password: string): Promise<User> => {
  // TODO: no need for login api in POC
  return {
    id: '63c0cf4cbb90b139dd6f6804',
    username: 'testuser',
    firstname: 'John',
    accessToken: 'TTiHS0SDaEMQ9VgDUu43kZ5DaHXnHzPTxBQm2KUMz2C5zh3tq4RFGTGAnB0rv8ow',
  };
};

export const getGuards = async (): Promise<User[]> => {
  return await get<User[]>(`${API_BASE_URL}/guards`);
};
