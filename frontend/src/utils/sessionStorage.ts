export const USERNAME_KEY = 'username';
export const ACCESS_TOKEN_KEY = 'accessToken';

export const writeToSessionStorage = (key: string, value: string) => sessionStorage.setItem(key, value);
export const readFromSessionStorage = (key: string): string | null => sessionStorage.getItem(key);
