import React from 'react';
import PageContainer from '../../layout/PageContainer/PageContainer';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerDocPage: React.FC = () => {
  const swaggerDocUrl = `/public/openapi.yml`;
  return (
    <PageContainer>
      <SwaggerUI url={swaggerDocUrl} />
    </PageContainer>
  );
};
export default SwaggerDocPage;
