import React, { useMemo } from 'react';
import { SocketContext } from '../contexts/index.js';
import store from '../slices/index.js';
import {
  addChannel, removeChannel, renameChannel,
} from '../slices/channelsSlice.js';
import { addMessage } from '../slices/messagesSlice.js';

const SocketProvider = ({ children, socket }) => {
  const promisify = (actionName, ...arg) => new Promise((resolve, reject) => {
    socket.emit(actionName, ...arg, (response) => {
      if (response.status === 'ok') {
        resolve(response);
      }
      reject(new Error('errors.networkError'));
    });
  });

  const newMessage = (message) => promisify('newMessage', message);

  const newChannel = (name) => promisify('newChannel', name);

  const remove = (id) => promisify('removeChannel', id);

  const rename = (channel) => promisify('renameChannel', channel);

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload.id));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload));
  });

  const socketServices = useMemo(() => ({
    newMessage, newChannel, remove, rename,
  }));

  return (
    <SocketContext.Provider value={socketServices}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
