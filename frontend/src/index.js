import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init.js';
import './assets/application.css';

const runApp = async () => {
  const socket = io();

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await init(socket));
};

runApp();
