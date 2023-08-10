import React from 'react';
import ErrorFallbackPage from './components/pages/ErrorFallback/ErrorFallbackPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { basePathPrefix } from './navigation/basePathPrefix';
import { Page } from './navigation/Page';
import { ErrorBoundary } from 'react-error-boundary';
import DashboardPage from './components/pages/DashboardPage/DashboardPage';
import SwaggerDocPage from './components/pages/SwaggerDocPage/SwaggerDocPage';

const App = () => {
  const handleError = (error: Error) => console.error(`Error boundary caught the following error: ${error}`);

  return (
    <div className="app-container">
      <ErrorBoundary FallbackComponent={ErrorFallbackPage} onError={handleError}>
        <Routes>
          <Route path={`${basePathPrefix}/${Page.DASHBOARD}`} element={<DashboardPage />} />
          <Route path={`${basePathPrefix}/${Page.SWAGGER}`} element={<SwaggerDocPage />} />
          <Route path={`${basePathPrefix}`} element={<DashboardPage />} />
          <Route path={`${basePathPrefix}/*`} element={<Navigate to={`${basePathPrefix}/${Page.DASHBOARD}`} />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
