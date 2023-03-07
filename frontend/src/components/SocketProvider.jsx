import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import filter from 'leo-profanity';
import { SocketContext } from '../contexts/index.js';
import { setCurrentChannelId } from '../slices/channelsSlice.js';

const SocketProvider = ({ children, socket }) => {
  filter.loadDictionary('ru');
  const dispatch = useDispatch();

  const addMessage = (text, username, channelId) => {
    socket.emit('newMessage', { text: filter.clean(text), username, channelId });
  };

  const addChannel = (name) => {
    socket.emit('newChannel', { name }, (response) => {
      const { data } = response;
      dispatch(setCurrentChannelId(data.id));
    });
  };

  const removeChannel = (id) => {
    socket.emit('removeChannel', { id });
  };

  const renameChannel = (name, id) => {
    socket.emit('renameChannel', { name, id });
  };

  const socketServices = useMemo(() => ({
    addMessage, addChannel, removeChannel, renameChannel,
  }));

  return (
    <SocketContext.Provider value={socketServices}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
