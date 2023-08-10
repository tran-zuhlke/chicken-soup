import './DashboardPage.css';
import React, { useEffect, useState } from 'react';
import PageContainer from '../../layout/PageContainer/PageContainer';
import { getGuards, login } from '../../../api/users.api';
import { getPremises } from '../../../api/premises.api';
import { ignoreAlert, sendAlert } from '../../../api/incidents.api';
import { useLocation } from 'react-router-dom';
import { User } from '../../../types/User';
import { Col, Input, Row, Spinner } from 'reactstrap';
import { ACCESS_TOKEN_KEY, USER_ID_KEY, USERNAME_KEY, writeToSessionStorage } from '../../../utils/sessionStorage';
import { Incident, Premise } from '../../../types/Premise';
import IncidentsListPopup from '../../components/IncidentsListPopup/IncidentsListPopup';
import CCTVPlayer from '../../components/CCTVPlayer/CCTVPlayer';
import { testId } from '../../../testing/testId';
import { getNewIncidentsAndNotify } from './getNewIncidentsAndNotify';

const DashboardPage: React.FC = () => {
  let { state } = useLocation();
  const [user, setUser] = useState<User>();
  const [premises, setPremises] = useState<Premise[]>([]);
  const [selectedPremise, setSelectedPremise] = useState<Premise>();
  const [guards, setGuards] = useState<User[]>([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const MINUTE_IN_MILLISECONDS = 60000;

  useEffect(() => {
    login('username', 'password').then((user_) => {
      writeToSessionStorage(USER_ID_KEY, user_.id);
      writeToSessionStorage(USERNAME_KEY, user_.username);
      writeToSessionStorage(ACCESS_TOKEN_KEY, user_.accessToken);
      state = { user: user_ };
      setUser(user_);

      setIsFetchingData(true);
      getGuards().then((guards_) => setGuards(guards_));
      getPremises().then((premises_) => {
        setPremises(premises_);
        setIsFetchingData(false);
      });
    });
  }, []);

  useEffect(() => {
    const getNewIncidentsInterval = setInterval(
      () => getNewIncidentsAndNotify(premises, setPremises, selectedPremise, setSelectedPremise),
      MINUTE_IN_MILLISECONDS
    );
    return () => clearInterval(getNewIncidentsInterval);
  }, [premises, selectedPremise]);

  const onSendAlert = async (incident: Incident, guardId: string) => {
    await sendAlert(incident.id, guardId);
    incident.guardId = guardId;
  };

  const onIgnoreAlert = async (incident: Incident) => {
    await ignoreAlert(incident.id);
    incident.ignored = true;
  };

  const onChangePremise = (e) => {
    const premise = premises.find((premise_) => premise_.id === e.target.value);
    if (premise) {
      setSelectedPremise(premise);
    } else {
      setSelectedPremise(undefined);
    }
  };

  return (
    <PageContainer user={user}>
      <div className="dashboard-page-container">
        <div className="camera-property-input">
          <Input
            type="select"
            id="premises"
            name="premises"
            disabled={isFetchingData}
            data-testid={testId.premisesDropdown}
            onChange={onChangePremise}
          >
            <option defaultChecked={true}>Select Premise</option>
            {premises
              .sort((left, right) => (left.name < right.name ? -1 : 1))
              .map((premise: Premise) => (
                <option key={premise.id} value={premise.id}>
                  {premise.name}
                </option>
              ))}
          </Input>
          {isFetchingData && (
            <div className="loading-spinner">
              <Spinner></Spinner> <span>Loading...</span>
            </div>
          )}
        </div>
        <Row xs="2" className="m-0 cctvs-container">
          {selectedPremise &&
            selectedPremise.cameras
              .sort((left, right) => (left.name < right.name ? -1 : 1))
              .map((camera) => (
                <Col key={camera.id} className="bg-light border">
                  <div className="camera-info-container">
                    <span>{camera.name}</span>
                    <IncidentsListPopup
                      cctv={camera}
                      guards={guards}
                      onSendAlert={onSendAlert}
                      onIgnoreAlert={onIgnoreAlert}
                    />
                  </div>
                  <CCTVPlayer cctv={camera} />
                </Col>
              ))}
        </Row>
      </div>
    </PageContainer>
  );
};
export default DashboardPage;
