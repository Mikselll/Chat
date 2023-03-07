import ReactDOM from 'react-dom/client';
import init from './init.js';
import './assets/application.css';

const runApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(init());
};

runApp();
