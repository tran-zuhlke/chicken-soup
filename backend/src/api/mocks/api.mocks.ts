import { setupServer } from 'msw/node';
import { facadeApiMockHandlers } from './facade-api.mock-handlers';

export const apiMocks = setupServer(...facadeApiMockHandlers);
