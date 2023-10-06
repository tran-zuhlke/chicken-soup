import { ExceptionResponse } from './dto/ExceptionResponse';
import { ApiException } from './api.exception';
import { ACCESS_TOKEN_KEY, readFromSessionStorage } from '../utils/sessionStorage';

const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL ?? '';
const serverStage = import.meta.env.VITE_SERVER_STAGE ?? '';

export const API_BASE_URL = !!serverStage ? `${serverBaseUrl}/${serverStage}` : serverBaseUrl;
export const AUTHORIZATION_HEADER_KEY = 'Authorization';
export const CONTENT_TYPE_HEADER_KEY = 'Content-Type';

export type RequestMethod = 'GET' | 'POST' | 'PUT';

const getAuthorizationInformation = () => {
  return `Bearer ${readFromSessionStorage(ACCESS_TOKEN_KEY) ?? ''}`;
};

const sendRequest = async <T>(
  url: string,
  method: RequestMethod,
  data?: any,
  headers: Record<string, string> = { [CONTENT_TYPE_HEADER_KEY]: 'application/json' }
): Promise<T> => {
  const response = await fetch(url, {
    method,
    headers: {
      ...headers,
      [AUTHORIZATION_HEADER_KEY]: getAuthorizationInformation(),
    },
    body: headers[CONTENT_TYPE_HEADER_KEY] === 'application/json' ? JSON.stringify(data) : data,
  });

  const responseBody = await response.json();
  if (!response.ok) {
    const error = responseBody as ExceptionResponse;
    console.error('The server responded with error: ', error.message);
    throw new ApiException(error.status, error.message);
  }
  return responseBody;
};

export const get = <T>(url: string): Promise<T> => sendRequest<T>(url, 'GET', undefined);

export const post = <T>(
  url: string,
  data: any,
  headers: Record<string, string> = { [CONTENT_TYPE_HEADER_KEY]: 'application/json' }
): Promise<T> => sendRequest<T>(url, 'POST', data, headers);

export const put = <T>(url: string, data: any): Promise<T> => sendRequest<T>(url, 'PUT', data);
