import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import resources from './locales/index.js';
import App from './components/App.jsx';
import store from './slices/index.js';

const init = () => {
  const i18n = i18next.createInstance();
  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  const rollbarConfig = {
    accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
    environment: 'production',
  };

  return (
    <React.StrictMode>
      <Provider store={store}>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <App />
            <ToastContainer />
          </ErrorBoundary>
        </RollbarProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default init;