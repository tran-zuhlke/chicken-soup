import { apiMocks } from '../src/api/mocks/api.mocks';

beforeAll(() => apiMocks.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => apiMocks.resetHandlers());
afterAll(() => apiMocks.close());
