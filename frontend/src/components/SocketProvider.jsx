import React, { useMemo } from 'react';
import { SocketContext } from '../contexts/index.js';
import store from '../slices/index.js';
import {
  addChannel, removeChannel, renameChannel,
} from '../slices/channelsSlice.js';
import { addMessage } from '../slices/messagesSlice.js';

const SocketProvider = ({ children, socket }) => {
  const newMessage = (text, username, channelId) => {
    socket.emit('newMessage', { text, username, channelId });
  };

  const newChannel = (name) => new Promise((resolve) => {
    socket.emit('newChannel', { name }, (response) => {
      resolve(response);
    });
  });

  const remove = (id) => {
    socket.emit('removeChannel', { id });
  };

  const rename = (name, id) => {
    socket.emit('renameChannel', { name, id });
  };

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
