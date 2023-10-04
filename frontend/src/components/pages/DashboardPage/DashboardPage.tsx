import './DashboardPage.css';
import React, { useEffect, useState } from 'react';
import PageContainer from '../../layout/PageContainer/PageContainer';
import { checkHealth } from '../../../api/test.api';

const DashboardPage: React.FC = () => {
  const [res, setRes] = useState('');
  useEffect(() => {
    checkHealth().then((res) => {
      setRes(res.content);
    });
  }, []);

  return (
    <PageContainer>
      <div className="dashboard-page-container">
        <h4>Response</h4>
        <span>{res}</span>
      </div>
    </PageContainer>
  );
};
export default DashboardPage;
