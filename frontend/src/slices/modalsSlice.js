/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  channelId: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModalType(state, { payload }) {
      state.modalType = payload;
    },
    setChannelId(state, { payload }) {
      state.channelId = payload;
    },
  },
});

export const {
  setModalType,
  setChannelId,
} = modalsSlice.actions;
export default modalsSlice.reducer;
