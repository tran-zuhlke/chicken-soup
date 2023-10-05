import './HomePage.css';
import React, { useEffect, useState } from 'react';
import PageContainer from '../../layout/PageContainer/PageContainer';
import { checkHealth } from '../../../api/health.api';

const DashboardPage: React.FC = () => {
  const [res, setRes] = useState('');
  useEffect(() => {
    checkHealth().then((res) => {
      setRes(res.content);
    });
  }, []);

  return (
    <PageContainer title={'Home Sweet Home'}>
      <div className="dashboard-page-container">
        <h4>
          Server Health: <strong>{res}</strong>
        </h4>
      </div>
    </PageContainer>
  );
};
export default DashboardPage;
