import { ExceptionResponse } from './dto/ExceptionResponse';
import { ApiException } from './api.exception';
import { basePathPrefix } from '../navigation/basePathPrefix';

const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL ?? '';
const serverStage = import.meta.env.VITE_SERVER_STAGE ?? '';
const xApiKey = import.meta.env.VITE_X_API_KEY ?? '';

export const API_BASE_URL = !!serverStage ? `${serverBaseUrl}/${serverStage}` : serverBaseUrl;
export const X_API_KEY_HEADER = 'x-api-key';
export const CONTENT_TYPE_HEADER_KEY = 'Content-Type';

export type RequestMethod = 'GET' | 'POST' | 'PUT';

const sendRequest = async <T>(
  url: string,
  method: RequestMethod,
  data?: any,
  headers: Record<string, string> = { [CONTENT_TYPE_HEADER_KEY]: 'application/json' }
): Promise<T> => {
  const response = await fetch(url, {
    method,
    // mode: 'cors',
    headers: {
      ...headers,
      [X_API_KEY_HEADER]: xApiKey,
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
