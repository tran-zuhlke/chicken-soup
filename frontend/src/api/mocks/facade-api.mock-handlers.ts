import { rest } from 'msw';
import { API_BASE_URL } from '../api';
import { mockedUserResponse } from './mockdata/mocked-user.response';
import { mockedPremisesResponse } from './mockdata/mocked-premises.response';
import { mockedGenericResponse } from './mockdata/mocked-generic.response';
import { mockedGuardsResponse } from './mockdata/mocked-guards.response';

export const facadeApiMockHandlers = [
  rest.post(`${API_BASE_URL}/login`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedUserResponse));
  }),

  rest.get(`${API_BASE_URL}/guards`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedGuardsResponse));
  }),

  rest.get(`${API_BASE_URL}/premises/relations`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedPremisesResponse));
  }),

  rest.put(`${API_BASE_URL}/incidents/:incidentId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedGenericResponse));
  }),

  rest.get(`${API_BASE_URL}/incidents/new`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];
