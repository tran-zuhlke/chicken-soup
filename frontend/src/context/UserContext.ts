import { createContext } from 'react';

export interface UserContextData {
  token?: string;
  setToken: (projectToken: string) => void;
}

export const defaultUserContext: UserContextData = {
  setToken: () => {
    console.log('setToken not implemented');
  },
};
export const UserContext = createContext<UserContextData>(defaultUserContext);
