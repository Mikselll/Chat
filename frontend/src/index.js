import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import './assets/application.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
