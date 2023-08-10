import { API_BASE_URL, get, put } from './api';
import { GenericResponse } from './dto/generic.response';
import { Incident } from '../types/Premise';

export const sendAlert = async (incidentId, guardId): Promise<GenericResponse> => {
  return await put<GenericResponse>(`${API_BASE_URL}/incidents/${incidentId}`, { guardId: guardId });
};

export const ignoreAlert = async (incidentId): Promise<GenericResponse> => {
  return await put<GenericResponse>(`${API_BASE_URL}/incidents/${incidentId}`, { ignore: true });
};

export const getNewIncidents = async (excludedIncidentIds: string[]): Promise<Incident[]> => {
  return await get<Incident[]>(`${API_BASE_URL}/incidents/new?incidentIds=${excludedIncidentIds.join(',')}`);
};
