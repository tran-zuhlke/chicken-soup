import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { getApplicationVersion } from './utils/getApplicationVersion';
import { worker } from './api/mocks/mockServer';
import { testId } from './testing/testId';
import { basePathPrefix } from './navigation/basePathPrefix';

console.log(`Application version: ${getApplicationVersion()}`);

let serverMockEnable = JSON.parse(import.meta.env.VITE_SERVER_MOCKS_ENABLED || true);
if (serverMockEnable) {
  console.log(basePathPrefix);
  worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: `${import.meta.env.VITE_SERVER_BASE_URL}/${basePathPrefix}/mockServiceWorker.js`,
    },
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="bottom-center" containerStyle={{ fontSize: '11pt' }} />
    </BrowserRouter>
  </React.StrictMode>
);
(document.getElementById('root') as HTMLElement).className = 'container';
(document.getElementById('root') as HTMLElement).dataset['testid'] = testId.rootContainer;
