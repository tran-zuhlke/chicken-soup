import { setupServer } from 'msw/node';
import { apiMockHandlers } from './api-mock.handlers';

export const apiMocks = setupServer(...apiMockHandlers);
