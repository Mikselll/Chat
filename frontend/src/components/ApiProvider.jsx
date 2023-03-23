import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { ApiContext } from '../contexts/index.js';
import {
  addChannel, removeChannel, renameChannel,
} from '../slices/channelsSlice.js';
import { addMessage } from '../slices/messagesSlice.js';

const ApiProvider = ({ children, socket }) => {
  const dispatch = useDispatch();
  const promisify = (actionName, ...arg) => new Promise((resolve, reject) => {
    socket
      .timeout(5000)
      .emit(actionName, ...arg, (err, response) => {
        console.log(response);
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
    dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    dispatch(addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    dispatch(removeChannel(payload.id));
  });
  socket.on('renameChannel', (payload) => {
    dispatch(renameChannel(payload));
  });

  const socketServices = useMemo(() => ({
    newMessage, newChannel, remove, rename,
  }));

  return (
    <ApiContext.Provider value={socketServices}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
