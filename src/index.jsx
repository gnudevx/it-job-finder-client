import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './routers/AppRouter.jsx';
import { BrowserRouter } from 'react-router-dom';
import { EmployerProgressProvider } from './contexts/EmployerProgressContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <EmployerProgressProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </EmployerProgressProvider>
    </AuthProvider>
  </React.StrictMode>
);
