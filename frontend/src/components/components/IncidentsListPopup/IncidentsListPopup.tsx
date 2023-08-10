import React, { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
  Popover,
  PopoverBody,
  Spinner,
} from 'reactstrap';
import { CgDanger } from 'react-icons/cg';
import { BsThreeDots } from 'react-icons/bs';
import { Camera, Incident } from '../../../types/Premise';
import { hasActiveIncident, isIncidentActive } from '../../pages/DashboardPage/findActiveIncidents';
import { testId } from '../../../testing/testId';
import { User } from '../../../types/User';
import moment from 'moment';
import './IncidentsListPopup.css';

export interface Props {
  cctv: Camera;
  guards: User[];
  onSendAlert: (incident: Incident, guardId: string) => Promise<void>;
  onIgnoreAlert: (incident: Incident) => Promise<void>;
}
const IncidentsListPopup: React.FC<Props> = ({ cctv, guards, onSendAlert, onIgnoreAlert }) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [modal, setModal] = useState(false);
  const [popover, setPopover] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | undefined>();
  const [updatingIncident, setUpdatingIncident] = useState(false);
  const toggleModal = () => setModal(!modal);
  const togglePopover = () => setPopover(!popover);

  useEffect(() => {
    if (cctv.incidents) {
      setIncidents(cctv.incidents);
    }
  }, [cctv.incidents, incidents]);

  const onOpenPopover = (incidentId: string) => {
    setSelectedIncidentId(incidentId);
    setPopover(true);
  };

  const onSendAlert_ = async (incident: Incident, guardId: string) => {
    setUpdatingIncident(true);
    setPopover(false);
    await onSendAlert(incident, guardId);
    setIncidents([...incidents]);
    setUpdatingIncident(false);
    setSelectedIncidentId(undefined);
  };

  const onIgnoreAlert_ = async (incident: Incident) => {
    setSelectedIncidentId(incident.id);
    setUpdatingIncident(true);
    await onIgnoreAlert(incident);
    setIncidents([...incidents]);
    setUpdatingIncident(false);
    setSelectedIncidentId(undefined);
  };

  const getGuardName = (guardId: string) => guards.find((guard) => guard.id === guardId)?.firstname ?? '';

  return (
    <div className="camera-incident-container">
      <Button
        type="button"
        color={hasActiveIncident(incidents) ? 'outline-danger' : ''}
        onClick={toggleModal}
        data-testid={testId.showIncidentPopoverButton}
      >
        {hasActiveIncident(incidents) && (
          <>
            <CgDanger data-testid={testId.hasActiveIncidentIcon} />{' '}
          </>
        )}
        <BsThreeDots size={20} />
      </Button>
      <Modal isOpen={modal} toggle={toggleModal} data-testid={testId.alertPopup}>
        <ModalHeader toggle={toggleModal}>{cctv.name} - Alerts List</ModalHeader>
        <ModalBody>
          <ListGroup flush className="incidents-container">
            {incidents.length < 1 && <p className="m-3">There are no alerts from this camera</p>}
            {incidents
              .sort((left, right) => (left.dateCreated < right.dateCreated ? 1 : -1))
              .map((incident) => (
                <ListGroupItem key={incident.id} className="incident-container" data-testid={testId.alertListGroupItem}>
                  <span>
                    {moment(incident.dateCreated).format('DD/MM/YYYY hh:mm A') +
                      `${incident.ignored ? ' - Ignored' : ''}` +
                      `${!!incident.guardId ? ' - Assigned to: ' + getGuardName(incident.guardId) : ''}`}
                  </span>
                  {isIncidentActive(incident) && (
                    <div className="incident-buttons-container">
                      {updatingIncident && selectedIncidentId === incident.id && (
                        <div className="loading-spinner">
                          <Spinner></Spinner>
                        </div>
                      )}
                      <Button
                        id={`popover-${incident.id}`}
                        type="button"
                        color="danger"
                        disabled={updatingIncident}
                        onClick={() => onOpenPopover(incident.id)}
                        data-testid={testId.sendAlertButton}
                      >
                        Send Alert
                      </Button>
                      <Popover
                        isOpen={popover && selectedIncidentId === incident.id}
                        toggle={togglePopover}
                        target={`popover-${incident.id}`}
                        data-testid={testId.incidentPopoverContainer}
                      >
                        <PopoverBody>
                          <ListGroup flush className="guards-buttons-container">
                            {guards.map((guard) => (
                              <ListGroupItem key={guard.id}>
                                <Button
                                  type="button"
                                  onClick={() => onSendAlert_(incident, guard.id)}
                                  data-testid={testId.alertGuardButton}
                                >
                                  {guard.firstname}
                                </Button>
                              </ListGroupItem>
                            ))}
                          </ListGroup>
                        </PopoverBody>
                      </Popover>
                      <Button
                        type="button"
                        color="outline-dark"
                        disabled={updatingIncident}
                        data-testid={testId.ignoreAlertButton}
                        onClick={() => onIgnoreAlert_(incident)}
                      >
                        Ignore
                      </Button>
                    </div>
                  )}
                </ListGroupItem>
              ))}
          </ListGroup>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default IncidentsListPopup;
