import React from 'react';
import './ErrorFallbackPage.css';
import PageContainer from '../../layout/PageContainer/PageContainer';
import { basePathPrefix } from '../../../navigation/basePathPrefix';
import { Page } from '../../../navigation/Page';
import errorImage from '../../../assets/error-image.png';

const ErrorFallbackPage: React.FC = () => {
  return (
    <PageContainer>
      <div className="error-fallback-page-container">
        <div>
          <img src={errorImage} alt="error-image" />
        </div>
        <strong>Something went wrong!</strong>
        <p className="color-secondary">An unexpected error occurred</p>
        <div>
          <a href={`${basePathPrefix}/${Page.DASHBOARD}`}>Back to Home</a>
        </div>
      </div>
    </PageContainer>
  );
};
export default ErrorFallbackPage;
