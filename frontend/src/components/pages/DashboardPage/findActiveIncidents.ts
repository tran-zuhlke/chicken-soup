import { Incident } from '../../../types/Premise';

export const hasActiveIncident = (incidents: Incident[]) =>
  incidents.find((incident) => isIncidentActive(incident)) !== undefined;

export const isIncidentActive = (incident: Incident) => !incident.ignored && !incident.guardId;
