import { Incident, Premise } from '../../../types/Premise';
import { getNewIncidentsAndNotify } from './getNewIncidentsAndNotify';
import { waitFor } from '@testing-library/react';

const getNewIncidentsMock = vi.hoisted(() => vi.fn());
vi.mock('../../../api/incidents.api', () => ({
  getNewIncidents: getNewIncidentsMock,
}));

describe('Get new incidents and notify', () => {
  const activeIncident: Incident = {
    id: '63c0cf4cbb90b139dd6f6805',
    name: 'Stranger detected',
    ignored: false,
    dateCreated: '2023-07-26T11:13:42.908Z',
    cameraId: 'cam_1',
  };
  const ignoredIncident: Incident = {
    id: '63c0cf4cbb90b139dd6f7805',
    name: 'Dog detected',
    ignored: true,
    dateCreated: '2023-05-15T11:12:42.908Z',
    cameraId: 'cam_1',
  };
  const assignedIncident: Incident = {
    id: '63c0cf4cbb90b139dd6f8805',
    name: 'Cat detected',
    ignored: false,
    guardId: '63c0cf4cbb90b139dd6f6804',
    dateCreated: '2023-05-15T11:13:42.908Z',
    cameraId: 'cam_1',
  };

  const camera = {
    id: 'cam_1',
    streamUrl: 'https://s2.livecam-pro.live/cam056/tracks-v1/mono.m3u8',
    name: 'Camera 1',
    premiseId: '1',
    incidents: [assignedIncident, ignoredIncident],
  };
  const premise: Premise = {
    id: '1',
    name: 'Floor 1',
    cameras: [camera],
  };

  const setPremisesMock = vi.hoisted(() => vi.fn());
  const setSelectedPremiseMock = vi.hoisted(() => vi.fn());

  describe('getNewIncidentsAndNotify', () => {
    it('should do nothing if there is no new incidents', () => {
      getNewIncidentsMock.mockResolvedValue([]);

      getNewIncidentsAndNotify([], setPremisesMock, undefined, setSelectedPremiseMock);

      expect(setPremisesMock).not.toBeCalled();
      expect(setSelectedPremiseMock).not.toBeCalled();
    });

    it('should update premises state if there is a new incident', async () => {
      const clonedPremise = JSON.parse(JSON.stringify(premise)) as Premise;
      getNewIncidentsMock.mockResolvedValue([activeIncident]);

      getNewIncidentsAndNotify([clonedPremise], setPremisesMock, undefined, setSelectedPremiseMock);

      await waitFor(() => expect(setPremisesMock).toBeCalled());
      await waitFor(() =>
        expect(setPremisesMock).toBeCalledWith([
          { ...premise, cameras: [{ ...camera, incidents: [...camera.incidents, activeIncident] }] },
        ])
      );
      expect(setSelectedPremiseMock).not.toBeCalled();
    });

    it('should update premises and selectedPremise states if there is a new incident belonging to selected premise', async () => {
      const clonedPremise = JSON.parse(JSON.stringify(premise)) as Premise;
      const expectedPremise = {
        ...premise,
        cameras: [{ ...camera, incidents: [...camera.incidents, activeIncident] }],
      };
      getNewIncidentsMock.mockResolvedValue([activeIncident]);

      getNewIncidentsAndNotify([clonedPremise], setPremisesMock, clonedPremise, setSelectedPremiseMock);

      await waitFor(() => expect(setPremisesMock).toBeCalled());
      await waitFor(() => expect(setPremisesMock).toBeCalledWith([expectedPremise]));
      await waitFor(() => expect(setSelectedPremiseMock).toBeCalledWith(expectedPremise));
    });
  });
});
