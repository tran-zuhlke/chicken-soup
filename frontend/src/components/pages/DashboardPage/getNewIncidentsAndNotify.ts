import { Premise } from '../../../types/Premise';
import { getNewIncidents } from '../../../api/incidents.api';
import toast from 'react-hot-toast';
import moment from 'moment/moment';

export const getNewIncidentsAndNotify = (premises, setPremises, selectedPremise, setSelectedPremise) => {
  const cameras = premises.flatMap((premise) => premise.cameras);
  const incidentIds = cameras.flatMap((camera) => camera.incidents).map((incident) => incident!.id);
  getNewIncidents(incidentIds).then((newIncidents) => {
    if (newIncidents.length < 1) {
      return;
    }
    const mapIncidentCameraId = newIncidents.reduce(function (map, incident) {
      if (map[incident.cameraId]) {
        map[incident.cameraId].push(incident);
      } else {
        map[incident.cameraId] = [incident];
      }
      return map;
    }, {});
    cameras.forEach((camera) => {
      if (mapIncidentCameraId[camera.id]) {
        camera.incidents?.push(...mapIncidentCameraId[camera.id]);
        mapIncidentCameraId[camera.id].forEach((incident) => {
          toast.error(`New Alert for ${camera.name} at ${moment(incident.dateCreated).format('DD/MM/YYYY hh:mm A')}`, {
            position: 'top-center',
          });
        });
      }
    });
    setPremises([...premises]);
    if (selectedPremise) {
      setSelectedPremise({ ...(premises.find((premise) => premise.id === selectedPremise.id) as Premise) });
    }
  });
};
