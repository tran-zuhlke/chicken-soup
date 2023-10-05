export const TOKEN_KEY = 'token';

export const writeToSessionStorage = (key: string, value: string) => sessionStorage.setItem(key, value);
export const readFromSessionStorage = (key: string): string | null => sessionStorage.getItem(key);
