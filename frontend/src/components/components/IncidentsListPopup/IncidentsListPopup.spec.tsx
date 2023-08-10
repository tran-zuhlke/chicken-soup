import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testId } from '../../../testing/testId';
import { Incident, Premise } from '../../../types/Premise';
import { User } from '../../../types/User';
import IncidentsListPopup from './IncidentsListPopup';

describe(IncidentsListPopup.name, () => {
  const user = userEvent.setup();

  const guard: User = {
    id: '63c0cf4cbb90b139dd6f6804',
    username: 'testuser1',
    firstname: 'John',
    accessToken: 'TTiHS0SDaEMQ9VgDUu43kZ5DaHXnHzPTxBQm2KUMz2C5zh3tq4RFGTGAnB0rv8ow',
  };
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

  beforeEach(() => {
    vi.resetModules();
  });

  const onIgnoreAlertMock = vi.hoisted(() => vi.fn());
  const onSendAlertMock = vi.hoisted(() => vi.fn());

  it('should render 3 dots even if there is no incident', async () => {
    render(
      <IncidentsListPopup
        cctv={{ ...camera, incidents: [] }}
        guards={[guard]}
        onIgnoreAlert={onIgnoreAlertMock}
        onSendAlert={onSendAlertMock}
      />
    );

    expect(screen.getByTestId(testId.showIncidentPopoverButton)).toBeVisible();
    expect(screen.getByTestId(testId.showIncidentPopoverButton)).toBeEnabled();
    expect(screen.queryByTestId(testId.hasActiveIncidentIcon)).toBeFalsy();
  });

  it('should render 3 dots even if there is no active incident', async () => {
    render(
      <IncidentsListPopup
        cctv={camera}
        guards={[guard]}
        onIgnoreAlert={onIgnoreAlertMock}
        onSendAlert={onSendAlertMock}
      />
    );

    expect(screen.getByTestId(testId.showIncidentPopoverButton)).toBeVisible();
    expect(screen.getByTestId(testId.showIncidentPopoverButton)).toBeEnabled();
    expect(screen.queryByTestId(testId.hasActiveIncidentIcon)).toBeFalsy();
  });

  it('should render alert when there is active incident', async () => {
    const clonedCamera = { ...camera, incidents: [...camera.incidents, activeIncident] };

    render(
      <IncidentsListPopup
        cctv={clonedCamera}
        guards={[guard]}
        onIgnoreAlert={onIgnoreAlertMock}
        onSendAlert={onSendAlertMock}
      />
    );

    expect(screen.queryByTestId(testId.hasActiveIncidentIcon)).toBeVisible();

    await user.click(screen.getByTestId(testId.showIncidentPopoverButton));
    await waitFor(() => expect(screen.getByTestId(testId.alertPopup)).toBeVisible());
    await waitFor(() =>
      expect(screen.getAllByTestId(testId.alertListGroupItem)).toHaveLength(clonedCamera.incidents.length)
    );
    await waitFor(() => expect(screen.getByTestId(testId.sendAlertButton)).toBeVisible());
    await waitFor(() => expect(screen.getByTestId(testId.ignoreAlertButton)).toBeVisible());
  });

  it('should call onIgnoreAlertMock when click on Ignore button', async () => {
    const clonedCamera = { ...camera, incidents: [...camera.incidents, activeIncident] };
    onIgnoreAlertMock.mockResolvedValue(() => Promise.resolve());

    render(
      <IncidentsListPopup
        cctv={clonedCamera}
        guards={[guard]}
        onIgnoreAlert={onIgnoreAlertMock}
        onSendAlert={onSendAlertMock}
      />
    );

    await user.click(screen.getByTestId(testId.showIncidentPopoverButton));
    await waitFor(() => expect(screen.getByTestId(testId.alertPopup)).toBeVisible());
    await waitFor(() => expect(screen.getByTestId(testId.sendAlertButton)).toBeVisible());
    await waitFor(() => expect(screen.getByTestId(testId.ignoreAlertButton)).toBeVisible());

    await user.click(screen.getByTestId(testId.ignoreAlertButton));
    await waitFor(() => expect(onIgnoreAlertMock).toBeCalled());
  });

  it('should call onSendAlertMock when click on Send Alert button', async () => {
    const clonedCamera = { ...camera, incidents: [...camera.incidents, activeIncident] };
    onSendAlertMock.mockResolvedValue(() => Promise.resolve());

    render(
      <IncidentsListPopup
        cctv={clonedCamera}
        guards={[guard]}
        onIgnoreAlert={onIgnoreAlertMock}
        onSendAlert={onSendAlertMock}
      />
    );

    await user.click(screen.getByTestId(testId.showIncidentPopoverButton));
    await waitFor(() => expect(screen.getByTestId(testId.alertPopup)).toBeVisible());
    await waitFor(() => expect(screen.getByTestId(testId.sendAlertButton)).toBeVisible());
    await waitFor(() => expect(screen.getByTestId(testId.ignoreAlertButton)).toBeVisible());

    await user.click(screen.getByTestId(testId.sendAlertButton));
    await waitFor(() => expect(screen.getByTestId(testId.incidentPopoverContainer)).toBeVisible());

    await user.click(screen.getByTestId(testId.alertGuardButton));
    await waitFor(() => expect(onSendAlertMock).toBeCalled());
  });
});
