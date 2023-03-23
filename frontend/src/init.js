import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import store from './slices/index.js';
import resources from './locales/index.js';
import App from './components/App.jsx';
import AuthProvider from './components/AuthProvider.jsx';
import ApiProvider from './components/ApiProvider.jsx';

const init = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
  };

  return (
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <ApiProvider socket={socket}>
                <AuthProvider>
                  <App />
                  <ToastContainer />
                </AuthProvider>
              </ApiProvider>
            </I18nextProvider>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>
  );
};

export default init;
