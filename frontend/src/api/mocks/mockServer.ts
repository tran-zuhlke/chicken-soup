import { setupWorker } from 'msw';
import { facadeApiMockHandlers } from './facade-api.mock-handlers';

export const worker = setupWorker(...facadeApiMockHandlers);
