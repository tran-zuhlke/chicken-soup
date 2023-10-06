import { ACCESS_TOKEN_KEY, USERNAME_KEY, writeToSessionStorage } from '../../../utils/sessionStorage';

export const writeAuthorizationDetailsToSessionStorage = (token: string, username: string): void => {
  writeToSessionStorage(ACCESS_TOKEN_KEY, token);
  writeToSessionStorage(USERNAME_KEY, token);
};
