import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './routers/AppRouter.jsx';
import { BrowserRouter } from 'react-router-dom';
import { EmployerProgressProvider } from './contexts/EmployerProgressContext.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EmployerProgressProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </EmployerProgressProvider>
  </React.StrictMode>
);
