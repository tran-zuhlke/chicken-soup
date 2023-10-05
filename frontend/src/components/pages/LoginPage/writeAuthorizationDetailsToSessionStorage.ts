import { TOKEN_KEY, writeToSessionStorage } from './sessionStorage';

export const writeAuthorizationDetailsToSessionStorage = (ptoken: string): void => {
  writeToSessionStorage(TOKEN_KEY, ptoken);
};
