import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './routers/AppRouter.jsx';
import { BrowserRouter } from 'react-router-dom';
import { EmployerProgressProvider } from './contexts/EmployerProgressContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { Provider } from 'react-redux';
import { store } from '@/redux/store.js';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <EmployerProgressProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </EmployerProgressProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
