import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testId } from '../../../testing/testId';
import DashboardPage from './DashboardPage';
import { Premise } from '../../../types/Premise';
import { User } from '../../../types/User';

const useLocationMock = vi.hoisted(() => vi.fn());
const loginMock = vi.hoisted(() => vi.fn());
const getGuardsMock = vi.hoisted(() => vi.fn());
const getPremisesMock = vi.hoisted(() => vi.fn());
const sendAlertMock = vi.hoisted(() => vi.fn());
const ignoredAlertMock = vi.hoisted(() => vi.fn());

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useLocation: useLocationMock,
}));
vi.mock('../../../api/users.api', () => ({
  login: loginMock,
  getGuards: getGuardsMock,
}));
vi.mock('../../../api/premises.api', () => ({
  getPremises: getPremisesMock,
}));
vi.mock('../../../api/incidents.api', () => ({
  sendAlert: sendAlertMock,
  ignoredAlert: ignoredAlertMock,
}));

const writeToSessionStorageMock = vi.hoisted(() => vi.fn());
vi.mock('../../../utils/sessionStorage', () => ({
  writeToSessionStorage: writeToSessionStorageMock,
  USERNAME_KEY: 'username',
  USER_ID_KEY: 'userId',
  ACCESS_TOKEN_KEY: 'accessToken',
}));

describe(DashboardPage.name, () => {
  const user = userEvent.setup();

  const operator: User = {
    id: '63c0cf4cbb90b139dd6f6804',
    username: 'testuser',
    firstname: 'John',
    accessToken: 'TTiHS0SDaEMQ9VgDUu43kZ5DaHXnHzPTxBQm2KUMz2C5zh3tq4RFGTGAnB0rv8ow',
  };
  const guard: User = {
    id: '63c0cf4cbb90b139dd6f6804',
    username: 'testuser1',
    firstname: 'John',
    accessToken: 'TTiHS0SDaEMQ9VgDUu43kZ5DaHXnHzPTxBQm2KUMz2C5zh3tq4RFGTGAnB0rv8ow',
  };
  const camera1 = {
    id: '63c0cf4cbb90b139dd6f6804',
    streamUrl: 'https://s2.livecam-pro.live/cam056/tracks-v1/mono.m3u8',
    name: 'Camera 1',
    premiseId: '1',
    incidents: [
      {
        id: '63c0cf4cbb90b139dd6f6805',
        name: 'Stranger detected',
        ignored: false,
        dateCreated: '2023-07-26T11:13:42.908Z',
        cameraId: '63c0cf4cbb90b139dd6f6804',
      },
      {
        id: '63c0cf4cbb90b139dd6f6905',
        name: 'Stranger 2 detected',
        ignored: false,
        dateCreated: '2023-07-27T11:13:42.908Z',
        cameraId: '63c0cf4cbb90b139dd6f6804',
      },
      {
        id: '63c0cf4cbb90b139dd6f7805',
        name: 'Dog detected',
        ignored: true,
        dateCreated: '2023-05-15T11:12:42.908Z',
        cameraId: '63c0cf4cbb90b139dd6f6804',
      },
      {
        id: '63c0cf4cbb90b139dd6f8805',
        name: 'Cat detected',
        ignored: false,
        guardId: '63c0cf4cbb90b139dd6f6804',
        dateCreated: '2023-05-15T11:13:42.908Z',
        cameraId: '63c0cf4cbb90b139dd6f6804',
      },
    ],
  };
  const premise1: Premise = {
    id: '1',
    name: 'Floor 1',
    cameras: [camera1],
  };
  const premise2: Premise = {
    id: '2',
    name: 'Floor 2',
    cameras: [],
  };

  beforeEach(() => {
    vi.resetModules();
    useLocationMock.mockReturnValue({
      state: {},
    });
    loginMock.mockResolvedValue(operator);
    getGuardsMock.mockResolvedValue([guard]);
    getPremisesMock.mockResolvedValue([premise1, premise2]);
  });

  it('should render dashboard with premises dropdown', async () => {
    render(<DashboardPage />);

    expect(screen.getByTestId(testId.premisesDropdown)).toBeVisible();
    await waitFor(() => expect(screen.getByText(premise1.name)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(premise2.name)).toBeInTheDocument());
  });

  it('should render cctv players after selecting a premise', async () => {
    render(<DashboardPage />);

    fireEvent.click(screen.getByTestId(testId.premisesDropdown));
    await waitFor(() => user.selectOptions(screen.getByTestId(testId.premisesDropdown), premise1.name));
    await waitFor(() => expect(screen.getAllByTestId(testId.cctvPlayer)).toHaveLength(premise1.cameras.length));
  });

  it('should show incidents list popup when clicking on incidents', async () => {
    render(<DashboardPage />);

    fireEvent.click(screen.getByTestId(testId.premisesDropdown));
    await waitFor(() => user.selectOptions(screen.getByTestId(testId.premisesDropdown), premise1.name));
    await waitFor(() => expect(screen.getAllByTestId(testId.cctvPlayer)).toHaveLength(premise1.cameras.length));

    fireEvent.click(screen.getAllByTestId(testId.showIncidentPopoverButton)[0]);
    await waitFor(() => expect(screen.getByTestId(testId.alertPopup)).toBeVisible());
    await waitFor(() =>
      expect(screen.getAllByTestId(testId.alertListGroupItem)).toHaveLength(premise1.cameras[0].incidents!.length)
    );
  });

  it('should show guards list when clicking on Send Alert', async () => {
    render(<DashboardPage />);

    fireEvent.click(screen.getByTestId(testId.premisesDropdown));
    await waitFor(() => user.selectOptions(screen.getByTestId(testId.premisesDropdown), premise1.name));
    await waitFor(() => expect(screen.getAllByTestId(testId.cctvPlayer)).toHaveLength(premise1.cameras.length));

    fireEvent.click(screen.getAllByTestId(testId.showIncidentPopoverButton)[0]);
    await waitFor(() => expect(screen.getByTestId(testId.alertPopup)).toBeVisible());
    await waitFor(() =>
      expect(screen.getAllByTestId(testId.alertListGroupItem)).toHaveLength(premise1.cameras[0].incidents!.length)
    );

    fireEvent.click(screen.getAllByTestId(testId.sendAlertButton)[0]);
    await waitFor(() => expect(screen.getByTestId(testId.incidentPopoverContainer)).toBeVisible());
    await waitFor(() => expect(screen.getAllByTestId(testId.alertGuardButton)).toHaveLength(1));
  });
});
