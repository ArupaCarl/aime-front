import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import './i18n'; // i18n 초기화
import App from './App';
import { QueryProvider } from './providers/QueryProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>
);
