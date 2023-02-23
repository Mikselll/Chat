import { configureStore } from '@reduxjs/toolkit';
import channels from './channelsSlice';
import messages from './messagesSlice';

export default configureStore({
  reducer: {
    channels,
    messages,
  },
});
